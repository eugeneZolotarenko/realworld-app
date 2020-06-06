import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
  name: "user",
  initialState: [],
  reducers: {
    setCurrentUser(state, action) {
      state.push(action.payload)
    },
  },
})

export const { setCurrentUser } = userSlice.actions

export default userSlice.reducer
