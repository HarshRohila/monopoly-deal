import { Card, CardType } from "@/core/Card"
import { GameState } from "@/core/MonopolyGame"
import { ICanPlay } from "./ICanPlay"
import { CardPlayOptions, PropertyColor } from "@/core/types"
import { Player } from "@/core/Player"
import { assert } from "@/core/utils"

class PropertyCard implements ICanPlay {
  constructor(private card: Card, private gameState: GameState) {}
  playCard(options?: CardPlayOptions): void {
    const propertyColor = this.getPropertyColor(options)
    this.updateCards(propertyColor)
  }

  private getPropertyColor(options?: CardPlayOptions): PropertyColor {
    const isWildPropertyCard = this.isCardAWildPropertyCard()

    if (isWildPropertyCard) {
      const playerIntentedColor = options?.colorGroup
      assert(
        !!playerIntentedColor,
        "Player need to select color to play a wild property card."
      )

      if (!this.isAnyColorWildCard) {
        assert(
          this.card.meta?.colors.includes(playerIntentedColor),
          "Player selected wrong color for wild property card."
        )
      }

      return playerIntentedColor
    } else {
      const color = this.card.meta?.colors[0]
      return color
    }
  }

  private get isAnyColorWildCard() {
    return this.card.type === CardType.WildProperty
  }

  private updateCards(color: PropertyColor) {
    const player = this.getCurrentPlayer()
    this.updatePlayersPropertyCards(player, color)
  }

  private getCurrentPlayer() {
    return this.gameState.players.find(
      (player) => player.id === this.gameState.currentPlayer.playerId
    )
  }

  private isCardAWildPropertyCard() {
    return (
      this.card.meta?.colors.length > 1 ||
      this.card.type === CardType.WildProperty
    )
  }

  private updatePlayersPropertyCards(
    player: Player,
    propertyColor: PropertyColor
  ) {
    if (!player.propertyCards[propertyColor]) {
      player.propertyCards[propertyColor] = []
    }

    player.propertyCards[propertyColor].push(this.card)
  }
}

export { PropertyCard }
