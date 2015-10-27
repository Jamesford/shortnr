import Hapi         from 'hapi';
import config       from './config';
import routes       from './routes';
import { validate } from './lib/session';

let server = new Hapi.Server();
server.connection({ port: config.server.port });

server.register([require('hapi-auth-jwt2'), require('blipp')], (err) => {
  
  server.auth.strategy('jwt', 'jwt', true, {
    key: config.auth.privateKey,
    validateFunc: validate
  });

  server.route(routes);

  server.start(() => {
    console.log('Server started...');
  });
});
