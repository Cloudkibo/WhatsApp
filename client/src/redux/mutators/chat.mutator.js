const _ = require('lodash')
export const addTextMessage = (currentState, payload) => {
  let newChats = JSON.parse(JSON.stringify(currentState.chats))
  let session = _.find(newChats, {sessionIdentifier: payload.from})
  if (session) {
    session.messages.push(payload)
  } else {
    session = {
      sessionIdentifier: payload.from,
      messages: [payload]
    }
    newChats.push(session)
  }
  return newChats
}
