import { EditorState, RichUtils, convertToRaw, convertFromRaw } from "draft-js"
import { curry } from "ramda"
import {
  BlockAdded,
  BlockRemoved,
  BlockTypeChanged,
  TextAdded,
  TextRemoved
} from "./Changes"


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
  const changes = []
  const prevContent = prev.getEditorState().getCurrentContent()
  const nextContent = next.getEditorState().getCurrentContent()

  // Find the block that's different
  let index = -1
  for (let key of prevContent.getBlockMap().keys()) {
    index++
    const prevBlock = prevContent.getBlockForKey(key)
    const nextBlock = nextContent.getBlockForKey(key)
    if (prevBlock !== nextBlock) {
      if (!nextBlock)
        changes.push(BlockRemoved(index))
      else if (prevBlock.getLength() < nextBlock.getLength())
        changes.push(TextAdded(index, prevBlock.getText(), nextBlock.getText()))
      else if (prevBlock.getLength() > nextBlock.getLength())
        changes.push(TextRemoved(index, prevBlock.getText(), nextBlock.getText()))
      else if (prevBlock.getType() !== nextBlock.getType())
        changes.push(BlockTypeChanged(index, nextBlock.getType()))
    }
  }

  index = -1
  for (let key of nextContent.getBlockMap().keys()) {
    index++
    if (!prevContent.getBlockForKey(key)) {
      const newBlock = nextContent.getBlockForKey(key)
      changes.push(BlockAdded(index, newBlock.getType(), newBlock.getText()))
    }
  }

  return changes
}


const setEditorState = curry((document, state) => document.setEditorState(state))
const setTitle = curry((document, title) => document.setTitle(title))

export { setEditorState, setTitle }
