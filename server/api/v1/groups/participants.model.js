let mongoose = require('mongoose')
let Schema = mongoose.Schema

let participantSchema = new Schema({
  name: { type: String, default: 'Anonymous' },
  phone: String,
  wa_id: String,
  groupId: { type: Schema.Types.ObjectId, ref: 'groups' },
  admin: { type: Boolean, default: false },
  isSubscribed: { type: Boolean, default: false },
  createtime: { type: Date, default: Date.now },
  updatetime: { type: Date }
})

module.exports = mongoose.model('participants', participantSchema)
