import * as ActionTypes from '../constants/constants'

export function contactsReducer (state = {}, action) {
  switch (action.type) {
    case ActionTypes.FETCH_CONTACTS_LIST:
      return Object.assign({}, state, {
        contactsList: action.data
      })

    default:
      return state
  }
}
