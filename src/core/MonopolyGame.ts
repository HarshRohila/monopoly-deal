import { Card, createGameCards } from "./Card"
import { createPlayer, Player, PlayerUtils } from "./Player"

interface GameState {
  players: Player[]
  deck: Card[]
}

interface MonopolyGameOptions {
  numOfPlayers: number
}

class MonopolyGame {
  private _gameState: GameState

  constructor(options: MonopolyGameOptions) {
    const deckOfCards = createGameCards()

    this._gameState = {
      players: Array.from({ length: options.numOfPlayers }, (_, i) => {
        const playerId = (i + 1).toString()
        return createPlayer(playerId, deckOfCards)
      }),
      deck: deckOfCards,
    }
  }
  getGameState() {
    return this._gameState
  }
  getNextTurnPlayer(): PlayerUtils {
    const player = this._gameState.players[0]
    return new PlayerUtils(player)
  }
}

export { MonopolyGame }
