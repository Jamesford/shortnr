// NPM
var Hapi = require('hapi')

// APP
var Routes = require('./routes')
var server = new Hapi.Server()

// Create Connection
server.connection({
  port: 3000
})

// Load Routes
server.route(Routes)

// Start Server
server.start(() => {
  console.info('Server running at 0.0.0.0:' + server.info.port)
})