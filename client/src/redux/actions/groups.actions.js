import * as groupDispatcher from '../dispatchers/groups.dispatchers'
import callApi from '../../utility/api.caller.service'
export const API_URL = '/api'

export function uploadImage (fileData, groupId) {
  return (dispatch) => {
  // eslint-disable-next-line no-undef
    fetch(`${API_URL}/v1/groups/${groupId}/icon`, {
      method: 'post',
      body: fileData
    // eslint-disable-next-line no-undef
    }).then((res) => res.json()).then((res) => res).then(res => {
      console.log('response from uploadImage', res)
      dispatch(getGroupInfo({groupId: groupId}))
    })
  }
}

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
          dispatch(groupDispatcher.createdGroup(res.payload))
        }
      })
  }
}

export function getGroupInfo (data) {
  console.log('data for getGroupInfo', data)
  return (dispatch) => {
    callApi('v1/groups/GetGroupInformation', 'post', data)
      .then(res => {
        console.log('response from getGroupInfo', res)
        if (res.status === 'success') {
          dispatch(groupDispatcher.showGroupsInfo(res.payload))
        }
      })
  }
}

export function getGroupIcon (id) {
  return (dispatch) => {
    callApi(`v1/groups/${id}/icon`)
      .then(res => {
        console.log('response from getGroupIcon', JSON.stringify(res))
        if (res.status === 'success') {
          dispatch(groupDispatcher.showGroupsInfo(res.payload))
        }
      })
  }
}

export function updateGroup (data) {
  console.log('data for updateGroup', data)
  return (dispatch) => {
    callApi('v1/groups/UpdateGroupInformation', 'post', data)
      .then(res => {
        console.log('response from updateGroup', res)
        if (res.status === 'success') {
          dispatch(getGroupInfo({groupId: data.groupId}))
        }
      })
  }
}

export function getParticiapnts (data) {
  return (dispatch) => {
    callApi('v1/contacts', 'post', data)
      .then(res => {
        console.log('response from getParticiapnts', res)
        if (res.status === 'success') {
          dispatch(groupDispatcher.showParticipants(res.payload))
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
          dispatch(groupDispatcher.showAdmins(res.payload))
        }
      })
  }
}