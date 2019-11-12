import React from 'react'
import ReactDOM from 'react-dom'
import { RelayEnvironmentProvider } from 'react-relay/hooks'
import RelayEnvironment from './relay/Environment'
import App from './App'
import './style.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <RelayEnvironmentProvider environment={RelayEnvironment}>
    <App />
  </RelayEnvironmentProvider>
)
