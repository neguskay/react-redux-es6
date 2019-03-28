import * as types from "../actions/actionTypes"
import initialState from "./initialState"

//Author reducer
//For getting authors
export default function authorReducer(state = initialState.authors, action) {
  //Check on the action type and switch appropriately
  switch (action.type) {
    //If load success, return the new authors
    case types.LOAD_AUTHORS_SUCCESS:
      return action.authors
    default:
      return state
  }
}
