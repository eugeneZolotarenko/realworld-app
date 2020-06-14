import { ITEMS_IN_PAGINATION } from "./constants"

function getBreakPoint(num) {
  return Math.ceil(ITEMS_IN_PAGINATION * num)
}

export function calculatePagination({ page, pages, to, from }) {
  if (page < pages.length - getBreakPoint(0.5)) {
    if (page > to.current - getBreakPoint(0.3)) {
      to.current = to.current + getBreakPoint(0.1)
      from.current = from.current + getBreakPoint(0.1)
    }
    if (page > to.current - getBreakPoint(0.2)) {
      to.current = to.current + getBreakPoint(0.2)
      from.current = from.current + getBreakPoint(0.2)
    }
    if (page > to.current - getBreakPoint(0.3)) {
      to.current = to.current + getBreakPoint(0.1)
      from.current = from.current + getBreakPoint(0.1)
    }
  }
  if (page > getBreakPoint(0.4)) {
    if (page < from.current + getBreakPoint(0.2)) {
      to.current = to.current - getBreakPoint(0.1)
      from.current = from.current - getBreakPoint(0.1)
    }
    if (page < from.current + getBreakPoint(0.3)) {
      to.current = to.current - getBreakPoint(0.2)
      from.current = from.current - getBreakPoint(0.2)
    }
    if (page < from.current + getBreakPoint(0.4)) {
      to.current = to.current - getBreakPoint(0.1)
      from.current = from.current - getBreakPoint(0.1)
    }
  }
  if (page >= pages.length - getBreakPoint(0.4)) {
    from.current = pages.length - ITEMS_IN_PAGINATION
    to.current = pages.length
  }
  if (page <= getBreakPoint(0.4)) {
    from.current = 0
    to.current = ITEMS_IN_PAGINATION
  }
}
