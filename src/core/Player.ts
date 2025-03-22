import { Card, PropertyColor } from "./Card"
import { genRandomNumBetween } from "./utils"
import { Subject } from "@/utils/rx"

type PropertyCards = Record<PropertyColor, Card[]>

interface Player {
  id: string
  cards: Card[]
  moneyCards: Card[]
  propertyCards: PropertyCards
}

class PlayerUtils {
  constructor(private player: Player) {
    // this.cards = Array.from({ length: INITIAL_CARDS_COUNT }, (_, i) => ({}))
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
  const player: Player = {
    id,
    cards: [],
    moneyCards: [],
    propertyCards: {} as PropertyCards,
  }

  new PlayerUtils(player).drawCards(5, deck)

  return player
}

export { PlayerUtils, createPlayer, Player }
