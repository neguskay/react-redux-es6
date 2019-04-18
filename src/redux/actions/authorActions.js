import * as types from "./actionTypes"
import * as authorApi from "../../api/authorApi"
import { beginApiCall } from "./apiStatusActions"

//Action creator for loading authors
export function loadAuthorsSuccess(authors) {
  return { type: types.LOAD_AUTHORS_SUCCESS, authors }
}

//load author action thunk
export function loadAuthors() {
  //Has the function within a function
  return function(dispatch) {
    //Before API call, disptach the "call in progress" action to track it
    dispatch(beginApiCall())

    //Does a fetch to get all authors
    //Then dispatches the load author success action created above
    return authorApi
      .getAuthors()
      .then(authors => {
        dispatch(loadAuthorsSuccess(authors))
      })
      .catch(error => {
        throw error
      })
  }
}
