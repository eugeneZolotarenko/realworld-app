import { createSlice } from "@reduxjs/toolkit"

import history from "lib/utils/history"
import userAPI from "lib/api/user"

const userSlice = createSlice({
  name: "user",
  initialState: { token: "" },
  reducers: {
    setCurrentUser(state, action) {
      state.token = action.payload.token
    },
  },
})

export const loginUser = (email, password) => async (dispatch) => {
  try {
    const { user, status } = await userAPI.login(email, password)
    if (status !== 200) {
      console.log("errror")
    } else {
      history.push("/")
      dispatch(setCurrentUser(user))
    }
  } catch (error) {
    console.error(error)
  }
}

export const registerUser = ({ userName, email, password }) => async (
  dispatch
) => {
  try {
    const { user, status } = await userAPI.register(userName, email, password)
    if (status !== 200) {
      console.log("errror")
    } else {
      history.push("/")
      dispatch(setCurrentUser(user))
    }
  } catch (error) {
    console.error(error)
  }
}

export const { setCurrentUser } = userSlice.actions

export default userSlice.reducer
