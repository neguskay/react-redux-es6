import * as types from "./actionTypes"

//Action creator for Begining the API call
export function beginApiCall() {
  return { type: types.BEGIN_API_CALL }
}

//Action creator for an API Call ERROR
export function apiCallError() {
  return { type: types.API_CALL_ERROR }
}
