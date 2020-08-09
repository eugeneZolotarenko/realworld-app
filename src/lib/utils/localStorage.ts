import { FullUserTypes } from "lib/types"

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

export const saveState = (state: { user: FullUserTypes }, name: string) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem(name, serializedState)
  } catch (err) {
    console.error(err)
  }
}
