import { take } from "@/utils/rx"
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

    const currentPlayer = this.getCurrentTurnPlayer()
    currentPlayer.drawCards$.pipe(take(1)).subscribe(() => {
      currentPlayer.drawCards(2, this._gameState.deck)
    })
  }
  getGameState() {
    return this._gameState
  }

  private _currentPlayerUtils: PlayerUtils
  getCurrentTurnPlayer(): PlayerUtils {
    if (this._currentPlayerUtils) {
      return this._currentPlayerUtils
    }

    const player = this._gameState.players[0]
    this._currentPlayerUtils = new PlayerUtils(player)
    return this._currentPlayerUtils
  }
}

export { MonopolyGame }
