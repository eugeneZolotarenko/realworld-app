import React from "react"
import { Link } from "react-router-dom"

import articlesAPI from "lib/api/articles"
import history from "lib/utils/history"

function ArticleMeta({
  article,
  favorited,
  setFavorited,
  favoritesCount,
  setFavoritesCount,
  user,
}) {
  const LoveUnLove = async () => {
    setFavorited(!favorited)
    if (!favorited) {
      setFavoritesCount(favoritesCount + 1)
      await articlesAPI.loveIt(article.slug, user.token)
    } else {
      setFavoritesCount(favoritesCount - 1)
      await articlesAPI.unLoveIt(article.slug, user.token)
    }
  }

  return (
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
      <button className='btn btn-sm btn-outline-secondary'>
        <i className='ion-plus-round'></i>
        &nbsp; Follow {article.author.username}
      </button>
      &nbsp;&nbsp;
      <button
        className={
          favorited
            ? "btn btn-sm btn-outline-primary active"
            : "btn btn-sm btn-outline-primary"
        }
        onClick={() => {
          user.token ? LoveUnLove() : history.push("./register")
        }}>
        <i className='ion-heart'></i>
        &nbsp; {favorited ? "Unfavorite" : "Favorite"} Post{" "}
        <span className='counter'>({favoritesCount})</span>
      </button>
    </div>
  )
}

export default ArticleMeta
