import { INITIAL_CARDS_COUNT } from "@/constants"
import { GameState, MonopolyGame } from "@/core"
import { CardType } from "@/core/Card"
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

  test("player with 0 cards draws 5 cards", () => {
    const numOfPlayers = 2
    const game = new MonopolyGame({ numOfPlayers })

    const gameState = game.getGameState()

    // Set the current player's cards to 0
    const currentPlayer = gameState.players[0]
    currentPlayer.cards = []

    const playerActions = game.getCurrentPlayerActions()
    playerActions.drawCards()
    const currentPlayerId = playerActions.playerId
    const cards = getCardsByPlayerId(gameState, currentPlayerId)

    expect(cards.length).toBe(5)
  })

  test("playCard adds card to player's moneyCards if played card is a money card", () => {
    const numOfPlayers = 2
    const game = new MonopolyGame({ numOfPlayers })

    const gameState = game.getGameState()

    // Set the current player's cards to a money card
    const currentPlayer = gameState.players[0]
    currentPlayer.cards = [{ id: "1", type: CardType._1_M }]

    const playerActions = game.getCurrentPlayerActions()
    playerActions.playCard(0)

    expect(currentPlayer.moneyCards.length).toBe(1)
    expect(currentPlayer.moneyCards[0].type).toBe(CardType._1_M)
    expect(currentPlayer.cards.length).toBe(0)
  })
})

function getCardsByPlayerId(gameState: GameState, playerId: string) {
  return gameState.players.find((player) => player.id === playerId)?.cards
}
