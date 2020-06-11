import React, { useRef, useEffect } from "react"
import { connect } from "react-redux"

import { setArticlesPage } from "../redux/slices/articlesSlice"
import { calculatePagination } from "../lib/utils/calculatePagination"
import { ARTICLES_ON_ONE_PAGE } from "../lib/utils/constants"

const mapDispatch = { setArticlesPage }
const mapState = (state) => state

function Pagination({ setArticlesPage, articlesData }) {
  const { page, count } = articlesData
  const pages = Array.from(
    { length: count / ARTICLES_ON_ONE_PAGE },
    (v, i) => i + 1
  )
  const from = useRef(0)
  const to = useRef(10)

  useEffect(() => {
    calculatePagination({ page, pages, to, from })
    console.log({ page, pages })
  }, [page, pages])

  return (
    <nav>
      <ul className='pagination'>
        <li className='page-item'>
          <button
            onClick={() => {
              setArticlesPage(1)
              if (pages.length > 10) {
                from.current = 0
                to.current = 10
              }
            }}
            style={{ display: page !== 1 ? "block" : "none" }}
            className='page-link'>
            &lt;&lt; 1
          </button>
          <button
            onClick={() => {
              setArticlesPage(page - 1)
              if (
                from.current !== 0 &&
                to.current !== pages.length &&
                pages.length > 10
              ) {
                from.current = from.current - 1
                to.current = to.current - 1
              }
            }}
            style={{ display: page !== 1 ? "block" : "none" }}
            className='page-link'>
            &lt;
          </button>
        </li>

        {pages.length <= 10 &&
          pages.map((eachPage) => {
            return (
              <li
                key={eachPage}
                className={
                  eachPage === page ? "page-item active" : "page-item"
                }>
                <button
                  onClick={() => setArticlesPage(eachPage)}
                  className='page-link'>
                  {eachPage}
                </button>
              </li>
            )
          })}

        {pages.length > 10 &&
          [...pages].slice(from.current, to.current).map((eachPage) => {
            return (
              <li
                key={eachPage}
                className={
                  eachPage === page ? "page-item active" : "page-item"
                }>
                <button
                  onClick={() => {
                    setArticlesPage(eachPage)
                  }}
                  className='page-link'>
                  {eachPage}
                </button>
              </li>
            )
          })}

        <li className='page-item'>
          <button
            onClick={() => {
              setArticlesPage(page + 1)
              if (pages.length > 10) {
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
              setArticlesPage(pages.length)
              if (pages.length > 10) {
                from.current = pages.length - 10
                to.current = pages.length
              }
            }}
            style={{ display: page !== pages.length ? "block" : "none" }}
            className='page-link'>
            {pages.length} &gt;&gt;
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default connect(mapState, mapDispatch)(Pagination)
