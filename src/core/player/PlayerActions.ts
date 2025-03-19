import { GameState } from "../MonopolyGame"
import { PlayerUtils } from "../Player"

class PlayerActions {
  constructor(private gameState: GameState) {}

  get playerId() {
    return this.gameState.currentPlayer.playerId
  }

  private getPlayer() {
    return this.gameState.players.find((player) => player.id === this.playerId)
  }

  get currentPlayerState() {
    return this.gameState.currentPlayer
  }

  drawCards() {
    if (this.currentPlayerState.hasDrawnCards) return

    const player = this.getPlayer()
    const playerUtils = new PlayerUtils(player)
    playerUtils.drawCards(2, this.gameState.deck)
  }
  playCard(cardId: string) {
    this.currentPlayerState.remainingCardsToPlay -= 1
  }
  endTurn() {}
}

export { PlayerActions }
