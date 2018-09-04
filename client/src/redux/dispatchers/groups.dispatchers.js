import * as ActionTypes from '../constants/constants'

export function showGroups (data) {
  return {
    type: ActionTypes.FETCH_GROUPS_LIST,
    data
  }
}
export function showGroupsInfo (data) {
  return {
    type: ActionTypes.FETCH_GROUPS_INFO,
    data
  }
}
export function createdGroup (data) {
  return {
    type: ActionTypes.FETCH_CREATED_GROUP,
    data
  }
}
