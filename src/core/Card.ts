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
  createCards(4, CardType.ForcedDeal)
  createCards(3, CardType.Hotel)
  createCards(3, CardType.House)
  createCards(3, CardType.Birthday)
  createCards(3, CardType.JustSayNo)
  createCards(3, CardType.SlyDeal)
  createCards(10, CardType.GoPass)

  CardUtils.createPropertyCards().forEach((card) => {
    cards.push(card)
  })

  return cards
}

class CardUtils {
  private static cardCount = 0

  public static createCardFromType(type: CardType): Card {
    CardUtils.cardCount++

    return { id: CardUtils.cardCount.toString(), type }
  }

  public static createPropertyCards(): Card[] {
    return Object.keys(PropertyCards).map((value) => {
      return { id: value, type: CardType.Property }
    })
  }
}

const PropertyCards = {
  Brown1: "Brown1",
  Brown2: "Brown2",
  Blue1: "Blue1",
  Blue2: "Blue2",
  Green1: "Green1",
  Green2: "Green2",
  Green3: "Green3",
  LightBlue1: "LightBlue1",
  LightBlue2: "LightBlue2",
  LightBlue3: "LightBlue3",
  Orange1: "Orange1",
  Orange2: "Orange2",
  Orange3: "Orange3",
  Purple1: "Purple1",
  Purple2: "Purple2",
  Purple3: "Purple3",
  Red1: "Red1",
  Red2: "Red2",
  Red3: "Red3",
  Yellow1: "Yellow1",
  Yellow2: "Yellow2",
  Yellow3: "Yellow3",
  Black1: "Black1",
  Black2: "Black2",
  Black3: "Black3",
  Black4: "Black4",
  Mint1: "Mint1",
  Mint2: "Mint2",
  BlueGreen: "BlueGreen",
  LightBlueBrown: "LightBlueBrown",
  PinkOrange1: "PinkOrange1",
  PinkOrange2: "PinkOrange2",
  BlackGreen: "BlackGreen",
  BlackLightBlue: "BlackLightBlue",
  BlackMint: "BlackMint",
  RedYellow1: "RedYellow1",
  RedYellow2: "RedYellow2",
}

export { createGameCards, CardType }
