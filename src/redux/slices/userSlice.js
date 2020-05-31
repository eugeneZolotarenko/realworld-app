import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setCurrentUser(state, action) {
      const { currentUser } = action.payload
      state.push(currentUser)
    },
  },
})

export const { setCurrentUser } = userSlice.actions

export default userSlice.reducer
