import * as ActionTypes from '../constants/constants'
import callApi from '../../utility/api.caller.service'
export const API_URL = '/api'

export function showGroups (data) {
  return {
    type: ActionTypes.FETCH_GROUPS_LIST,
    data
  }
}

export function loadGroupsList () {
  return (dispatch) => {
    callApi('v1/groups').then(res => dispatch(showGroups(res.payload)))
  }
}

export function createGroup (data) {
  console.log('data for createGroup', data)
  return (dispatch) => {
    callApi('v1/groups/CreateGroup', 'post', data)
      .then(res => {
        console.log('response from CreateGroup', res)
        if (res.status === 'success') {
          dispatch(loadGroupsList())
        } else {
        }
      })
  }
}
