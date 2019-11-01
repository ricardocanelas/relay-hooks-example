require('dotenv').config({ path: './.env' })

var fetch = require('node-fetch')
var fs = require('fs')
const token = process.env.REACT_APP_GITHUB_AUTH_TOKEN

const { buildClientSchema, introspectionQuery, printSchema } = require('graphql/utilities')

fetch('https://api.github.com/graphql', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token,
  },
  body: JSON.stringify({ query: introspectionQuery }),
})
  .then(res => res.json())
  .then(res => {
    const schemaString = printSchema(buildClientSchema(res.data))
    fs.writeFileSync('./schema/schema.graphql', schemaString)
  })
