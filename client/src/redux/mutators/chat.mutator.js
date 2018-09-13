const _ = require('lodash')

const addNewMessage = (currentState, payload) => {
  console.log('Payload', payload)
  const sessionId = (payload.from) ? payload.from : payload.to
  let newChats = JSON.parse(JSON.stringify(currentState.chats))
  let session = _.find(newChats, {sessionIdentifier: sessionId})
  if (session) {
    session.messages.push(payload)
  } else {
    session = {
      sessionIdentifier: sessionId,
      messages: [payload]
    }
    newChats.push(session)
  }
  return newChats
}

export const addTextMessage = (currentState, payload) => {
  return addNewMessage(currentState, payload)
}

export const addLocationMessage = (currentState, payload) => {
  return addNewMessage(currentState, payload)
}

export const addImageMessage = (currentState, payload) => {
  return addNewMessage(currentState, payload)
}

export const addVideoMessage = (currentState, payload) => {
  return addNewMessage(currentState, payload)
}
