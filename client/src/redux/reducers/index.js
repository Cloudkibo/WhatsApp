import { combineReducers } from 'redux'

// Import reducers files here
import { testReducer } from './test.reducer'
import { groupReducer } from './groups.reducer'
import { contactReducer } from './contacts.reducer'

// Make a app reducer
const appReducer = combineReducers({testReducer,
  groupReducer,
  contactReducer
  })

export default appReducer
