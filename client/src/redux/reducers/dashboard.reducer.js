import * as ActionTypes from '../constants/constants'

let initialState = {
  messageCount: false,
  recievedMessages: false,
  unreadMessages: false,
  joinedGroups: false,
  leftGroups: false
}
export function dashboardReducer (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.GET_MESSAGES_COUNT:
      return Object.assign({}, state, {
        messageCount: action.payload
      })
    case ActionTypes.GET_RECEIVED_MESSAGES:
      return Object.assign({}, state, {
        recievedMessages: action.payload
      })
    case ActionTypes.GET_UNREAD_MESSAGES:
      return Object.assign({}, state, {
        unreadMessages: action.payload
      })
    case ActionTypes.GET_JOINED_GROUPS:
      return Object.assign({}, state, {
        joinedGroups: action.payload
      })
    case ActionTypes.GET_LEFT_GROUPS:
      return Object.assign({}, state, {
        leftGroups: action.payload
      })

    default:
      return state
  }
}
