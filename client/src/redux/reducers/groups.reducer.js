import * as ActionTypes from '../constants/constants'

let initialState = {
  groups: [],
  participants: [],
  admins: [],
  groupsInfo: false
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
      return Object.assign({}, state, {
        createdGroup: action.data
      })
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
