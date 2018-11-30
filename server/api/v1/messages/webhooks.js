const logger = require('./../../../components/logger')
const TAG = '/server/api/v1/messages/webhooks.js'
const messageUtility = require('./messageUtility')
const helper = require('./../../../config/socketio')

exports.handleTextMessage = (payload) => {
  logger.serverLog(TAG, `Text Message Handled ${JSON.stringify(payload)}`)
  const savedMessage = messageUtility.saveMessage(payload)
  helper.sendToClient(savedMessage)
}

exports.handleMessageStatus = (payload) => {
  logger.serverLog(TAG, `Message Status Handled ${JSON.stringify(payload)}`)
  const updatedMessage = messageUtility.updateMessageStatus(payload)
  helper.sendToClient({type: 'message_status', payload: updatedMessage})
}

exports.handleImageMessage = (payload) => {
  logger.serverLog(TAG, `Image Message Handled ${JSON.stringify(payload)}`)
  let message = payload.messages[0] ? payload.messages[0] : null
  messageUtility.getMediaFromDocker(message.image.id, message.type)
  const savedMessage = messageUtility.saveMessage(payload)
  helper.sendToClient(savedMessage)
}

exports.handleAudioMessage = (payload) => {
  logger.serverLog(TAG, `Audio Message Handled ${JSON.stringify(payload)}`)
  let message = payload.messages[0] ? payload.messages[0] : null
  messageUtility.getMediaFromDocker(message.audio.id, message.type)
  const savedMessage = messageUtility.saveMessage(payload)
  helper.sendToClient(savedMessage)
}

exports.handleVideoMessage = (payload) => {
  logger.serverLog(TAG, `Video Message Handled ${JSON.stringify(payload)}`)
  let message = payload.messages[0] ? payload.messages[0] : null
  messageUtility.getMediaFromDocker(message.video.id, message.type)
  const savedMessage = messageUtility.saveMessage(payload)
  helper.sendToClient(savedMessage)
}

exports.handleDocumentMessage = (payload) => {
  logger.serverLog(TAG, `Document Message Handled ${JSON.stringify(payload)}`)
  let message = payload.messages[0] ? payload.messages[0] : null
  messageUtility.getMediaFromDocker(message.document.id, message.type)
  const savedMessage = messageUtility.saveMessage(payload)
  helper.sendToClient(savedMessage)
}

exports.handleVoiceMessage = (payload) => {
  logger.serverLog(TAG, `Voice Message Handled ${JSON.stringify(payload)}`)
  let message = payload.messages[0] ? payload.messages[0] : null
  messageUtility.getMediaFromDocker(message.voice.id, message.type)
  const savedMessage = messageUtility.saveMessage(payload)
  helper.sendToClient(savedMessage)
}

exports.handleLocationMessage = (payload) => {
  logger.serverLog(TAG, `Location Message Handled ${JSON.stringify(payload)}`)
  const savedMessage = messageUtility.saveMessage(payload)
  helper.sendToClient(savedMessage)
}
