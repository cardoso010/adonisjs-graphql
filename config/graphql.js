'use strict'

const { join } = require('path')

module.exports = {
  options: {
    debug: false,
    endpointURL: '/',
    cacheControl: true
  },

  schema: join(__dirname, '../app/GraphQL/Schema'),
  resolvers: join(__dirname, '../app/GraphQL/Resolvers'),
}
