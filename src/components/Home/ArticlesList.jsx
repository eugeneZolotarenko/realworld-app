import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import {
  getAllArticles,
  getArticlesByTag,
  getArticlesByAuthor,
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
        <Pagination page={articlesData.page} count={articlesData.count} />
      </>
    )
  }

  return (
    <>
      {articlesData.articles.map((article, i) => {
        return <ArticlePreview article={article} currentUser={user} key={i} />
      })}
      <Pagination page={articlesData.page} count={articlesData.count} />
    </>
  )
}

export default ArticlesList
