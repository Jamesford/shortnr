import JWT             from 'jsonwebtoken';
import aguid           from 'aguid';
import bcrypt          from 'bcrypt-nodejs';
import config          from '../config';
import { redisClient } from './redis';
import accounts        from '../db/accounts'; // Temp Accounts DB

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
  let account = accounts[aguid(payload.username)];

  // User doesnt exist
  if (!account) {
    return cb('User does not exist');
  }

  // Check password
  if (bcrypt.compareSync(payload.password, account.passhash)) {
    let session = {
      username: account.username,
      scope: account.access,
      valid: true,
      id: aguid(),
      exp: Math.round((new Date().getTime() + config.auth.tokenTTL) / 1000)
    };

    // add session to redis
    redisClient.multi([
      ['set', session.id, JSON.stringify(session)],
      ['expireat', session.id, session.exp]
    ]).exec((err, replies) => {
      if (err) { console.log(err) }
    });

    return cb(null, JWT.sign(session, config.auth.privateKey));
  }
  
  // Incorrect password
  return cb('Incorrect password');
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
