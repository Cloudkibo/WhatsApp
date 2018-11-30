const logger = require('./../../../components/logger')
const Groups = require('./groups.model')
const Participants = require('./participants.model')
const utility = require('./../../../components/utility')
const _difference = require('lodash/difference')
const TAG = '/server/api/v1/groups/particpants.controller.js'

exports.deleteParticipants = function (req, res) {
  if (!req.body.wa_ids || !Array.isArray(req.body.wa_ids)) {
    return res.status(500).json({status: 'failed', err: 'Invalid Body Payload'})
  }

  const groupId = req.params.groupId
  const participantList = req.body.wa_ids
  logger.serverLog(TAG, `Delete Participants of Group ${groupId}`)

  Groups.findOne({groupId: groupId})
    .exec()
    .then(group => {
      group.participants = _difference(group.participants, participantList)
      group.save(function (err) {
        if (err) {
          logger.serverLog(TAG, `Internal Server Error ${JSON.stringify(err)}`)
          return res.status(500).json({ status: 'failed', err: err })
        }
        Participants
          .deleteMany({ groupId: groupId, wa_id: { $in: participantList } })
          .exec()
          .then(result => res.status(200).json({status: 'success', payload: group.participants}))
          .catch(err => res.status(500).json({ status: 'failed', err: err }))
      })
    })
    .catch(err => {
      logger.serverLog(TAG, `Internal Server Error ${JSON.stringify(err)}`)
      return res.status(500).json({ status: 'failed', err: err })
    })
}

exports.fetchMany = function (req, res) {
  logger.serverLog(TAG, 'Hit the participant fetch many endpoint')
  Participants.find({groupId: req.params.groupId, wa_id: {$in: req.body.ids}})
    .exec()
    .then(contacts => {
      return res.status(200).json({ status: 'success', payload: contacts })
    })
    .catch(err => {
      return res.status(500).json({ status: 'failed', payload: err })
    })
}
