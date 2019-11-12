import React from 'react'
import graphql from 'babel-plugin-relay/macro'
import { useFragment } from 'react-relay/hooks'

const fragmentDef = graphql`
  fragment Repositories_user on User
    @argumentDefinitions(count: { type: "Int", defaultValue: 5 }, cursor: { type: "String" }) {
    repositories(first: $count, after: $cursor, orderBy: { field: STARGAZERS, direction: DESC })
      @connection(key: "Repositories_repositories") {
      edges {
        node {
          id
          name
          url
          stargazers {
            totalCount
          }
        }
      }
    }
  }
`

const Repositories = ({ fragmentRef }) => {
  const data = useFragment(fragmentDef, fragmentRef)

  return (
    <div className="repositories">
      {data.repositories.edges.map(edge => {
        const stars = edge.node.stargazers.totalCount
        const starstToString = stars > 1000 ? `${Math.abs((stars / 1000).toFixed(1))}k` : stars
        return (
          <span key={edge.node.id} className="item">
            <a href={edge.node.url} target="_blank" rel="noopener noreferrer">
              {edge.node.name} ({starstToString})
            </a>
          </span>
        )
      })}
    </div>
  )
}

export default Repositories
