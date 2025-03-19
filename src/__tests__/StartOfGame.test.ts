import { INITIAL_CARDS_COUNT } from "@/constants"
import { GameState, MonopolyGame } from "@/core"
import { take } from "@/utils/rx"
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

  test("player can draw cards", () => {
    const numOfPlayers = 2
    const game = new MonopolyGame({ numOfPlayers })

    const gameState = game.getGameState()

    gameState.players.forEach((player) => {
      expect(player.cards.length).toBe(INITIAL_CARDS_COUNT)
    })

    const playerActions = game.getCurrentPlayerActions()
    playerActions.drawCards()
    const currentPlayerId = playerActions.playerId
    const cards = getCardsByPlayerId(gameState, currentPlayerId)

    expect(cards.length).toBe(7)
  })
})

function getCardsByPlayerId(gameState: GameState, playerId: string) {
  return gameState.players.find((player) => player.id === playerId)?.cards
}
