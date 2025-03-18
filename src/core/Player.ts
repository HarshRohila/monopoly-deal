import { INITIAL_CARDS_COUNT } from "@/constants"
import { Card } from "./Card"
import { genRandomNumBetween } from "./utils"

interface Player {
  id: string
  cards: Card[]
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

function createPlayer(id: string, deck: Card[]): Player {
  const playerCards = getRandomCards(deck)

  return {
    id,
    cards: playerCards,
  }
}

export { PlayerUtils, createPlayer, Player }
function getRandomCards(deck: Card[]) {
  const playerCards = []
  for (let i = 0; i < INITIAL_CARDS_COUNT; i++) {
    const idx = genRandomNumBetween(0, deck.length - 1)
    const removedCards = deck.splice(idx, 1)
    playerCards.push(...removedCards)
  }
  return playerCards
}
