import { PropertyColor } from "./types"

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

enum CardMetaType {
  Action = "Action",
  Money = "Money",
}

interface CardMeta {
  colors?: PropertyColor[]
  value?: number
  type?: CardMetaType
}

interface Card {
  id: string
  type: CardType
  meta?: CardMeta

  /** typeId will be same for each 1M card, and each 5M card */
  // typeId: string
}

function createGameCards() {
  const cards = []

  function createCards(count: number, type: CardType, meta: CardMeta = {}) {
    Array.from({ length: count }).forEach(() => {
      const card = CardUtils.createCardFromType(type)
      cards.push(card)
    })
  }

  createCards(2, CardType.DealBreaker)
  createCards(3, CardType.DebtCollector)
  createCards(2, CardType.DoubleRent)
  createCards(3, CardType.ForcedDeal)
  createCards(2, CardType.Hotel, { value: 4 })
  createCards(3, CardType.House, { value: 3 })
  createCards(3, CardType.Birthday)
  createCards(3, CardType.JustSayNo)
  createCards(3, CardType.SlyDeal)
  createCards(10, CardType.GoPass, { value: 1 })

  CardUtils.createPropertyCards().forEach((card) => {
    cards.push(card)
  })

  createCards(3, CardType.MultiColorRent)
  createCards(2, CardType.PurpleOrangeRent)
  createCards(2, CardType.BlackMintRent)
  createCards(2, CardType.BlueGreenRent)
  createCards(2, CardType.LightBlueBrownRent)
  createCards(2, CardType.PinkOrangeRent)

  createCards(1, CardType._10_M, { value: 10 })
  createCards(2, CardType._5_M, { value: 5 })
  createCards(3, CardType._4_M, { value: 4 })
  createCards(3, CardType._3_M, { value: 3 })
  createCards(5, CardType._2_M, { value: 2 })
  createCards(6, CardType._1_M, { value: 1 })

  createCards(2, CardType.WildProperty)

  return cards
}

class CardUtils {
  private static cardCount = 0

  public static createCardFromType(type: CardType, meta: CardMeta = {}): Card {
    CardUtils.cardCount++

    return { id: CardUtils.cardCount.toString(), type, meta }
  }

  public static createPropertyCards(): Card[] {
    return Object.keys(PropertyCards).map(() => {
      return CardUtils.createCardFromType(CardType.Property)
    })
  }

  constructor(private card: Card) {}

  isActionCard() {
    return !this.isPropertyCard() && !this.isMoneyCard()
  }

  isPropertyCard() {
    return (
      this.card.type === CardType.WildProperty ||
      this.card.type === CardType.Property
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

const PropertyCards: Record<string, unknown> = {
  Brown1: { colors: [PropertyColor.Brown] },
  Brown2: { colors: [PropertyColor.Brown] },
  Blue1: { colors: [PropertyColor.Blue] },
  Blue2: { colors: [PropertyColor.Blue] },
  Green1: { colors: [PropertyColor.Green] },
  Green2: { colors: [PropertyColor.Green] },
  Green3: { colors: [PropertyColor.Green] },
  LightBlue1: { colors: [PropertyColor.LightBlue] },
  LightBlue2: { colors: [PropertyColor.LightBlue] },
  LightBlue3: { colors: [PropertyColor.LightBlue] },
  Orange1: { colors: [PropertyColor.Orange] },
  Orange2: { colors: [PropertyColor.Orange] },
  Orange3: { colors: [PropertyColor.Orange] },
  Purple1: { colors: [PropertyColor.Purple] },
  Purple2: { colors: [PropertyColor.Purple] },
  Purple3: { colors: [PropertyColor.Purple] },
  Red1: { colors: [PropertyColor.Red] },
  Red2: { colors: [PropertyColor.Red] },
  Red3: { colors: [PropertyColor.Red] },
  Yellow1: { colors: [PropertyColor.Yellow] },
  Yellow2: { colors: [PropertyColor.Yellow] },
  Yellow3: { colors: [PropertyColor.Yellow] },
  Black1: { colors: [PropertyColor.Black] },
  Black2: { colors: [PropertyColor.Black] },
  Black3: { colors: [PropertyColor.Black] },
  Black4: { colors: [PropertyColor.Black] },
  Mint1: { colors: [PropertyColor.Mint] },
  Mint2: { colors: [PropertyColor.Mint] },
  BlueGreen: { colors: [PropertyColor.Blue, PropertyColor.Green] },
  LightBlueBrown: { colors: [PropertyColor.LightBlue, PropertyColor.Brown] },
  PinkOrange1: { colors: [PropertyColor.Pink, PropertyColor.Orange] },
  PinkOrange2: { colors: [PropertyColor.Pink, PropertyColor.Orange] },
  BlackGreen: { colors: [PropertyColor.Black, PropertyColor.Green] },
  BlackLightBlue: { colors: [PropertyColor.Black, PropertyColor.LightBlue] },
  BlackMint: { colors: [PropertyColor.Black, PropertyColor.Mint] },
  RedYellow1: { colors: [PropertyColor.Red, PropertyColor.Yellow] },
  RedYellow2: { colors: [PropertyColor.Red, PropertyColor.Yellow] },
}

export {
  createGameCards,
  CardType,
  CardUtils,
  Card,
  PropertyColor,
  CardMetaType,
}
