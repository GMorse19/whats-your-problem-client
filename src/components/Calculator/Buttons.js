import React from 'react' // import react module
import PropTypes from 'prop-types'

// create our Button component as a functional component
const Buttons = (props) => {
  return (
    <input
      type="button"
      className={props.type === 'action' ? 'button orange action-button' : 'button gray input-button'}
      onClick={props.handleClick}
      value={props.label}
    />
  )
}

// describe our expected props types
Buttons.propTypes = {
  type: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired
}

// export our button component.
export default Buttons
