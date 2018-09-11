import * as ActionTypes from '../constants/constants'

let initialState = {
  groups: [],
  participants: [],
  admins: [],
  groupsInfo: false,
  inviteLink: ''
}

export function groupReducer (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.FETCH_GROUPS_LIST:
      return Object.assign({}, state, {
        groups: action.data,

      })
    case ActionTypes.FETCH_GROUPS_INFO:
      return Object.assign({}, state, {
        groupsInfo: action.data
      })
    case ActionTypes.FETCH_CREATED_GROUP:
      return Object.assign({}, state, {
        groups: [...state.groups, action.data]
      })
    case ActionTypes.FETCH_PARTICIPANTS_LIST:
      console.log('Get Particpant Details From Ids', action.data)
      return Object.assign({}, state, {
        participants: action.data
      })
    case ActionTypes.FETCH_ADMINS_LIST:
      return Object.assign({}, state, {
        admins: action.data
      })
    case ActionTypes.GROUP_INVITE_LINK:
      return Object.assign({}, state, {
        inviteLink: action.data
      })

    default:
      return state
  }
}
