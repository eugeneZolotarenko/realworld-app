import React, { useEffect } from "react"
import { connect } from "react-redux"

import articlesAPI from "lib/api/articles"
import { setArticlesData } from "redux/slices/articlesSlice"
import ArticlePreview from "./ArticlePreview"

const mapDispatch = { setArticlesData }
const mapState = (state) => state

function ArticlesList({ setArticlesData, articlesData, user }) {
  useEffect(() => {
    if (articlesData.tag) {
      async function getArticlesByTag() {
        const ByTagArticles = await articlesAPI.filterByTag(
          articlesData.page,
          articlesData.tag
        )
        setArticlesData(ByTagArticles)
      }
      getArticlesByTag()
    } else if (articlesData.feed && user.token) {
      async function getArticlesFeeds() {
        const feedArticles = await articlesAPI.getFeeds(
          articlesData.page,
          user.token
        )
        setArticlesData(feedArticles)
      }
      getArticlesFeeds()
    } else {
      async function getAllArticles() {
        const allArticles = await articlesAPI.getAll(articlesData.page)
        setArticlesData(allArticles)
      }
      getAllArticles()
    }
  }, [
    setArticlesData,
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

export default connect(mapState, mapDispatch)(ArticlesList)
