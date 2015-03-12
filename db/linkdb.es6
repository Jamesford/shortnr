var Q = require('q')
var db = require('nano')('http://localhost:5984/shortnr_links')

class LinkDB {
  constructor() {}

  _handle(err, data, deferred) {
    if (!err)
      deferred.resolve(data)
    else
      deferred.reject(err)
  }

// DB Operations
  _save(id, data) {
    deferred = Q.defer()
    db.insert(data, id, (err, data) => {
      this._handle(err, data, deferred)
    })
    return deferred.promise
  }

  _remove(id, rev) {
    deferred = Q.defer()
    db.destroy(id, rev, (err, data) => {
      this._handle(err, data, deferred)
    })
    return deferred.promise
  }

  get(id) {
    deferred = Q.defer()
    db.get(id, (err, data) => {
      this._handle(err, data, deferred)
    })
    return deferred.promise
  }

  info(id) {
    deferred = Q.defer()
    db.head(id, (err, _, headers) => {
      this._handle(err, headers, deferred)
    })
    return deferred.promise
  }

  // Data Operations
  create(data) {
    data.created = new Date().getTime()
    data.accessed = new Date().getTime()
    data.access_count = 0
    this._save(data._id, data)
  }

  update(data) {
    data.accessed = new Date().getTime()
    data.access_count += 1
    this._save(data._id, data)
  }

  delete(id, data) {
    if ((typeof data !== "undefined" && data !== null) && (data._rev != null)) {
      this._remove(id, data._rev)
    } else {
      this.get(id).then((result) => {
        this._remove(id, result._rev)
      })
    }
  }

}

module.exports = new LinkDB()