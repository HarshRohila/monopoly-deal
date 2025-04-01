import { GameFactory } from "@/core/utils/GameFactory"
import { BehaviorSubject } from "@/utils/rx"
import { ICurrentPlayerPresenter } from "./ICurrentPlayerPresenter"
import { CardUI } from "../models"
import { SingletonContainer } from "../utils/SingletonContainer"

const game = GameFactory.getGame()

class CurrentPlayerPresenter implements ICurrentPlayerPresenter {
  cardsInHand$: BehaviorSubject<CardUI[]>

  private game = SingletonContainer.resolve("Game")

  constructor() {
    const getCardsInHand: () => CardUI[] = () => {
      const currentPlayerId = this.game.getGameState().currentPlayer.playerId

      const player = this.game
        .getGameState()
        .players.find((player) => player.id === currentPlayerId)

      return player.cards.map((card) => {
        return {
          image: "",
        }
      })
    }

    this.cardsInHand$ = new BehaviorSubject(getCardsInHand())
    game.gameStateChanged$.subscribe(() => {
      this.cardsInHand$.next(getCardsInHand())
    })
  }
}

export { CurrentPlayerPresenter }
