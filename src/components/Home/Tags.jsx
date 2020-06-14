import React, { useState, useEffect } from "react"
import { useDispatch } from "react-redux"

import articlesAPI from "lib/api/articles"
import {
  setArticlesTag,
  setArticlesPage,
  setArticlesFeed,
} from "redux/slices/articlesSlice"

function Tags() {
  const [tagsList, setTagsList] = useState()

  const dispatch = useDispatch()

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
              dispatch(setArticlesPage(1))
              dispatch(setArticlesTag(tag))
              dispatch(setArticlesFeed(false))
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

export default Tags
