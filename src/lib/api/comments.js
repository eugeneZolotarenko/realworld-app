import { getHeaders } from "lib/utils/general"
import { apiUrl } from "lib/utils/constants"

const commentsAPI = {
  getComments: async (slug, token) => {
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
  addComment: async ({ comment, slug, token }) => {
    try {
      const response = await fetch(`${apiUrl}/articles/${slug}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Token ${encodeURIComponent(token)}`,
        },
        body: JSON.stringify({ comment: { body: comment } }),
      })
      return await response.json()
    } catch (e) {
      return e
    }
  },
  deleteComment: async ({ id, slug, token }) => {
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
