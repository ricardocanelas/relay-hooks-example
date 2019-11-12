export const GRAPHQL_URL = 'https://api.github.com/graphql'

const fetchRelay = async (params, variables) => {
  // Check that the auth token is configured
  const REACT_APP_GITHUB_AUTH_TOKEN = process.env.REACT_APP_GITHUB_AUTH_TOKEN
  if (REACT_APP_GITHUB_AUTH_TOKEN == null || REACT_APP_GITHUB_AUTH_TOKEN === '') {
    throw new Error(
      '!! This app requires a GitHub authentication token to be configured. See readme.md for setup details.'
    )
  }

  // Fetch data from GitHub's GraphQL API:
  const response = await fetch(GRAPHQL_URL, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Accept: 'application/json',
      Authorization: `bearer ${REACT_APP_GITHUB_AUTH_TOKEN}`,
    },
    body: JSON.stringify({
      name: params.name,
      query: params.text,
      variables,
    }),
  })

  // Get the response as JSON
  const json = await response.json()

  // Debugging
  console.log('# FetchRelay')
  console.log(`- query ${params.name} with ${JSON.stringify(variables)}`)
  console.log('- return', json)
  console.log('')

  // GraphQL returns exceptions (for example, a missing required variable) in the "errors"
  // property of the response. If any exceptions occurred when processing the request,
  // throw an error to indicate to the developer what went wrong.
  if (Array.isArray(json.errors)) {
    console.log('===== ERROR =====')
    console.log(json.errors)
    throw new Error(
      `Error fetching GraphQL query '${params.name}' with variables '${JSON.stringify(
        variables
      )}': ${JSON.stringify(json.errors)}`
    )
  }

  // Otherwise, return the full payload.
  return json
}

export default fetchRelay
