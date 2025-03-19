import { MAX_CARDS_TO_PLAY_IN_ONE_TURN } from "@/constants"
import { Card } from "./Card"
import { genRandomNumBetween } from "./utils"
import { Subject } from "@/utils/rx"

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

  drawCards(drawCount: number, deck: Card[]) {
    for (let i = 0; i < drawCount; i++) {
      const idx = genRandomNumBetween(0, deck.length - 1)
      const removedCards = deck.splice(idx, 1)
      this.addPlayerCards(removedCards)
    }
  }

  private addPlayerCards(cards: Card[]) {
    this.player.cards.push(...cards)
  }

  drawCards$ = new Subject<void>()
}

function createPlayer(id: string, deck: Card[]): Player {
  const player = {
    id,
    cards: [],
    remainingCardsToPlay: MAX_CARDS_TO_PLAY_IN_ONE_TURN,
  }

  new PlayerUtils(player).drawCards(5, deck)

  return player
}

export { PlayerUtils, createPlayer, Player }
