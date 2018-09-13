import * as ActionTypes from '../constants/constants'
import * as GroupMutator from './../mutators/group.mutator'

let initialState = {
  groups: [],
  participants: [], // Particpants of currently active group
  groupsInfo: false,
  inviteLink: ''
}

export function groupReducer (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.FETCH_GROUPS_LIST:
      return Object.assign({}, state, {
        groups: action.data

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
    case ActionTypes.GROUP_INVITE_LINK:
      return Object.assign({}, state, {
        inviteLink: action.data
      })
    case ActionTypes.UPDATE_GROUP_ADMIN:
      return Object.assign({}, state, {
        participants: GroupMutator.makeAdmin(state, action.data)
      })
    case ActionTypes.DEMOTE_GROUP_ADMIN:
      return Object.assign({}, state, {
        participants: GroupMutator.deleteAdmin(state, action.data)
      })
    case ActionTypes.DELETE_GROUP_PARTICIPANTS:
      return Object.assign({}, state, {
        participants: GroupMutator.deleteParticipant(state, action.data)
      })

    default:
      return state
  }
}
