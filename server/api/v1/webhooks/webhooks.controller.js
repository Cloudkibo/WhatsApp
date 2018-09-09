const init = require('./initWebhooks')
const Validator = require('jsonschema').Validator
const _cloneDeep = require('lodash/cloneDeep')
const validator = new Validator()
const logger = require('./../../../components/logger')
const TAG = '/server/api/v1/webhooks/webhooks.controller.js'

exports.index = function (req, res) {
  logger.serverLog(TAG, 'Test Endpoint For Webhook')
  return res.status(200).json({ status: 'success' })
}

exports.webhook = function (req, res) {
  try {
    init.getRegistry().map((entry) => {
      if (validator.validate(req.body, entry.schema).valid) {
        entry.callback(_cloneDeep(req.body))
      }
    })
    // @TODO : Need to fix the response mechanism
    return res.status(200).json({})
  } catch (e) {
    logger.serverLog(TAG, `Error on Webhook ${JSON.stringify(e)}`)
    return res.status(500).json({status: 'failed', err: e})
  }
}
