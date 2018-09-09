const init = require('./initWebhooks')
const validationSchema = require('./schema')

function initRegistry () {
  init.registerCallback(validationSchema.testSchema, (payload) => { console.log('Sample Webhook Called', payload) })
}

exports.registeryInit = () => {
  initRegistry()
  init.freezeRegistry()
}
