// NPM
var Hapi = require('hapi')

// APP
var Routes = require('./routes')
var Sockets = require('./sockets')
var server = new Hapi.Server()

// Create Connection
server.connection({
  port: 3000,
  labels: ['api']
})
server.connection({
  port: 3001,
  labels: ['sockets']
})

// Load Routes
server.select('api').route(Routes)

// Load Sockets
new Sockets(server.select('sockets').listener)

// Start Server
server.start(() => {
  console.info('Server running at 0.0.0.0:' + server.info.port)
})