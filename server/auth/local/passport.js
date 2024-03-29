var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy

exports.setup = function (User, config) {
  passport.use('email-local', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password' // this is the virtual field on the model
  },
  function (email, password, done) {
    User.findOne({
      email: email.toLowerCase()
    }, function (err, user) {
      if (err) return done(err)

      if (!user) {
        return done(null, false, { message: 'This email is not registered.' })
      }
      if (!user.authenticate(password)) {
        return done(null, false, { message: 'This password is not correct.' })
      }
      return done(null, user)
    })
  }
  ))

  passport.use('phone-local', new LocalStrategy({
    usernameField: 'phone',
    passwordField: 'password' // this is the virtual field on the model
  },
  function (phone, password, done) {
    User.findOne({phone}, function (err, user) {
      if (err) return done(err)

      if (!user) {
        return done(null, false, { message: 'This phone number is not registered.' })
      }
      if (!user.authenticate(password)) {
        return done(null, false, { message: 'This password is not correct.' })
      }
      return done(null, user)
    })
  }
  ))
}
