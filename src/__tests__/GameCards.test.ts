import { CardType, CardUtils, createGameCards } from "@/core/Card"
import { describe, expect, test } from "bun:test"

describe("Game cards", () => {
  const cards = createGameCards()

  test("game having 34 (non color-rent) action cards", () => {
    const actionCardsCount = cards.reduce(
      (acc, card) => acc + (new CardUtils(card).isActionCard() ? 1 : 0),
      0
    )
    expect(actionCardsCount).toBe(47)
  })

  test("game having 37 property cards", () => {
    const propertyCardsCount = cards.reduce(
      (acc, card) => acc + (card.type === CardType.Property ? 1 : 0),
      0
    )

    expect(propertyCardsCount).toBe(37)
  })

  test("game having 13 color-rent cards", () => {
    const colorRentCardsCount = cards.reduce(
      (acc, card) => acc + (new CardUtils(card).isColorRentCard() ? 1 : 0),
      0
    )

    expect(colorRentCardsCount).toBe(13)
  })

  test("game having 20 money cards", () => {
    const colorRentCardsCount = cards.reduce(
      (acc, card) => acc + (new CardUtils(card).isMoneyCard() ? 1 : 0),
      0
    )

    expect(colorRentCardsCount).toBe(20)
  })

  test("game having total 106 cards", () => {
    expect(cards.length).toBe(106)
  })
})
