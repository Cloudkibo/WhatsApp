const _ = require('lodash')
export const addTextMessage = (currentState, payload) => {
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

export const addLocationMessage = (currentState, payload) => {
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

export const addImageMessage = (currentState, payload) => {
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

export const addVideoMessage = (currentState, payload) => {
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
