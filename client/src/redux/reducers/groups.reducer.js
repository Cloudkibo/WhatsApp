import * as ActionTypes from '../constants/constants'

let initialState = {
  groups: []
}

export function groupReducer (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.FETCH_GROUPS_LIST:
      return Object.assign({}, state, {
        groups: action.data
      })

    default:
      return state
  }
}
