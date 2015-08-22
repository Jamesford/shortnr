import Hapi         from 'hapi';
import hapiAuthJWT  from 'hapi-auth-jwt2';
import JWT          from 'jsonwebtoken'
import bcrypt       from 'bcrypt-nodejs'; // Update to regular bcrypt when not on windows
import aguid        from 'aguid';
import redis        from 'redis';
import config       from './config';

let server = new Hapi.Server();
server.connection({ port: config.server.port });

// Accounts for Testing Only (CouchDB)
let salt = bcrypt.genSaltSync(6);
let password = bcrypt.hashSync('password', salt);
let accounts = {
  'e7a4477e-9456-4c10-8e46-ec7b8fc2c485': {
    username: 'jamie',
    passhash: password,
    access: ['admin']
  },
  '60240db1-cc90-4b93-8c61-b4957d39e100': {
    username: 'raynor',
    passhash: password,
    access: ['user']
  }
};
// End Accounts

// Init Redis Connection
let redisClient = redis.createClient(config.redis.port, config.redis.host, { no_ready_check: true });
redisClient.set('redis', 'working');
redisClient.get('redis', (redisErr, reply) => {
  if (redisErr) { return console.log(redisErr); }
});

// JWT Validation Function
let validate = (decoded, request, cb) => {
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

server.register(hapiAuthJWT, (err) => {
  server.auth.strategy('jwt', 'jwt', true, {
    key: config.auth.privateKey,
    validateFunc: validate
  });

  server.route({
    method: 'GET',
    path: '/',
    config: { auth: false },
    handler: (req, res) => {
      res('Server Online');
    }
  });

  server.route({
    method: 'POST',
    path: '/api/login',
    config: { auth: false },    
    handler: (req, res) => {
      let account = accounts[aguid(req.payload.username)];

      // User doesnt exist
      if (!account) {
        return res('User does not exist');
      }

      // Check password
      if (bcrypt.compareSync(req.payload.password, account.passhash)) {
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

        let token = JWT.sign(session, config.auth.privateKey);

        return res({ token: token })
          .header("Authorization", token);
      }
      
      res('Incorrect Password');
    }
  });

  server.route({
    method: 'GET',
    path: '/api/logout',
    config: { auth: false },
    handler: (req, res) => {
      if (req.headers.authorization) {
        let decoded = JWT.decode(req.headers.authorization, config.auth.privateKey);
        redisClient.get(decoded.id, (redisErr, reply) => {
          if (redisErr) { console.log(redisErr); }

          let session = JSON.parse(reply);
          session.valid = false;
          session.ended = Math.round(new Date().getTime() / 1000);

          redisClient.multi([
            ['set', session.id, JSON.stringify(session)],
            ['expireat', session.id, session.exp]
          ]).exec((err, replies) => {
            if (err) { console.log(err) }
          });

          res('Successfully logged out');
        });
      } else {
        res('You are not logged in').code(412);
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/api/user',
    config: { auth: 'jwt' },
    handler: (req, res) => {
      res('Logged in as ' + req.auth.credentials.session.username)
        .header("Authorization", req.auth.credentials.token);
    }
  });

  server.route({
    method: 'GET',
    path: '/api/admin',
    config: { auth: { strategy: 'jwt', scope: 'admin' } },
    handler: (req, res) => {
      res('You have admin access, ' + req.auth.credentials.session.username)
        .header("Authorization", req.auth.credentials.token);
    }
  });

  server.start(() => {
    console.log('Server started...');
  });
});