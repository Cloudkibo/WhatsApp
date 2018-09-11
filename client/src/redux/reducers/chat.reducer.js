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
    case ActionTypes.NEW_TEXT_MESSAGE_RECEIVED:
      return Object.assign({}, state, {
        chats: ChatMutator.addTextMessage(state, action.payload)
      })

    default:
      return state
  }
}
