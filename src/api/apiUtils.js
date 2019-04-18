//Centralise the handling of API responses

//Handle a response
export async function handleResponse(response) {
  //If ok, return the object
  if (response.ok) {
    return response.json()
  }

  //If not okay and 400, return the error
  if (response.status === 400) {
    // So, a server-side validation error occurred.
    // Server side validation returns a string error message, so parse as text instead of json.
    const error = await response.text()
    throw new Error(error)
  }
  throw new Error("Network response was not ok.")
}

//Error handler
//Some logger to be called here [to-do]
// In a real app, would likely call an error logging service.
export function handleError(error) {
  // eslint-disable-next-line no-console
  console.error("API call failed. " + error)

  //this is where you log to a proper logging server
  throw error
}
