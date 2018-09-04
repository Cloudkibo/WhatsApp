import * as ActionTypes from '../constants/constants'

let initialState = {
  groups: []
}

export function groupReducer (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.FETCH_GROUPS_LIST:
      return Object.assign({}, state, {
        groups: action.data,
        createdGroup: ''
      })
    case ActionTypes.FETCH_GROUPS_INFO:
      return Object.assign({}, state, {
        groupsInfo: action.data
      })
    case ActionTypes.FETCH_CREATED_GROUP:
      console.log('in here', action.data)
      return Object.assign({}, state, {
        createdGroup: action.data
      })
    default:
      return state
  }
}
