import { API_URL } from "../utils/constants"

const articlesAPI = {
  getAll: async () => {
    try {
      const response = await fetch(`${API_URL}/articles`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
      const data = await response.json()
      return data
    } catch (e) {
      return e
    }
  },
}

export default articlesAPI
