import * as groupDispatcher from '../dispatchers/groups.dispatchers'
import callApi from '../../utility/api.caller.service'
export const API_URL = '/api'



export function loadGroupsList () {
  console.log('Loading Group List')
  return (dispatch) => {
    callApi('v1/groups').then(res => dispatch(groupDispatcher.showGroups(res.payload)))
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
