import fetch from 'isomorphic-fetch'
import auth from '../../utility/auth.service'
import * as loginDispatcher from '../dispatchers/login.dispatchers'
export const API_URL = '/api'

export function logIn (data, alert) {
  let headers1 = {
    'content-type': 'application/json'
  }
  return (dispatch) => {
    fetch(`/auth/local`, {
      method: 'post',
      body: JSON.stringify(data),
      // eslint-disable-next-line no-undef
      headers: headers1
    }).then(res => {
      if (auth.getToken() !== '') {
        //  auth.putCookie(res.token)
        dispatch(loginDispatcher.Success())
      } else {
        alert.show(res.description, {type: 'failed'})
        dispatch(loginDispatcher.Failure(res.description))
      }
    })
  }
}
