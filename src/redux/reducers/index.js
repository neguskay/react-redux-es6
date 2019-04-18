import { combineReducers } from "redux"
import courses from "./courseReducer"
import authors from "./authorReducer"
import apiCallsInProgress from "./apiStatusReducer"

//This is the root Reducer
//Combines all reducers for store
const rootReducer = combineReducers({
  //Can do below instead of 'courses:courses'
  //Because its an object and the LHS is the same as the RHS
  courses,
  authors,
  apiCallsInProgress
})

//Export root reducer as the default module
export default rootReducer
