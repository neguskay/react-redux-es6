import * as types from "./actionTypes"
import * as courseApi from "../../api/courseApi"
import { beginApiCall, apiCallError } from "./apiStatusActions"

//This file holds all the action creators for the courses Page container component

//The 'create course' action-creator
// export function createCourse(course) {
//   //Return the type and the course as an action
//   //Uses the object shorthand syntax for "course" because the LHS AND RHS match
//   return { type: types.CREATE_COURSE, course }
// }

//Action creator for course success
export function loadCourseSuccess(courses) {
  return { type: types.LOAD_COURSES_SUCCESS, courses }
}

//Action creator for create course success
export function createCourseSuccess(course) {
  return { type: types.CREATE_COURSE_SUCESS, course }
}

//Action creator for update course success
export function updateCourseSuccess(course) {
  return { type: types.UPDATE_COURSE_SUCESS, course }
}

//Action creator for delete course optimistic
export function deleteCourseOptimistic(course) {
  return { type: types.DELETE_COURSE_OPTIMISTIC, course }
}

//Thunk
//A function that accepts dispatch as an argument
//Thurnk middleware will pass dispatch automatically
export function loadCourses() {
  return function(dispatch) {
    //Before API call, disptach the "call in progress" action to track it
    dispatch(beginApiCall())

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

//Thunk
//Saves courses
export function saveCourse(course) {
  //Optional getstate object with all of redux states
  //Handy for debugging
  return function(dispatch, getState) {
    //Before API call, disptach the "call in progress" action to track it
    dispatch(beginApiCall())

    //Make the api call
    return (
      courseApi
        //get the courses
        .saveCourse(course)
        //Do something with the response
        //Passing the course object to be saved
        .then(savedCourse => {
          //Check on the validation of the id
          //If already avalibale, updtae that object data in out DB
          //If it's a new id, save as a new course
          course.id
            ? dispatch(updateCourseSuccess(savedCourse))
            : dispatch(createCourseSuccess(savedCourse))
        })
        .catch(error => {
          //Dispatch api call error
          dispatch(apiCallError(error))
          //Throw error if any
          throw error
        })
    )
  }
}

export function deleteCourse(course) {
  return function(dispatch) {
    // Doing optimistic delete, so not dispatching begin/end api call
    // actions, or apiCallError action since we're not showing the loading status for this.
    dispatch(deleteCourseOptimistic(course))
    return courseApi.deleteCourse(course.id)
  }
}
