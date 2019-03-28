//Mock backedn for calling Authors
import { handleResponse, handleError } from "./apiUtils"

const baseUrl = process.env.API_URL + "/authors/"

//The fetch call for getting authors
export function getAuthors() {
  console.log("fetching authors...")
  return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError)
}
