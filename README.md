
Using [relay-experimental](https://relay.dev/docs/en/experimental/api-reference).

# Setup

1. Install the app's dependencies:

        yarn install

2. Get your GitHub authentication token in order to let the app query GitHub's public GraphQL API:
  a. Open https://github.com/settings/tokens.
  b. Ensure that at least the `repo` scope is selected.
  c. Generate the token
  d. Create a file `.env` and add the following contents (substiture <TOKEN> for your authentication token):

        REACT_APP_GITHUB_AUTH_TOKEN=<TOKEN>


3. Compile Relay

        yarn relay

4. Start app

         yarn start


Now you're ready to run the app!