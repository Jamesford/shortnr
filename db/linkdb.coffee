Q = require('q')
db = require('nano')('http://localhost:5984/shortnr_links')

class LinkDB
  constructor: ->

  _handle: (err, data, deferred) ->
    if (!err)
      deferred.resolve(data)
    else
      deferred.reject(err)

  # Database operations
  _save: (id, data) ->
    deferred = Q.defer()
    db.insert data, id, (err, data) =>
      @_handle(err, data, deferred)
    deferred.promise

  _remove: (id, rev) ->
    deferred = Q.defer()
    db.destroy id, rev, (err, data) =>
      @_handle(err, data, deferred)
    deferred.promise

  get: (id) ->
    deferred = Q.defer()
    db.get id, (err, data) =>
      @_handle(err, data, deferred)
    deferred.promise

  info: (id) ->
    deferred = Q.defer()
    db.head id, (err, _, headers) =>
      @_handle(err, headers, deferred)
    deferred.promise

  # Data Operations
  create: (data) ->
    data.created = new Date().getTime()
    data.accessed = new Date().getTime()
    data.access_count = 0
    @_save(data._id, data)

  update: (data) ->
    data.accessed = new Date().getTime()
    data.access_count += 1
    @_save(data._id, data)

  delete: (id, data) ->
    if (data? and data._rev?)
      @_remove(id, data._rev)
    else
      @get(id).then (result) =>
        @_remove(id, result._rev)

module.exports = new LinkDB()