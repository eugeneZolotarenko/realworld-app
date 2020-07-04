import React, { useEffect } from "react"
import { useDispatch } from "react-redux"

import ArticlesList from "components/Articles/ArticlesList"
import Tags from "components/Tags"
import Tabs from "components/Tabs"

import { setArticlesAuthor } from "redux/slices/articlesSlice"

function Home() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setArticlesAuthor(""))
  }, [dispatch])
  return (
    <div className='home-page'>
      <div className='banner'>
        <div className='container'>
          <h1 className='logo-font'>conduit</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>

      <div className='container page'>
        <div className='row'>
          <div className='col-md-9'>
            <Tabs location='home' />
            <ArticlesList />
          </div>

          <div className='col-md-3'>
            <div className='sidebar'>
              <p>Popular Tags</p>
              <Tags />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
