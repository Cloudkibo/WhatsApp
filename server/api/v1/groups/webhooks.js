const _includes = require('lodash/includes')
const logger = require('./../../../components/logger')
const TAG = '/server/api/v1/groups/webhooks.js'
const Groups = require('./groups.model')
const Contact = require('./../contacts/contacts.model')
const helper = require('./../../../config/socketio')
const utility = require('./../../../components/utility')
const util = require('util')
const _union = require('lodash/union')

exports.handleGroupNotifications = (payload) => {
  logger.serverLog(TAG, `Group Notification Handled ${JSON.stringify(payload)}`)
  participantJoined(payload)
}

const participantJoined = (payload) => {
  // Test if participant joined payload
  const message = payload.messages.length === 1 && payload.messages[0]
  if (!_includes(message.system.body, 'added')) { return }
  const phone = message.from
  const groupId = message.group_id
  // @TODO: Fetch wa_id
  getWhatsappIdFromDocker(phone, groupId)
  // Add in group participant
  // Add in contacts

  // Send Notification to Client
  helper.sendToClient(payload)
}

const getWhatsappIdFromDocker = (phone, groupId) => {
  utility.postToWhatsapp('/v1/contacts', {contacts: [phone]}, (err, result) => {
    if (err) {
      return logger.serverLog(TAG, `failed at getting status from docker ${err}`)
    }
    logger.serverLog(TAG, `Got The WhatsappId ${util.inspect(result.data)}`)
    let data = result.data.contacts
      .filter(item => item.status === 'valid')
      .map(item => item.wa_id)
    if (data.length === 0) { return logger.serverLog(TAG, `Phone Number Not Valid`) }
    addToGroupParticipants(groupId, data)
    createContact(data[0], phone)
  })
}

const addToGroupParticipants = (groupId, waIds) => {
  Groups.findOne({groupId: groupId})
    .exec()
    .then(group => {
      console.log('Groups', util.inspect(group))
      console.log('waIds', waIds)
      group.participants = _union(group.participants, waIds)
      console.log('participants', group.participants)
      group.save(function (err) {
        if (err) {
          return logger.serverLog(TAG, `Internal Server Error ${JSON.stringify(err)}`)
        }
        logger.serverLog(TAG, `Added a new participant to the group`)
      })
    })
    .catch(err => {
      logger.serverLog(TAG, `Internal Server Error ${JSON.stringify(err)}`)
    })
}

const createContact = (waId, phone) => {
  const contact = {
    phone: phone,
    status: 'valid',
    wa_id: waId
  }
  Contact.findOneAndUpdate({phone: phone, wa_id: waId}, contact, {upsert: true})
    .exec()
    .then((result) => {
      logger.serverLog(TAG, `Added Contact Successfully`)
    })
    .catch(err => {
      logger.serverLog(TAG, `Internal Server Error ${JSON.stringify(err)}`)
    })
}
