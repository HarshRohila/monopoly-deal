import { CardType, createGameCards } from "@/core/Card"
import { describe, expect, test } from "bun:test"

describe("Game cards", () => {
  test("game having 36 action cards", () => {
    const cards = createGameCards()

    const actionCardsCount = cards.reduce(
      (acc, card) => acc + (card.type !== CardType.Property ? 1 : 0),
      0
    )
    expect(actionCardsCount).toBe(36)
  })

  test("game having 37 property cards", () => {
    const cards = createGameCards()

    const propertyCardsCount = cards.reduce(
      (acc, card) => acc + (card.type === CardType.Property ? 1 : 0),
      0
    )

    expect(propertyCardsCount).toBe(37)
  })
})
