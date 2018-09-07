let mongoose = require('mongoose')
let Schema = mongoose.Schema

let mediaSchema = new Schema({
  mediaId: String,
  url: String,
  mediaType: String
})

module.exports = mongoose.model('media', mediaSchema)
