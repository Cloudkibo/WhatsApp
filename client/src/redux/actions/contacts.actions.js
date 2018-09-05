
import * as contactDispatcher from '../dispatchers/contacts.dispatchers'
import callApi from '../../utility/api.caller.service'
export const API_URL = '/api'

export function loadContactsList () {
  return (dispatch) => {
    callApi('v1/contacts')
      .then(res => dispatch(contactDispatcher.showContacts(res.payload)))
  }
}

export function updateContact (phone, updatedName, alert) {
  return (dispatch) => {
    callApi('v1/contacts/update', 'post', {phone: phone, name: updatedName})
      .then(res => {
        console.log('response from update contact', res)
        if (res.status === 'success') {
          dispatch(loadContactsList())
          alert.show('Contact Name Updated', {type: 'success'})
        } else {
          alert.show('Update Failed', {type: 'failed'})
        }
      })
  }
}

export function deleteContact (phone, alert) {
  return (dispatch) => {
    callApi(`v1/contacts/${phone}`, 'delete')
      .then(res => {
        console.log('response from update contact', res)
        if (res.status === 'success') {
          dispatch(loadContactsList())
          alert.show('Contact Deleted', {type: 'success'})
        } else {
          alert.show('Delete Failed', {type: 'failed'})
        }
      })
  }
}

export function uploadFile (data, alert) {
  console.log('data for uploadFile', data)
  for (let pair of data.entries()) {
    console.log(pair[0] + ', ' + pair[1])
  }

  return (dispatch) => {
    // we need to make separate request because we want the browser to make the headers for multiparty request ()
    // eslint-disable-next-line no-undef
    fetch(`${API_URL}/v1/contacts/uploadContacts`, {
      method: 'post',
      body: data
      // eslint-disable-next-line no-undef
    }).then((res) => res.json()).then((res) => res).then(res => {
      console.log('response from uploadImage', res)
      if (res.status === 'success') {
        dispatch(loadContactsList())
        alert.show('Contacts Uploaded and Fetched', {type: 'success'})
      } else {
        alert.show('File upload failed', {type: 'failed'})
      }
    })
  }
}
