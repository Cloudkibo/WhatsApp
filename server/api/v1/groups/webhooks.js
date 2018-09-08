const logger = require('./../../../components/logger')
const TAG = '/server/api/v1/groups/webhooks.js'

exports.handleGroupNotifications = (payload) => {
  logger.serverLog(TAG, `Group Notification Handled`)
}
