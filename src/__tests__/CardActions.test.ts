import { GameState, MonopolyGame } from "@/core"
import { CardMetaType, CardType } from "@/core/Card"
import { describe, it, test, expect } from "bun:test"

describe("Card actions", () => {
  describe("Birthday Card", () => {
    test("when player plays a birthday card, it collects 2M from each player", () => {
      // Arrange
      const game = new MonopolyGame({ numOfPlayers: 3 })
      const gameState = game.getGameState()

      const gameTestUtils = new GameTestUtils(game)
      const player2 = gameState.players[1]
      player2.moneyCards = gameTestUtils.drawCardsFromDeck(CardType._1_M, 2)

      const player3 = gameState.players[2]
      player3.moneyCards = gameTestUtils.drawCardsFromDeck(CardType._2_M, 1)

      // player1 plays birthday card
      gameTestUtils.playCardOfType(CardType.Birthday)

      const playerActions = game.getActionedPlayersActions()
      playerActions[0].doAction({
        moneyCards: [player2.moneyCards[0], player2.moneyCards[1]],
      })

      playerActions[1].doAction({ moneyCards: [player3.moneyCards[0]] })

      // Assert
      expect(player2.moneyCards.length).toBe(0)
      expect(player3.moneyCards.length).toBe(0)
      expect(gameState.players[0].moneyCards.length).toBe(3)
    })
  })
})

class GameTestUtils {
  constructor(private game: MonopolyGame) {}
  drawCardsFromDeck(cardType: CardType, drawCount: number) {
    const gameState = this.game.getGameState()

    // return drawCount cards of cardType from deck, also remove cards from the deck
    const drawnCards = []
    for (let i = 0; i < drawCount; i++) {
      const card = gameState.deck.find((card) => card.type === cardType)
      drawnCards.push(card)
      gameState.deck = gameState.deck.filter((c) => c.id !== card.id)
    }
    return drawnCards
  }

  playCardOfType(cardType: CardType) {
    const gameState = this.game.getGameState()
    const currentPlayer = gameState.players[0]
    currentPlayer.cards = [{ id: "1", type: cardType }]
    const playerActions = this.game.getCurrentPlayerActions()
    playerActions.playCard(0)
  }
}
