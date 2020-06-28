import { createSlice } from "@reduxjs/toolkit"

import articlesAPI from "lib/api/articles"
import { ARTICLES_ON_ONE_PAGE } from "lib/utils/constants"

const articlesSlice = createSlice({
  name: "articles",
  initialState: {
    articles: [],
    count: 0,
    pages: 0,
    page: 1,
    tag: "",
    author: "",
    userFavorited: "",
    feed: false,
    isLoading: false,
    isError: false,
  },
  reducers: {
    setArticlesData(state, action) {
      state.isError = false
      state.articles = action.payload.articles
      state.count = action.payload.articlesCount
      state.pages = Array.from(
        {
          length: Math.ceil(
            action.payload.articlesCount / ARTICLES_ON_ONE_PAGE
          ),
        },
        (v, i) => i + 1
      )
      state.isLoading = false
    },
    setArticlesPage(state, action) {
      state.page = action.payload
    },
    setArticlesTag(state, action) {
      state.feed = false
      state.author = ""
      state.userFavorited = ""
      state.page = 1
      state.tag = action.payload
    },
    setArticlesAuthor(state, action) {
      state.feed = false
      state.tag = ""
      state.userFavorited = ""
      state.page = 1
      state.author = action.payload
    },
    setArticlesUserFavorited(state, action) {
      state.feed = false
      state.tag = ""
      state.author = ""
      state.page = 1
      state.userFavorited = action.payload
    },
    setArticlesFeed(state, action) {
      state.tag = ""
      state.author = ""
      state.userFavorited = ""
      state.page = 1
      state.feed = action.payload
    },
    setLoading(state, action) {
      state.isLoading = action.payload
    },
    setError(state, action) {
      state.isError = action.payload
    },
  },
})

export const getAllArticles = (page, token) => async (dispatch) => {
  dispatch(setLoading(true))
  try {
    const allArticles = await articlesAPI.getAll(page, token)
    dispatch(setArticlesData(allArticles))
  } catch {
    dispatch(setError(true))
  }
}

export const getArticlesByTag = (page, tag, token) => async (dispatch) => {
  dispatch(setLoading(true))
  try {
    const byTagArticles = await articlesAPI.filterByTag(page, tag, token)
    dispatch(setArticlesData(byTagArticles))
  } catch {
    dispatch(setError(true))
  }
}

export const getArticlesByAuthor = (page, author, token) => async (
  dispatch
) => {
  dispatch(setLoading(true))
  try {
    const byAuthorArticles = await articlesAPI.filterByAuthor(
      page,
      author,
      token
    )
    dispatch(setArticlesData(byAuthorArticles))
  } catch {
    dispatch(setError(true))
  }
}

export const getArticlesByUserFavorited = (page, user, token) => async (
  dispatch
) => {
  dispatch(setLoading(true))
  try {
    const userFavoritedArticles = await articlesAPI.filterByUserFavorited(
      page,
      user,
      token
    )
    dispatch(setArticlesData(userFavoritedArticles))
  } catch {
    dispatch(setError(true))
  }
}

export const getArticlesFeeds = (page, token) => async (dispatch) => {
  dispatch(setLoading(true))
  try {
    const feedArticles = await articlesAPI.getFeeds(page, token)
    dispatch(setArticlesData(feedArticles))
  } catch {
    dispatch(setError(true))
  }
}

export const {
  setArticlesData,
  setArticlesPage,
  setArticlesTag,
  setArticlesAuthor,
  setArticlesUserFavorited,
  setArticlesFeed,
  setLoading,
  setError,
} = articlesSlice.actions

export default articlesSlice.reducer
