import { CardUtils, PropertyColor } from "../Card"
import { PropertyCard } from "../card/card-types/PropertyCard"
import { GameState } from "../MonopolyGame"
import { PlayerUtils } from "../Player"
import { CardPlayOptions } from "../types"

class PlayerActions {
  constructor(private gameState: GameState) {}

  get playerId() {
    return this.gameState.currentPlayer.playerId
  }

  private getPlayer() {
    return this.gameState.players.find((player) => player.id === this.playerId)
  }

  get currentPlayerState() {
    return this.gameState.currentPlayer
  }

  drawCards() {
    if (this.currentPlayerState.hasDrawnCards) return

    const player = this.getPlayer()
    const playerUtils = new PlayerUtils(player)
    const drawCount = player.cards.length === 0 ? 5 : 2
    playerUtils.drawCards(drawCount, this.gameState.deck)
  }
  playCard(cardIndex: number, options?: CardPlayOptions) {
    const player = this.getPlayer()
    const card = player.cards[cardIndex]
    const cardUtils = new CardUtils(card)

    if (cardUtils.isMoneyCard()) {
      player.moneyCards.push(card)
      player.cards.splice(cardIndex, 1)
    } else if (cardUtils.isPropertyCard()) {
      new PropertyCard(card, this.gameState).playCard(options)
    }

    this.currentPlayerState.remainingCardsToPlay -= 1
  }
  endTurn() {}
}

export { PlayerActions }
