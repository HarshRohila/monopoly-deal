import { Observable } from "@/utils/rx"
import { CardUI } from "../models"

interface ICurrentPlayerPresenter {
  cardsInHand$: Observable<CardUI[]>
}

export { ICurrentPlayerPresenter }
