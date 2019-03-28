import * as types from "./actionTypes"
import * as authorApi from "../../api/authorApi"

//Action creator for loading authors
export function loadAuthorsSuccess(authors) {
  return { type: types.LOAD_AUTHORS_SUCCESS, authors }
}

//load author action thunk
export function loadAuthors() {
  //Has the function within a function
  return function(dispatch) {
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
