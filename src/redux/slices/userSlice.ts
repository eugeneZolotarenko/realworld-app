import { createSlice } from "@reduxjs/toolkit"

import history from "lib/utils/history"
import userAPI from "lib/api/user"
import { DEFAULT_USER_IMAGE } from "lib/utils/constants"

type RegisterTypes = {
  userName: string
  email: string
  password: string
}

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoading: false,
    isError: false,
    image: "",
    email: "",
    username: "",
    bio: "",
  },
  reducers: {
    setCurrentUser(state, action) {
      state.image = action.payload.image
      state.email = action.payload.email = ""
        ? DEFAULT_USER_IMAGE
        : action.payload.email
      state.username = action.payload.username
      state.bio = action.payload.bio
      state.isError = false
    },
    logoutUser(state) {
      state.image = ""
      state.email = ""
      state.username = ""
      state.bio = ""
      history.push("/")
    },
    setImage(state, action) {
      state.image = action.payload
    },
    setEmail(state, action) {
      state.email = action.payload
    },
    setUsername(state, action) {
      state.username = action.payload
    },
    setBio(state, action) {
      state.bio = action.payload
    },
    setLoading(state, action) {
      state.isLoading = action.payload
    },
    setError(state, action) {
      state.isError = action.payload
    },
  },
})

export const loginUser = (email: string, password: string) => async (
  dispatch: (arg0: { payload: any; type: string }) => void
) => {
  dispatch(setLoading(true))
  try {
    const { user, status } = await userAPI.login(email, password)
    if (status !== 200) {
      dispatch(setError(true))
    } else {
      history.push("/")
      dispatch(setCurrentUser(user))
    }
    dispatch(setLoading(false))
  } catch (error) {
    console.error(error)
  }
}

export const registerUser = ({
  userName,
  email,
  password,
}: RegisterTypes) => async (
  dispatch: (arg0: { payload: any; type: string }) => void
) => {
  dispatch(setLoading(true))
  try {
    const { user, status } = await userAPI.register(userName, email, password)
    if (status !== 200) {
      dispatch(setError(true))
    } else {
      history.push("/")
      dispatch(setCurrentUser(user))
    }
    dispatch(setLoading(false))
  } catch (error) {
    console.error(error)
  }
}

export const {
  setCurrentUser,
  setImage,
  setEmail,
  setUsername,
  setBio,
  logoutUser,
  setLoading,
  setError,
} = userSlice.actions

export default userSlice.reducer
