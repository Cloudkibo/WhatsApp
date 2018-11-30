import * as dashboardDispatcher from '../dispatchers/dashboard.dispatchers'
import callApi from '../../utility/api.caller.service'
export const API_URL = '/api'

export function getMessageCount () {
  return (dispatch) => {
    callApi(`v1/analytics/messageCount`)
      .then(res => {
        console.log('Response from messageCount', res)
        if (res.status === 'success') {
          dispatch(dashboardDispatcher.setMessageCount(res.payload))
        }
      })
      .catch(err => console.log('Failed to fetch analytics messageCount', err))
  }
}

export function getReceivedMessages () {
  return (dispatch) => {
    callApi(`v1/analytics/recievedMessages`)
      .then(res => {
        console.log('Response from recievedMessages', res)
        if (res.status === 'success') {
          dispatch(dashboardDispatcher.setReceivedMessage(res.payload))
        }
      })
      .catch(err => console.log('Failed to fetch analytics recievedMessages', err))
  }
}

export function getUnreadMessages () {
  return (dispatch) => {
    callApi(`v1/analytics/unreadMessages`)
      .then(res => {
        console.log('Response from unreadMessages', res)
        if (res.status === 'success') {
          dispatch(dashboardDispatcher.setUnreadMessage(res.payload))
        }
      })
      .catch(err => console.log('Failed to fetch analytics unreadMessages', err))
  }
}

export function getJoinedGroups () {
  return (dispatch) => {
    callApi(`v1/analytics/joinedGroups`)
      .then(res => {
        console.log('Response from joinedGroups', res)
        if (res.status === 'success') {
          dispatch(dashboardDispatcher.setJoinedGroups(res.payload))
        }
      })
      .catch(err => console.log('Failed to fetch analytics joinedGroups', err))
  }
}

export function getLeftGroups () {
  return (dispatch) => {
    callApi(`v1/analytics/leftGroups`)
      .then(res => {
        console.log('Response from leftGroups', res)
        if (res.status === 'success') {
          dispatch(dashboardDispatcher.setLeftGroups(res.payload))
        }
      })
      .catch(err => console.log('Failed to fetch analytics leftGroups', err))
  }
}
