import { Editor as DraftJsEditor, RichUtils } from "draft-js"
import React, { PropTypes } from "react"
import "./Editor.css"
import { curry } from "ramda"

const handleKeyCommand = curry((onChange, editorState, command) => {
  const newState = RichUtils.handleKeyCommand(editorState, command);

  if (!newState)
    return false

  onChange(newState)
  return true
})


const getBlockStyle = block => {
  switch (block.getType()) {
    case "blockquote":
      return 'Editor-blockquote'
    default:
      return null
  }
}


const Editor = ({ editorState, onChange }) => {
  let editor = null;
  const focusEditor = () => editor.focus()

  return (
    <div className="Editor" onClick={focusEditor}>
      <DraftJsEditor
        ref={editor_ => { editor = editor_ }}
        blockStyleFn={getBlockStyle}
        editorState={editorState}
        spellCheck={true}
        onChange={onChange}
        handleKeyCommand={handleKeyCommand(onChange, editorState)}
      />
    </div>
  )
}

Editor.propTypes = {
  editorState: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
}

export default Editor
