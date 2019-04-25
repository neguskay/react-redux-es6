import courseReducer from "./courseReducer"
import * as actions from "../actions/courseActions"

it("should add course when passed CREATE_COURSE_SUCCESS", () => {
  // Arrange the test
  //Setup an initial state of courses
  //We dont need the full course object
  //Only an array and a couple items to test the reducer behaviour
  const initialState = [
    {
      title: "A"
    },
    {
      title: "B"
    }
  ]

  const newCourse = {
    title: "C"
  }

  //Call the create course success action creator
  const action = actions.createCourseSuccess(newCourse)

  // act
  // Create the reducer
  const newState = courseReducer(initialState, action)

  // assert
  expect(newState.length).toEqual(3)
  expect(newState[0].title).toEqual("A")
  expect(newState[1].title).toEqual("B")
  expect(newState[2].title).toEqual("C")
})

it("should update course when passed UPDATE_COURSE_SUCCESS", () => {
  // arrange
  //Setup an initial state of courses
  const initialState = [
    { id: 1, title: "A" },
    { id: 2, title: "B" },
    { id: 3, title: "C" }
  ]

  //Create the mock updated course data
  const course = { id: 2, title: "New Title" }

  //Call the updateCourseSuccess reducer to update the course data
  const action = actions.updateCourseSuccess(course)

  // act
  const newState = courseReducer(initialState, action)
  const updatedCourse = newState.find(a => a.id == course.id)
  const untouchedCourse = newState.find(a => a.id == 1)

  // assert
  expect(updatedCourse.title).toEqual("New Title")
  expect(untouchedCourse.title).toEqual("A")
  expect(newState.length).toEqual(3)
})
