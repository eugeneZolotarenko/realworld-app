import React, { useEffect } from "react"
import { connect } from "react-redux"

import articlesAPI from "../../lib/api/articles"
import { setArticlesData } from "../../redux/slices/articlesSlice"
import ArticlePreview from "./ArticlePreview"

const mapDispatch = { setArticlesData }
const mapState = (state) => state

function ArticlesList({ setArticlesData, articlesData }) {
  useEffect(() => {
    async function getAllArticles() {
      const allArticles = await articlesAPI.getAll(articlesData.page)
      setArticlesData(allArticles)
    }
    getAllArticles()
  }, [setArticlesData, articlesData.page])

  if (!articlesData) {
    return <p>Loading...</p>
  }
  if (!articlesData.articles.length) {
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
