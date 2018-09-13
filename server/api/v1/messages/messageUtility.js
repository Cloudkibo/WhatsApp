const Message = require('./messages.model')
const logger = require('./../../../components/logger')
const config = require('./../../../config/environment')
const Media = require('./../media/media.model')
const path = require('path')
const crypto = require('crypto')
const fs = require('fs')
const util = require('util')
const request = require('request').defaults({ encoding: null })
const TAG = '/server/api/v1/messages/messageUtility.js'

exports.saveMessage = (payload) => {
  const data = payload.messages.pop()
  const message = new Message({
    from: data.from,
    messageId: data.id,
    timestamp: data.timestamp,
    type: data.type,
    messagePayload: data[data.type] // Extract the message body using message type
  })
  message.save()
    .then((result) => {
      logger.serverLog(TAG, `New Message Saved ${result}`)
    })
    .catch((err) => {
      logger.serverLog(TAG, `Failed to save new message ${err}`)
    })
  return message
}

exports.getMediaFromDocker = (mediaId, mediaType) => {
  logger.serverLog(TAG, `going to fetch media: ${mediaId}`)

  request.get({url: `${config.docker_url}/v1/media/${mediaId}`}, (err, body, result) => {
    if (err) {
      return logger.serverLog(TAG, `Internal Server error at: ${JSON.stringify(err)}`)
    }
    if (body.statusCode === 200) {
      saveMediaFile(result, mediaType)
        .then(mediaPath => {
          logger.serverLog(TAG, `then of save media file: ${mediaPath}`)
          createMediaObject(mediaId, mediaType, mediaPath)
        })
    } else {

    }
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

function saveMediaFile (file, type) {
  return new Promise((resolve, reject) => {
    let today = new Date()
    let uid = crypto.randomBytes(5).toString('hex')
    let serverPath = 'f' + uid + '' + today.getFullYear() + '' + (today.getMonth() + 1) + '' + today.getDate()

    serverPath += '' + today.getHours() + '' + today.getMinutes() + '' + today.getSeconds()

    logger.serverLog(TAG, `before name `)

    let dir = path.resolve(__dirname, '../../../../uploaded_media/')

    let mediaPath = dir + '/user_media' + serverPath

    fs.writeFile(returnMediaPath(mediaPath, type), file, (err) => {
      if (err) {
        reject(err)
      }
      logger.serverLog(TAG, `in : ${returnMediaPath(mediaPath, type)}`)
      resolve(returnMediaPath(mediaPath, type))
    })
  })
}

function returnMediaPath (arg, type) {
  if (type === 'image') { return arg + '.png' }
  if (type === 'video') { return arg + '.mp4' }
  if (type === 'audio') { return arg + '.mp3' }
  if (type === 'voice') { return arg + '.ogg' }
  if (type === 'document') { return arg + '.pdf' }
}
