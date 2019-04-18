//Import react
import React from "react"
//Import the component to be snapshot tested
import CourseForm from "./CourseForm"
//Import render fromm the test library to render the component
//It returns a tree which represents the ouput of the rendered component duting test
import renderer from "react-test-renderer"

//Import some mock data
import { courses, authors } from "../../../tools/mockData"

//Test the saving button
it("sets submit button label 'Saving...' when saving is true", () => {
  //Generate the tree
  const tree = renderer.create(
    <CourseForm
      course={courses[0]}
      authors={authors}
      onSave={jest.fn()}
      onChange={jest.fn()}
      saving
    />
  )
  //Set the test assertion
  //Assertions: declare expected behaviour for the test
  //Check JEST docs for the asserions methods
  expect(tree).toMatchSnapshot()
})

it("sets submit button label 'Save' when saving is false", () => {
  const tree = renderer.create(
    <CourseForm
      course={courses[0]}
      authors={authors}
      onSave={jest.fn()}
      onChange={jest.fn()}
      saving={false}
    />
  )

  expect(tree).toMatchSnapshot()
})
