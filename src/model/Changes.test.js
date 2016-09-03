import {
  BlockAdded,
  BlockRemoved,
  BlockTypeChanged,
  TextAdded,
  TextRemoved
} from "./Changes";

describe("block added", () => {

  it("uses the type BLOCK_ADDED", () => {
    expect(BlockAdded(0, "unstyled", "").type).toBe("BLOCK_ADDED")
  })

  it("sets the blockIndex", () => {
    expect(BlockAdded(113, "unstyled", "").blockIndex).toBe(113)
  })

  it("sets the blockType", () => {
    expect(BlockAdded(0, "unstyled", "").blockType).toBe("unstyled")
  })

  it("sets text", () => {
    expect(BlockAdded(0, "unstyled", "hello").text).toBe("hello")
  })

})


describe("block removed", () => {

  it("uses the type BLOCK_REMOVED", () => {
    expect(BlockRemoved(0).type).toBe("BLOCK_REMOVED")
  })

  it("sets the blockIndex", () => {
    expect(BlockRemoved(113).blockIndex).toBe(113)
  })

})


describe("block type changed", () => {

  it("uses the type BLOCK_TYPE_CHANGED", () => {
    expect(BlockTypeChanged(0, "unstyled").type).toBe("BLOCK_TYPE_CHANGED")
  })

  it("sets the blockIndex", () => {
    expect(BlockTypeChanged(113, "unstyled").blockIndex).toBe(113)
  })

  it("sets the blockType", () => {
    expect(BlockTypeChanged(0, "header-one").blockType).toBe("header-one")
  })

})


describe("text added", () => {

  it("uses the type TEXT_ADDED", () => {
    expect(TextAdded(0, "a", "aa").type).toBe("TEXT_ADDED")
  })

  it("sets the blockIndex", () => {
    expect(TextAdded(113, "a", "aa").blockIndex).toBe(113)
  })

  it("adds text at beginning", () => {
    const change = TextAdded(0, "a", "ba")
    expect(change.start).toBe(0)
    expect(change.text).toBe("b")
  })

  it("adds text at middle", () => {
    const change = TextAdded(0, "aa", "abaaa")
    expect(change.start).toBe(1)
    expect(change.text).toBe("baa")
  })

  it("adds text at end", () => {
    const change = TextAdded(0, "a", "ab")
    expect(change.start).toBe(1)
    expect(change.text).toBe("b")
  })

})


describe("text removed", () => {

  it("uses the type TEXT_REMOVED", () => {
    expect(TextRemoved(0, "aa", "a").type).toBe("TEXT_REMOVED")
  })

  it("sets the blockIndex", () => {
    expect(TextRemoved(113, "aa", "a").blockIndex).toBe(113)
  })

  it("removes text at beginning", () => {
    const change = TextRemoved(0, "ab", "b")
    expect(change.start).toBe(0)
    expect(change.length).toBe(1)
  })

  it("removes text at middle", () => {
    const change = TextRemoved(0, "abaaa", "aa")
    expect(change.start).toBe(1)
    expect(change.length).toBe(3)
  })

  it("removes text at end", () => {
    const change = TextRemoved(0, "ab", "a")
    expect(change.start).toBe(1)
    expect(change.length).toBe(1)
  })

})
