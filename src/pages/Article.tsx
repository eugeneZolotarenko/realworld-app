import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"

import articlesAPI from "lib/api/articles"
import commentsAPI from "lib/api/comments"
import history from "lib/utils/history"
import { ArticleTypes, CommentTypes } from "lib/types"

import { RootState } from "redux/rootReducer"

import ArticleMeta from "components/Articles/ArticleMeta"
import Comment from "components/Comments/Comment"
import CreateComment from "components/Comments/CreateComment"
import { FullHeightLoader } from "components/Loader"

function Article() {
  const [slug] = useState(
    history.location.pathname.replace("article", "").replace(/\//g, "")
  )
  const [article, setArticle] = useState<ArticleTypes>()
  const [favoritesCount, setFavoritesCount] = useState(0)
  const [favorited, setFavorited] = useState(false)
  const [followedAuthor, setFollowedAuthor] = useState(false)
  const [comments, setComments] = useState<CommentTypes[]>()

  const { user } = useSelector((state: RootState) => state)

  useEffect(() => {
    async function getArticle() {
      const { article, status } = await articlesAPI.getOne(slug, user.token)
      if (status === 200) {
        setArticle(article)
        setFavoritesCount(article.favoritesCount)
        setFavorited(article.favorited)
        setFollowedAuthor(article.author.following)
      } else {
        history.push("/")
      }
    }
    getArticle()

    async function getAllComments() {
      setComments(await commentsAPI.getComments(slug, user.token))
    }
    getAllComments()
  }, [user.token, slug])

  if (!article || !comments) {
    return <FullHeightLoader />
  }

  return (
    <div className='article-page'>
      <div className='banner'>
        <div className='container'>
          <h1>{article.title}</h1>
          <ArticleMeta
            article={article}
            favorited={favorited}
            setFavorited={setFavorited}
            favoritesCount={favoritesCount}
            setFavoritesCount={setFavoritesCount}
            followedAuthor={followedAuthor}
            setFollowedAuthor={setFollowedAuthor}
            user={user}
          />
        </div>
      </div>

      <div className='container page'>
        <div className='row article-content'>
          <div className='col-md-12'>
            <p>{article.body}</p>
            <ul className='tag-list'>
              {article.tagList.map((tag) => {
                return (
                  <li className='tag-default tag-pill tag-outline ng-binding ng-scope'>
                    {tag}
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        <hr />

        <div className='article-actions'>
          <ArticleMeta
            article={article}
            favorited={favorited}
            setFavorited={setFavorited}
            favoritesCount={favoritesCount}
            setFavoritesCount={setFavoritesCount}
            followedAuthor={followedAuthor}
            setFollowedAuthor={setFollowedAuthor}
            user={user}
          />
        </div>

        <div className='row'>
          <div className='col-xs-12 col-md-8 offset-md-2'>
            {user.token && (
              <CreateComment
                slug={slug}
                comments={comments}
                setComments={setComments}
                user={user}
              />
            )}
            {comments.map((comment: any) => {
              return (
                <Comment
                  comment={comment}
                  comments={comments}
                  setComments={setComments}
                  slug={slug}
                  user={user}
                />
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Article
