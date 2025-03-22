import { CardPlayOptions } from "@/core/types"
import { ICanPlay } from "./ICanPlay"
import { Card, CardMetaType } from "@/core/Card"
import { GameState } from "@/core/MonopolyGame"
import { GameStateUtils } from "@/core/utils/GameStateUtils"

class HotelCard implements ICanPlay {
  constructor(private card: Card, private gameState: GameState) {}
  playCard(options: CardPlayOptions): void {
    if (options.type === CardMetaType.Money) {
      const gameUtils = new GameStateUtils(this.gameState)
      const currentPlayer = gameUtils.getCurrentPlayer()

      currentPlayer.moneyCards.push({
        ...this.card,
        meta: { ...this.card.meta, type: CardMetaType.Money },
      })
    }
  }
}

export { HotelCard }
