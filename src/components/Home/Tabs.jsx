import React from "react"
import { connect } from "react-redux"

import {
  setArticlesTag,
  setArticlesPage,
} from "../../redux/slices/articlesSlice"

const mapDispatch = { setArticlesTag, setArticlesPage }
const mapState = (state) => state

function Tabs({ setArticlesTag, setArticlesPage, articlesData }) {
  return (
    <div className='feed-toggle'>
      <ul className='nav nav-pills outline-active'>
        <li className='nav-item'>
          <button className='nav-link disabled'>Your Feed</button>
        </li>
        <li className='nav-item'>
          <button
            className={articlesData.tag ? "nav-link" : "nav-link active"}
            onClick={() => {
              setArticlesPage(1)
              setArticlesTag("")
            }}>
            Global Feed
          </button>
        </li>
        <li
          style={{ display: articlesData.tag ? "block" : "none" }}
          className='nav-item'>
          <button className={articlesData.tag ? "nav-link active" : "nav-link"}>
            <i className='ion-pound'></i> {articlesData.tag}
          </button>
        </li>
      </ul>
    </div>
  )
}

export default connect(mapState, mapDispatch)(Tabs)
