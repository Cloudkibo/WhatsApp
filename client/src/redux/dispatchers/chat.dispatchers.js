import * as ActionTypes from '../constants/constants'

export function newTextMessage (data) {
  return {
    type: ActionTypes.NEW_TEXT_MESSAGE,
    payload: data
  }
}

export function newLocationMessage (data) {
  return {
    type: ActionTypes.NEW_LOCATION_MESSAGE,
    payload: data
  }
}

export function newImageMessage (data) {
  return {
    type: ActionTypes.NEW_IMAGE_MESSAGE,
    payload: data
  }
}

export function newVideoMessage (data) {
  return {
    type: ActionTypes.NEW_VIDEO_MESSAGE,
    payload: data
  }
}

export function newAudioMessage (data) {
  return {
    type: ActionTypes.NEW_AUDIO_MESSAGE,
    payload: data
  }
}

export function newVoiceMessage (data) {
  return {
    type: ActionTypes.NEW_VOICE_MESSAGE,
    payload: data
  }
}

export function newDocumentMessage (data) {
  return {
    type: ActionTypes.NEW_DOCUMENT_MESSAGE,
    payload: data
  }
}

export function manageSessions (data) {
  return {
    type: ActionTypes.FETCH_SESSIONS,
    payload: data
  }
}

export function updateMessageStatus (data) {
  return {
    type: ActionTypes.UPDATE_MESSAGE_STATUS,
    payload: data
  }
}
