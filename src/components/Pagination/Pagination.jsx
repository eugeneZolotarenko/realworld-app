import React, { useRef, useEffect } from "react"
import { useDispatch } from "react-redux"

import PaginationNumber from "./PaginationNumber"

import { setArticlesPage } from "redux/slices/articlesSlice"
import { calculatePagination } from "lib/utils/pagination/calculatePagination"
import { calculatePercentageOfPages } from "lib/utils/pagination/calculatePercentageOfPages"
import { ITEMS_IN_PAGINATION } from "lib/utils/constants"

function Pagination({ page, pages, isLoading }) {
  const from = useRef(0)
  const to = useRef(ITEMS_IN_PAGINATION)

  const dispatch = useDispatch()

  useEffect(() => {
    if (pages) {
      calculatePagination({ page, pages, to, from })
    }
  }, [page, pages])

  const stylePagination = {
    display: isLoading ? "none" : "flex",
    justifyContent: "center",
  }

  return (
    !isLoading &&
    pages.length > 1 && (
      <nav style={stylePagination}>
        <ul className='pagination'>
          <li className='page-item'>
            <button
              onClick={() => {
                dispatch(setArticlesPage(1))
                if (pages.length > ITEMS_IN_PAGINATION) {
                  from.current = 0
                  to.current = ITEMS_IN_PAGINATION
                }
              }}
              style={{ display: from.current > 0 ? "block" : "none" }}
              className='page-link'>
              &lt;&lt; 1
            </button>
            <button
              onClick={() => {
                dispatch(setArticlesPage(page - 1))
                if (from.current !== 0 && pages.length > ITEMS_IN_PAGINATION) {
                  from.current = from.current - 1
                  to.current = to.current - 1
                }
              }}
              style={{ display: page !== 1 ? "block" : "none" }}
              className='page-link'>
              &lt;
            </button>
          </li>

          {pages.length <= ITEMS_IN_PAGINATION &&
            pages.map((eachPage) => {
              return (
                <PaginationNumber
                  eachPage={eachPage}
                  page={page}
                  setArticlesPage={setArticlesPage}
                />
              )
            })}

          {pages.length > ITEMS_IN_PAGINATION &&
            [...pages].slice(from.current, to.current).map((eachPage) => {
              return (
                <PaginationNumber
                  eachPage={eachPage}
                  page={page}
                  setArticlesPage={setArticlesPage}
                />
              )
            })}

          <li className='page-item'>
            <button
              onClick={() => {
                dispatch(setArticlesPage(page + 1))
                if (pages.length > ITEMS_IN_PAGINATION) {
                  from.current = from.current + 1
                  to.current = to.current + 1
                }
              }}
              style={{ display: page !== pages.length ? "block" : "none" }}
              className='page-link'>
              &gt;
            </button>
          </li>
          <li className='page-item'>
            <button
              onClick={() => {
                dispatch(setArticlesPage(pages.length))
                if (pages.length > ITEMS_IN_PAGINATION) {
                  from.current = pages.length - ITEMS_IN_PAGINATION
                  to.current = pages.length
                }
              }}
              style={{
                display:
                  page < pages.length - calculatePercentageOfPages(40)
                    ? "block"
                    : "none",
              }}
              className='page-link'>
              {pages.length} &gt;&gt;
            </button>
          </li>
        </ul>
      </nav>
    )
  )
}

export default Pagination
