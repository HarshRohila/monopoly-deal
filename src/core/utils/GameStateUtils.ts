import { Card } from "../Card"
import { GameState } from "../MonopolyGame"
import { Player } from "../Player"

class GameStateUtils {
  constructor(private gameState: GameState) {}

  getCurrentPlayer() {
    return this.gameState.players.find(
      (player) => player.id === this.gameState.currentPlayer.playerId
    )
  }

  removeCardFromPlayer(card: Card, player: Player) {
    player.cards = player.cards.filter((c) => c.id !== card.id)
  }
}

export { GameStateUtils }
