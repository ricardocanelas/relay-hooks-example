import React, { useCallback } from 'react'
import graphql from 'babel-plugin-relay/macro'
import { usePaginationFragment } from 'react-relay/hooks'
import Repositories from './Repositories'

const fragmentDef = graphql`
  fragment Following_user on User
    @argumentDefinitions(count: { type: "Int", defaultValue: 12 }, cursor: { type: "String" })
    @refetchable(queryName: "FollowingPaginationQuery") {
    following(first: $count, after: $cursor) @connection(key: "Following_following") {
      totalCount
      edges {
        node {
          id
          name
          login
          avatarUrl
          url
          ...Repositories_user
        }
      }
    }
  }
`
const Following = ({ fragmentRef }) => {
  const { data, loadNext, isLoadingNext, hasNext } = usePaginationFragment(fragmentDef, fragmentRef)

  // Callback to paginate the issues list
  const loadMore = useCallback(() => {
    // Don't fetch again if we're already loading the next page
    if (isLoadingNext) {
      return
    }

    loadNext(8)
  }, [isLoadingNext, loadNext])

  return (
    <div>
      <h4>Following {data.following.totalCount} users</h4>
      {data.following.edges.map(edge => (
        <li key={edge.node.id} className="item">
          {/* avatar */}
          <div className="avatar">
            <img alt={`${edge.node.login}'s avatar`} src={edge.node.avatarUrl} />
          </div>
          {/* title */}
          <div className="title">
            <a href={edge.node.url} target="_blank" rel="noopener noreferrer">
              @{edge.node.login}
            </a>
            <span> - {edge.node.name}</span>
          </div>
          {/* top repositories */}
          <Repositories fragmentRef={edge.node} />
        </li>
      ))}

      {hasNext && (
        <button type="button" disabled={isLoadingNext} onClick={loadMore}>
          {isLoadingNext ? 'Loading...' : 'Load More'}
        </button>
      )}
    </div>
  )
}

export default Following
