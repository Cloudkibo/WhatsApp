import * as ActionTypes from '../constants/constants'
import callApi from '../../utility/api.caller.service'
import * as signupDispatcher from '../dispatchers/signup.dispatchers'
export const API_URL = '/api'

export function signUp (data, alert) {
  return (dispatch) => {
    callApi('users/signup', 'post', data)
      .then(res => {
        console.log('response from server', res)
        if (res.status === 'success') {
          //  auth.putCookie(res.token)
          //  auth.putUserId(res.userid)
          dispatch(signupDispatcher.Success())
        } else {
          alert.show(res.description, {type: 'failed'})
          dispatch(signupDispatcher.Failure(res.description))
        }
      })
  }
}
