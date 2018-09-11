let mongoose = require('mongoose')
let Schema = mongoose.Schema

let messageSchema = new Schema({
  recipientType: String,
  to: String,
  previewUrl: { type: Boolean, default: false },
  from: String,
  messageId: String,
  timestamp: String,
  type: String,
  context: Schema.Types.Mixed,
  groupId: String,
  status: {
    type: String,
    enum: ['sent', 'delivered', 'read', 'failed']
  },
  messagePayload: Schema.Types.Mixed,
  createdAt: { type: Date, default: Date.now() }
})

module.exports = mongoose.model('messages', messageSchema)
