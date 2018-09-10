import * as ActionTypes from './../constants/constants'
import callApi from './../../utility/api.caller.service'
import * as mediaDispatcher from '../dispatchers/media.dispatchers'
export const API_URL = '/api'

export function uploadMedia (data, handleUpload) {
  console.log('data for uploadMedia', data)
  return (dispatch) => {
    // we need to make separate request because we want the browser to make the headers for multiparty request ()
    // eslint-disable-next-line no-undef
    fetch(`${API_URL}/v1/media`, {
      method: 'post',
      body: data
      // eslint-disable-next-line no-undef
    }).then((res) => res.json()).then((res) => res).then(res => {
      console.log('response from uploadMedia', res)
      handleUpload(res)
    })
  }
}
