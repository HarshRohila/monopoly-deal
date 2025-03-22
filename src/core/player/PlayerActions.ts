import { Card, CardMetaType, CardType, CardUtils } from "../Card"
import {
  ICanPlay,
  PropertyCard,
  HotelCard,
  GoPassCard,
  MoneyCard,
  ActionAsMoneyCard,
  HouseCard,
  BirthdayCard,
} from "../card/card-types"
import { GameState } from "../MonopolyGame"
import { PlayerUtils } from "../Player"
import { CardPlayOptions } from "../types"
import { GameStateUtils } from "../utils/GameStateUtils"

class PlayerActions {
  private gameStateUtils: GameStateUtils

  constructor(private gameState: GameState) {
    this.gameStateUtils = new GameStateUtils(gameState)
  }

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
    const card = this.getCardByIndex(cardIndex)

    this.gameStateUtils.removeCardFromPlayer(card, this.getPlayer())

    const playableCard = this.getPlayableCard(card, options)

    playableCard.playCard(options)

    this.currentPlayerState.remainingCardsToPlay -= 1
  }
  private getPlayableCard(card: Card, options?: CardPlayOptions): ICanPlay {
    const cardUtils = new CardUtils(card)

    if (cardUtils.isMoneyCard()) {
      return new MoneyCard(card, this.gameState)
    } else if (cardUtils.isPropertyCard()) {
      return new PropertyCard(card, this.gameState)
    } else if (
      cardUtils.isActionCard() &&
      options?.type === CardMetaType.Money
    ) {
      return new ActionAsMoneyCard(card, this.gameState)
    } else if (card.type === CardType.GoPass) {
      return new GoPassCard(card, this.gameState)
    } else if (card.type === CardType.Hotel) {
      return new HotelCard(card, this.gameState)
    } else if (card.type === CardType.House) {
      return new HouseCard(card, this.gameState)
    } else if (card.type === CardType.Birthday) {
      return new BirthdayCard(card, this.gameState)
    }
  }

  private getCardByIndex(cardIndex: number) {
    const player = this.getPlayer()
    const card = player.cards[cardIndex]
    return card
  }

  endTurn() {}
}

export { PlayerActions }
