const logger = require('./../../../components/logger')
const Groups = require('./groups.model')
const utility = require('./../../../components/utility')
const _difference = require('lodash/difference')
const TAG = '/server/api/v1/groups/particpants.controller.js'

exports.deleteParticipants = function (req, res) {
  if (!req.body.wa_ids || !Array.isArray(req.body.wa_ids)) {
    return res.status(500).json({status: 'failed', err: 'Invalid Body Payload'})
  }

  const groupId = req.params.groupId
  const newParticipants = req.body.wa_ids
  logger.serverLog(TAG, `Delete Participants of Group ${groupId}`)

  Groups.findOne({groupId: groupId})
    .exec()
    .then(group => {
      group.participants = _difference(group.participants, newParticipants)
      group.save(function (err) {
        if (err) {
          logger.serverLog(TAG, `Internal Server Error ${JSON.stringify(err)}`)
          return res.status(500).json({ status: 'failed', err: err })
        }
        return res.status(200).json({status: 'success', payload: group.participants})
      })
    })
    .catch(err => {
      logger.serverLog(TAG, `Internal Server Error ${JSON.stringify(err)}`)
      return res.status(500).json({ status: 'failed', err: err })
    })
}
