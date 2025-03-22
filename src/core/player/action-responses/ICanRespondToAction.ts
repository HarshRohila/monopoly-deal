import { ActionOptions } from "../PlayerActionsToHandleCardAction"

interface ICanRespondToAction {
  respondToAction(playerId: string, options: ActionOptions): void
}

export { ICanRespondToAction }
