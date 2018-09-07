const groupWebhook = require('./../groups/webhooks')
const init = require('./initWebhooks')
const validationSchema = require('./schema')

function initRegistry () {
  init.registerCallback(validationSchema.testSchema, (payload) => { console.log('Sample Webhook Called') })
  init.registerCallback(validationSchema.textMessageSchema, (payload) => { console.log('Text Message Received') })
  init.registerCallback(validationSchema.groupNotificationsSchema, groupWebhook.handleGroupNotifications)
}

exports.registeryInit = () => {
  initRegistry()
  init.freezeRegistry()
}
