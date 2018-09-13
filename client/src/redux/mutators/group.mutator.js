const _ = require('lodash')
export const makeAdmin = (currentState, payload) => {
  console.log('Payload', payload, currentState)
  const waIds = payload.waIds
  let newParticipants = JSON.parse(JSON.stringify(currentState.participants))
  newParticipants = _.map(newParticipants, (item) => {
    if (_.includes(waIds, item.wa_id)) { item.admin = true }
    return item
  })
  console.log('newParticipants', newParticipants)
  return newParticipants
}

export const deleteAdmin = (currentState, payload) => {
  console.log('Payload', payload, currentState)
  const waIds = payload.waIds
  let newParticipants = JSON.parse(JSON.stringify(currentState.participants))
  newParticipants = _.map(newParticipants, (item) => {
    if (_.includes(waIds, item.wa_id)) { item.admin = false }
    return item
  })
  console.log('newParticipants', newParticipants)
  return newParticipants
}

export const deleteParticipant = (currentState, payload) => {
  console.log('Payload', payload, currentState)
  const waIds = payload.waIds
  let newParticipants = JSON.parse(JSON.stringify(currentState.participants))
  newParticipants = _.filter(newParticipants, (item) => !_.includes(waIds, item.wa_id))
  console.log('newParticipants', newParticipants)
  return newParticipants
}
