import * as ActionTypes from '../constants/constants'

export function showGroups (data) {
  return {
    type: ActionTypes.FETCH_GROUPS_LIST,
    data
  }
}
