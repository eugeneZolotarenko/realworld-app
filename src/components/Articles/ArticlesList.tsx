import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import history from "lib/utils/history"

import { Loader } from "components/Loader"

import {
  getAllArticles,
  getArticlesByTag,
  getArticlesByAuthor,
  getArticlesByUserFavorited,
  getArticlesFeeds,
} from "redux/slices/articlesSlice"
import { RootState } from "redux/rootReducer"

import ArticlePreview from "./ArticlePreview"
import Pagination from "components/Pagination/Pagination"

function ArticlesList() {
  const dispatch = useDispatch()
  const { articlesData, user } = useSelector((state: RootState) => state)

  const { location } = history

  useEffect(() => {
    if (articlesData.tag) {
      dispatch(
        getArticlesByTag(articlesData.page, articlesData.tag, user.token)
      )
    } else if (articlesData.author && location.pathname.includes("profile")) {
      dispatch(
        getArticlesByAuthor(articlesData.page, articlesData.author, user.token)
      )
    } else if (
      articlesData.userFavorited &&
      location.pathname.includes("profile")
    ) {
      dispatch(
        getArticlesByUserFavorited(
          articlesData.page,
          articlesData.userFavorited,
          user.token
        )
      )
    } else if (articlesData.isFeed && user.token) {
      dispatch(getArticlesFeeds(articlesData.page, user.token))
    } else {
      dispatch(getAllArticles(articlesData.page, user.token))
    }
  }, [
    dispatch,
    articlesData.page,
    articlesData.tag,
    articlesData.author,
    articlesData.userFavorited,
    articlesData.isFeed,
    user.token,
    location,
  ])

  if (articlesData.isError) {
    return <p>Error!</p>
  }

  if (articlesData.isLoading) {
    return (
      <>
        <Loader />
        {/* Pagintion logic does not work without pagination there, think about it ;( */}
        <Pagination
          page={articlesData.page}
          pages={articlesData.pages}
          isLoading={articlesData.isLoading}
        />
      </>
    )
  }

  if (articlesData.articles.length === 0) {
    return <p>No Articles yet</p>
  }

  return (
    <>
      {articlesData.articles.map((article: any, i) => {
        return <ArticlePreview article={article} currentUser={user} key={i} />
      })}
      <Pagination
        page={articlesData.page}
        pages={articlesData.pages}
        isLoading={articlesData.isLoading}
      />
    </>
  )
}

export default ArticlesList
