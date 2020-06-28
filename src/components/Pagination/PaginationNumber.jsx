import React from "react"
import { useDispatch } from "react-redux"

function PaginationNumber({ eachPage, page, setArticlesPage }) {
  const dispatch = useDispatch()
  return (
    <li
      key={eachPage}
      className={eachPage === page ? "page-item active" : "page-item"}>
      <button
        onClick={() => dispatch(setArticlesPage(eachPage))}
        className='page-link'>
        {eachPage}
      </button>
    </li>
  )
}

export default PaginationNumber
