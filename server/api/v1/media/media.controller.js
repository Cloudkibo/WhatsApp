const logger = require('./../../../components/logger')
const Media = require('./media.model')
const utility = require('./../../../components/utility')
const config = require('./../../../config/environment')

const path = require('path')
const crypto = require('crypto')
const fs = require('fs')
const request = require('request')

const TAG = '/server/api/v1/media/media.controller.js'

exports.getMedia = function (req, res) {
  logger.serverLog(TAG, 'Hit the endpoint for Get Media')
  Media.findOne({mediaId: req.params.mediaId})
    .then(result => {
      if (result.mediaType === 'document') {
        // res.setHeader('application/octet-stream')
        return res.download(result.url)
      } else {
        return res.sendFile(result.url)
      }
    })
    .catch(err => {
      logger.serverLog(TAG, `Inernal Server Error ${err}`)
      return res.status(500).json({ status: 'failed', err: err })
    })
}

exports.deleteMedia = function (req, res) {
  logger.serverLog(TAG, 'Hit the endpoint for Delete Media')
  utility.deleteFromWhatsapp(`/v1/media/${req.params.mediaId}`, (err, result) => {
    if (err) {
      logger.serverLog(TAG, `Internal Server error at: ${JSON.stringify(err)}`)
      return res.status(500).json({ status: 'failed', description: err })
    }
    Media.findOne({mediaId: req.params.mediaId})
      .then(media => {
        Media.deleteOne({mediaId: req.params.mediaId})
          .then(() => {
            fs.unlink(media.url, (err) => {
              if (err) {
                return res.status(500).json({status: 'failed: ' + err})
              }
            })
            return res.status(200).json({status: 'success'})
          })
          .catch(err => {
            logger.serverLog(TAG, `Inernal Server Error ${err}`)
            return res.status(500).json({ status: 'failed', err: err })
          })
      })
      .catch(err => {
        logger.serverLog(TAG, `Inernal Server Error ${err}`)
        return res.status(500).json({ status: 'failed', err: err })
      })
  })
}

exports.uploadMedia = function (req, res) {
  logger.serverLog(TAG, `Hit the endpoint for upload Media`)

  // if (req.files.file.size === 0) {
  //   return res.status(400).json({
  //     status: 'failed',
  //     description: 'No file submitted'
  //   })
  // }

  if (Array.isArray(req.files.file)) {
    let requests = req.files.file.map((file, i) => {
      validateFile(file, res)
      return saveMediaFile(file)
    })
    Promise.all(requests)
      .then((mediaFiles) => {
        let fileData = mediaFiles.map((filePath) => {
          return fs.createReadStream(filePath)
        })
        // Using request here because Axios does not support sending multi part form data natively.
        let formData = {'file': fileData}
        request.post({url: `${config.docker_url}/v1/media/`, formData: formData}, (err, body, result) => {
          if (err) {
            logger.serverLog(TAG, `Internal Server error at: ${JSON.stringify(err)}`)
            return res.status(500).json({ status: 'failed', description: err })
          }
          logger.serverLog(TAG, result)
          if (body.statusCode === 200) {
            result = JSON.parse(result)
            let mediaCreationRequests = req.files.file.map((file, i) => {
              return createMediaObject(result.media[i].id, file.type, mediaFiles[i])
            })
            Promise.all(mediaCreationRequests)
              .then(() => {
                return res.status(200).json({ payload: result, status: 'success' })
              })
              .catch((err) => res.status(500).json({status: 'failed', description: `Error: ${JSON.stringify(err)}`}))
          } else {
            return res.status(body.statusCode).json({ status: 'failed' })
          }
        })
      })
      .catch((err) => res.status(500).json({status: 'failed', description: `Error: ${JSON.stringify(err)}`}))
  } else {
    validateFile(req.files.file, res)
    saveMediaFile(req.files.file)
      .then((mediaFile) => {
        console.log(mediaFile)
        let fileData = fs.createReadStream(mediaFile)
        let formData = {'file': fileData}
        request.post({url: `${config.docker_url}/v1/media/`, formData: formData}, (err, body, result) => {
          if (err) {
            logger.serverLog(TAG, `Internal Server error at: ${JSON.stringify(err)}`)
            return res.status(500).json({ status: 'failed', description: err })
          }
          logger.serverLog(TAG, `result: ${JSON.stringify(result)}`)
          if (body.statusCode === 201) {
            result = JSON.parse(result)
            createMediaObject(result.media[0].id, req.files.file.type, mediaFile)
              .then(() => {
                return res.status(200).json({ payload: result, status: 'success' })
              })
              .catch((err) => res.status(500).json({status: 'failed', description: `Error: ${err}`}))
          } else {
            return res.status(body.statusCode).json({ status: 'failed' })
          }
        })
      })
      .catch((err) => res.status(500).json({status: 'failed', description: `Error: ${JSON.stringify(err)}`}))
  }
}

function validateFile (file, res) {
  console.log('validating ' + file.type)
  console.log(file.type.startsWith('image'))
  if (!file.type.startsWith('image') && !file.type.startsWith('audio') && !file.type.startsWith('document')) {
    return res.status(400).json({
      status: 'failed',
      description: 'unsupported file type: ' + file.type
    })
  }
}

function saveMediaFile (file) {
  return new Promise((resolve, reject) => {
    let today = new Date()
    let uid = crypto.randomBytes(5).toString('hex')
    let serverPath = 'f' + uid + '' + today.getFullYear() + '' + (today.getMonth() + 1) + '' + today.getDate()

    serverPath += '' + today.getHours() + '' + today.getMinutes() + '' + today.getSeconds()
    let fext = file.name.split('.')

    serverPath += '.' + fext[fext.length - 1]

    let dir = path.resolve(__dirname, '../../../../uploaded_media/')

    let mediaPath = dir + '/user_media' + serverPath

    fs.rename(file.path, mediaPath, (err) => {
      if (err) {
        reject(err)
      }
      resolve(mediaPath)
    })
  })
}

function createMediaObject (mediaId, mediaType, url) {
  let newMedia = {
    mediaId,
    mediaType,
    url
  }
  return new Promise((resolve, reject) => {
    Media.create(newMedia)
      .then(result => {
        let resp = {id: mediaId}
        resolve(resp)
      })
      .catch(err => {
        logger.serverLog(TAG, `Inernal Server Error ${JSON.stringify(err)}`)
        reject(err)
      })
  })
}
