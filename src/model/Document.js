import { EditorState, RichUtils, convertToRaw, convertFromRaw } from "draft-js"
import { curry } from "ramda"


export default class Document {
  constructor(title, editorState) {
    this.editorState = editorState
    this.title = title
  }

  hasTitle() {
    return !this.title
  }

  getTitle() {
    return this.title
  }

  setTitle(title) {
    return new Document(title, this.editorState)
  }

  getEditorState() {
    return this.editorState
  }

  setEditorState(state) {
    return new Document(this.title, state)
  }

  toggleInlineStyle(styleType) {
    return new Document(
      this.title,
      RichUtils.toggleInlineStyle(this.editorState, styleType)
    )
  }

  toggleBlockType(blockType) {
    return new Document(
      this.title,
      RichUtils.toggleBlockType(this.editorState, blockType)
    )
  }
}


export function createInitialDocument() {
  const raw = localStorage.getItem("editorState-content")
  if (raw)
    return deserialise(raw)
  else
    return new Document(null, EditorState.createEmpty())
}


export function deserialise(str) {
  const { content, title } = JSON.parse(str)
  return new Document(
    title,
    EditorState.createWithContent(convertFromRaw(content))
  )
}


export function serialise(doc) {
  return JSON.stringify({
    content: convertToRaw(doc.getEditorState().getCurrentContent()),
    title: doc.getTitle()
  })
}


export function calcDelta(prev, next) {
  // const prevBlockMap = prev.getEditorState().getCurrentContent().getBlockMap()
  // const nextBlockMap = next.getEditorState().getCurrentContent().getBlockMap()

  // Find the block that's different
  // for (let key of prevBlockMap.keys()) {
  //   prevBlockMap.get(key).is()console.log(key)
  // }
  return null
}


const setEditorState = curry((document, state) => document.setEditorState(state))
const setTitle = curry((document, title) => document.setTitle(title))

export { setEditorState, setTitle }
