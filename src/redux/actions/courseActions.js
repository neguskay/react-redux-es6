import * as types from "./actionTypes"
import * as courseApi from "../../api/courseApi"

//This file holds all the action creators for the courses Page container component

//The 'create course' action-creator
export function createCourse(course) {
  //Return the type and the course as an action
  //Uses the object shorthand syntax for "course" because the LHS AND RHS match
  return { type: types.CREATE_COURSE, course }
}

//Action creator for course success
export function loadCourseSuccess(courses) {
  return { type: types.LOAD_COURSES_SUCCESS, courses }
}

//Thunk
//A function that accepts dispatch as an argument
//Thurnk middleware will pass dispatch automatically
export function loadCourses() {
  return function(dispatch) {
    //Make the api call
    return (
      courseApi
        //get the courses
        .getCourses()
        //Do something with the response
        .then(courses => {
          //Load the course-get success
          dispatch(loadCourseSuccess(courses))
        })
        .catch(error => {
          //Throw error if any
          throw error
        })
    )
  }
}
