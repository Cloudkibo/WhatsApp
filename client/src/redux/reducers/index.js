import { combineReducers } from 'redux'

// Import reducers files here
import { testReducer } from './test.reducer'
import { groupReducer } from './groups.reducer'
// Make a app reducer
const appReducer = combineReducers({testReducer, groupReducer})

export default appReducer
