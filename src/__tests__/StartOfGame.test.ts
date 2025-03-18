import { INITIAL_CARDS_COUNT } from "@/constants"
import { MonopolyGame } from "@/core"
import { describe, expect, test } from "bun:test"

describe("Start of game", () => {
  test("each player should have some count of cards", () => {
    const numOfPlayers = 2
    const game = new MonopolyGame({ numOfPlayers })

    const gameState = game.getGameState()

    gameState.players.forEach((player) => {
      expect(player.cards.length).toBe(INITIAL_CARDS_COUNT)
    })
    const totalCards = 106
    const expectedRemainingDeckCardsCount =
      totalCards - numOfPlayers * INITIAL_CARDS_COUNT
    expect(gameState.deck.length).toBe(expectedRemainingDeckCardsCount)
  })
})
