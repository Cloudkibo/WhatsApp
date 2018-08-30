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

exports.sendToWhatsapp = function (req, res) {
  logger.serverLog(TAG, 'Hit the sendToWhatsapp endpoint')

}

exports.create = function (req, res) {
  logger.serverLog(TAG, 'Hit the create endpoint')
  Contacts.create(req.body.contacts)
    .then(contacts => {
      return res.status(200).json({ status: 'success', payload: contacts })
    })
    .catch(err => {
      return res.status(500).json({ status: 'failed', payload: err })
    })
}

exports.update = function (req, res) {
  logger.serverLog(TAG, 'Hit the create endpoint')
  Contacts.updateOne({phone: req.body.phone}, { $set: {name: req.body.name} })
    .then(result => {
      return res.status(200).json({ status: 'success', payload: result })
    })
    .catch(err => {
      return res.status(500).json({ status: 'failed', payload: err })
    })
}
