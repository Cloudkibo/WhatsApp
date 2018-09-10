import * as ActionTypes from '../constants/constants'

export function newTextMessage (data) {
  return {
    type: ActionTypes.NEW_TEXT_MESSAGE_RECEIVED,
    payload: data
  }
}
