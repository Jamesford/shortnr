var Q = require('q')
var db = require('nano')('http://localhost:5984/shortnr_links')
var LinkDB = require('../db/linkdb')

function handleConnection (socket) {
  socket.emit('connected')
  socket.on('ping', function() {
    socket.emit('pong')
  })
}

class Sockets {
  constructor(listener) {
    this.io = require('socket.io')(listener)
    this.init()
  }

  init() {
    this.io.on('connection', handleConnection)
    var changes = db.follow({ since: 'now' })
      .on('change', (change) => {
        LinkDB.get(change.id).then((result) => {
          this.io.emit('change', result)
        })
      })
      .follow()
  }
}

module.exports = Sockets