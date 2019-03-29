import React from "react"
import PropTypes from "prop-types"

//Commn component
//Functional component
const TextInput = ({ name, label, onChange, placeholder, value, error }) => {
  let wrapperClass = "form-group"
  if (error && error.length > 0) {
    wrapperClass += " " + "has-error"
  }

  //Return the jsx markup
  return (
    <div className={wrapperClass}>
      <label htmlFor={name}>{label}</label>
      <div className="field">
        <input
          type="text"
          name={name}
          className="form-control"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </div>
  )
}

//Define some props
TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string
}

//Export the component
export default TextInput
