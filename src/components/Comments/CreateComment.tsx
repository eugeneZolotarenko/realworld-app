import React, { useState } from "react"

import commentsAPI from "lib/api/comments"
import { CommentTypes, BasicUserTypes } from "lib/types"

type PropsTypes = {
  user: BasicUserTypes
  comments: CommentTypes[]
  setComments: (comments: CommentTypes[]) => void
  slug: string
}

function CreateComment({ user, comments, setComments, slug }: PropsTypes) {
  const [commentText, setCommentText] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const createComment = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (commentText) {
      const { comment } = await commentsAPI.addComment({
        commentText,
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
  }

  return (
    <>
      <form className='card comment-form'>
        <div className='card-block'>
          <textarea
            className='form-control'
            placeholder='Write a comment...'
            rows={3}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}></textarea>
        </div>
        <div className='card-footer'>
          <img
            src={user.image}
            className='comment-author-img'
            alt={user.username}
          />
          <button className='btn btn-sm btn-primary' onClick={createComment}>
            Post Comment
          </button>
        </div>
      </form>
      <p className='error-messages'>{errorMessage}</p>
    </>
  )
}

export default CreateComment
