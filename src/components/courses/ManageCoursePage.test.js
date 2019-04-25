import React from "react"
import { mount } from "enzyme"
import { authors, newCourse, courses } from "../../../tools/mockData"

//Import the plain function component, without wrapping it in 'connect'
import { ManageCoursePage } from "./ManageCoursePage"

//Factory to render the component with all the appropriate props
function render(args) {
  //Parse in all props required including those injected by redux
  const defaultProps = {
    authors,
    courses,
    // Passed from React Router in real app, so just stubbing in for test.
    // Could also choose to use MemoryRouter as shown in Header.test.js,
    // or even wrap with React Router, depending on whether I
    // need to test React Router related behavior.

    //Stub out history with empty objects
    history: {},
    saveCourse: jest.fn(),
    loadAuthors: jest.fn(),
    loadCourses: jest.fn(),
    course: newCourse,
    match: {}
  }

  const props = { ...defaultProps, ...args }

  //Use mount
  //Render the component and its children within memory
  return mount(<ManageCoursePage {...props} />)
}

it("sets error when attempting to save an empty title field", () => {
  //Render the component
  const wrapper = render()

  //Find the from
  //Simulate the form submit
  //Can simulate clicks, hovers, submits and so on, check on the docs
  wrapper.find("form").simulate("submit")

  //Find the first error i.e. alert that gets generated
  const error = wrapper.find(".alert").first()

  //Assert/expect the text of error to be Title is required
  expect(error.text()).toBe("Title is required.")
})
