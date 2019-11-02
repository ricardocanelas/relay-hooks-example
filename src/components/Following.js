import React, { useCallback } from 'react'
import graphql from 'babel-plugin-relay/macro'
import { usePaginationFragment } from 'react-relay/hooks'

const fragmentDef = graphql`
  fragment Following_user on User
    @argumentDefinitions(count: { type: "Int", defaultValue: 10 }, cursor: { type: "String" })
    @refetchable(queryName: "FollowingPaginationQuery") {
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

const Following = ({ fragmentRef }) => {
  const { data, loadNext, isLoadingNext } = usePaginationFragment(fragmentDef, fragmentRef)

  // Callback to paginate the issues list
  const loadMore = useCallback(() => {
    // Don't fetch again if we're already loading the next page
    if (isLoadingNext) {
      return
    }
    loadNext(10)
  }, [isLoadingNext, loadNext])

  return (
    <div>
      <h4>Following</h4>
      {data.following.edges.map(edge => (
        <li key={edge.node.id}>
          @{edge.node.login} ({edge.node.name})
        </li>
      ))}
      <hr />
      <button onClick={loadMore}>Load More</button>
    </div>
  )
}

export default Following
