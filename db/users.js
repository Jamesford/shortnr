import Q                 from 'q'
import aguid             from 'aguid';
import bcrypt            from 'bcrypt-nodejs';
import { UsersDB as db } from '../lib/nano'

class UsersDB {
  constructor() {}

  get (payload) {
    let deferred = Q.defer()
    // Get user obj from db
    db.get(aguid(payload.username), (err, body, headers) => {
      if (err) { deferred.reject(err) }
      // Check password is correct
      bcrypt.compare(payload.password, body.passhash, function(err, res) {
        if (err) { deferred.reject(err) }
        if (res === true) {
          // Correct resolve username & access
          deferred.resolve({
            username: body.username,
            access: body.access
          })
        } else {
          // Incorrect, reject
          deferred.reject(res)
        }
      })
    })
    return deferred.promise
  }

  create (payload) {
    let deferred = Q.defer()
    // Generate salt for passhash
    bcrypt.genSalt(6, (err, salt) => {
      if (err) { deferred.reject(err) }
      // Generate the passhash
      bcrypt.hash(payload.password, salt, null, (err, res) => {
        if (err) { deferred.reject(err) }
        // Prep user object
        let newUser = {
          _id: aguid(payload.username),
          username: payload.username,
          passhash: res,
          access: ['user']
        }
        // Save user
        db.insert(newUser, (err, body) => {
          if (err) { deferred.reject(err) }
          deferred.resolve(body)
        })
      })
    })
    return deferred.promise
  }

  exists (username) {
    let deferred = Q.defer()
    db.head(aguid(username), (err, _, headers) => {
      if (err) { deferred.reject(err) }
      deferred.resolve(true)
    })
    return deferred.promise
  }
}

module.exports = new UsersDB()

