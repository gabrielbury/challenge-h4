'use strict'

const Hapi = require('hapi')

const Plugins = require('./plugins')

require('./bootstrap')
require('./utils/connection')

const server = new Hapi.Server({
  port: process.env.PORT || 3000,
  routes: { cors: true }
})

async function registerPlugins () {
  try {
    await Plugins.registerSwagger(server)
    await Plugins.registerRoutes(server)
    await Plugins.registerAuthJwt(server)
  } catch (err) {
    console.log(err)
  }
}

registerPlugins()
  .then(startServer)

async function startServer () {
  try {
    if (require.main === module) {
      await server.start()
      console.log(`Server running at: ${server.info.uri}`)
    }
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  server,
  startServer
}
