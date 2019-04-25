import { createStore } from "redux"
import rootReducer from "./reducers"
import initialState from "./reducers/initialState"
import * as courseActions from "./actions/courseActions"

/**
 * store.test.js
 * Integration test that tests the interaction between the reducers, actions and the store of redux.
 * Follows the arrange-act-assert pattern
 */
it("Should handle creating courses", function() {
  // arrange
  //Create the store and parse it the root reducer and an initial state
  //Also declare a simple course object with title
  const store = createStore(rootReducer, initialState)
  const course = {
    title: "Clean Code"
  }

  // act
  //Create a course action and dispatch it
  //Can add several action creators, if available
  //and assert below in the assert blocks
  const action = courseActions.createCourseSuccess(course)
  store.dispatch(action)

  // assert
  //Check if the mocks are equal to expected outputs
  const createdCourse = store.getState().courses[0]
  expect(createdCourse).toEqual(course)
})
