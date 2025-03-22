import { CardPlayOptions } from "@/core/types"
import { ICanPlay } from "./ICanPlay"
import { Card, CardMetaType } from "@/core/Card"
import { GameState } from "@/core/MonopolyGame"
import { GameStateUtils } from "@/core/utils/GameStateUtils"

class HouseCard implements ICanPlay {
  private gameStateUtils: GameStateUtils
  constructor(private card: Card, private gameState: GameState) {
    this.gameStateUtils = new GameStateUtils(gameState)
  }
  playCard(options: CardPlayOptions): void {}
}

export { HouseCard }
