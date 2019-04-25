import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { toast } from "react-toastify"
import PropTypes from "prop-types"
import { loadCourses, saveCourse } from "../../redux/actions/courseActions"
import { loadAuthors } from "../../redux/actions/authorActions"
import CourseForm from "./CourseForm"
import { newCourse } from "../../../tools/mockData"
import Spinner from "../common/Spinner"

/*****
//Manages all course components
// Editing course data, showing and getting courses and so on
// function ManageCoursePage({
//   courses,
//   authors,
//   loadAuthors,
//   loadCourses,
//   saveCourse,
//   history,
//   ...props
// }) {
//   const [course, setCourse] = useState({ ...props.course });
//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     if (courses.length === 0) {
//       loadCourses().catch(error => {
//         alert("Loading courses failed" + error);
//       });
//     } else {
//       setCourse({ ...props.course });
//     }

//     if (authors.length === 0) {
//       loadAuthors().catch(error => {
//         alert("Loading authors failed" + error);
//       });
//     }
//   }, [props.course]);

//   function handleChange(event) {
//     const { name, value } = event.target;
//     setCourse(prevCourse => ({
//       ...prevCourse,
//       [name]: name === "authorId" ? parseInt(value, 10) : value
//     }));
//   }

//   function handleSave(event) {
//     event.preventDefault();
//     saveCourse(course).then(() => {
//       history.push("/courses");
//     });
//   }

//   return (
//     <CourseForm
//       course={course}
//       errors={errors}
//       authors={authors}
//       onChange={handleChange}
//       onSave={handleSave}
//     />
//   );
// }

// ManageCoursePage.propTypes = {
//   course: PropTypes.object.isRequired,
//   authors: PropTypes.array.isRequired,
//   courses: PropTypes.array.isRequired,
//   loadCourses: PropTypes.func.isRequired,
//   loadAuthors: PropTypes.func.isRequired,
//   saveCourse: PropTypes.func.isRequired,
//   history: PropTypes.object.isRequired
// };

// export function getCourseBySlug(courses, slug) {
//   return courses.find(course => course.slug === slug) || null;
// }

// function mapStateToProps(state, ownProps) {
//   const slug = ownProps.match.params.slug;
//   const course =
//     slug && state.courses.length > 0
//       ? getCourseBySlug(state.courses, slug)
//       : newCourse;
//   return {
//     course,
//     courses: state.courses,
//     authors: state.authors
//   };
// }

// const mapDispatchToProps = {
//   loadCourses,
//   loadAuthors,
//   saveCourse
// };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(ManageCoursePage);
*****/

//ManageCourses compoenent as a function component
// Uses the 'use-effect' hook
//This compoenent uses a local react state and not redux(not necessary)
//Assign any properties that haven't been destructered on the lhs, as props
export function ManageCoursePage({
  courses,
  authors,
  loadAuthors,
  loadCourses,
  saveCourse,
  history,
  ...props
}) {
  //Use state hook
  //A hook that allows for adding react states to function components
  //'Use state' returns two values
  //Uses array destructuring to store the two items as 'course' and 'setCourse'
  //First value is the state value
  //Second value is the setter for the value
  //Basically initialise the state variable to a copy of the state of course parsed in on props
  //Do similar for errors
  const [course, setCourse] = useState({ ...props.course })
  const [errors, setErrors] = useState({})
  //Track saving status of API to diplay or hide the "save button"
  const [saving, setSaving] = useState(false)

  //Use Effect hook
  //Run when the compoenent mounts
  useEffect(() => {
    //Check if we have already received the list of courses,
    //Make the call if we haven't
    if (courses.length === 0) {
      loadCourses().catch(error => {
        alert("loading Courses failed" + error)
      })
    } else {
      //Set the state as the current course
      setCourse({
        ...props.course
      })
    }

    //Check if we have already received the list of authors,
    //Make the call if we haven't
    if (authors.length === 0) {
      loadAuthors().catch(error => {
        alert("loading Authors failed" + error)
      })
    }
    //Adds the couse to ensure it only runs when any of the props change and not all the time
  }, [props.course])

  //Hnadle changes within form
  function handleChange(event) {
    //Destructure the name of the feild and value
    const { name, value } = event.target

    //Set the new course state
    //Use parse int to set the id back to the int because "value" returns it as string
    setCourse(prevCourse => ({
      ...prevCourse,
      [name]: name === "authorId" ? parseInt(value, 10) : value
    }))
  }

  function formIsValid() {
    //Destrcture the attributes and check them from the user-filled form
    const { title, authorId, category } = course

    //Create an errors const
    const errors = {}

    //Check for the errors
    if (!title) errors.title = "Title is required."
    if (!authorId) errors.author = "Author is required"
    if (!category) errors.category = "Category is required"

    //Set the errors
    setErrors(errors)

    //Return bool, true if the errors object is empty
    // Form is valid if the errors object still has no properties
    return Object.keys(errors).length === 0
  }

  //Handle save within form
  function handleSave(event) {
    //Stop the page from posting back
    event.preventDefault()

    //Check for form validation and return if not
    if (!formIsValid()) return

    //Set the 'setSaving' state to true
    setSaving(true)

    //Save the course available in state
    saveCourse(course)
      .then(() => {
        //Then change the hisory back to the courses list page
        //Can be chained because save course returns a promise
        toast.success("Course Saved.")
        history.push("/courses")
      })
      .catch(error => {
        //Reset the button so user can try again
        setSaving(false)

        //Set the errors
        setErrors({ onSave: error.message })
      })
  }

  //return the function component
  //Pass in the approrpiate props
  //Check the count of authors and courses and display a spinner if either is 0,
  //  this means we might still be loading from API
  return authors.length === 0 || courses.length === 0 ? (
    <Spinner />
  ) : (
    <CourseForm
      course={course}
      errors={errors}
      authors={authors}
      onChange={handleChange}
      onSave={handleSave}
      saving={saving}
    />
  )
}

//Set some proptypes
ManageCoursePage.prototype = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  loadCourses: PropTypes.func.isRequired,
  saveCourse: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
}

//Find the course within the db by the slug param
//A selector function: one that selects data from teh redux store
export function getCourseBySlug(courses, slug) {
  //Accept the list of courses and slug we are looking for
  //uses the find function in js to find and get the course requested
  //if not found, return null
  return courses.find(course => course.slug === slug) || null
}

//Map state to props
function mapStateToProps(state, ownProps) {
  //ownProps allows us to access the component's own props
  //get the slug data
  //Slud data is a param declared in app.js routers when  the path is 'course'
  const slug = ownProps.match.params.slug

  //Retreive the course with the given slug information
  //if slug param exists in our db, set it as course, else set the newCourse
  //Check if our api request is completed and we have received the courses, then execute
  const course =
    slug && state.courses.length > 0
      ? getCourseBySlug(state.courses, slug)
      : newCourse

  //Return this as the state to be mapped to props
  return {
    course,
    courses: state.courses,
    authors: state.authors
  }
}
//Uses the imports directly
//The props being destrictured is in scope rather than the imports above, when the app renders
const mapDispatchToProps = {
  loadCourses,
  loadAuthors,
  saveCourse
}

//Connect the state and dispatch of redux to the component
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageCoursePage)
