import { INITIAL_CARDS_COUNT } from "@/constants"
import { createPlayer, Player, PlayerUtils } from "./Player"

// interface Player {
//   id: string
//   cards: unknown[]
// }

interface GameState {
  players: Player[]
}

interface MonopolyGameOptions {
  numOfPlayers: number
}

class MonopolyGame {
  private _gameState: GameState

  constructor(options: MonopolyGameOptions) {
    this._gameState = {
      players: Array.from({ length: options.numOfPlayers }, (_, i) => {
        const playerId = (i + 1).toString()
        return createPlayer(playerId)
      }),
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
