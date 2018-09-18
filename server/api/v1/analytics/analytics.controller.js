const logger = require('./../../../components/logger')
const Messages = require('../messages/messages.model')
const Media = require('../media/media.model')
const Groups = require('../groups/groups.model')
const TAG = '/server/api/v1/analytics/analytics.controller.js'

exports.getTotalMessages = function (req, res) {
  logger.serverLog(TAG, 'Hit the retrieve sent messages endpoint')
  Messages.find({})
    .exec()
    .then(messages => {
      return res.status(200).json({ status: 'success', payload: messages.length })
    })
    .catch(err => {
      return res.status(500).json({ status: 'failed', payload: err })
    })
}

exports.getRecievedMessages = function (req, res) {
  logger.serverLog(TAG, 'Hit the retrieve recieved messages endpoint')
  Messages.find({to: req.user.wa_id})
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
  Messages.find({status: 'delivered'})
    .exec()
    .then(unreadMessages => {
      return res.status(200).json({ status: 'success', payload: unreadMessages.length })
    })
    .catch(err => {
      return res.status(500).json({ status: 'failed', payload: err })
    })
}

exports.getUploadedMedia = function (req, res) {
  logger.serverLog(TAG, 'Hit the retrieve uploaded media endpoint')
  Media.find({uploadedBy: req.user.wa_id})
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
  Groups.find({groupLeft: false})
    .exec()
    .then(joinedGroups => {
      return res.status(200).json({ status: 'success', payload: joinedGroups.length })
    })
    .catch(err => {
      return res.status(500).json({ status: 'failed', payload: err })
    })
}

exports.getLeftGroups = function (req, res) {
  logger.serverLog(TAG, 'Hit the retrieve uploaded media endpoint')
  Groups.find({groupLeft: true})
    .exec()
    .then(leftGroups => {
      return res.status(200).json({ status: 'success', payload: leftGroups.length })
    })
    .catch(err => {
      return res.status(500).json({ status: 'failed', payload: err })
    })
}
