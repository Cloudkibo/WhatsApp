const logger = require('./../../../components/logger')
const Groups = require('./groups.model')
const Participants = require('./participants.model')
const _ = require('lodash')
const TAG = '/server/api/v1/groups/admin.controller.js'
const utility = require('./../../../components/utility')

exports.addAdmin = function (req, res) {
  if (!req.body.wa_ids || !Array.isArray(req.body.wa_ids)) {
    return res.status(500).json({status: 'failed', err: 'Invalid Body Payload'})
  }

  const groupId = req.params.groupId
  const newAdmins = req.body.wa_ids
  logger.serverLog(TAG, `Add Admins to Group ${groupId}`)

  utility.patchToWhatsapp(`/v1/groups/${groupId}/admins`, {wa_ids: newAdmins}, (err, result) => {
    if (err) {
      logger.serverLog(TAG, `Internal Server Error ${err}`)
      return res.status(500).json({ status: 'failed', err: err })
    }
    Participants.updateMany({ groupId: groupId, wa_id: {$in: newAdmins} }, {admin: true})
      .exec()
      .then(result => (res.status(200).json({status: 'success'})))
      .catch(err => (res.status(500).json({ status: 'failed', err: err })))
  })
}

exports.deleteAdmin = function (req, res) {
  if (!req.body.wa_ids || !Array.isArray(req.body.wa_ids)) {
    return res.status(500).json({status: 'failed', err: 'Invalid Body Payload'})
  }

  const groupId = req.params.groupId
  const newAdmins = req.body.wa_ids
  logger.serverLog(TAG, `Delete Admins of Group ${groupId}`)

  utility.deleteFromWhatsappWithData(`/v1/groups/${groupId}/admins`, {wa_ids: newAdmins}, (err, result) => {
    if (err) {
      logger.serverLog(TAG, 'Internal Server Error' + err)
      return res.status(500).json({ status: 'failed', err: err })
    }
    Participants.updateMany({ groupId: groupId, wa_id: {$in: newAdmins} }, {admin: false})
      .exec()
      .then(result => (res.status(200).json({status: 'success'})))
      .catch(err => (res.status(500).json({ status: 'failed', err: err })))
  })
}
