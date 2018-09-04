import { combineReducers } from 'redux'

// Import reducers files here
import { testReducer } from './test.reducer'
import { contactsReducer } from './contacts.reducer'
// Make a app reducer
const appReducer = combineReducers({testReducer, contactsReducer})

export default appReducer
