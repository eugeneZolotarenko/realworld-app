import { combineReducers } from "redux"

import userReducer from "./slices/userSlice"
import articlesReducer from "./slices/articlesSlice"

export default combineReducers({
  user: userReducer,
  articles: articlesReducer,
})
