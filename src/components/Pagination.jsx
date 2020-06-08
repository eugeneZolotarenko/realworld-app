import React, { useRef, useEffect } from "react"
import { connect } from "react-redux"

import { setArticlesPage } from "../redux/slices/articlesSlice"
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
    function calculatePagination() {
      if (page > from.current + 2 && to.current > 10) {
        // setFrom(from - 1)
        // setTo(to - 1)
        from.current = from.current - 1
        to.current = to.current - 1
      } else if (page > to.current - 3) {
        // setFrom(from + 1)
        // setTo(to + 1)
        to.current = to.current + 1
        from.current = from.current + 1
      }
      // return { from, to }
    }
    calculatePagination()
    // from.current = from.current + 1
  }, [page])

  // console.log(calculatePagination())

  return (
    <nav>
      <ul className='pagination'>
        <li className='page-item'>
          <button
            onClick={() => setArticlesPage(1)}
            style={{ display: page !== 1 ? "block" : "none" }}
            className='page-link'>
            &lt;&lt;
          </button>
          <button
            onClick={() => setArticlesPage(page - 1)}
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
          [...pages].slice(0, 10).map((eachPage) => {
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

        <li className='page-item'>
          <button
            onClick={() => setArticlesPage(page + 1)}
            style={{ display: page !== pages.length ? "block" : "none" }}
            className='page-link'>
            &gt;
          </button>
        </li>
        <li className='page-item'>
          <button
            onClick={() => setArticlesPage(pages.length)}
            style={{ display: page !== pages.length ? "block" : "none" }}
            className='page-link'>
            &gt;&gt;
          </button>
          <button className='page-link'>{from.current}</button>
        </li>
      </ul>
    </nav>
  )
}

export default connect(mapState, mapDispatch)(Pagination)
