let mongoose = require('mongoose')
let Schema = mongoose.Schema

let groupSchema = new Schema({
  title: String,
  groupId: String,
  admins: [String],
  creator: String,
  participants: [String],
  inviteLink: String,
  invite: { type: Boolean, default: false },
  createtime: { type: Date, default: Date.now }
})

module.exports = mongoose.model('groups', groupSchema)
