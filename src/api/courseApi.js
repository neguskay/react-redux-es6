//Mock back-end for getting the courses from the server
import { handleResponse, handleError } from "./apiUtils"

const baseUrl = process.env.API_URL + "/courses/"

//Get all the courses
//Makes a fetch GET request
//returns the request, then handles the response
//Might also catch an error if any
export function getCourses() {
  console.log("fetching courses...")
  return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError)
}

//Save a course
//Makes a fetch request with a PUT or POST
//PUT if updating a course, POST if new course being added
//Handles the response
//Handles the error if any
export function saveCourse(course) {
  console.log("Saving course...")
  return fetch(baseUrl + (course.id || ""), {
    // POST for create, PUT to update when id already exists.
    method: course.id ? "PUT" : "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(course)
  })
    .then(handleResponse)
    .catch(handleError)
}

//Delete a course
//Makes a fetch DELETE request to delet the course of aparticular ID
//Handles the response
//Might handle an error if any occurs
export function deleteCourse(courseId) {
  console.log("Deleting course...")
  return fetch(baseUrl + courseId, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError)
}
