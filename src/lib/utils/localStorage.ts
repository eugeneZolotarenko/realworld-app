type stateTypes = {
  user: {
    isLoading: boolean
    isError: boolean
    image: string
    email: string
    username: string
    bio: string
  }
}

export const loadState = (name: string) => {
  try {
    const serializedState = localStorage.getItem(name)
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (err) {
    return undefined
  }
}

export const saveState = (state: stateTypes, name: string) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem(name, serializedState)
  } catch (err) {
    console.error(err)
  }
}
