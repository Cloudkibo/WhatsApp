import * as ActionTypes from '../constants/constants'

export function showContacts (data) {
  return {
    type: ActionTypes.FETCH_CONTACTS_LIST,
    data
  }
}
