import { getHeaders } from "lib/utils/general"
import { apiUrl } from "lib/utils/constants"

type addCommentTypes = {
  commentText: string
  slug: string
  token: string
}

type DeleteCommentTypes = {
  id: number
  slug: string
  token: string
}

const commentsAPI = {
  getComments: async (slug: string, token: string) => {
    try {
      const response = await fetch(`${apiUrl}/articles/${slug}/comments`, {
        method: "GET",
        headers: getHeaders(token),
      })
      const { comments } = await response.json()
      return comments
    } catch (e) {
      return e
    }
  },
  addComment: async ({ commentText, slug, token }: addCommentTypes) => {
    try {
      const response = await fetch(`${apiUrl}/articles/${slug}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Token ${encodeURIComponent(token)}`,
        },
        body: JSON.stringify({ comment: { body: commentText } }),
      })
      return await response.json()
    } catch (e) {
      return e
    }
  },
  deleteComment: async ({ id, slug, token }: DeleteCommentTypes) => {
    try {
      const response = await fetch(
        `${apiUrl}/articles/${slug}/comments/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            authorization: `Token ${encodeURIComponent(token)}`,
          },
        }
      )
      return await response.json()
    } catch (e) {
      return e
    }
  },
}

export default commentsAPI
