import { createSlice } from "@reduxjs/toolkit"

const articlesSlice = createSlice({
  name: "articles",
  initialState: [],
  reducers: {
    setArticles(state, action) {
      state.push(action.payload.articles)
    },
  },
})

export const { setArticles } = articlesSlice.actions

export default articlesSlice.reducer
