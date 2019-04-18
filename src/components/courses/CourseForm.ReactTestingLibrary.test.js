import React from "react"
//Import the cleanup and render functions
import { cleanup, render } from "react-testing-library"
//Get the relevant component
import CourseForm from "./CourseForm"

/**
 * This Test uses the React Testing Library
 * Components are alwasy mounted fully.
 * In enzyme, components can be shallow mounted and mounted fully.
 */

//Cleanup after each 'it' block
afterEach(cleanup)

//Similar pattern to enzyme
//Declare a factory function which renders and returns a component
//Difference between this and other factory func is this returns render, enzyme factory returned shallow
//Can also be coded to return mount
function renderCourseForm(args) {
  let defaultProps = {
    authors: [],
    course: {},
    saving: false,
    errors: {},
    onSave: () => {},
    onChange: () => {}
  }

  const props = { ...defaultProps, ...args }
  return render(<CourseForm {...props} />)
}

//Use destructuring to get the 'getByText' function from the 'render' compoenent
//If getByText fails, the test fails
it("should render Add Course header", () => {
  const { getByText } = renderCourseForm()
  //Assertion is made via 'getByText' as below
  //No 'expect' block needed
  getByText("Add Course")
})

it('should label save button as "Save" when not saving', () => {
  const { getByText } = renderCourseForm()
  getByText("Save")
})

it('should label save button as "Saving..." when saving', () => {
  const { getByText, debug } = renderCourseForm({ saving: true })
  //Can also destructure 'debug' function and use it
  //Can parse in the name of a particular element to debug
  //It will show the component from teh 'render' by default
  // debug()
  getByText("Saving...")
})
