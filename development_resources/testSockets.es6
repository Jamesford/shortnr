var socket = require('socket.io-client')('http://localhost:3001')

// Send Ping
function ping() {
  socket.emit('ping')
}

// Connected
socket.on('connected', function () {
  console.log('Connected')
  ping()
})

// Receive Pong
socket.on('pong', function () {
  console.log('Messaging OK')
})

// Receive Change
socket.on('change', function(change) {
  console.log(change)
})