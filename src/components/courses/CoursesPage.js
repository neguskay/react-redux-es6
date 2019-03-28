import React from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { bindActionCreators } from "redux"
import * as courseActions from "../../redux/actions/courseActions"

//Courses Page component as a class component
class CoursesPage extends React.Component {
  //Using hooks style
  //no need to use "constructor" or call super
  state = {
    course: {
      title: ""
    }
  }

  //Use arrow functions
  //eliminate the need for the "this" context
  // also eliminate the need for binding to "this"
  handleChange = event => {
    //create a new state object of course,
    //copy over the reference of old course using the spread operator syntax,
    //then change the title property of the course to the currently entered value
    //This means we treat the state object as immutable i.e. not changed, rather created a new one which copies it
    const course = { ...this.state.course, title: event.target.value }

    //Set the state to the new course object
    this.setState({ course })
  }

  handleSubmit = event => {
    //Stop browser window defaults
    event.preventDefault()

    //throw a browser window alert, like a console log for the browser window
    //alert(this.state.course.title)
    // this.props.actions.createCourse(this.state.course);

    //Manual disptach when we don't have the "mapDispatch"
    //this.props.dispatch(courseActions.createCourse(this.state.course))

    //Calling map dispatch, but without bindActionCreators
    this.props.actions.createCourse(this.state.course)
  }

  render() {
    //Render function
    //On-click on save wont' allow keyboard "enterkey press"
    // dp=oing an on-cubmit on form will!
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Courses</h2>
        <h3>Add Course</h3>
        <input
          type="text"
          onChange={this.handleChange}
          value={this.state.course.title}
        />

        <input type="submit" value="Save" />
        {this.props.courses.map(course => (
          <div key={course.title}>{course.title}</div>
        ))}
      </form>
    )
  }
}

//Define some proptypes
CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  //createCourse: PropTypes.func.isRequired
  actions: PropTypes.object.isRequired
}

//Determine what part of state we expose to component as props
//Only request the data that your component needs and no more
function mapStateToProps(state) {
  return {
    courses: state.courses
  }
}

//Using map dispatch as a function
//Determine what actions we expose to component as props
//Only request the actions that your component needs and no more
function mapDispatchToProps(dispatch) {
  return {
    //Not Using bind action creators
    //When the dipatch is "create course",
    //dispatch to create action/notify redux about an action

    //Using the dispatch without bind action
    //createCourse: course => dispatch(courseActions.createCourse(course))

    //Using Bind Action Creators
    actions: bindActionCreators(courseActions, dispatch)
  }
}

// //Using mapDispatch as a constant
// //Can use this instead of functiion
// const mapDispatchToProps = {
//   createCourse: courseActions.createCourse
// }

//Connect the Container component to Redux
//Connect function calls a function which will immidiately call the CoursesPage component after execution
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoursesPage)

//export default CoursesPage

//
// Notes
// Checkout: redux- reucing boiler plate for further reading and some destructuring techniques
