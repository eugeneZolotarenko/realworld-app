import React from "react"
import { connect } from "react-redux"

import {
  setArticlesTag,
  setArticlesPage,
  setArticlesFeed,
} from "../../redux/slices/articlesSlice"

const mapDispatch = { setArticlesTag, setArticlesPage, setArticlesFeed }
const mapState = (state) => state

function Tabs({
  setArticlesTag,
  setArticlesPage,
  setArticlesFeed,
  articlesData,
  user,
}) {
  return (
    <div className='feed-toggle'>
      <ul className='nav nav-pills outline-active'>
        <li className='nav-item'>
          <button
            style={{ display: user.token ? "block" : "none" }}
            className={articlesData.feed ? "nav-link active" : "nav-link"}
            onClick={() => {
              setArticlesPage(1)
              setArticlesTag("")
              setArticlesFeed(true)
            }}>
            Your Feed
          </button>
        </li>
        <li className='nav-item'>
          <button
            className={
              articlesData.tag || articlesData.feed
                ? "nav-link"
                : "nav-link active"
            }
            onClick={() => {
              setArticlesPage(1)
              setArticlesTag("")
              setArticlesFeed(false)
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
