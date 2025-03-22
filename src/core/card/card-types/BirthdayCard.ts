import { ICanPlay } from "./ICanPlay"
import { Card } from "@/core/Card"
import { GameState } from "@/core/MonopolyGame"
import { GameStateUtils } from "@/core/utils/GameStateUtils"

class BirthdayCard implements ICanPlay {
  private gameStateUtils: GameStateUtils
  constructor(private card: Card, private gameState: GameState) {
    this.gameStateUtils = new GameStateUtils(gameState)
  }
  playCard(): void {
    const currentPlayer = this.gameStateUtils.getCurrentPlayer()

    this.gameState.currentPlayer.action = {
      type: this.card.type,
      playerIds: this.gameState.players
        .map((player) => player.id)
        .filter((id) => id !== currentPlayer.id),
    }
  }
}

export { BirthdayCard }
