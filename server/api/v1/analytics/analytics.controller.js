const logger = require('./../../../components/logger')
const Messages = require('../messages/messages.model')
const Media = require('../media/media.model')
const Groups = require('../groups/groups.model')
const TAG = '/server/api/v1/analytics/analytics.controller.js'

exports.getSentMessages = function (req, res) {
  logger.serverLog(TAG, 'Hit the retrieve sent messages endpoint')
  Messages.find({from: req.params.wa_id})
    .exec()
    .then(sentMessages => {
      return res.status(200).json({ status: 'success', payload: sentMessages })
    })
    .catch(err => {
      return res.status(500).json({ status: 'failed', payload: err })
    })
}

exports.getRecievedMessages = function (req, res) {
  logger.serverLog(TAG, 'Hit the retrieve recieved messages endpoint')
  Messages.find({to: req.params.wa_id})
    .exec()
    .then(recievedMessages => {
      return res.status(200).json({ status: 'success', payload: recievedMessages })
    })
    .catch(err => {
      return res.status(500).json({ status: 'failed', payload: err })
    })
}

exports.getUnreadMessages = function (req, res) {
  logger.serverLog(TAG, 'Hit the retrieve unread messages endpoint')
  Messages.find({to: req.params.wa_id, status: 'delivered'})
    .exec()
    .then(unreadMessages => {
      return res.status(200).json({ status: 'success', payload: unreadMessages })
    })
    .catch(err => {
      return res.status(500).json({ status: 'failed', payload: err })
    })
}

exports.getUploadedMedia = function (req, res) {
  logger.serverLog(TAG, 'Hit the retrieve uploaded media endpoint')
  Media.find({uploadedBy: req.params.wa_id})
    .exec()
    .then(uploadedMedia => {
      return res.status(200).json({ status: 'success', payload: uploadedMedia })
    })
    .catch(err => {
      return res.status(500).json({ status: 'failed', payload: err })
    })
}

exports.getJoinedGroups = function (req, res) {
  logger.serverLog(TAG, 'Hit the retrieve uploaded media endpoint')
  Groups.find({participants: req.params.wa_id})
    .exec()
    .then(joinedGroups => {
      return res.status(200).json({ status: 'success', payload: joinedGroups })
    })
    .catch(err => {
      return res.status(500).json({ status: 'failed', payload: err })
    })
}

exports.getAdminGroups = function (req, res) {
  logger.serverLog(TAG, 'Hit the retrieve uploaded media endpoint')
  Groups.find({admins: req.params.wa_id})
    .exec()
    .then(adminGroups => {
      return res.status(200).json({ status: 'success', payload: adminGroups })
    })
    .catch(err => {
      return res.status(500).json({ status: 'failed', payload: err })
    })
}
