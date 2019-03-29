import React from "react"
import { Redirect } from "react-router-dom"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { bindActionCreators } from "redux"

import * as courseActions from "../../redux/actions/courseActions"
import * as authorActions from "../../redux/actions/authorActions"
import CourseList from "./CourseList"

//Courses Page component as a class component
class CoursesPage extends React.Component {
  //Declare the redirect state
  state = {
    redirectToAddCoursePage: false
  }

  //Lifecycle method to run as soon as component mounts
  ////dispatch a call which will eventually reduce to an API call via Fetch request
  componentDidMount() {
    //Destructure the needed resources from props

    let { courses, authors, actions } = this.props

    //Check if we have already received the list of authors,
    //Make the call if we haven't
    if (authors.length === 0) {
      actions.loadAuthors().catch(error => {
        alert("loading Authors failed" + error)
      })
    }
    //Check if we have already received the list of courses,
    //Make the call if we haven't
    if (courses.length === 0) {
      actions.loadCourses().catch(error => {
        alert("loading Courses failed" + error)
      })
    }
  }

  /*   //Using hooks style
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
 */
  render() {
    //Render function
    //On-click on save wont' allow keyboard "enterkey press"
    // dp=oing an on-cubmit on form will!
    return (
      <>
        {this.state.redirectToAddCoursePage && <Redirect to="/course" />}
        <h2>Courses</h2>
        <button
          style={{ marginBottom: 20 }}
          className="btn btn-primary add-course"
          onClick={() => this.setState({ redirectToAddCoursePage: true })}
        >
          Add A Course
        </button>
        <CourseList courses={this.props.courses} />
        {/* {this.props.courses.map(course => (
          <div key={course.title}>{course.title}</div>
        ))} */}
      </>
    )
  }
}

//Define some proptypes
CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  //createCourse: PropTypes.func.isRequired
  actions: PropTypes.object.isRequired
}

//Determine what part of state we expose to component as props
//Only request the data that your component needs and no more
function mapStateToProps(state) {
  return {
    //Check if state has actually received the authors list first,
    //  Else return an empty array

    //Map through the courses, for each,
    //find the author from the author list and,
    // ammend the course data with the authoer name
    //Set courses
    courses:
      state.authors.length === 0
        ? []
        : state.courses.map(course => {
            return {
              ...course,
              authorName: state.authors.find(
                auth => auth.id === course.authorId
              ).name
            }
          }),
    //Set authors
    authors: state.authors
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
    actions: {
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch)
    }
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
