import React from "react"
import { useDispatch, useSelector } from "react-redux"

import {
  setArticlesTag,
  setArticlesPage,
  setArticlesFeed,
} from "redux/slices/articlesSlice"

function Tabs() {
  const dispatch = useDispatch()
  const { articlesData, user } = useSelector((state) => state)

  return (
    <div className='feed-toggle'>
      <ul className='nav nav-pills outline-active'>
        <li className='nav-item'>
          <button
            style={{ display: user.token ? "block" : "none" }}
            className={articlesData.feed ? "nav-link active" : "nav-link"}
            onClick={() => {
              dispatch(setArticlesPage(1))
              dispatch(setArticlesTag(""))
              dispatch(setArticlesFeed(true))
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
              dispatch(setArticlesPage(1))
              dispatch(setArticlesTag(""))
              dispatch(setArticlesFeed(false))
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

export default Tabs
