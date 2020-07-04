import React, { useState } from "react"

import commentsAPI from "lib/api/comments"

function CreateComment({ user, comments, setComments, slug }) {
  const [commentText, setCommentText] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  return (
    <>
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
              if (commentText) {
                const { comment } = await commentsAPI.addComment({
                  comment: commentText,
                  slug,
                  token: user.token,
                })
                setComments([comment, ...comments])
                setCommentText("")
              } else {
                setErrorMessage("Comment cannot be empty")
                setTimeout(() => {
                  setErrorMessage("")
                }, 2500)
              }
            }}>
            Post Comment
          </button>
        </div>
      </form>
      <p className='error-messages'>{errorMessage}</p>
    </>
  )
}

export default CreateComment
