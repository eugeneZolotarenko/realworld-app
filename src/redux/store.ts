import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"

import rootReducer from "./rootReducer"
import { loadState } from "lib/utils/localStorage"

const preloadedState = loadState("state")

export const store = configureStore({
  reducer: rootReducer,
  preloadedState,
})

export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

export default store
