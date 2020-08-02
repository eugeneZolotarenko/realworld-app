import React, { useState } from "react"
import { Link } from "react-router-dom"

import articlesAPI from "lib/api/articles"
import history from "lib/utils/history"

function ArticlePreview({ article, currentUser }) {
  const [favoritesCount, setFavoritesCount] = useState(article.favoritesCount)
  const [favorited, setFavorited] = useState(article.favorited)

  const toggleLike = async () => {
    if (!favorited) {
      setFavorited(true)
      setFavoritesCount(favoritesCount + 1)
      await articlesAPI.loveIt(article.slug, currentUser.token)
    } else {
      setFavorited(false)
      setFavoritesCount(favoritesCount - 1)
      await articlesAPI.unLoveIt(article.slug, currentUser.token)
    }
  }
  return (
    <div className='article-preview'>
      <div className='article-meta'>
        <Link to={`/profile/${article.author.username}`}>
          <img src={article.author.image} alt={article.author.username} />
        </Link>
        <div className='info'>
          <Link to={`/profile/${article.author.username}`} className='author'>
            {article.author.username}
          </Link>
          <span className='date'>
            {new Date(article.createdAt).toDateString()}
          </span>
        </div>
        <button
          className={
            favorited
              ? "btn btn-outline-primary btn-sm pull-xs-right active"
              : "btn btn-outline-primary btn-sm pull-xs-right"
          }
          onClick={() => {
            currentUser.token ? toggleLike() : history.push("/register")
          }}>
          <i className='ion-heart'></i> {favoritesCount}
        </button>
      </div>
      <Link to={`/article/${article.slug}`} className='preview-link'>
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
      </Link>
    </div>
  )
}

export default ArticlePreview
