import { combineReducers } from 'redux'

// Import reducers files here
import { testReducer } from './test.reducer'
// Make a app reducer
const appReducer = combineReducers({testReducer})

export default appReducer
