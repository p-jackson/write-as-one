import React, { PropTypes } from "react";
import "./Header.css"


const classList = title => title ? "Header" : "Header isUntitled"


const Header = ({ title, onChange }) => {
  const handleClick = () => {
    const newTitle = prompt("Choose document title", title || "")
    if (typeof newTitle === "string")
      onChange(newTitle)
  }

  return (
    <header className={classList(title)}>
      <div className="Header-appTitle">Write as One</div>
      <div className="Header-documentTitle">
        <span onClick={handleClick} className="Header-documentTitleButton">
          {title || "Untitled Document"}
        </span>
      </div>
    </header>
  )
}

Header.propTypes = {
  title: PropTypes.string,
  onChange: PropTypes.func.isRequired
}

export default Header
