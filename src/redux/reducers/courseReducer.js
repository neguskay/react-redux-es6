import * as types from "../actions/actionTypes"
import initialState from "./initialState"
//Couse reducer for the courses Page component
export default function courseReducer(state = initialState.courses, action) {
  //Reduces and selects appropriate changes based on the type of action which arrives
  switch (action.type) {
    //If the type is to create course,
    case types.CREATE_COURSE_SUCESS:
      //Return a new state by coppying the old state using spread syntax,
      //then change the course of the new state by setting it to the course object that arrived within the action
      //This keeps our state immutable
      return [...state, { ...action.course }]

    //if type is to load courses, load them
    case types.LOAD_COURSES_SUCCESS:
      return action.courses

    //If none of the types received with the in-coming action(s) can be reduced in this reducer,
    //return the old state: Don't change anything because eventually, that action will find its reducer

    case types.UPDATE_COURSE_SUCESS:
      //Sate is still immutable
      //Map through the states, to find the id of course being updated
      //if found, return a copy that course id as the new state payload
      //If not found, return a copy of the course state and don't touch it!
      return state.map(course =>
        course.id === action.course.id ? action.course : course
      )

    default:
      return state
  }
}

//NB: Look up the "normalising state" shapes-- to add id's to arrays and make them objects
//    Allows for quicker look up times
