export const getHeaders = (token) =>
  token ? { authorization: `Token ${encodeURIComponent(token)}` } : {}
