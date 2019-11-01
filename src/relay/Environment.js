import { Environment, Network, RecordSource, Store } from 'relay-runtime'

import fetchRelay from './fetchRelay'

const network = Network.create(fetchRelay)

const store = new Store(new RecordSource(), {
  // This property tells Relay to not immediately clear its cache when the user
  // navigates around the app. Relay will hold onto the specified number of
  // query results, allowing the user to return to recently visited pages
  // and reusing cached data if its available/fresh.
  gcReleaseBufferSize: 10,
})

const environment = new Environment({
  network,
  store,
})

export default environment
