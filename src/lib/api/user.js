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
}

export default userAPI
