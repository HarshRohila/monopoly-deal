import { CardPlayOptions } from "@/core/types"
import { ICanPlay } from "./ICanPlay"
import { Card } from "@/core/Card"
import { GameState } from "@/core/MonopolyGame"

class GoPassCard implements ICanPlay {
  constructor(private card: Card, private gameState: GameState) {}
  playCard(options?: CardPlayOptions): void {
    throw new Error("Method not implemented.")
  }
}

export { GoPassCard }
