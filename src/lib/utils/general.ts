export const getHeaders = (token: string): Record<string, string> =>
  token ? { authorization: `Token ${encodeURIComponent(token)}` } : {}
