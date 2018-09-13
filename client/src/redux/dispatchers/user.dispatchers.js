import * as ActionTypes from '../constants/constants'

export function showUserDetails (data) {
  return {
    type: ActionTypes.FETCH_USER_DETAILS,
    data
  }
}
