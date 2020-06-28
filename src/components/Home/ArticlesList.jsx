import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import {
  getAllArticles,
  getArticlesByTag,
  getArticlesByAuthor,
  getArticlesByUserFavorited,
  getArticlesFeeds,
} from "redux/slices/articlesSlice"
import ArticlePreview from "./ArticlePreview"
import Pagination from "components/Pagination"

function ArticlesList() {
  const dispatch = useDispatch()
  const { articlesData, user } = useSelector((state) => state)

  useEffect(() => {
    if (articlesData.tag) {
      dispatch(
        getArticlesByTag(articlesData.page, articlesData.tag, user.token)
      )
    } else if (articlesData.author) {
      dispatch(
        getArticlesByAuthor(articlesData.page, articlesData.author, user.token)
      )
    } else if (articlesData.userFavorited) {
      dispatch(
        getArticlesByUserFavorited(
          articlesData.page,
          articlesData.userFavorited,
          user.token
        )
      )
    } else if (articlesData.feed && user.token) {
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
    articlesData.feed,
    user.token,
  ])

  if (articlesData.isError) {
    return <p>Error!</p>
  }

  if (articlesData.isLoading) {
    return (
      <>
        <p>Loading...</p>
        <Pagination
          page={articlesData.page}
          count={articlesData.count}
          isLoading={articlesData.isLoading}
        />
      </>
    )
  }

  return (
    <>
      {articlesData.articles.map((article, i) => {
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
