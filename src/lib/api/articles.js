import { API_URL } from "../utils/constants"
import { ARTICLES_ON_ONE_PAGE } from "../utils/constants"

const articlesAPI = {
  getAll: async (page) => {
    try {
      const response = await fetch(
        `${API_URL}/articles?limit=${ARTICLES_ON_ONE_PAGE}&offset=${
          page === 1 ? 0 : ARTICLES_ON_ONE_PAGE * (page - 1)
        }`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      const data = await response.json()
      return data
    } catch (e) {
      return e
    }
  },
  filterByTag: async (page, tag) => {
    try {
      const response = await fetch(
        `${API_URL}/articles?tag=${tag}&limit=${ARTICLES_ON_ONE_PAGE}&offset=${
          page === 1 ? 0 : ARTICLES_ON_ONE_PAGE * (page - 1)
        }`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      const data = await response.json()
      return data
    } catch (e) {
      return e
    }
  },
  getFeeds: async (page, token) => {
    try {
      const response = await fetch(
        `${API_URL}/articles/feed?limit=${ARTICLES_ON_ONE_PAGE}&offset=${
          page === 1 ? 0 : ARTICLES_ON_ONE_PAGE * (page - 1)
        }`,
        {
          method: "GET",
          headers: {
            authorization: `Token ${encodeURIComponent(token)}`,
          },
        }
      )
      console.log(response)
      const data = await response.json()
      return data
    } catch (e) {
      return e
    }
  },
  getTags: async () => {
    try {
      const response = await fetch(`${API_URL}/tags`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
      const data = await response.json()
      return data
    } catch (e) {
      return e
    }
  },
}

export default articlesAPI
