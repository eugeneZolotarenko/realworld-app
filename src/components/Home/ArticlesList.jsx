import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import articlesAPI from "lib/api/articles"
import { setArticlesData } from "redux/slices/articlesSlice"
import ArticlePreview from "./ArticlePreview"

function ArticlesList() {
  const dispatch = useDispatch()
  const { articlesData, user } = useSelector((state) => state)

  useEffect(() => {
    if (articlesData.tag) {
      async function getArticlesByTag() {
        const byTagArticles = await articlesAPI.filterByTag(
          articlesData.page,
          articlesData.tag
        )
        dispatch(setArticlesData(byTagArticles))
      }
      getArticlesByTag()
    } else if (articlesData.feed && user.token) {
      async function getArticlesFeeds() {
        const feedArticles = await articlesAPI.getFeeds(
          articlesData.page,
          user.token
        )
        dispatch(setArticlesData(feedArticles))
      }
      getArticlesFeeds()
    } else {
      async function getAllArticles() {
        const allArticles = await articlesAPI.getAll(articlesData.page)
        dispatch(setArticlesData(allArticles))
      }
      getAllArticles()
    }
  }, [
    dispatch,
    articlesData.page,
    articlesData.tag,
    articlesData.feed,
    user.token,
  ])

  if (!articlesData || !articlesData.articles.length) {
    return <p>Loading...</p>
  }

  return (
    <>
      {articlesData.articles.map((article, i) => {
        return <ArticlePreview article={article} key={i} />
      })}
    </>
  )
}

export default ArticlesList
