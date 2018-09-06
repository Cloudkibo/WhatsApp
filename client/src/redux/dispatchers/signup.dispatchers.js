import * as ActionTypes from '../constants/constants'

export function Success () {
  return {
    type: ActionTypes.SIGNUP_SUCCESS,
    successMessage: 'success'
  }
}

export function Failure (message) {
  return {
    type: ActionTypes.SIGNUP_FAILURE,
    errorMessage: message
  }
}
