enum CardType {
  // monopoly deal action cards
  DealBreaker = "DealBreaker",
  DebtCollector = "DebtCollector",
  DoubleRent = "DoubleRent",
  ForcedDeal = "ForcedDeal",
  Hotel = "Hotel",
  House = "House",
  Birthday = "Birthday",
  JustSayNo = "JustSayNo",
  SlyDeal = "SlyDeal",
  GoPass = "GoPass",

  Property = "Property",
}

interface Card {
  id: string
  type: CardType

  /** typeId will be same for each 1M card, and each 5M card */
  // typeId: string
}

function createGameCards() {
  const cards = []

  function createCards(count: number, type: CardType) {
    Array.from({ length: count }).forEach(() => {
      const card = CardUtils.createCardFromType(type)
      cards.push(card)
    })
  }

  createCards(2, CardType.DealBreaker)
  createCards(3, CardType.DebtCollector)
  createCards(2, CardType.DoubleRent)
  createCards(3, CardType.ForcedDeal)
  createCards(3, CardType.Hotel)
  createCards(3, CardType.House)
  createCards(3, CardType.Birthday)
  createCards(3, CardType.JustSayNo)
  createCards(3, CardType.SlyDeal)
  createCards(10, CardType.GoPass)

  return cards
}

class CardUtils {
  private static cardCount = 0

  public static createCardFromType(type: CardType): Card {
    CardUtils.cardCount++

    return { id: CardUtils.cardCount.toString(), type }
  }
}
