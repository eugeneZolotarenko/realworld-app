import React, { useState, useEffect } from "react"
import { connect } from "react-redux"

import articlesAPI from "lib/api/articles"
import {
  setArticlesTag,
  setArticlesPage,
  setArticlesFeed,
} from "redux/slices/articlesSlice"

const mapDispatch = { setArticlesTag, setArticlesPage, setArticlesFeed }
const mapState = (state) => state

function Tags({ setArticlesTag, setArticlesPage, setArticlesFeed }) {
  const [tagsList, setTagsList] = useState()

  useEffect(() => {
    async function getTags() {
      const { tags } = await articlesAPI.getTags()
      setTagsList(tags)
    }
    getTags()
  }, [])

  if (!tagsList || !tagsList.length) {
    return <p>loading...</p>
  }
  return (
    <div className='tag-list'>
      {tagsList.map((tag, i) => {
        return (
          <button
            onClick={() => {
              setArticlesPage(1)
              setArticlesTag(tag)
              setArticlesFeed(false)
            }}
            key={i}
            className='tag-pill tag-default'>
            {tag}
          </button>
        )
      })}
    </div>
  )
}

export default connect(mapState, mapDispatch)(Tags)
