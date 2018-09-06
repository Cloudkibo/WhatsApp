import fetch from 'isomorphic-fetch'
import * as loginDispatcher from '../dispatchers/login.dispatchers'
export const API_URL = '/api'

export function logIn (data, alert) {
  console.log('data in login', data)
  let headers1 = {
    'content-type': 'application/json'
  }
  return (dispatch) => {
    fetch(`/auth/local`, {
      method: 'post',
      body: JSON.stringify(data),
      // eslint-disable-next-line no-undef
      headers: headers1
    }).then((res) => res.json()).then((res) => res).then((res) => {
      console.log('res in login', res)
      if (res.token) {
        //  auth.putCookie(res.token)
        dispatch(loginDispatcher.Success())
      } else {
        alert.show(res.description, {type: 'failed'})
        dispatch(loginDispatcher.Failure(res.description))
      }
    })
  }
}
