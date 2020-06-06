import React, { useEffect } from "react"
import { connect } from "react-redux"

import articlesAPI from "../../lib/api/articles"
import { setArticles } from "../../redux/slices/articlesSlice"

const mapDispatch = { setArticles }
const mapState = (state) => state

function ArticlesList({ setArticles, articles }) {
  useEffect(() => {
    async function getAllArticles() {
      const allArticles = await articlesAPI.getAll()
      setArticles(allArticles)
    }
    getAllArticles()
  }, [setArticles])

  articles && articles.length && console.log(articles)

  if (!articles) {
    return <p>Loading...</p>
  }
  if (!articles.length) {
    return <p>Loading...</p>
  }

  return (
    <>
      {articles[0].map((article) => {
        return (
          <div className='article-preview'>
            <div className='article-meta'>
              <a href='profile.html'>
                <img src='http://i.imgur.com/Qr71crq.jpg' />
              </a>
              <div className='info'>
                <a href='' className='author'>
                  Eric Simons
                </a>
                <span className='date'>January 20th</span>
              </div>
              <button className='btn btn-outline-primary btn-sm pull-xs-right'>
                <i className='ion-heart'></i> 29
              </button>
            </div>
            <a href='' className='preview-link'>
              <h1>How to build webapps that scale</h1>
              <p>This is the description for the post.</p>
              <span>Read more...</span>
            </a>
          </div>
        )
      })}
    </>
  )
}

export default connect(mapState, mapDispatch)(ArticlesList)
