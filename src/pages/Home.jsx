import React from "react"
import { connect } from "react-redux"

import ArticlesList from "../components/Home/ArticlesList"
import Pagination from "../components/Pagination"
import Tags from "../components/Home/Tags"
import Tabs from "../components/Home/Tabs"

const mapState = (state) => state

function Home({ user }) {
  // console.log(user)

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
            <Tabs />
            <ArticlesList />
            <Pagination />
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

export default connect(mapState)(Home)
