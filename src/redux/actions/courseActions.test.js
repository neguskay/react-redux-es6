import * as courseActions from "./courseActions"
import * as types from "./actionTypes"
import { courses } from "../../../tools/mockData"
import thunk from "redux-thunk"
import fetchMock from "fetch-mock"
import configureMockStore from "redux-mock-store"

/**
 * Redux Action creators return objects and are functions
 * This makes them very straigh-forward to test
 * Parse in an action type and;
 * Assert that its creates and return the appropriate object for that action
 */

// Test an async actions and thunks
const middleware = [thunk]
const mockStore = configureMockStore(middleware)

describe("Async Actions", () => {
  //Important to run fetchMock.restore after each test
  //This initialises the fetch mock after each test
  afterEach(() => {
    fetchMock.restore()
  })

  //Test the Thunk
  describe("Load Courses Thunk", () => {
    it("should create BEGIN_API_CALL and LOAD_COURSES_SUCCESS when loading courses", () => {
      //Create a mock of the test data
      fetchMock.mock("*", {
        body: courses,
        headers: { "content-type": "application/json" }
      })

      //Declare some expected actions to be fired from the thunk
      const expectedActions = [
        { type: types.BEGIN_API_CALL },
        { type: types.LOAD_COURSES_SUCCESS, courses }
      ]

      //Create a mock redux store
      //Initialise the store with an empty array of courses
      const store = mockStore({ courses: [] })

      //Dispatch the 'load courses' action  which will return a promise
      //Then call 'getActions' on the mock store which will return all the list of actions that have occured
      // Asser that the list of actions returned matches that of the one we expectd
      return store.dispatch(courseActions.loadCourses()).then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
    })
  })
})

//Test an action creator
describe("createCourseSuccess", () => {
  it("should create a CREATE_COURSE_SUCCESS action", () => {
    //arrange
    //Test Data
    const course = courses[0]
    const expectedAction = {
      type: types.CREATE_COURSE_SUCESS,
      course
    }

    //act
    //Function to be tested
    const action = courseActions.createCourseSuccess(course)

    //Asert and fail/pass
    expect(action).toEqual(expectedAction)
  })
})
