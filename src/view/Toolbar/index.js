import React, { PropTypes } from "react"
import { compose, view } from "ramda"
import ToggleButton from "../ToggleButton"
import * as Document from "../../model/Document"
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

  const editorState = view(Document.editorState, document)
  const currentInlineStyle = editorState.getCurrentInlineStyle()
  const selection = editorState.getSelection()
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType()

  const blockStyleButtons = blockStyles.map(({ blockStyle, label }) => {
    const handleClick = compose(onChange, Document.toggleBlockType(blockStyle))

    return (
      <ToggleButton
        className="Toolbar-button"
        isToggled={blockType === blockStyle}
        key={blockStyle}
        onClick={() => handleClick(document)}
        onMouseDown={e => e.preventDefault()}
      >
        {label}
      </ToggleButton>
    )
  })

  const inlineStyleButtons = inlineStyles.map(({ inlineStyle, label }) => {
    const handleClick = compose(onChange, Document.toggleInlineStyle(inlineStyle))

    const isToggled = currentInlineStyle.has(inlineStyle)
    return (
      <ToggleButton
        className="Toolbar-button"
        isToggled={isToggled}
        key={inlineStyle}
        onClick={() => handleClick(document)}
        onMouseDown={e => e.preventDefault()}
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
