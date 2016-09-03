import React, { PropTypes } from 'react'
import './App.css'
import Editor from "../Editor"
import Header from "../Header"
import Toolbar from "../Toolbar"
import { compose, set, view, __ as _ } from "ramda"
import * as Document from "../../model/Document"


const App = ({ document, onDocumentChange }) => {

  const handleEditorChange = compose(
    onDocumentChange,
    set(Document.editorState, _, document)
  )

  const handleTitleChange = compose(
    onDocumentChange,
    set(Document.title, _, document)
  )

  const title = view(Document.title, document)
  const editorState = view(Document.editorState, document)

  return (
    <div className="App">
      <Header title={title} onChange={handleTitleChange} />
      <Toolbar document={document} onChange={onDocumentChange} />
      <Editor editorState={editorState} onChange={handleEditorChange} />
    </div>
  )
}

App.propTypes = {
  document: PropTypes.object.isRequired,
  onDocumentChange: PropTypes.func.isRequired
}

export default App
