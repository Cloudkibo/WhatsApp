
import * as chatDispatcher from '../dispatchers/chat.dispatchers'
import callApi from '../../utility/api.caller.service'
export const API_URL = '/api'

export function sendMessage (data) {
  return (dispatch) => {
    callApi(`v1/chat/sendMessage`, 'post', data)
      .then(res => {
        console.log('response from update contact', res)
        if (res.status === 'success') {
        } else {
        }
      })
  }
}
