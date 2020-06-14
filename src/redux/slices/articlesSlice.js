import { createSlice } from "@reduxjs/toolkit"

const articlesSlice = createSlice({
  name: "articles",
  initialState: {
    articles: [],
    count: 0,
    page: 1,
    tag: "",
    feed: false,
  },
  reducers: {
    setArticlesData(state, action) {
      state.articles = []
      state.articles.push(...action.payload.articles)
      state.count = action.payload.articlesCount
    },
    setArticlesPage(state, action) {
      state.page = action.payload
    },
    setArticlesTag(state, action) {
      state.tag = action.payload
    },
    setArticlesFeed(state, action) {
      state.feed = action.payload
    },
  },
})

export const {
  setArticlesData,
  setArticlesPage,
  setArticlesTag,
  setArticlesFeed,
} = articlesSlice.actions

export default articlesSlice.reducer
