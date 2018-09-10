const groupWebhook = require('./../groups/webhooks')
const messageWebhook = require('./../messages/webhooks')
const init = require('./initWebhooks')
const validationSchema = require('./schema')

function initRegistry () {
  init.registerCallback(validationSchema.testSchema, (payload) => { console.log('Sample Webhook Called') })
  init.registerCallback(validationSchema.imageMessageSchema, messageWebhook.handleImageMessage)
  init.registerCallback(validationSchema.locationMessageSchema, messageWebhook.handleLocationMessage)
  init.registerCallback(validationSchema.voiceMessageSchema, messageWebhook.handleVoiceMessage)
  init.registerCallback(validationSchema.documentMessageSchema, messageWebhook.handleDocumentMessage)
  init.registerCallback(validationSchema.videoMessageSchema, messageWebhook.handleVideoMessage)
  init.registerCallback(validationSchema.audioMessageSchema, messageWebhook.handleAudioMessage)
  init.registerCallback(validationSchema.textMessageSchema, messageWebhook.handleTextMessage)
  init.registerCallback(validationSchema.groupNotificationsSchema, groupWebhook.handleGroupNotifications)
}

exports.registeryInit = () => {
  initRegistry()
  init.freezeRegistry()
}
