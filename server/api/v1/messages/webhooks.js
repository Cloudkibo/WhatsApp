const logger = require('./../../../components/logger')
const TAG = '/server/api/v1/messages/webhooks.js'

exports.handleTextMessage = (payload) => {
  logger.serverLog(TAG, `Text Message Handled ${JSON.stringify(payload)}`)
}
