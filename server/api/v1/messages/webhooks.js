const logger = require('./../../../components/logger')
const TAG = '/server/api/v1/messages/webhooks.js'
const messageUtility = require('./messageUtility')
const helper = require('./../../../config/socketio')

exports.handleTextMessage = (payload) => {
  logger.serverLog(TAG, `Text Message Handled ${JSON.stringify(payload)}`)
  const savedMessage = messageUtility.saveMessage(payload)
  helper.sendToClient(savedMessage)
}

exports.handleImageMessage = (payload) => {
  logger.serverLog(TAG, `Image Message Handled ${JSON.stringify(payload)}`)
  const savedMessage = messageUtility.saveMessage(payload)
  helper.sendToClient(savedMessage)
}

exports.handleAudioMessage = (payload) => {
  logger.serverLog(TAG, `Audio Message Handled ${JSON.stringify(payload)}`)
  const savedMessage = messageUtility.saveMessage(payload)
  helper.sendToClient(savedMessage)
}

exports.handleVideoMessage = (payload) => {
  logger.serverLog(TAG, `Video Message Handled ${JSON.stringify(payload)}`)
  const savedMessage = messageUtility.saveMessage(payload)
  helper.sendToClient(savedMessage)
}

exports.handleDocumentMessage = (payload) => {
  logger.serverLog(TAG, `Document Message Handled ${JSON.stringify(payload)}`)
  const savedMessage = messageUtility.saveMessage(payload)
  helper.sendToClient(savedMessage)
}

exports.handleVoiceMessage = (payload) => {
  logger.serverLog(TAG, `Voice Message Handled ${JSON.stringify(payload)}`)
  const savedMessage = messageUtility.saveMessage(payload)
  helper.sendToClient(savedMessage)
}

exports.handleLocationMessage = (payload) => {
  logger.serverLog(TAG, `Location Message Handled ${JSON.stringify(payload)}`)
  const savedMessage = messageUtility.saveMessage(payload)
  helper.sendToClient(savedMessage)
}
