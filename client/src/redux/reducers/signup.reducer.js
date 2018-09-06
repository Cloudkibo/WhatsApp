import * as ActionTypes from '../constants/constants'
const initialState = {
  errorSignup: null,
  successSignup: null
}
export function signupReducer (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.SIGNUP_FAILURE:
      return Object.assign({}, state, {
        errorSignup: action.errorMessage
      })
    case ActionTypes.SIGNUP_SUCCESS:
      return Object.assign({}, state, {
        successSignup: action.successMessage
      })
    default:
      return state
  }
}
