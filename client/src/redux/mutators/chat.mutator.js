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

export const manageSessions = (currentState, messages) => {
  console.log('Payload', messages)
  let newChats = JSON.parse(JSON.stringify(currentState.chats))
  messages.map((payload) => {
    const sessionId = (payload.to) ? payload.to : payload.from
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
  })

  return newChats
}

export const updateMessageStatus = (currentState, payload) => {
  console.log('Payload', payload)
  let newChats = JSON.parse(JSON.stringify(currentState.chats))
  const sessionId = payload.recipient_id
  const messageId = payload.id
  let updatedChats = _.map(newChats, (sessionItem) => {
    if (sessionItem.sessionIdentifier === sessionId) {
      // sessionItem.messages
      let temp = _.map(sessionItem.messages, (msg) => {
        if (msg.messageId === messageId) {
          msg.status = payload.status
        }
        return msg
      })
      sessionItem.messages = temp
    }
    return sessionItem
  })

  return updatedChats
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
