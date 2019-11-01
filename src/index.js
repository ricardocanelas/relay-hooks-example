import React from 'react'
import ReactDOM from 'react-dom'
import { RelayEnvironmentProvider } from 'react-relay/hooks'
import RelayEnvironment from './relay/Environment'
import App from './App'

ReactDOM.render(
  <RelayEnvironmentProvider environment={RelayEnvironment}>
    <App />
  </RelayEnvironmentProvider>,
  document.getElementById('root')
)
