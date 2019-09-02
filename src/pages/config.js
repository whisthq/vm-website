export function api(
  endpoint,
  api_url = null,
  checkForInvalidUrls = process.env.NODE_ENV !== 'production'
) {
  if (checkForInvalidUrls && !endpoint.match('[/:].+')) {
    console.error(`Endpoints must begin with a '/' character, not ${endpoint}`)
  }

  const output =
    api_url === 'recommendations'
      ? `${process.env.REACT_APP_RECOMMENDATION_API_URL}${endpoint}`
      : `${process.env.REACT_APP_API_URL}${endpoint}`

  return output
}
