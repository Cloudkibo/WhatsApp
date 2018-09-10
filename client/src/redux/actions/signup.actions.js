import callApi from '../../utility/api.caller.service'
import auth from '../../utility/auth.service'
import * as signupDispatcher from '../dispatchers/signup.dispatchers'
export const API_URL = '/api'

export function signUp (data, alert) {
  console.log('data for signUp', data)
  return (dispatch) => {
    callApi('v1/users', 'post', data)
      .then(res => {
        if (auth.getToken() !== '') {
          dispatch(signupDispatcher.Success())
        } else {
          alert.show(res.description, {type: 'failed'})
          dispatch(signupDispatcher.Failure(res.description))
        }
      })
  }
}
