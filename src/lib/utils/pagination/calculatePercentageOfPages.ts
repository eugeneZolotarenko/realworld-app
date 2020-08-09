import { ITEMS_IN_PAGINATION } from "../constants"

export function calculatePercentageOfPages(percent: number) {
  return Math.ceil(ITEMS_IN_PAGINATION * (percent / 100))
}
