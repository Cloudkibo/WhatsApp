const logger = require('./../../../components/logger')
const Groups = require('./groups.model')
const Contacts = require('./../contacts/contacts.model')
const utility = require('./../../../components/utility')
const _difference = require('lodash/difference')
const _includes = require('lodash/includes')
const _union = require('lodash/union')
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

exports.fetchMany = function (req, res) {
  logger.serverLog(TAG, 'Hit the participant fetch many endpoint')
  Contacts.find({wa_id: {$in: req.body.ids}})
    .exec()
    .then(contacts => {
      let found = _includes(req.body.ids, req.user.wa_id)
      logger.serverLog(TAG, `User ${JSON.stringify(req.user)} Found ${found} ${JSON.stringify(req.body.ids)}`)
      logger.serverLog(TAG, `Before Contacts ${JSON.stringify(contacts)}`)
      if (found) {
        let obj = {
          createtime: '2018-09-11T13:01:13.327Z',
          isSubscribed: false,
          name: req.user.companyName,
          phone: req.user.phone,
          status: 'valid',
          wa_id: req.user.wa_id
        }
        contacts.push(obj)
      }
      logger.serverLog(TAG, `After Contacts ${JSON.stringify(contacts)}`)
      return res.status(200).json({ status: 'success', payload: contacts })
    })
    .catch(err => {
      return res.status(500).json({ status: 'failed', payload: err })
    })
}
