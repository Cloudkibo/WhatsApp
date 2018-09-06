let mongoose = require('mongoose')
let crypto = require('crypto')
let Schema = mongoose.Schema

let UserSchema = new Schema({
  companyName: String,
  email: String,
  phone: String,
  hashedPassword: String,
  salt: String,
  createtime: { type: Date, default: Date.now },
  updatetime: { type: Date }
})

UserSchema
  .virtual('password')
  .set(function (password) {
    this._password = password
    this.salt = this.makeSalt()
    this.hashedPassword = this.encryptPassword(password)
  })
  .get(function () {
    return this._password
  })

// Public profile information
UserSchema
  .virtual('profile')
  .get(function () {
    return {
      'name': this.name
    }
  })

// Non-sensitive info we'll be putting in the token
UserSchema
  .virtual('token')
  .get(function () {
    return {
      '_id': this._id
    }
  })

/**
 * Validations
 */

// Validate empty email
UserSchema
  .path('email')
  .validate(function (email) {
    return email.length
  }, 'Email cannot be blank')

// Validate empty password
UserSchema
  .path('hashedPassword')
  .validate(function (hashedPassword) {
    return hashedPassword.length
  }, 'Password cannot be blank')

var validatePresenceOf = function (value) {
  return value && value.length
}

/**
 * Pre-save hook
 */
UserSchema
  .pre('save', function (next) {
    if (!this.isNew) return next()

    if (!validatePresenceOf(this.hashedPassword)) { next(new Error('Invalid password')) } else { next() }
  })

/**
 * Methods
 */
UserSchema.methods = {
  /**
   * Authenticate - check if the passwords are the same
   *
   * @param {String} plainText
   * @return {Boolean}
   * @api public
   */
  authenticate: function (plainText) {
    console.log(this.encryptPassword(plainText))
    return this.encryptPassword(plainText) === this.hashedPassword
  },

  /**
   * Make salt
   *
   * @return {String}
   * @api public
   */
  makeSalt: function () {
    return crypto.randomBytes(16).toString('base64')
  },

  /**
   * Encrypt password
   *
   * @param {String} password
   * @return {String}
   * @api public
   */
  encryptPassword: function (password) {
    if (!password || !this.salt) return ''
    var salt = Buffer.from(this.salt, 'base64')
    return crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('base64')
  }
}

let users = null
try {
  users = mongoose.model('users')
} catch (error) {
  users = mongoose.model('users', UserSchema)
}

module.exports = users
