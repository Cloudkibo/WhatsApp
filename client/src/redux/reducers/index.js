import { combineReducers } from 'redux'

// Import reducers files here
import { testReducer } from './test.reducer'
import { contactsReducer } from './contacts.reducer'
import { groupReducer } from './groups.reducer'

// Make a app reducer
const appReducer = combineReducers({testReducer,
  groupReducer,
  contactReducer
  })

export default appReducer
