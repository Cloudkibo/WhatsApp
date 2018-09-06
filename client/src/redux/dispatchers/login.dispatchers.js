import * as ActionTypes from '../constants/constants'

export function Failure (message) {
  return {
    type: ActionTypes.LOGIN_FAILURE,
    errorMessage: message
  }
}

export function Success () {
  return {
    type: ActionTypes.LOGIN_SUCCESS,
    successMessage: 'success'
  }
}
