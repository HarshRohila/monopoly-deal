import { ICanPlay } from "./ICanPlay"
import { Card } from "@/core/Card"
import { GameState } from "@/core/MonopolyGame"
import { GameStateUtils } from "@/core/utils/GameStateUtils"

class GoPassCard implements ICanPlay {
  constructor(private card: Card, private gameState: GameState) {}
  playCard(): void {
    const gameUtils = new GameStateUtils(this.gameState)
    const player = gameUtils.getCurrentPlayer()
    const deck = this.gameState.deck

    // Add 2 cards to the player's hand from the deck
    const drawnCards = deck.slice(0, 2)
    player.cards.push(...drawnCards)
    this.gameState.deck = deck.slice(2)

    // Add the Go Pass card to the discard pile
    this.gameState.discardPile.push(this.card)
  }
}

export { GoPassCard }
