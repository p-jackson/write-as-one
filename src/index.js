import React from 'react';
import ReactDOM from 'react-dom';
import App from './view/App';
import './index.css';
import { createInitialDocument, serialise } from "./model/Document"
import { calcDelta } from "./model/Delta"

let currentDocument = createInitialDocument()
render(currentDocument)

let saveTimeout = null
let logDeltaTimeout = null
function handleChange(document_) {
  const delta = calcDelta(currentDocument, document_)

  currentDocument = document_
  render(currentDocument)

  if (delta) {
    if (logDeltaTimeout)
      clearTimeout(logDeltaTimeout)
    logDeltaTimeout = setTimeout(() => logDelta(delta), 0)
  }

  if (saveTimeout)
    clearTimeout(saveTimeout)
  saveTimeout = setTimeout(() => saveToLocalStorage(document_), 1000)
}

function saveToLocalStorage(document) {
  localStorage.setItem("editorState-content", serialise(document))
}

function logDelta(delta) {
  console.log(JSON.stringify(delta, null, 2))
}

function render(document_) {
  ReactDOM.render(
    <App
      document={document_}
      onDocumentChange={handleChange}
    />,
    document.getElementById('root')
  )
}
