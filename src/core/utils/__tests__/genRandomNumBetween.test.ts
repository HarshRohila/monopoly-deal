import { describe, expect, it } from "bun:test"
import { genRandomNumBetween } from ".."

describe("genRandomNumBetween", () => {
  it("returns a number within the specified range", () => {
    const start = 1
    const end = 10
    const result = genRandomNumBetween(start, end)
    expect(result).toBeGreaterThanOrEqual(start)
    expect(result).toBeLessThanOrEqual(end)
  })

  it("handles edge case where start and end are the same", () => {
    const start = 5
    const end = 5
    const result = genRandomNumBetween(start, end)
    expect(result).toBe(start)
  })
})
