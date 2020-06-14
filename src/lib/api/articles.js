import { ARTICLES_ON_ONE_PAGE } from "lib/utils/constants"

const apiUrl = process.env.REACT_APP_API_URL
const limitOffset = (page) =>
  `limit=${ARTICLES_ON_ONE_PAGE}&offset=${
    page === 1 ? 0 : ARTICLES_ON_ONE_PAGE * (page - 1)
  }`

const articlesAPI = {
  getAll: async (page) => {
    try {
      const response = await fetch(`${apiUrl}/articles?${limitOffset(page)}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
      return await response.json()
    } catch (e) {
      return e
    }
  },
  filterByTag: async (page, tag) => {
    try {
      const response = await fetch(
        `${apiUrl}/articles?tag=${tag}&${limitOffset(page)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      return await response.json()
    } catch (e) {
      return e
    }
  },
  getFeeds: async (page, token) => {
    try {
      const response = await fetch(
        `${apiUrl}/articles/feed?${limitOffset(page)}`,
        {
          method: "GET",
          headers: {
            authorization: `Token ${encodeURIComponent(token)}`,
          },
        }
      )
      return await response.json()
    } catch (e) {
      return e
    }
  },
  getTags: async () => {
    try {
      const response = await fetch(`${apiUrl}/tags`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
      return await response.json()
    } catch (e) {
      return e
    }
  },
}

export default articlesAPI
