import { createSlice } from "@reduxjs/toolkit"

import articlesAPI from "lib/api/articles"

const articlesSlice = createSlice({
  name: "articles",
  initialState: {
    articles: [],
    count: 0,
    page: 1,
    tag: "",
    author: "",
    feed: false,
    isLoading: false,
    isError: false,
  },
  reducers: {
    setArticlesData(state, action) {
      state.isLoading = false
      state.isError = false
      state.articles = action.payload.articles
      state.count = action.payload.articlesCount
    },
    setArticlesPage(state, action) {
      state.page = action.payload
    },
    setArticlesTag(state, action) {
      state.feed = false
      state.author = ""
      state.page = 1
      state.tag = action.payload
    },
    setArticlesAuthor(state, action) {
      state.feed = false
      state.tag = ""
      state.page = 1
      state.author = action.payload
    },
    setArticlesFeed(state, action) {
      state.tag = ""
      state.author = ""
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
  setArticlesFeed,
  setLoading,
  setError,
} = articlesSlice.actions

export default articlesSlice.reducer
