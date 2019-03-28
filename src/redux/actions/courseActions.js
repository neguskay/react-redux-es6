import * as types from "./actionTypes"

//This file holds all the action creators for the courses Page container component

//The 'create course' action-creator
export function createCourse(course) {
  //Return the type and the course as an action
  //Uses the object shorthand syntax for "course" because the LHS AND RHS match
  return { type: types.CREATE_COURSE, course }
}
