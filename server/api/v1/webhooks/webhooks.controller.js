const init = require('./initWebhooks')
const Validator = require('jsonschema').Validator
const validator = new Validator()
const logger = require('./../../../components/logger')
const TAG = '/server/api/v1/groups/groups.controller.js'

exports.index = function (req, res) {
  logger.serverLog(TAG, 'Test Endpoint For Webhook')
  return res.status(200).json({ status: 'success' })
}

exports.webhook = function (req, res) {
  try {
    logger.serverLog(TAG, `Payload Received on Webhook ${JSON.stringify(req.body)}`)
    init.getRegistry().map((entry) => {
      if (validator.validate(req.body, entry.schema).valid) {
        entry.callback(JSON.parse(JSON.stringify(req.body)))
      }
    })
    return res.status(200).json({})
  } catch (e) {
    logger.serverLog(TAG, `Payload Received on Webhook ${JSON.stringify(e)}`)
    return res.status(500).json({status: 'failed', err: e})
  }
}
