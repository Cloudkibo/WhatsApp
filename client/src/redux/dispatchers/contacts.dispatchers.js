import * as ActionTypes from '../constants/constants'

export function showParticipants (data) {
  return {
    type: ActionTypes.FETCH_PARTICIPANTS_LIST,
    data
  }
}
export function showAdmins (data) {
  return {
    type: ActionTypes.FETCH_ADMINS_LIST,
    data
  }
}
