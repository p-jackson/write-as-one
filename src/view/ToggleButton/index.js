import React, { PropTypes } from "react"
import "./ToggleButton.css"


const ToggleButton = props => {
  const { children, className, isToggled, ...rest } = props

  const mergedClasses = (className || "")
    .split(" ")
    .concat(["ToggleButton"])
    .concat(isToggled ? ["isToggled"] : [])
    .join(" ")

  return (
    <button className={mergedClasses} {...rest}>
      {children}
    </button>
  )
}

ToggleButton.propTypes = {
  className: PropTypes.string,
  isToggled: PropTypes.bool.isRequired
}

export default ToggleButton
