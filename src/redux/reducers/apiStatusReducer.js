import * as types from "../actions/actionTypes"
import initialState from "./initialState"

//Checks if action type is success, by checking the substring
function actionTypeEndsInSuccess(type) {
  return type.substring(type.length - 8) === "_SUCCESS"
}

// Function for the API call reducer
// Parses the state(sets default to in Progress unless specified) and action to be reduced
export default function apiCallStatusReducer(
  state = initialState.apiCallsInProgress,
  action
) {
  //Check and if the state is the begining of an API call, increasee the call count by 1
  if (action.type === types.BEGIN_API_CALL) {
    return (state += 1)
  } else if (
    // If current action type is 'SUCCESS' or if 'FAILED', reduce the count by 1
    action.type === types.API_CALL_ERROR ||
    actionTypeEndsInSuccess(action.type)
  ) {
    return (state -= 1)
  }

  return state
}
