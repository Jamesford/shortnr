var Q = require('q');
var request = require('superagent');

module.exports = {

  get: function (_id) {
    var deferred = Q.defer();
    request.get('/api/' + _id)
      .set('Accept', 'application/json')
      .end(function(err, res) {
        if (err) deferred.reject(err);
        deferred.resolve(res.body);
      });
    return deferred.promise;
  },

  exists: function (_id) {
    var deferred = Q.defer();
    request.post('/api/exists')
      .send({ _id: _id })
      .set('Accept', 'application/json')
      .end(function(err, res) {
        if (err) deferred.reject(err);
        deferred.resolve(res.body);
      })
    return deferred.promise;
  },

  save: function (data) {
    var deferred = Q.defer();
    request.post('/api/save')
      .send({ _id: data._id, url: data.url })
      .set('Accept', 'application/json')
      .end(function(err, res) {
        if (err) deferred.reject(err);
        deferred.resolve(res.body);
      })
    return deferred.promise;
  },

  list: function (list) {
    var deferred = Q.defer();
    request.get('/api/' + list.type + '/' + list.range)
      .set('Accept', 'application/json')
      .end(function(err, res) {
        if (err) deferred.reject(err);
        deferred.resolve(res.body);
      });
    return deferred.promise;
  }

}