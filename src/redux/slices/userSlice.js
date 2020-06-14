import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
  name: "user",
  initialState: { token: "" },
  reducers: {
    setCurrentUser(state, action) {
      state.token = action.payload.token
    },
  },
})

export const { setCurrentUser } = userSlice.actions

export default userSlice.reducer
