import React, { useState } from "react"

import articlesAPI from "lib/api/articles"

function CreateComment({ user, slug }) {
  const [newComment, setNewComment] = useState("")
  return (
    <form className='card comment-form'>
      <div className='card-block'>
        <textarea
          className='form-control'
          placeholder='Write a comment...'
          rows='3'
          onChange={(e) => setNewComment(e.target.value)}></textarea>
      </div>
      <div className='card-footer'>
        <img
          src={user.image}
          className='comment-author-img'
          alt={user.username}
        />
        <button
          className='btn btn-sm btn-primary'
          onClick={(e) => {
            e.preventDefault()
            articlesAPI.addComment({
              comment: newComment,
              slug,
              token: user.token,
            })
          }}>
          Post Comment
        </button>
      </div>
    </form>
  )
}

export default CreateComment
