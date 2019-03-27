import React from "react"
import { NavLink } from "react-router-dom"

//Header component as a function comp
const Header = () => {
  //Active style sets an active Nav item's colour to the colour below
  //Parsed as a prop to set that property of each nav link item
  const activeStyle = { color: "#F15B2A" }
  return (
    <nav>
      <NavLink to="/" activeStyle={activeStyle} exact>
        Home
      </NavLink>
      {" | "}
      <NavLink to="/courses" activeStyle={activeStyle}>
        Courses
      </NavLink>
      {" | "}
      <NavLink to="/about" activeStyle={activeStyle}>
        About
      </NavLink>
    </nav>
  )
}

export default Header
