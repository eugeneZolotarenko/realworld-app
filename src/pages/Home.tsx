import React from "react"

import ArticlesList from "components/Articles/ArticlesList"
import Tags from "components/Tags"
import Tabs from "components/Tabs"

function Home() {
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
            <Tabs location='home' userName='' />
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
