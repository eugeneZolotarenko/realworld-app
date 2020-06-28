import { ITEMS_IN_PAGINATION } from "../constants"
import { calculatePercentageOfPages } from "lib/utils/pagination/calculatePercentageOfPages"

export function calculatePagination({ page, pages, to, from }) {
  from.current = Math.floor(page - ITEMS_IN_PAGINATION / 2)
  to.current = Math.floor(page + ITEMS_IN_PAGINATION / 2)
  if (page >= pages.length - calculatePercentageOfPages(40)) {
    from.current = pages.length - ITEMS_IN_PAGINATION
    to.current = pages.length
  }
  if (page <= calculatePercentageOfPages(40)) {
    from.current = 0
    to.current = ITEMS_IN_PAGINATION
  }
}
