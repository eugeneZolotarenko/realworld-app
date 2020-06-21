import React, { useState } from "react"

import articlesAPI from "lib/api/articles"

function CreateComment({ user, comments, setComments, slug }) {
  const [commentText, setCommentText] = useState("")
  return (
    <form className='card comment-form'>
      <div className='card-block'>
        <textarea
          className='form-control'
          placeholder='Write a comment...'
          rows='3'
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}></textarea>
      </div>
      <div className='card-footer'>
        <img
          src={user.image}
          className='comment-author-img'
          alt={user.username}
        />
        <button
          className='btn btn-sm btn-primary'
          onClick={async (e) => {
            e.preventDefault()
            const { comment } = await articlesAPI.addComment({
              comment: commentText,
              slug,
              token: user.token,
            })
            setComments([comment, ...comments])
            setCommentText("")
          }}>
          Post Comment
        </button>
      </div>
    </form>
  )
}

export default CreateComment
