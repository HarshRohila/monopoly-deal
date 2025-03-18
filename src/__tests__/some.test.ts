import { INITIAL_CARDS_COUNT } from "@/constants"
import { MonopolyGame } from "@/core"
import { describe, expect, test } from "bun:test"

describe("Start of game", () => {
  test("each player should have some count of cards", () => {
    const game = new MonopolyGame({ numOfPlayers: 2 })

    const gameState = game.getGameState()
    console.log(gameState)

    gameState.players.forEach((player) => {
      expect(player.cards.length).toBe(INITIAL_CARDS_COUNT)
    })
  })
})
