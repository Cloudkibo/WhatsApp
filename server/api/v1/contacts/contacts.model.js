let mongoose = require('mongoose')
let Schema = mongoose.Schema

let contactSchema = new Schema({
  name: String,
  phone: String,
  isActive: String,
  status: String,
  wa_id: String,
  customID: String,
  customURL: String,
  isSubscribed: { type: Boolean, default: false },
  createtime: { type: Date, default: Date.now },
  updatetime: { type: Date }
})

module.exports = mongoose.model('contacts', contactSchema)
