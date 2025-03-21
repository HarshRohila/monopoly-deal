import { CardMetaType } from "../Card"

interface CardPlayOptions {
  colorGroup?: PropertyColor
  type?: CardMetaType
}

enum PropertyColor {
  Brown = "Brown",
  LightBlue = "LightBlue",
  Pink = "Pink",
  Red = "Red",
  Blue = "Blue",
  Green = "Green",
  Orange = "Orange",
  Purple = "Purple",
  Black = "Black",
  White = "White",
  Yellow = "Yellow",
  Mint = "Mint",
}

export { CardPlayOptions, PropertyColor }
