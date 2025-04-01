import { Card, CardType, createGameCards } from "./Card"
import { createPlayer, Player } from "./Player"
import { PlayerActions } from "./player/PlayerActions"
import { MAX_CARDS_TO_PLAY_IN_ONE_TURN } from "@/constants"
import { PlayerActionsToHandleCardAction } from "./player/PlayerActionsToHandleCardAction"
import { Subject } from "@/utils/rx"

interface PlayerAction {
  type: CardType
  playerIds: string[]
}
interface CurrrentPlayerState {
  playerId: string
  hasDrawnCards: boolean
  remainingCardsToPlay: number
  action: PlayerAction | null
}

interface GameState {
  players: Player[]
  deck: Card[]
  currentPlayer: CurrrentPlayerState
  discardPile: Card[]
}

interface MonopolyGameOptions {
  numOfPlayers: number
}

function newCurrentPlayerState(playerId: string): CurrrentPlayerState {
  return {
    playerId,
    hasDrawnCards: false,
    remainingCardsToPlay: MAX_CARDS_TO_PLAY_IN_ONE_TURN,
    actionedPlayerIds: {},
  }
}

class MonopolyGame {
  private _gameState: GameState

  constructor(options: MonopolyGameOptions) {
    const deckOfCards = createGameCards()

    const players = Array.from({ length: options.numOfPlayers }, (_, i) => {
      const playerId = (i + 1).toString()
      return createPlayer(playerId, deckOfCards)
    })

    this._gameState = {
      players,
      deck: deckOfCards,
      currentPlayer: newCurrentPlayerState(players[0].id),
      discardPile: [],
    }
  }
  getGameState() {
    return this._gameState
  }

  getCurrentPlayerActions() {
    return new PlayerActions(this._gameState)
  }

  getActionedPlayersActions(): PlayerActionsToHandleCardAction[] {
    const action = this._gameState.currentPlayer.action

    return action.playerIds.map((playerId) => {
      return new PlayerActionsToHandleCardAction(
        this._gameState,
        playerId,
        action.type
      )
    })
  }

  gameStateChanged$ = new Subject<void>()
}

export { MonopolyGame, GameState }
export { MonopolyGame as Game }
