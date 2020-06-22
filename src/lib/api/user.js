const apiUrl = process.env.REACT_APP_API_URL
const userAPI = {
  register: async (username, email, password) => {
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
  login: async (email, password) => {
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
  getProfile: async (username, token) => {
    try {
      const response = await fetch(`${apiUrl}/profiles/${username}`, {
        method: "GET",
        headers: {
          authorization: `Token ${encodeURIComponent(token)}`,
        },
      })
      const { profile } = await response.json()
      return { profile, status: response.status }
    } catch (e) {
      return e
    }
  },
}

export default userAPI
