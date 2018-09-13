import { combineReducers } from 'redux'

// Import reducers files here
import { testReducer } from './test.reducer'
import { contactsReducer } from './contacts.reducer'
import { groupReducer } from './groups.reducer'
import { loginReducer } from './login.reducer'
import { signupReducer } from './signup.reducer'
import { userReducer } from './user.reducer'
import { chatReducer } from './chat.reducer'

// Make a app reducer
const appReducer = combineReducers({testReducer,
  groupReducer,
  contactsReducer,
  loginReducer,
  signupReducer,
  userReducer,
  chatReducer
})

export default appReducer
