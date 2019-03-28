import * as types from "../actions/actionTypes"

//Couse reducer for the courses Page component
export default function courseReducer(state = [], action) {
  //Reduces and selects appropriate changes based on the type of action which arrives
  switch (action.type) {
    //If the type is to create course,
    case types.CREATE_COURSE:
      //Return a new state by coppying the old state using spread syntax,
      //then change the course of the new state by setting it to the course object that arrived within the action
      //This keeps our state immutable
      return [...state, { ...action.course }]

    //If none of the types received with the in-coming action(s) can be reduced in this reducer,
    //return the old state: Don't change anything because eventually, that action will find its reducer
    default:
      return state
  }
}

//NB: Look up the "normalising state" shapes-- to add id's to arrays and make them objects
//    Allows for quicker look up times
