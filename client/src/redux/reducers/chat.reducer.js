import * as ActionTypes from '../constants/constants'
import * as ChatMutator from '../mutators/chat.mutator'

let initialState = {
  chats: []
}
export function chatReducer (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.TEST:
      return Object.assign({}, state, {
        serverMessage: action.message
      })
    case ActionTypes.NEW_TEXT_MESSAGE:
      return Object.assign({}, state, {
        chats: ChatMutator.addTextMessage(state, action.payload)
      })
    case ActionTypes.NEW_LOCATION_MESSAGE_RECEIVED:
      return Object.assign({}, state, {
        chats: ChatMutator.addLocationMessage(state, action.payload)
      })
    case ActionTypes.NEW_IMAGE_MESSAGE_RECEIVED:
      return Object.assign({}, state, {
        chats: ChatMutator.addImageMessage(state, action.payload)
      })
    case ActionTypes.NEW_VIDEO_MESSAGE_RECEIVED:
      return Object.assign({}, state, {
        chats: ChatMutator.addVideoMessage(state, action.payload)
      })
    case ActionTypes.NEW_AUDIO_MESSAGE_RECEIVED:
      return Object.assign({}, state, {
        chats: ChatMutator.addVideoMessage(state, action.payload)
      })
    case ActionTypes.NEW_VOICE_MESSAGE_RECEIVED:
      return Object.assign({}, state, {
        chats: ChatMutator.addVideoMessage(state, action.payload)
      })
    case ActionTypes.NEW_DOCUMENT_MESSAGE_RECEIVED:
      return Object.assign({}, state, {
        chats: ChatMutator.addVideoMessage(state, action.payload)
      })

    default:
      return state
  }
}
