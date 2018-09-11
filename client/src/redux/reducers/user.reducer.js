import * as ActionTypes from '../constants/constants'

let initialState = {
}

export function userReducer (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.FETCH_USER_DETAILS:
      return Object.assign({}, state, {
        user: action.data
      })

    default:
      return state
  }
}
