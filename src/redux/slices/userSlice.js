import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
  name: "user",
  initialState: [],
  reducers: {
    setCurrentUser(state, action) {
      const { id } = action.payload
      console.log(state)
      console.log(action.payload)
      state.push({ id })
    },
  },
})

export const { setCurrentUser } = userSlice.actions

export default userSlice.reducer
