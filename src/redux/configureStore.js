import { createStore, applyMiddleware, compose } from "redux"
import rootReducer from "./reducers"

//A middleware/plugin which will warn us when we mutate any states
//It helps ensure that we are making coppies of state rather than changing one state object
//Helps keep state immutable
import reduxImmutableStateInvariant from "redux-immutable-state-invariant"

//This function configures the store
//To be called on start-up of the app
//Might refactor into an arrow function
export default function configureStore(initialState) {
  // add support for Redux dev tools plugin/chrome extension
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

  //Return a new store via the 'createStore' function call
  return createStore(
    //Add all reducers (combined with the rootReducer)
    rootReducer,
    //Add the Initial State
    initialState,
    //And some middleware/plugins for redux chrome extension
    composeEnhancers(applyMiddleware(reduxImmutableStateInvariant()))
  )
}
