import { API_URL } from "../utils/constants"

const userAPI = {
  register: async (username, email, password) => {
    try {
      const response = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: { username, email, password } }),
      })
      const data = await response.json()
      return data
    } catch (e) {
      return e
    }
  },
  login: async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: { email, password } }),
      })
      const data = await response.json()
      const { status } = response
      const { user } = data
      console.log(user)
      return { status, user }
    } catch (e) {
      return e
    }
  },
  currentUser: async (token) => {
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
}

export default userAPI
