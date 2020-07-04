import React from "react"
import { Link } from "react-router-dom"

import commentsAPI from "lib/api/comments"

function Comment({ comment, comments, setComments, slug, user }) {
  return (
    <div key={comment.id} className='card'>
      <div className='card-block'>
        <p className='card-text'>{comment.body}</p>
      </div>
      <div className='card-footer'>
        <Link to='' className='comment-author'>
          <img
            src={comment.author.image}
            className='comment-author-img'
            alt={comment.author.username}
          />
        </Link>
        &nbsp;
        <Link to='' className='comment-author'>
          {comment.author.username}
        </Link>
        <span className='date-posted'>
          {new Date(comment.createdAt).toDateString()}
        </span>
        {user.token && user.username === comment.author.username && (
          <span className='mod-options'>
            <i
              className='ion-trash-a'
              onClick={async () => {
                await commentsAPI.deleteComment({
                  id: comment.id,
                  slug,
                  token: user.token,
                })
                setComments(comments.filter((each) => each.id !== comment.id))
              }}></i>
          </span>
        )}
      </div>
    </div>
  )
}

export default Comment
