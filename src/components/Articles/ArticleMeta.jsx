import React from "react"
import { Link } from "react-router-dom"

import articlesAPI from "lib/api/articles"
import userAPI from "lib/api/user"
import history from "lib/utils/history"

function ArticleMeta({
  article,
  favorited,
  setFavorited,
  favoritesCount,
  setFavoritesCount,
  followedAuthor,
  setFollowedAuthor,
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
      {user.username !== article.author.username && (
        <>
          <button
            className={
              followedAuthor
                ? "btn btn-sm btn-outline-secondary action-btn active"
                : "btn btn-sm btn-outline-secondary action-btn"
            }
            onClick={async () => {
              setFollowedAuthor(!followedAuthor)
              followedAuthor
                ? await userAPI.unFollowUser(
                    article.author.username,
                    user.token
                  )
                : await userAPI.followUser(article.author.username, user.token)
            }}>
            <i
              className={
                followedAuthor ? "ion-minus-round" : "ion-plus-round"
              }></i>
            &nbsp; {followedAuthor ? "Unfollow" : "Follow"}{" "}
            {article.author.username}
          </button>
          &nbsp;&nbsp;
          <button
            className={
              favorited
                ? "btn btn-sm btn-outline-primary active"
                : "btn btn-sm btn-outline-primary"
            }
            onClick={() => {
              user.token ? LoveUnLove() : history.push("/register")
            }}>
            <i className='ion-heart'></i>
            &nbsp; {favorited ? "Unfavorite" : "Favorite"} Post{" "}
            <span className='counter'>({favoritesCount})</span>
          </button>
        </>
      )}
      {user.token && user.username === article.author.username && (
        <>
          <Link
            className='btn btn-outline-secondary btn-sm'
            to={`/editor/${article.slug}`}>
            <i className='ion-edit'></i> Edit Article
          </Link>
          &nbsp;&nbsp;
          <button
            className='btn btn-outline-danger btn-sm'
            onClick={async () => {
              articlesAPI.deleteArticle(article.slug, user.token)
              history.push("/")
            }}>
            <i className='ion-trash-a'></i> Delete Article
          </button>
        </>
      )}
    </div>
  )
}

export default ArticleMeta
