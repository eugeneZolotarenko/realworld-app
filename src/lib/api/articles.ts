import { apiUrl, ARTICLES_ON_ONE_PAGE } from "lib/utils/constants"
import { getHeaders } from "lib/utils/general"

const limitOffset = (page: number) =>
  `limit=${ARTICLES_ON_ONE_PAGE}&offset=${
    page === 1 ? 0 : ARTICLES_ON_ONE_PAGE * (page - 1)
  }`

type EditArticleTypes = {
  title: string
  description: string
  body: string
  tagList: string[]
  token: string
  slug: string
}

type CreateArticleTypes = {
  title: string
  description: string
  body: string
  tagList: string[]
  token: string
}

const articlesAPI = {
  createArticle: async ({
    title,
    description,
    body,
    tagList,
    token,
  }: CreateArticleTypes) => {
    try {
      const response = await fetch(`${apiUrl}/articles`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Token ${encodeURIComponent(token)}`,
        },
        body: JSON.stringify({
          article: { title, description, body, tagList },
        }),
      })
      return await response.json()
    } catch (e) {
      return e
    }
  },

  editArticle: async ({
    title,
    description,
    body,
    tagList,
    token,
    slug,
  }: EditArticleTypes) => {
    try {
      const response = await fetch(`${apiUrl}/articles/${slug}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Token ${encodeURIComponent(token)}`,
        },
        body: JSON.stringify({
          article: { title, description, body, tagList },
        }),
      })
      return await response.json()
    } catch (e) {
      return e
    }
  },

  deleteArticle: async (slug: string, token: string) => {
    try {
      const response = await fetch(`${apiUrl}/articles/${slug}/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Token ${encodeURIComponent(token)}`,
        },
      })
      return await response.json()
    } catch (e) {
      return e
    }
  },

  getOne: async (slug: string, token: string) => {
    try {
      const response = await fetch(`${apiUrl}/articles/${slug}`, {
        method: "GET",
        headers: getHeaders(token),
      })
      const { article } = await response.json()
      return { article, status: response.status }
    } catch (e) {
      return e
    }
  },

  getAll: async (page: number, token: string) => {
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

  filterByTag: async (page: number, tag: string, token: string) => {
    try {
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

  filterByAuthor: async (page: number, author: string, token: string) => {
    try {
      const response = await fetch(
        `${apiUrl}/articles?author=${author}&${limitOffset(page)}`,
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

  filterByUserFavorited: async (
    page: number,
    userName: string,
    token: string
  ) => {
    try {
      const response = await fetch(
        `${apiUrl}/articles?favorited=${userName}&${limitOffset(page)}`,
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

  getFeeds: async (page: number, token: string) => {
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

  loveIt: async (slug: string, token: string) => {
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

  unLoveIt: async (slug: string, token: string) => {
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
