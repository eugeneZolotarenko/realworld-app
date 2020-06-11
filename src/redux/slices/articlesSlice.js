import { createSlice } from "@reduxjs/toolkit"

const articlesSlice = createSlice({
  name: "articles",
  initialState: {
    articles: [],
    count: 0,
    page: 1,
    tag: "",
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
  },
})

export const {
  setArticlesData,
  setArticlesPage,
  setArticlesTag,
} = articlesSlice.actions

export default articlesSlice.reducer
