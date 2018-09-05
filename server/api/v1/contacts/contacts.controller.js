const path = require('path')
const fs = require('fs')
const csv = require('csv-parser')
const crypto = require('crypto')

const logger = require('./../../../components/logger')
const Contacts = require('./contacts.model')
const utility = require('./../../../components/utility')
const TAG = '/server/api/v1/groups/groups.controller.js'

exports.index = function (req, res) {
  logger.serverLog(TAG, 'Hit the create endpoint')
  Contacts.find({})
    .exec()
    .then(contacts => {
      return res.status(200).json({ status: 'success', payload: contacts })
    })
    .catch(err => {
      return res.status(500).json({ status: 'failed', payload: err })
    })
}

exports.fetchMany = function (req, res) {
  logger.serverLog(TAG, 'Hit the sendToWhatsapp endpoint')
  Contacts.find({wa_id: {$in: req.body.ids}})
    .exec()
    .then(contacts => {
      return res.status(200).json({ status: 'success', payload: contacts })
    })
    .catch(err => {
      return res.status(500).json({ status: 'failed', payload: err })
    })
}

exports.uploadContacts = function (req, res) {
  logger.serverLog(TAG, 'Hit the sendToWhatsapp endpoint')
  let today = new Date()
  let uid = crypto.randomBytes(5).toString('hex')
  let serverPath = 'f' + uid + '' + today.getFullYear() + '' + (today.getMonth() + 1) + '' + today.getDate()

  serverPath += '' + today.getHours() + '' + today.getMinutes() + '' + today.getSeconds()
  let fext = req.files.file.name.split('.')

  serverPath += '.' + fext[fext.length - 1]

  let dir = path.resolve(__dirname, '../../../../uploaded_files/')

  if (req.files.file.size === 0) {
    return res.status(400).json({
      status: 'failed',
      description: 'No file submitted'
    })
  }

  fs.rename(req.files.file.path, dir + '/userfiles' + serverPath, (err) => {
    if (err) {
      return res.status(500).json({
        status: 'failed',
        description: 'internal server error' + JSON.stringify(err)
      })
    }

    let valid = false
    let dockerPayload = [] // Payload for docker
    let localPayload = []

    fs.createReadStream(dir + '/userfiles' + serverPath)
      .pipe(csv())
      .on('data', (data) => {
        logger.serverLog(TAG, data['phone'] + ' ' + data['name'])
        dockerPayload.push(data['phone'])
        localPayload.push({name: data['name'], phone: data['phone']})
      })
      .on('end', () => {
        utility.postToWhatsapp('/v1/contacts', {contacts: dockerPayload}, (err, result) => {
          if (err) {
            return res.status(500).json({ status: 'failed at getting status from docker', payload: err })
          }

          result.data.contacts.forEach((contact, index) => {
            contact.status === 'valid' ? localPayload[index].wa_id = contact.wa_id : valid = true
            localPayload[index].status = contact.status
          })
          localPayload.forEach((item, index) => {
            Contacts.update({phone: item.phone}, item, {upsert: true})
              .exec()
              .then((savedObj) => {
                // Only runs at last index
                if (index === (localPayload.length - 1)) {
                  Contacts.find({phone: { $in: dockerPayload }})
                    .exec()
                    .then(payloadForClient => {
                      return res.status(200).json({ status: 'success', payload: payloadForClient })
                    })
                    .catch(err => {
                      return res.status(500).json({ status: 'failed', payload: err })
                    })
                }
              })
              .catch(err => {
                return res.status(500).json({ status: 'failed', payload: err })
              })
          })
        })
      })
  })
}

exports.create = function (req, res) {
  logger.serverLog(TAG, 'Hit the create endpoint' + JSON.stringify(req.body.contacts))
  Contacts.create(req.body.contacts)
    .then(contacts => {
      return res.status(200).json({ status: 'success', payload: contacts })
    })
    .catch(err => {
      return res.status(500).json({ status: 'failed', payload: err })
    })
}

exports.update = function (req, res) {
  logger.serverLog(TAG, 'Hit the update contact endpoint')
  Contacts.updateOne({phone: req.body.phone}, { $set: {name: req.body.name} })
    .then(result => {
      return res.status(200).json({ status: 'success', payload: result })
    })
    .catch(err => {
      return res.status(500).json({ status: 'failed', payload: err })
    })
}

exports.delete = function (req, res) {
  logger.serverLog(TAG, 'Hit the delete contact endpoint')
  Contacts.deleteOne({phone: req.params.phone})
    .then(result => {
      return res.status(200).json({ status: 'success', payload: result })
    })
    .catch(err => {
      return res.status(500).json({ status: 'failed', payload: err })
    })
}
