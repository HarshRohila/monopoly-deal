import { CardPlayOptions } from "@/core/types"
import { ICanPlay } from "./ICanPlay"
import { Card, CardMetaType } from "@/core/Card"
import { GameState } from "@/core/MonopolyGame"
import { GameStateUtils } from "@/core/utils/GameStateUtils"

class ActionAsMoneyCard implements ICanPlay {
  private gameStateUtils: GameStateUtils
  constructor(private card: Card, private gameState: GameState) {
    this.gameStateUtils = new GameStateUtils(gameState)
  }
  playCard(options: CardPlayOptions): void {
    const card = this.card
    const gameUtils = new GameStateUtils(this.gameState)
    const currentPlayer = gameUtils.getCurrentPlayer()

    currentPlayer.moneyCards.push({
      ...card,
      meta: { ...card.meta, type: CardMetaType.Money },
    })
  }
}

export { ActionAsMoneyCard }
