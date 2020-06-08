import { API_URL } from "../utils/constants"
import { ARTICLES_ON_ONE_PAGE } from "../utils/constants"

const articlesAPI = {
  getAll: async (page) => {
    try {
      const response = await fetch(
        `${API_URL}/articles?limit=${ARTICLES_ON_ONE_PAGE}&offset=${
          page === 1 ? 0 : ARTICLES_ON_ONE_PAGE * (page - 1)
        }`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      const data = await response.json()
      return data
    } catch (e) {
      return e
    }
  },
}

export default articlesAPI
