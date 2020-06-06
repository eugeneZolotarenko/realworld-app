import { configureStore } from "@reduxjs/toolkit"

import rootReducer from "./rootReducer"
import { loadState } from "./localStorage"

const preloadedState = loadState()

export default configureStore({
  reducer: rootReducer,
  preloadedState,
})
