import * as chatDispatcher from '../dispatchers/chat.dispatchers'
import callApi from '../../utility/api.caller.service'
export const API_URL = '/api'

export function sendMessage (data) {
  return (dispatch) => {
    callApi(`v1/chat/sendMessage`, 'post', data)
      .then(res => {
        console.log('response from update contact', res)
        if (res.status === 'success') {
        } else {
        }
      })
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
