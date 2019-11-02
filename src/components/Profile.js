import React from 'react'
import graphql from 'babel-plugin-relay/macro'
import { useLazyLoadQuery } from 'react-relay/hooks'
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
  const data = useLazyLoadQuery(query, { login })

  return (
    <div>
      <h3>{data.user.name}</h3>
      <Following fragmentRef={data.user} />
    </div>
  )
}

export default Profile
