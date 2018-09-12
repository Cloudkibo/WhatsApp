import * as ActionTypes from '../constants/constants'

export function newTextMessage (data) {
  return {
    type: ActionTypes.NEW_TEXT_MESSAGE_RECEIVED,
    payload: data
  }
}

export function newLocationMessage (data) {
  return {
    type: ActionTypes.NEW_LOCATION_MESSAGE_RECEIVED,
    payload: data
  }
}

export function newImageMessage (data) {
  return {
    type: ActionTypes.NEW_IMAGE_MESSAGE_RECEIVED,
    payload: data
  }
}

export function newVideoMessage (data) {
  return {
    type: ActionTypes.NEW_VIDEO_MESSAGE_RECEIVED,
    payload: data
  }
}

export function newAudioMessage (data) {
  return {
    type: ActionTypes.NEW_AUDIO_MESSAGE_RECEIVED,
    payload: data
  }
}

export function newVoiceMessage (data) {
  return {
    type: ActionTypes.NEW_VOICE_MESSAGE_RECEIVED,
    payload: data
  }
}

export function newDocumentMessage (data) {
  return {
    type: ActionTypes.NEW_DOCUMENT_MESSAGE_RECEIVED,
    payload: data
  }
}
