export const loadState = (name) => {
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

export const saveState = (state, name) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem(name, serializedState)
  } catch (err) {
    console.error(err)
  }
}
