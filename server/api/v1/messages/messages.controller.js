const logger = require('./../../../components/logger')
const Messages = require('./messages.model')
const utility = require('./../../../components/utility')
const TAG = '/server/api/v1/groups/messages.controller.js'

exports.create = function (req, res) {
  logger.serverLog(TAG, 'Hit the create message')
  let message = {
    recipientType: req.body.recipient_type ? req.body.recipient_type : null,
    to: req.body.to,
    type: req.body.type ? req.body.type : null,
    previewUrl: req.body.previewUrl ? req.body.previewUrl : false
  }

  message[req.body.type] = req.body.messagePayload
  utility.postToWhatsapp(`/v1/messages`, message, (err, result) => {
    if (err) {
      console.log('error from whatsapp')
      return res.status(500).json({ status: 'failed', payload: '' + err })
    }
    Messages.create({
      recipientType: req.body.recipientType,
      to: req.body.to,
      previewUrl: req.body.previewUrl,
      from: req.user.wa_id,
      messageId: result.data.messages[0].id,
      timestamp: Date.now(),
      type: req.body.type,
      status: 'pending',
      messagePayload: req.body.messagePayload
    })
      .then(result => {
        let resp = []
        resp.push({id: result._id})
        return res.status(200).json({ messages: resp })
      })
      .catch(err => {
        logger.serverLog(TAG, `Inernal Server Error ${JSON.stringify(err)}`)
        return res.status(500).json({ status: 'failed', payload: err })
      })
  })
}
