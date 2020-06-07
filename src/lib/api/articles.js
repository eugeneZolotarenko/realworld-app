import { API_URL } from "../utils/constants"
import { ARTICLES_ON_ONE_PAGE } from "../utils/constants"

const mapState = (state) => state

const articlesAPI = {
  getAll: async (page) => {
    try {
      const response = await fetch(
        `${API_URL}/articles?limit=${ARTICLES_ON_ONE_PAGE}&offset=${
          page === 0 ? 0 : ARTICLES_ON_ONE_PAGE * page
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
