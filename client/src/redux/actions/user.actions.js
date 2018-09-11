import * as userDispatcher from '../dispatchers/user.dispatchers'
import callApi from '../../utility/api.caller.service'
export const API_URL = '/api'

export function loadUserDetails () {
  return (dispatch) => {
    callApi('v1/users')
      .then(res => {
        console.log('response from loadUserDetails', res)
        dispatch(userDispatcher.showUserDetails(res.payload))
      })
  }
}
