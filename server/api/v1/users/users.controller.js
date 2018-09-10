
const Users = require('./users.model')
const _ = require('lodash')

const auth = require('../../../auth/auth.service')
const logger = require('./../../../components/logger')
const TAG = '/server/api/v1/users/users.controller.js'

const utility = require('./../../../components/utility')

exports.index = function (req, res) {
  Users.findOne({_id: req.user._id}, (err, user) => {
    if (err) {
      return res.status(500).json({
        status: 'failed',
        description: 'internal server error' + err
      })
    }
    if (!user) {
      return res.status(404)
        .json({status: 'failed', description: 'User not found'})
    }
    logger.serverLog(TAG, 'user object sent to client')
    res.status(200).json({status: 'success', payload: user})
  })
}

exports.create = function (req, res, next) {
  logger.serverLog(TAG, 'Creating new user')
  let parametersMissing = false

  if (!_.has(req.body, 'companyName')) parametersMissing = true
  if (!_.has(req.body, 'email')) parametersMissing = true
  if (!_.has(req.body, 'password')) parametersMissing = true
  if (!_.has(req.body, 'phone')) parametersMissing = true

  if (parametersMissing) {
    return res.status(400)
      .json({status: 'failed', description: 'Parameters are missing'})
  }

  let contactCreationRequest = {
    phone: req.body.phone
  }

  let contactValidationRequest = {
    contacts: []
  }
  contactValidationRequest.contacts.push(req.body.phone)

  utility.postToWhatsapp('v1/contacts/create', contactCreationRequest, (creationErr, creationResult) => {
    if (creationErr) {
      logger.serverLog(TAG, `Unable to create contact: ${creationErr}`)
      return res.status(500).json({ status: 'failed', description: '' + creationErr })
    }
    utility.postToWhatsapp('/v1/contacts', contactValidationRequest, (validationErr, validationResult) => {
      if (validationErr) {
        logger.serverLog(TAG, `Invalid WhatsApp Number: ${validationErr}`)
        return res.status(500).json({ status: 'failed', description: '' + validationErr })
      }
      Users.findOne({email: req.body.email}, (err, user) => {
        if (err) {
          return res.status(500).json({
            status: 'failed',
            description: 'internal server error' + err
          })
        }
        if (user) {
          return res.status(422).json({
            status: 'failed',
            description: 'User already exists'
          })
        }
        let accountData = new Users({
          wa_id: validationResult.contacts[0].wa_id,
          companyName: req.body.companyName,
          email: req.body.email,
          phone: req.body.phone,
          password: req.body.password
        })

        accountData.save(function (err, user) {
          if (err) {
            return res.status(500).json({
              status: 'failed',
              description: 'internal server error' + err
            })
          }
          req.user = user
          auth.setTokenCookie(req, res)
          return res.status(200).json({
            status: 'success',
            payload: accountData
          })
        })
      })
    })
  })
}
