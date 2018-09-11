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
      dispatch(getGroupInfo({groupId: groupId}))
    })
  }
}

export function loadGroupsList () {
  return (dispatch) => {
    callApi('v1/groups').then(res => dispatch(groupDispatcher.showGroups(res.payload)))
  }
}

export function createGroup (data) {
  return (dispatch) => {
    callApi('v1/groups', 'post', data)
      .then(res => {
        if (res.status === 'success') {
          console.log('New Group Created', res.payload)
          dispatch(groupDispatcher.createdGroup(res.payload))
        }
      })
  }
}

export function getGroupInfo (data) {
  return (dispatch) => {
    callApi(`v1/groups/${data.groupId}`)
      .then(res => {
        if (res.status === 'success') {
          dispatch(groupDispatcher.showGroupsInfo(res.payload))
        }
      })
      .catch((err) => {
        console.log('failed response from getGroupInfo', err)
      })
  }
}

export function getGroupIcon (id) {
  return (dispatch) => {
    callApi(`v1/groups/${id}/icon`)
      .then(res => {
        if (res.status === 'success') {
          dispatch(groupDispatcher.showGroupsInfo(res.payload))
        }
      })
  }
}

export function updateGroup (data) {
  return (dispatch) => {
    callApi(`v1/groups/${data.groupId}`, 'put', {title: data.title})
      .then(res => {
        if (res.status === 'success') {
          dispatch(getGroupInfo({groupId: data.groupId}))
        }
      })
  }
}

export function getParticiapnts (groupId, data) {
  console.log('Get Particpant Details From Ids', data)
  return (dispatch) => {
    callApi(`v1/groups/${groupId}/participants`, 'post', data)
      .then(res => {
        if (res.status === 'success') {
          console.log('Get Particpant Details From Ids', res.payload)
          dispatch(groupDispatcher.showParticipants(res.payload))
        }
      })
  }
}

export function getAdmins (data) {
  return (dispatch) => {
    callApi('v1/contacts', 'post', data)
      .then(res => {
        if (res.status === 'success') {
          dispatch(groupDispatcher.showAdmins(res.payload))
        }
      })
  }
}

export function getGroupInvite (groupId) {
  return (dispatch) => {
    return callApi(`v1/groups/${groupId}/invite`)
  }
}

export function leaveManyGroups (data) {
  return (dispatch) => {
    callApi('v1/groups/leave', 'post', data)
      .then(res => {
        if (res.status === 'success') {
          dispatch(loadGroupsList())
        }
      })
  }
}

export function deleteParticipants (groupId, waIds) {
  return (dispatch) => {
    callApi(`v1/groups/${groupId}/participants`, 'delete', {wa_ids: waIds})
      .then(res => {
        if (res.status === 'success') {
          // dispatch(getParticiapnts(res.payload))
          console.log('Deleted Successfully')
        }
      })
  }
}