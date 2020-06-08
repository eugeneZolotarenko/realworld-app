import { createSlice } from "@reduxjs/toolkit"

const articlesSlice = createSlice({
  name: "articles",
  initialState: {
    articles: [],
    count: 0,
    page: 1,
  },
  reducers: {
    setArticlesData(state, action) {
      state.articles = []
      state.articles.push(...action.payload.articles)
      state.count = action.payload.articlesCount
    },
    setArticlesPage(state, action) {
      console.log(action)
      state.page = action.payload
    },
  },
})

export const { setArticlesData, setArticlesPage } = articlesSlice.actions

export default articlesSlice.reducer
