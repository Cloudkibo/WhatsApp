let mongoose = require('mongoose')
let Schema = mongoose.Schema

let mediaSchema = new Schema({
  mediaId: String,
  url: String,
  mediaType: String,
  uploadedBy: String
})

module.exports = mongoose.model('media', mediaSchema)
