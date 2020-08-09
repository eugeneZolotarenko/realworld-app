export interface ArticleTypes {
  title: string
  description: string
  favoritesCount: number
  favorited: boolean
  slug: string
  tagList: string[]
  body: string
  author: {
    bio: string
    following: boolean
    image: string
    username: string
  }
  createdAt: string
}

export interface CommentTypes {
  id: number
  body: string
  author: {
    image: string
    username: string
  }
  createdAt: string
}

export interface BasicUserTypes {
  image: string
  email: string
  username: string
  bio: string
  token: string
}

export interface FullUserTypes extends BasicUserTypes {
  isLoading: boolean
  isError: boolean
}
