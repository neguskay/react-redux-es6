import React from "react"
import Header from "./Header"
import { mount, shallow } from "enzyme"
import { MemoryRouter } from "react-router-dom"

/**
 * this class shows the difference between 'shallow' and 'mount' rendering
 */

// Note how with shallow render you search for the React component tag
//In shallow its easy to search for a component because no DOM is rendered
//Like seaching on a raw JSX
it("contains 3 NavLinks via shallow", () => {
  const numLinks = shallow(<Header />).find("NavLink").length
  expect(numLinks).toEqual(3)
})

// Note how with mount you search for the final rendered HTML since it generates the final DOM.
// We also need to pull in React Router's memoryRouter for testing since the Header expects to have React Router's props passed in.
//Mount creates a more realistic test by rendering a realistic component with full dom capabilities
it("contains 3 anchors via mount", () => {
  //Use mount to create a full DOM in memory using js-dom
  //This means within the dom, teh 'navlink' is rendered as an achor <a/> tag
  //So we search for anchor tags instead
  const numAnchors = mount(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  ).find("a").length

  expect(numAnchors).toEqual(3)
})
