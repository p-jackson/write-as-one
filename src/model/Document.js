import { EditorState, RichUtils, convertToRaw, convertFromRaw } from "draft-js"
import { curry, compose, lensProp, view, set, __ as _ } from "ramda"


const newDocument =
  (title, editorState) => ({ title, editorState })


const title =
  lensProp("title")


const editorState =
  lensProp("editorState")


const hasTitle =
  compose(x => !!x, view(title))


const draftToggleInlineStyles =
  curry((inlineStyle, editorState) => RichUtils.toggleInlineStyle(editorState, inlineStyle))

const toggleInlineStyle =
  curry((style, doc) => compose(
    set(editorState, _, doc),
    draftToggleInlineStyles(style),
    view(editorState)
  )(doc))


const draftToggleBlockType =
  curry((blockType, editorState) => RichUtils.toggleBlockType(editorState, blockType))

const toggleBlockType =
  curry((type, doc) => compose(
    set(editorState, _, doc),
    draftToggleBlockType(type),
    view(editorState)
  )(doc))


const deserialise =
  str => {
    const { content, title } = JSON.parse(str)
    return newDocument(
      title,
      EditorState.createWithContent(convertFromRaw(content))
    )
  }


const serialise =
  doc => JSON.stringify({
    content: convertToRaw(view(editorState, doc).getCurrentContent()),
    title: view(title, doc)
  })


export {
  title,
  editorState,
  hasTitle,
  toggleBlockType,
  toggleInlineStyle,
  serialise,
  deserialise,
}


export function createInitialDocument() {
  const raw = localStorage.getItem("editorState-content")
  if (raw)
    return deserialise(raw)
  else
    return newDocument(null, EditorState.createEmpty())
}
