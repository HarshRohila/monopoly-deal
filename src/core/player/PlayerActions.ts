import { CardType, CardUtils, PropertyColor } from "../Card"
import {
  ICanPlay,
  PropertyCard,
  HotelCard,
  GoPassCard,
  MoneyCard,
} from "../card/card-types"
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
    const playableCard = this.getPlayableCard(cardIndex)

    playableCard.playCard(options)

    this.currentPlayerState.remainingCardsToPlay -= 1
  }
  private getPlayableCard(cardIndex: number): ICanPlay {
    const player = this.getPlayer()
    const card = player.cards[cardIndex]
    const cardUtils = new CardUtils(card)

    if (cardUtils.isMoneyCard()) {
      return new MoneyCard(card, this.gameState)
    } else if (cardUtils.isPropertyCard()) {
      return new PropertyCard(card, this.gameState)
    } else if (card.type === CardType.GoPass) {
      return new GoPassCard(card, this.gameState)
    } else if (card.type === CardType.Hotel) {
      return new HotelCard(card, this.gameState)
    }
  }

  endTurn() {}
}

export { PlayerActions }
