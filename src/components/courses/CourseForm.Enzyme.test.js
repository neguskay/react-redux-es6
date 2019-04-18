//Enzyme test

import React from "react"
//Import the component to be tested
import CourseForm from "./CourseForm"

// shallow from enzyme: render style
//Shallow renders only that single component, no child components [only one level deep], with no DOM
//Mount will render components along with their children components, with children, and with DOM
import { shallow } from "enzyme"

//Delcare a factory function
//Helps call react component to be tested with some default values
function renderCourseForm(args) {
  //Setup some default props
  const defaultProps = {
    authors: [],
    course: {},
    saving: false,
    errors: {},
    onSave: () => {},
    onChange: () => {}
  }

  //Use the spread operator to blend props and default props together
  const props = { ...defaultProps, ...args }

  //Render the component as a shallow type, with combined/blended props above
  return shallow(<CourseForm {...props} />)
}

//Tests for course form
it("renders form and header", () => {
  //Use the factory function to render the component
  const wrapper = renderCourseForm()

  // Use this to check the debug and see whats actually being rendered
  // console.log(wrapper.debug());

  //Some assertions with css classnames and the find assertion method
  //'find' function asslows for finding tags in a component
  expect(wrapper.find("form").length).toBe(1)
  expect(wrapper.find("h2").text()).toEqual("Add Course")
})

//Test the save button on the Course Form
it('labels save buttons as "Save" when not saving', () => {
  const wrapper = renderCourseForm()
  expect(wrapper.find("button").text()).toBe("Save")
})

it('labels save button as "Saving..." when saving', () => {
  const wrapper = renderCourseForm({ saving: true })
  expect(wrapper.find("button").text()).toBe("Saving...")
})

/**
 * Using the 'find' from enzyme
 * by an element by id => find('#element_id') e.g id=firstname
 * by an element by className => find('.className') e.g wrapper
 * by an element by tag(html/css) => find('tag') e.g h1
 */
