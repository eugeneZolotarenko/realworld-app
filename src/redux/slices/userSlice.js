import { createSlice } from "@reduxjs/toolkit"

import history from "lib/utils/history"
import userAPI from "lib/api/user"
import { DEFAULT_USER_IMAGE } from "lib/utils/constants"

const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    setCurrentUser(state, action) {
      for (const x in action.payload) {
        state[x] = x === "image" ? DEFAULT_USER_IMAGE : action.payload[x]
      }
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
