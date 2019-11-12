import React, { Suspense } from 'react'
import Profile from './components/Profile'

function App() {
  return (
    <div className="App">
      <Suspense fallback={'Loading...'}>
        <Profile login="kassens" />
      </Suspense>
    </div>
  )
}

export default App
