import React from "react"
import { render } from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import App from "./components/App"

//Import some styles
import "bootstrap/dist/css/bootstrap.min.css"
import "./index.css"

//Wrap App component with Router
//Render "app" element in index.js with the App component, wrapped with the router
render(
  <Router>
    <App />
  </Router>,
  document.getElementById("app")
)
