const _includes = require('lodash/includes')
const logger = require('./../../../components/logger')
const TAG = '/server/api/v1/groups/webhooks.js'
const Groups = require('./groups.model')
const helper = require('./../../../config/socketio')
const utility = require('./../../../components/utility')
const util = require('util')
const _union = require('lodash/union')
const GroupUtility = require('./groups.utility')
const Contact = require('./../contacts/contacts.model')

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
  helper.sendToClient({type: 'system', payload: payload.messages[0]})
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
    const waId = data[0]
    addToGroupParticipants(groupId, [waId])
    Contact.findOne({phone: phone})
      .exec()
      .then(result => {
        if (result) {
          GroupUtility.createParticipant(waId, phone, groupId, result.name)
        } else {
          GroupUtility.createParticipant(waId, phone, groupId)
        }
      })
      .catch(err => logger.serverLog(TAG, `failed to add new participant ${err}`))
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
