import * as ActionTypes from '../constants/constants'

export function setMessageCount (data) {
  return {
    type: ActionTypes.GET_MESSAGES_COUNT,
    payload: data
  }
}

export function setReceivedMessage (data) {
  return {
    type: ActionTypes.GET_RECEIVED_MESSAGES,
    payload: data
  }
}

export function setUnreadMessage (data) {
  return {
    type: ActionTypes.GET_UNREAD_MESSAGES,
    payload: data
  }
}

export function setJoinedGroups (data) {
  return {
    type: ActionTypes.GET_JOINED_GROUPS,
    payload: data
  }
}

export function setLeftGroups (data) {
  return {
    type: ActionTypes.GET_LEFT_GROUPS,
    payload: data
  }
}
