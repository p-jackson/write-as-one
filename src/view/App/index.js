import React, { PropTypes } from 'react'
import './App.css'
import Editor from "../Editor"
import Header from "../Header"
import Toolbar from "../Toolbar"
import { compose } from "ramda"
import { setEditorState, setTitle } from "../../model/Document"

const App = ({ document, onDocumentChange }) => {

  const handleEditorChange = compose(onDocumentChange, setEditorState(document))
  const handleTitleChange = compose(onDocumentChange, setTitle(document))

  return (
    <div className="App">
      <Header title={document.getTitle()} onChange={handleTitleChange} />
      <Toolbar document={document} onChange={onDocumentChange} />
      <Editor editorState={document.getEditorState()} onChange={handleEditorChange} />
    </div>
  )
}

App.propTypes = {
  document: PropTypes.object.isRequired,
  onDocumentChange: PropTypes.func.isRequired
}

export default App
