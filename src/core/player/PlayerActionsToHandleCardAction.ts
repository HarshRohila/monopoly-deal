import { Card, CardType } from "../Card"
import { GameState } from "../MonopolyGame"
import { BirthdayActionResponse, ICanRespondToAction } from "./action-responses"

interface ActionOptions {
  moneyCards?: Card[]
}

/**
 * This class if for performing player actions on which card is played
 */
class PlayerActionsToHandleCardAction {
  constructor(
    private gameState: GameState,
    private playerId: string,
    private cardAction: CardType
  ) {}

  doAction(options?: ActionOptions) {
    const actionResponder = this.createActionResponder()
    actionResponder.respondToAction(this.playerId, options)
  }

  private createActionResponder(): ICanRespondToAction {
    switch (this.cardAction) {
      case CardType.Birthday:
        return new BirthdayActionResponse(this.gameState)
    }
  }
}

export { PlayerActionsToHandleCardAction, ActionOptions }
