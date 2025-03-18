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
  MultiColorRent = "MultiColorRent",
  PurpleOrangeRent = "PurpleOrangeRent",
  BlackMintRent = "BlackMintRent",
  BlueGreenRent = "BlueGreenRent",
  LightBlueBrownRent = "LightBlueBrownRent",
  RedYellowRent = "RedYellowRent",
  PinkOrangeRent = "PinkOrangeRent",

  // money cards
  _10_M = "10_M",
  _1_M = "1_M",
  _2_M = "2_M",
  _3_M = "3_M",
  _4_M = "4_M",
  _5_M = "5_M",

  WildProperty = "WildProperty",
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
  createCards(2, CardType.Hotel)
  createCards(3, CardType.House)
  createCards(3, CardType.Birthday)
  createCards(3, CardType.JustSayNo)
  createCards(3, CardType.SlyDeal)
  createCards(10, CardType.GoPass)

  CardUtils.createPropertyCards().forEach((card) => {
    cards.push(card)
  })

  createCards(3, CardType.MultiColorRent)
  createCards(2, CardType.PurpleOrangeRent)
  createCards(2, CardType.BlackMintRent)
  createCards(2, CardType.BlueGreenRent)
  createCards(2, CardType.LightBlueBrownRent)
  createCards(2, CardType.PinkOrangeRent)

  createCards(1, CardType._10_M)
  createCards(2, CardType._5_M)
  createCards(3, CardType._4_M)
  createCards(3, CardType._3_M)
  createCards(5, CardType._2_M)
  createCards(6, CardType._1_M)

  createCards(2, CardType.WildProperty)

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

  constructor(private card: Card) {}

  isActionCard() {
    return (
      this.card.type !== CardType.WildProperty &&
      this.card.type !== CardType.Property &&
      !this.isColorRentCard() &&
      !this.isMoneyCard()
    )
  }

  isColorRentCard() {
    return (
      this.card.type.endsWith("Rent") && this.card.type !== CardType.DoubleRent
    )
  }

  isMoneyCard() {
    return this.card.type.split("_")[1] === "M"
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

export { createGameCards, CardType, CardUtils }
