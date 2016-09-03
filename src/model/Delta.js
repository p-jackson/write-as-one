import { view } from "ramda"
import { editorState } from "./Document"
import {
  BlockAdded,
  BlockRemoved,
  BlockTypeChanged,
  TextAdded,
  TextRemoved
} from "./Changes"


const calcDelta = (prev, next) => {
  const changes = []
  const prevContent = view(editorState, prev).getCurrentContent()
  const nextContent = view(editorState, next).getCurrentContent()

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

export { calcDelta }
