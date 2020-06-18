import { ARTICLES_ON_ONE_PAGE } from "lib/utils/constants"

const apiUrl = process.env.REACT_APP_API_URL
const limitOffset = (page) =>
  `limit=${ARTICLES_ON_ONE_PAGE}&offset=${
    page === 1 ? 0 : ARTICLES_ON_ONE_PAGE * (page - 1)
  }`
const getHeaders = (token) =>
  token ? { authorization: `Token ${encodeURIComponent(token)}` } : {}

const articlesAPI = {
  getOne: async (slug, token) => {
    try {
      const response = await fetch(`${apiUrl}/articles/${slug}`, {
        method: "GET",
        headers: getHeaders(token),
      })
      const { article } = await response.json()
      console.log(article)
      return { article, status: response.status }
    } catch (e) {
      return e
    }
  },
  getAll: async (page, token) => {
    try {
      const response = await fetch(`${apiUrl}/articles?${limitOffset(page)}`, {
        method: "GET",
        headers: getHeaders(token),
      })
      return await response.json()
    } catch (e) {
      return e
    }
  },
  filterByTag: async (page, tag, token) => {
    try {
      console.log(token)
      const response = await fetch(
        `${apiUrl}/articles?tag=${tag}&${limitOffset(page)}`,
        {
          method: "GET",
          headers: getHeaders(token),
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
      })
      return await response.json()
    } catch (e) {
      return e
    }
  },
  loveIt: async (slug, token) => {
    try {
      const response = await fetch(`${apiUrl}/articles/${slug}/favorite`, {
        method: "POST",
        headers: {
          authorization: `Token ${encodeURIComponent(token)}`,
        },
      })
      return await response.json()
    } catch (e) {
      return e
    }
  },
  unLoveIt: async (slug, token) => {
    try {
      const response = await fetch(`${apiUrl}/articles/${slug}/favorite`, {
        method: "DELETE",
        headers: {
          authorization: `Token ${encodeURIComponent(token)}`,
        },
      })
      return await response.json()
    } catch (e) {
      return e
    }
  },
}

export default articlesAPI
