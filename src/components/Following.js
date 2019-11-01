import React from 'react'
import graphql from 'babel-plugin-relay/macro'
import { usePagination } from 'relay-hooks'

const fragmentDef = graphql`
  fragment Following_user on User
    @argumentDefinitions(count: { type: "Int", defaultValue: 10 }, cursor: { type: "String" }) {
    following(first: $count, after: $cursor) @connection(key: "Following_following") {
      edges {
        node {
          id
          name
          login
        }
      }
    }
  }
`

const connectionConfig = {
  getVariables(props, { count, cursor }, fragmentVariables) {
    return {
      count,
      cursor,
      login: fragmentVariables.login,
    }
  },

  query: graphql`
    # Pagination query to be fetched upon calling 'loadMore'.
    # Notice that we re-use our fragment, and the shape of this query matches our fragment spec.
    query FollowingPaginationQuery($count: Int!, $cursor: String, $login: String!) {
      user(login: $login) {
        ...Following_user @arguments(count: $count, cursor: $cursor)
      }
    }
  `,
}

const Following = ({ fragmentRef }) => {
  const [data, { isLoading, hasMore, loadMore }] = usePagination(fragmentDef, fragmentRef)

  const handleLoadMore = () => {
    if (!hasMore() || isLoading()) {
      return
    }

    loadMore(
      connectionConfig,
      10, // Fetch the next 10 following-user items
      error => {
        console.log(error)
      }
    )
  }

  return (
    <div>
      <h4>Following</h4>
      {data.following.edges.map(edge => (
        <li key={edge.node.id}>
          @{edge.node.login} ({edge.node.name})
        </li>
      ))}
      <hr />
      <button onClick={handleLoadMore}>Load More</button>
    </div>
  )
}

export default Following
