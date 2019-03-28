import React from "react"
import { render } from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import { Provider as ReduxProvider } from "react-redux"
import App from "./components/App"
import configureStore from "./redux/configureStore"

//Import some styles
import "bootstrap/dist/css/bootstrap.min.css"
import "./index.css"

//Setup the store
//Pass it as a prop 'store' to the Provider
//To be made gloablly available within the app
const store = configureStore()

//Wrap App component with Router
//Wrap App within Router with Provider
//Render "app" element in index.js with the App component, wrapped with the router
render(
  <ReduxProvider store={store}>
    <Router>
      <App />
    </Router>
  </ReduxProvider>,

  document.getElementById("app")
)
