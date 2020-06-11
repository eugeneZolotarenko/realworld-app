export function calculatePagination({ page, pages, to, from }) {
  if (page < pages.length - 5) {
    if (page > to.current - 3) {
      to.current = to.current + 1
      from.current = from.current + 1
    }
    if (page > to.current - 2) {
      to.current = to.current + 2
      from.current = from.current + 2
    }
    if (page > to.current - 3) {
      to.current = to.current + 1
      from.current = from.current + 1
    }
  }
  if (page > 4) {
    if (page < from.current + 2) {
      to.current = to.current - 1
      from.current = from.current - 1
    }
    if (page < from.current + 3) {
      to.current = to.current - 2
      from.current = from.current - 2
    }
    if (page < from.current + 4) {
      to.current = to.current - 1
      from.current = from.current - 1
    }
  }
  if (
    page === pages.length - 4 ||
    page === pages.length - 3 ||
    page === pages.length - 2
  ) {
    from.current = pages.length - 10
    to.current = pages.length
  }
  if (page === 2 || page === 3 || page === 4) {
    from.current = 0
    to.current = 10
  }
}
