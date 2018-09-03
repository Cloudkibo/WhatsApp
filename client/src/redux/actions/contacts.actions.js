import * as contactDispatcher from '../dispatchers/contacts.dispatchers'
import callApi from '../../utility/api.caller.service'
export const API_URL = '/api'

export function getParticiapnts (data) {
  return (dispatch) => {
    callApi('v1/contacts', 'post', data)
      .then(res => {
        console.log('response from getParticiapnts', res)
        if (res.status === 'success') {
          dispatch(contactDispatcher.showParticipants(res.payload))
        }
      })
  }
}
export function getAdmins (data) {
  return (dispatch) => {
    callApi('v1/contacts', 'post', data)
      .then(res => {
        console.log('response from getAdmins', res)
        if (res.status === 'success') {
          dispatch(contactDispatcher.showAdmins(res.payload))
        }
      })
  }
}
