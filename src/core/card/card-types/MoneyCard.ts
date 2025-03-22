import { ICanPlay } from "./ICanPlay"
import { Card } from "@/core/Card"
import { GameState } from "@/core/MonopolyGame"
import { GameStateUtils } from "@/core/utils/GameStateUtils"

class MoneyCard implements ICanPlay {
  constructor(private card: Card, private gameState: GameState) {}
  playCard(): void {
    const gameUtils = new GameStateUtils(this.gameState)
    const player = gameUtils.getCurrentPlayer()

    player.moneyCards.push(this.card)
  }
}

export { MoneyCard }
