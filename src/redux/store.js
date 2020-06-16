import { configureStore } from "@reduxjs/toolkit"

import rootReducer from "./rootReducer"
import { loadState } from "lib/utils/localStorage"

const preloadedState = loadState("state")

export default configureStore({
  reducer: rootReducer,
  preloadedState,
})
