import Hapi         from 'hapi';
import hapiAuthJWT  from 'hapi-auth-jwt2';
import config       from './config';
import session      from './controllers/session';

let server = new Hapi.Server();
server.connection({ port: config.server.port });

server.register([hapiAuthJWT, require('blipp')], (err) => {
  server.auth.strategy('jwt', 'jwt', true, {
    key: config.auth.privateKey,
    validateFunc: session.validate
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
      session.start(req.payload, (err, token) => {
        if (err) { return res(err); }

        return res({ token: token }).header("Authorization", token);
      });
    }
  });

  server.route({
    method: 'GET',
    path: '/api/logout',
    config: { auth: false },
    handler: (req, res) => {
      if (!req.headers.authorization) { return res('You are not logged in').code(412); }

      session.end(req.headers.authorization, (err) => {
        if (err) { return res(err); }
        return res('Successfully logged out');
      });
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
