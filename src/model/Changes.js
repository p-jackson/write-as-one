import { range } from "ramda"

const textAddPos = (prev, next) => {
  const firstDiff = range(0, prev.length).find(i => prev[i] !== next[i])
  const start = typeof firstDiff === "number" ? firstDiff : prev.length
  return {
    start,
    text: next.substr(start, next.length - prev.length)
  }
}


const textRemovePos = (prev, next) => {
  const firstDiff = range(0, next.length).find(i => prev[i] !== next[i])
  return {
    start: typeof firstDiff === "number" ? firstDiff : next.length,
    length: prev.length - next.length
  }
}


const BlockAdded =
  (blockIndex, blockType, text) => ({ type: "BLOCK_ADDED", blockIndex, blockType, text })


const BlockRemoved =
  blockIndex => ({ type: "BLOCK_REMOVED", blockIndex })


const BlockTypeChanged =
  (blockIndex, blockType) => ({ type: "BLOCK_TYPE_CHANGED", blockIndex, blockType })


const TextAdded =
  (blockIndex, prev, next) => ({ type: "TEXT_ADDED", blockIndex, ...textAddPos(prev, next) })


const TextRemoved =
  (blockIndex, prev, next) => ({ type: "TEXT_REMOVED", blockIndex, ...textRemovePos(prev, next) })


export {
  BlockAdded,
  BlockRemoved,
  BlockTypeChanged,
  TextAdded,
  TextRemoved
}
