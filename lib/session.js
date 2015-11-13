import JWT             from 'jsonwebtoken';
import aguid           from 'aguid';
import bcrypt          from 'bcrypt-nodejs';
import config          from '../config';
import { redisClient } from './redis';
import Users           from '../db/users';

var exports = module.exports = {};

// Validate Session
exports.validate = (decoded, request, cb) => {
  redisClient.get(decoded.id, (redisErr, reply) => {
    if (redisErr) { console.log(redisErr); }

    let session;
    if (reply) {
      session = JSON.parse(reply);
    } else {
      return cb(redisErr, false); // unable to find session in redis, reply is null
    }

    if (session.valid === true) {
      // Update session expiry to tokenTTL
      session.exp = Math.round((new Date().getTime() + config.auth.tokenTTL) / 1000);

      // Update session in redis
      redisClient.multi([
        ['set', session.id, JSON.stringify(session)],
        ['expireat', session.id, session.exp]
      ]).exec((err, replies) => {
        if (err) { console.log(err) }
      });

      // Complete validation
      return cb(redisErr, true, {
        scope: session.scope,
        session: session,
        token: JWT.sign(session, config.auth.privateKey)
      });
    } else {
      return cb(redisErr, false); // Token Invalid (Logged out)
    }
  });
};

// Start Session
exports.start = (payload, cb) => {
  Users.get(payload).then((account) => {
    // Create session
    let session = {
      username: account.username,
      scope: account.access,
      valid: true,
      id: aguid(),
      exp: Math.round((new Date().getTime() + config.auth.tokenTTL) / 1000)
    }

    // Add session to redis
    redisClient.multi([
      ['set', session.id, JSON.stringify(session)],
      ['expireat', session.id, session.exp]
    ]).exec((err, replies) => {
      if (err) { console.log(err) }
    });

    // Return token to user
    return cb(null, JWT.sign(session, config.auth.privateKey));
  }).fail((err) => {
    // TODO: specify if username or password is the issue
    return cb('Incorrect username or password');
  })
}

// End Session
exports.end = (token, cb) => {
  let decoded = JWT.decode(token, config.auth.privateKey);

  redisClient.get(decoded.id, (redisErr, reply) => {
    if (redisErr) { return cb(redisErr); }

    let session = JSON.parse(reply);
    session.valid = false;
    session.ended = Math.round(new Date().getTime() / 1000);

    redisClient.multi([
      ['set', session.id, JSON.stringify(session)],
      ['expireat', session.id, session.exp]
    ]).exec((err, replies) => {
      if (err) { console.log(err) }
    });

    return cb()
  });
}

// Refresh Session (NOT READY)
// exports.refresh = () => {}
