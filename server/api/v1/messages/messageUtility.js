const Message = require('./messages.model')
const logger = require('./../../../components/logger')
const TAG = '/server/api/v1/messages/messageUtility.js'

exports.saveMessage = (payload) => {
  const data = payload.messages.pop()
  const message = new Message({
    from: data.from,
    messageId: data.id,
    timestamp: data.timestamp,
    type: data.type,
    messagePayload: data[data.type] // Extract the message body using message type
  })
  message.save()
    .then((result) => {
      logger.serverLog(TAG, `New Message Saved ${result}`)
    })
    .catch((err) => {
      logger.serverLog(TAG, `Failed to save new message ${err}`)
    })
  return message
}
