let mongoose = require('mongoose')
let Schema = mongoose.Schema

let messageSchema = new Schema({
  recipientType: String,
  to: String,
  type: String,
  messageBody: Schema.Types.Mixed,
  previewUrl: { type: Boolean, default: false }
})

module.exports = mongoose.model('messages', messageSchema)
