import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"

import articlesAPI from "lib/api/articles"
import history from "lib/utils/history"

function Article() {
  const [article, setArticle] = useState()
  const [favoritesCount, setFavoritesCount] = useState()
  const [favorited, setFavorited] = useState()

  const LoveUnLove = async () => {
    if (!favorited) {
      setFavorited(true)
      setFavoritesCount(favoritesCount + 1)
      await articlesAPI.loveIt(article.slug, user.token)
    } else {
      setFavorited(false)
      setFavoritesCount(favoritesCount - 1)
      await articlesAPI.unLoveIt(article.slug, user.token)
    }
  }
  const { user } = useSelector((state) => state)

  useEffect(() => {
    const slug = window.location.pathname.replace("/article/", "")
    async function getSlug() {
      const { article, status } = await articlesAPI.getOne(slug, user.token)
      if (status === 200) {
        user.token ? setArticle(article) : setArticle(article)
        setFavoritesCount(article.favoritesCount)
        setFavorited(article.favorited)
      } else {
        history.push("/")
      }
    }
    getSlug()
  }, [user.token])

  if (!article) {
    return <p>Loading...</p>
  }

  return (
    <div className='article-page'>
      <div className='banner'>
        <div className='container'>
          <h1>{article.title}</h1>

          <div className='article-meta'>
            <Link to=''>
              <img src={article.author.image} alt={article.author.username} />
            </Link>
            <div className='info'>
              <Link to='' className='author'>
                Eric Simons
              </Link>
              <span className='date'>January 20th</span>
            </div>
            <button className='btn btn-sm btn-outline-secondary'>
              <i className='ion-plus-round'></i>
              &nbsp; Follow {article.author.username}
              <span className='counter'>(10)</span>
            </button>
            &nbsp;&nbsp;
            <button
              className='btn btn-sm btn-outline-primary'
              onClick={() => {
                user.token ? LoveUnLove() : history.push("./register")
              }}>
              <i className='ion-heart'></i>
              &nbsp; Favorite Post{" "}
              <span className='counter'>({article.favoritesCount})</span>
            </button>
          </div>
        </div>
      </div>

      <div className='container page'>
        <div className='row article-content'>
          <div className='col-md-12'>
            <p>{article.body}</p>
          </div>
        </div>

        <hr />

        <div className='article-actions'>
          <div className='article-meta'>
            <Link to='profile.html'>
              <img src='http://i.imgur.com/Qr71crq.jpg' />
            </Link>
            <div className='info'>
              <Link to='' className='author'>
                Eric Simons
              </Link>
              <span className='date'>January 20th</span>
            </div>
            <button className='btn btn-sm btn-outline-secondary'>
              <i className='ion-plus-round'></i>
              &nbsp; Follow Eric Simons <span className='counter'>(10)</span>
            </button>
            &nbsp;
            <button className='btn btn-sm btn-outline-primary'>
              <i className='ion-heart'></i>
              &nbsp; Favorite Post <span className='counter'>(29)</span>
            </button>
          </div>
        </div>

        <div className='row'>
          <div className='col-xs-12 col-md-8 offset-md-2'>
            <form className='card comment-form'>
              <div className='card-block'>
                <textarea
                  className='form-control'
                  placeholder='Write a comment...'
                  rows='3'></textarea>
              </div>
              <div className='card-footer'>
                <img
                  src='http://i.imgur.com/Qr71crq.jpg'
                  className='comment-author-img'
                />
                <button className='btn btn-sm btn-primary'>Post Comment</button>
              </div>
            </form>

            <div className='card'>
              <div className='card-block'>
                <p className='card-text'>
                  With supporting text below as a natural lead-in to additional
                  content.
                </p>
              </div>
              <div className='card-footer'>
                <Link to='' className='comment-author'>
                  <img
                    src='http://i.imgur.com/Qr71crq.jpg'
                    className='comment-author-img'
                  />
                </Link>
                &nbsp;
                <Link to='' className='comment-author'>
                  Jacob Schmidt
                </Link>
                <span className='date-posted'>Dec 29th</span>
              </div>
            </div>

            <div className='card'>
              <div className='card-block'>
                <p className='card-text'>
                  With supporting text below as a natural lead-in to additional
                  content.
                </p>
              </div>
              <div className='card-footer'>
                <Link to='' className='comment-author'>
                  <img
                    src='http://i.imgur.com/Qr71crq.jpg'
                    className='comment-author-img'
                  />
                </Link>
                &nbsp;
                <Link to='' className='comment-author'>
                  Jacob Schmidt
                </Link>
                <span className='date-posted'>Dec 29th</span>
                <span className='mod-options'>
                  <i className='ion-edit'></i>
                  <i className='ion-trash-a'></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Article
