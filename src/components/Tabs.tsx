import React from "react"
import { useDispatch, useSelector } from "react-redux"

import {
  setArticlesFeed,
  setArticlesUserFavorited,
  setArticlesAuthor,
} from "redux/slices/articlesSlice"
import { RootState } from "redux/rootReducer"

type PropsTypes = {
  location: string
  userName: string
}

function Tabs({ location, userName }: PropsTypes) {
  const dispatch = useDispatch()
  const { articlesData, user } = useSelector((state: RootState) => state)

  if (location === "profile" && userName) {
    return (
      <>
        {
          <div className='articles-toggle'>
            <ul className='nav nav-pills outline-active'>
              <li className='nav-item'>
                <button
                  className={
                    articlesData.author ? "nav-link active" : "nav-link"
                  }
                  onClick={() => {
                    dispatch(setArticlesAuthor(userName))
                  }}>
                  My Articles
                </button>
              </li>
              <li className='nav-item'>
                <button
                  className={
                    articlesData.userFavorited ? "nav-link active" : "nav-link"
                  }
                  onClick={() => {
                    dispatch(setArticlesUserFavorited(userName))
                  }}>
                  Favorited Articles
                </button>
              </li>
            </ul>
          </div>
        }
      </>
    )
  }

  return (
    <>
      {location === "home" && (
        <div className='feed-toggle'>
          <ul className='nav nav-pills outline-active'>
            <li className='nav-item'>
              <button
                style={{ display: user.token ? "block" : "none" }}
                className={articlesData.isFeed ? "nav-link active" : "nav-link"}
                onClick={() => {
                  dispatch(setArticlesFeed(true))
                }}>
                Your Feed
              </button>
            </li>
            <li className='nav-item'>
              <button
                className={
                  articlesData.tag || articlesData.isFeed
                    ? "nav-link"
                    : "nav-link active"
                }
                onClick={() => {
                  dispatch(setArticlesFeed(false))
                }}>
                Global Feed
              </button>
            </li>
            <li
              style={{ display: articlesData.tag ? "block" : "none" }}
              className='nav-item'>
              <button
                className={articlesData.tag ? "nav-link active" : "nav-link"}>
                <i className='ion-pound'></i> {articlesData.tag}
              </button>
            </li>
          </ul>
        </div>
      )}
    </>
  )
}

export default Tabs
