import { INITIAL_CARDS_COUNT } from "@/constants"
import { MonopolyGame } from "@/core"
import { take } from "@/utils/rx"
import { describe, expect, test } from "bun:test"

describe("Start of game", () => {
  test("each player should have some count of cards", () => {
    const numOfPlayers = 2
    const game = new MonopolyGame({ numOfPlayers })

    const gameState = game.getGameState()

    gameState.players.forEach((player) => {
      expect(player.cards.length).toBe(INITIAL_CARDS_COUNT)
    })

    const totalCards = 106
    const expectedRemainingDeckCardsCount =
      totalCards - numOfPlayers * INITIAL_CARDS_COUNT
    expect(gameState.deck.length).toBe(expectedRemainingDeckCardsCount)
  })

  test("player can draw cards", (done) => {
    const numOfPlayers = 2
    const game = new MonopolyGame({ numOfPlayers })

    const gameState = game.getGameState()

    gameState.players.forEach((player) => {
      expect(player.cards.length).toBe(INITIAL_CARDS_COUNT)
    })

    const player = game.getCurrentTurnPlayer()

    player.drawCards$.pipe(take(1)).subscribe(() => {
      try {
        expect(player.getPlayer().cards.length).toBe(7)
        done()
      } catch (err) {
        done(err)
      }
    })
    player.drawCards$.next()
  })
})
