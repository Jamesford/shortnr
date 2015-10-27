import App  from './controllers/app'
import Auth from './controllers/auth';

module.exports = [
  { method: 'GET', path: '/', config: App.index }, // Loads webapp at home page
  // { method: 'GET', path: '/p/{param*}', config: {} }, // Serves files for webapp
  // { method: 'GET', path: '/{id}', config: {} }, // Redirects to a link url
  // { method: 'GET', path: '/n/{id}', config: {} }, // Loads webapp at note
  // { method: 'GET', path: '/u/{user}', config: {} }, // Loads webapp at user profile/dashboard

  { method: 'POST', path: '/api/session/login', config: Auth.login},
  { method: 'POST', path: '/api/session/logout', config: Auth.logout},
  { method: 'GET', path: '/api/session/isauth', config: Auth.isauth},
  { method: 'GET', path: '/api/session/isadmin', config: Auth.isadmin},

  // { method: 'GET', path: '/api/link/{id}', config: {} },
  // { method: 'POST', path: '/api/link/exists', config: {} },
  // { method: 'POST', path: '/api/link/create', config: {} },
  // { method: 'DELETE', path: '/api/link/delete/{id}', config: {} },

  // { method: 'GET', path: '/api/note/{id}', config: {} },
  // { method: 'POST', path: '/api/note/exists', config: {} },
  // { method: 'POST', path: '/api/note/create', config: {} },
  // { method: 'PUT', path: '/api/note/update/{id}', config: {} },
  // { method: 'DELETE', path: '/api/note/delete/{id}', config: {} },

]
