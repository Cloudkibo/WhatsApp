import { combineReducers } from 'redux'

// Import reducers files here
import { testReducer } from './test.reducer'
import { contactsReducer } from './contacts.reducer'
import { groupReducer } from './groups.reducer'
import { loginReducer } from './login.reducer'
import { signupReducer } from './signup.reducer'

// Make a app reducer
const appReducer = combineReducers({testReducer,
  groupReducer,
  contactsReducer,
  loginReducer,
  signupReducer
  })

export default appReducer
