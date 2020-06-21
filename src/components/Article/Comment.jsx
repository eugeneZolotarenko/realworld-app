import React from "react"
import { Link } from "react-router-dom"

function Comment({ comment, user }) {
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
        <span className='mod-options'>
          {user.token && user.username === comment.author.username && (
            <i className='ion-trash-a'></i>
          )}
        </span>
      </div>
    </div>
  )
}

export default Comment
