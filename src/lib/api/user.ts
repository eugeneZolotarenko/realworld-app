import { getHeaders } from "lib/utils/general"
import { apiUrl } from "lib/utils/constants"
import { BasicUserTypes } from "lib/types"

interface UpdateUserTypes extends BasicUserTypes {
  password: string
}

const userAPI = {
  register: async (username: string, email: string, password: string) => {
    try {
      const response = await fetch(`${apiUrl}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: { username, email, password } }),
      })
      return await response.json()
    } catch (e) {
      return e
    }
  },
  login: async (email: string, password: string) => {
    try {
      const response = await fetch(`${apiUrl}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: { email, password } }),
      })
      const data = await response.json()
      return {
        status: response.status,
        user: data.user,
      }
    } catch (e) {
      return e
    }
  },
  updateUser: async ({
    email,
    username,
    password,
    image,
    bio,
    token,
  }: UpdateUserTypes) => {
    try {
      const response = await fetch(`${apiUrl}/user`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${encodeURIComponent(token)}`,
        },
        body: JSON.stringify({
          user: { email, username, password, image, bio },
        }),
      })
      return await response.json()
    } catch (e) {
      return e
    }
  },
  currentUser: async (token: string) => {
    try {
      const response = await fetch(`/user`, {
        method: "GET",
        headers: {
          Authorization: `Token ${encodeURIComponent(token)}`,
        },
      })
      return response
    } catch (e) {
      return e
    }
  },
  getProfile: async (username: string, token: string) => {
    try {
      const response = await fetch(`${apiUrl}/profiles/${username}`, {
        method: "GET",
        headers: getHeaders(token),
      })
      const { profile } = await response.json()
      return { profile, status: response.status }
    } catch (e) {
      return e
    }
  },
  followUser: async (username: string, token: string) => {
    try {
      const response = await fetch(`${apiUrl}/profiles/${username}/follow`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${encodeURIComponent(token)}`,
        },
      })
      const data = await response.json()
      return data
    } catch (e) {
      return e
    }
  },
  unFollowUser: async (username: string, token: string) => {
    try {
      const response = await fetch(`${apiUrl}/profiles/${username}/follow`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${encodeURIComponent(token)}`,
        },
      })
      const data = await response.json()
      return data
    } catch (e) {
      return e
    }
  },
}

export default userAPI
