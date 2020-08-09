import { combineReducers } from "redux"

import userReducer from "./slices/userSlice"
import articlesReducer from "./slices/articlesSlice"

const rootReducer = combineReducers({
  user: userReducer,
  articlesData: articlesReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
