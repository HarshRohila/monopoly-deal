import { GameState } from "@/core/MonopolyGame"
import { ICanRespondToAction } from "./ICanRespondToAction"
import { Card } from "@/core/Card"
import { ActionOptions } from "../PlayerActionsToHandleCardAction"

class BirthdayActionResponse implements ICanRespondToAction {
  constructor(private gameState: GameState) {}
  respondToAction(playerId: string, options: ActionOptions): void {
    const player = this.gameState.players.find(
      (player) => player.id === playerId
    )

    const isCardInOptions = (card: Card) =>
      options.moneyCards.some((moneyCard) => moneyCard.id === card.id)

    const isCardSelectedForAction = (card: Card) => {
      return isCardInOptions(card)
    }

    player.moneyCards = player.moneyCards.filter(
      (card) => !isCardSelectedForAction(card)
    )

    const currentPlayer = this.gameState.players.find(
      (p) => p.id === this.gameState.currentPlayer.playerId
    )
    currentPlayer.moneyCards.push(...options.moneyCards)
  }
}

export { BirthdayActionResponse }
