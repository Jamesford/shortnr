# NPM Dependencies
Hapi = require('hapi')

# App Dependencies
Routes = require('./routes')

server = new Hapi.Server()

server.connection
  port: 3000

server.route Routes

server.start ->
  console.info('Server running at 0.0.0.0:'+server.info.port)