import { INITIAL_CARDS_COUNT } from "@/constants"
import { GameState, MonopolyGame } from "@/core"
import { CardMetaType, CardType, PropertyColor } from "@/core/Card"
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

  test("when player plays a money card, it adds the card to player's moneyCards", () => {
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

  test("when player plays a property card, it adds the card to player's propertyCards", () => {
    const numOfPlayers = 2
    const game = new MonopolyGame({ numOfPlayers })

    const gameState = game.getGameState()

    // Set the current player's cards to a property card
    const currentPlayer = gameState.players[0]
    currentPlayer.cards = [
      {
        id: "1",
        type: CardType.Property,
        meta: { colors: [PropertyColor.Red] },
      },
    ]

    const playerActions = game.getCurrentPlayerActions()
    playerActions.playCard(0)

    expect(currentPlayer.propertyCards[PropertyColor.Red].length).toBe(1)
    expect(currentPlayer.cards.length).toBe(0)
    expect(gameState.currentPlayer.remainingCardsToPlay).toBe(2)
  })

  test("when player plays a wild property card, it adds the card to player's propertyCards", () => {
    const numOfPlayers = 2
    const game = new MonopolyGame({ numOfPlayers })

    const gameState = game.getGameState()

    // Set the current player's cards to a wild property card
    const currentPlayer = gameState.players[0]
    currentPlayer.cards = [
      {
        id: "1",
        type: CardType.Property,
        meta: { colors: [PropertyColor.Red, PropertyColor.Yellow] },
      },
    ]

    const playerActions = game.getCurrentPlayerActions()
    playerActions.playCard(0, { colorGroup: PropertyColor.Yellow })

    expect(currentPlayer.propertyCards[PropertyColor.Yellow].length).toBe(1)
    expect(currentPlayer.cards.length).toBe(0)
    expect(gameState.currentPlayer.remainingCardsToPlay).toBe(2)
  })

  test("when player plays a any-color wild property card, it adds the card to player's propertyCards", () => {
    const numOfPlayers = 2
    const game = new MonopolyGame({ numOfPlayers })

    const gameState = game.getGameState()

    // Set the current player's cards to a wild property card
    const currentPlayer = gameState.players[0]
    currentPlayer.cards = [
      {
        id: "1",
        type: CardType.WildProperty,
      },
    ]

    const playerActions = game.getCurrentPlayerActions()
    playerActions.playCard(0, { colorGroup: PropertyColor.Yellow })

    expect(currentPlayer.propertyCards[PropertyColor.Yellow].length).toBe(1)
    expect(currentPlayer.cards.length).toBe(0)
    expect(gameState.currentPlayer.remainingCardsToPlay).toBe(2)
  })

  test("when player plays a Go Pass card, it adds 2 cards to players hand from the deck and adds the go-pass card in discard pile", () => {
    const numOfPlayers = 2
    const game = new MonopolyGame({ numOfPlayers })

    const gameState = game.getGameState()

    // Set the current player's cards to a Go Pass card
    const currentPlayer = gameState.players[0]
    currentPlayer.cards = [{ id: "1", type: CardType.GoPass }]

    const playerActions = game.getCurrentPlayerActions()

    const deckSizeBefore = gameState.deck.length
    playerActions.playCard(0)

    expect(currentPlayer.cards.length).toBe(2)
    expect(gameState.discardPile.length).toBe(1)
    expect(gameState.discardPile[0].type).toBe(CardType.GoPass)
    expect(gameState.currentPlayer.remainingCardsToPlay).toBe(2)
    expect(gameState.deck.length).toBe(deckSizeBefore - 2)
  })

  test("when player plays a Hotel card as money card, it adds the card to player's moneyCards, also changes the type of card to money", () => {
    const numOfPlayers = 2
    const game = new MonopolyGame({ numOfPlayers })

    const gameState = game.getGameState()

    // Set the current player's cards to a Hotel card
    const currentPlayer = gameState.players[0]
    currentPlayer.cards = [{ id: "1", type: CardType.Hotel }]

    const playerActions = game.getCurrentPlayerActions()

    playerActions.playCard(0, { type: CardMetaType.Money })

    expect(currentPlayer.moneyCards.length).toBe(1)
    expect(currentPlayer.cards.length).toBe(0)
    expect(gameState.currentPlayer.remainingCardsToPlay).toBe(2)
    expect(currentPlayer.moneyCards[0].type).toBe(CardType.Hotel)
    expect(currentPlayer.moneyCards[0].meta.type).toBe(CardMetaType.Money)
  })
})

function getCardsByPlayerId(gameState: GameState, playerId: string) {
  return gameState.players.find((player) => player.id === playerId)?.cards
}
