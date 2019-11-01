import React from 'react'
import graphql from 'babel-plugin-relay/macro'
import { useQuery } from 'relay-hooks'
import Following from './Following'

const query = graphql`
  query ProfileQuery($login: String!) {
    user(login: $login) {
      name
      bio
      ...Following_user
    }
  }
`

const Profile = ({ login }) => {
  // const { props, error } = useQuery(query, { login }) // Relay-Hooks: V2.0
  const { props, error } = useQuery({
    query: query,
    variables: { login },
  })

  if (props && props.user) {
    return (
      <div>
        <h3>{props.user.name}</h3>
        <Following fragmentRef={props.user} />
      </div>
    )
  } else if (error) {
    return <div>{error.message}</div>
  }

  return <div>loading</div>
}

export default Profile
