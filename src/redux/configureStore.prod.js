import { createStore, applyMiddleware } from "redux"
import rootReducer from "./reducers"
import thunk from "redux-thunk"

/**
 * Doesn't need any of the dev tools
 * All we need is redux-thunk
 * @param {the initial state} initialState
 */
export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, applyMiddleware(thunk))
}
