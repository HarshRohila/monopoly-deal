import { SingletonContainer } from "singleton-injection"
import { CurrentPlayerPresenter, ICurrentPlayerPresenter } from "../presenters"
import { MonopolyGame } from "@/core"

const singletonMap = {
  CurrentPlayerPresenter: () =>
    new CurrentPlayerPresenter() as ICurrentPlayerPresenter,
  Game: () => new MonopolyGame({ numOfPlayers: 2 }),
}

const singletonContainer = new SingletonContainer(singletonMap)

export { singletonContainer as SingletonContainer }
