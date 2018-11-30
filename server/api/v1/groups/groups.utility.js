const Contact = require('./../contacts/contacts.model')
const Participant = require('./participants.model')
const logger = require('./../../../components/logger')
const TAG = '/server/api/v1/groups/groups.utility.js'

exports.createParticipant = (waId, phone, groupId, name = 'Anonymous', admin = false) => {
  const participant = {
    name,
    phone,
    wa_id: waId,
    groupId,
    admin
  }
  Participant.updateMany({groupId: participant.groupId,
    wa_id: participant.wa_id,
    phone: participant.phone}, participant, { upsert: true })
    .exec()
    .then((result) => {
      logger.serverLog(TAG, `Added Participant Successfully`)
    })
    .catch(err => {
      logger.serverLog(TAG, `Internal Server Error ${JSON.stringify(err)}`)
    })
}

exports.createContact = (waId, phone) => {
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
