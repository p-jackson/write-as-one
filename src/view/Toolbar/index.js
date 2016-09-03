import React, { PropTypes } from "react";
import ToggleButton from "../ToggleButton"
import "./Toolbar.css"

const blockStyles = [
  { label: "Heading", blockStyle: "header-one" },
  { label: "Quote", blockStyle: "blockquote" },
  { label: "Code", blockStyle: "code-block" }
]

const inlineStyles = [
  { label: "Bold", inlineStyle: "BOLD" },
  { label: "Italic", inlineStyle: "ITALIC" }
]

const Toolbar = ({ document, onChange }) => {

  const editorState = document.getEditorState()
  const currentInlineStyle = editorState.getCurrentInlineStyle()
  const selection = editorState.getSelection()
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType()

  const blockStyleButtons = blockStyles.map(({ blockStyle, label }) => {
    const handleClick = () => onChange(document.toggleBlockType(blockStyle))
    const handleMouseDown = e => {
      e.preventDefault()
    }

    return (
      <ToggleButton
        className="Toolbar-button"
        isToggled={blockType === blockStyle}
        key={blockStyle}
        onClick={handleClick}
        onMouseDown={handleMouseDown}
      >
        {label}
      </ToggleButton>
    )
  })

  const inlineStyleButtons = inlineStyles.map(({ inlineStyle, label }) => {
    const handleClick = () => onChange(document.toggleInlineStyle(inlineStyle))
    const handleMouseDown = e => {
      e.preventDefault()
    }

    const isToggled = currentInlineStyle.has(inlineStyle)
    return (
      <ToggleButton
        className="Toolbar-button"
        isToggled={isToggled}
        key={inlineStyle}
        onClick={handleClick}
        onMouseDown={handleMouseDown}
      >
        {label}
      </ToggleButton>
    )
  })

  return (
    <div className="Toolbar">
      <div className="Toolbar-blockStyles">
        {blockStyleButtons}
      </div>
      <div className="Toolbar-inlineStyles">
        {inlineStyleButtons}
      </div>
    </div>
  )
}

Toolbar.propTypes = {
  document: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
}

export default Toolbar
