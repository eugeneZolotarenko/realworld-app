import React from "react"
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

  return (
    <nav>
      <ul className='pagination'>
        <li className='page-item'>
          <a className='page-link'>&lt;&lt;</a>
        </li>
        {pages.map((eachPage) => {
          return (
            <li
              key={eachPage}
              className={eachPage === page ? "page-item active" : "page-item"}>
              <a
                onClick={() => setArticlesPage(eachPage)}
                className='page-link'>
                {eachPage}
              </a>
            </li>
          )
        })}
        {/* <li className='page-item active'>
          <a className='page-link'>1</a>
        </li>
        <li className='page-item'>
          <a className='page-link'>2</a>
        </li>
        <li className='page-item'>
          <a className='page-link'>3</a>
        </li>
        <li className='page-item'>
          <a className='page-link'>4</a>
        </li>
        <li className='page-item'>
          <a className='page-link'>5</a>
        </li>
        <li className='page-item'>
          <a className='page-link'>6</a>
        </li>
        <li className='page-item'>
          <a className='page-link'>7</a>
        </li>
        <li className='page-item'>
          <a className='page-link'>8</a>
        </li>
        <li className='page-item'>
          <a className='page-link'>9</a>
        </li>
        <li className='page-item'>
          <a className='page-link'>10</a>
        </li> */}
        <li className='page-item'>
          <a className='page-link'>&gt;</a>
        </li>
        <li className='page-item'>
          <a className='page-link'>&gt;&gt;</a>
        </li>
      </ul>
    </nav>
  )
}

export default connect(mapState, mapDispatch)(Pagination)
