import * as chatDispatcher from '../dispatchers/chat.dispatchers'
import callApi from '../../utility/api.caller.service'
export const API_URL = '/api'

export function sendMessage (data) {
  return (dispatch) => {
    callApi(`v1/messages`, 'post', data)
      .then(res => {
        console.log('response from send message', res)
        if (res.messages) {
          const messageId = res.messages.pop()
          data.messageId = messageId.id
          data.timestamp = new Date()
          dispatch(chatDispatcher.newTextMessage(data))
        }
      })
      .catch(err => console.log('Failed to send the message', err))
  }
}

export function sendImageMessage (data) {
  return (dispatch) => {
    callApi(`v1/messages`, 'post', data)
      .then(res => {
        console.log('response from send message', res)
        if (res.messages) {
          const messageId = res.messages.pop()
          data.messageId = messageId.id
          data.timestamp = new Date()
          dispatch(chatDispatcher.newImageMessage(data))
        }
      })
      .catch(err => console.log('Failed to send the message', err))
  }
}

export function fetchChats () {
  return (dispatch) => {
    callApi(`v1/messages`)
      .then(res => {
        console.log('response from fetch chats', res)
        if (res.status === 'success' && res.payload) {
          dispatch(chatDispatcher.manageSessions(res.payload))
        }
      })
      .catch(err => console.log('Failed to fetch the chats', err))
  }
}

export function addNewTextMessage (dispatcher, data) {
  dispatcher(chatDispatcher.newTextMessage(data))
}

export function addNewLocationMessage (dispatcher, data) {
  dispatcher(chatDispatcher.newLocationMessage(data))
}

export function addNewImageMessage (dispatcher, data) {
  dispatcher(chatDispatcher.newImageMessage(data))
}

export function addNewVideoMessage (dispatcher, data) {
  dispatcher(chatDispatcher.newVideoMessage(data))
}

export function addNewVoiceMessage (dispatcher, data) {
  dispatcher(chatDispatcher.newVoiceMessage(data))
}

export function addNewAudioMessage (dispatcher, data) {
  dispatcher(chatDispatcher.newAudioMessage(data))
}

export function addNewDocumentMessage (dispatcher, data) {
  dispatcher(chatDispatcher.newDocumentMessage(data))
}

export function updateMessageStatus (dispatcher, data) {
  dispatcher(chatDispatcher.updateMessageStatus(data))
}
