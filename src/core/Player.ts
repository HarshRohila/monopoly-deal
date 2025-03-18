import { INITIAL_CARDS_COUNT } from "@/constants"

interface Player {
  id: string
  cards: unknown[]
}

class PlayerUtils {
  constructor(private player: Player) {
    // this.cards = Array.from({ length: INITIAL_CARDS_COUNT }, (_, i) => ({}))
  }

  play() {
    console.log("Player is playing")
  }

  getPlayer() {
    return this.player
  }
}

function createPlayer(id: string): Player {
  return {
    id,
    cards: Array.from({ length: INITIAL_CARDS_COUNT }, (_, i) => ({})),
  }
}

export { PlayerUtils, createPlayer }
