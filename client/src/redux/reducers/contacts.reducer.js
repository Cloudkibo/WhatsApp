import * as ActionTypes from '../constants/constants'

let initialState = {
}

export function contactReducer (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.FETCH_PARTICIPANTS_LIST:
      return Object.assign({}, state, {
        participants: action.data
      })
    case ActionTypes.FETCH_ADMINS_LIST:
      return Object.assign({}, state, {
        admins: action.data
      })

    default:
      return state
  }
}
