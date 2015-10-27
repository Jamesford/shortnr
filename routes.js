import App  from './controllers/app'
import Auth from './controllers/auth';
import Link from './controllers/link';
import Note from './controllers/note';

module.exports = [
  { method: 'GET', path: '/', config: App.index }, // Loads webapp at home page
  // { method: 'GET', path: '/p/{param*}', config: App.files }, // Serves files for webapp
  // { method: 'GET', path: '/{id}', config: App.redirect }, // Redirects to a link url
  // { method: 'GET', path: '/n/{id}', config: App.note }, // Loads webapp at note
  // { method: 'GET', path: '/u/{user}', config: App.user }, // Loads webapp at user profile/dashboard

  { method: 'POST', path: '/api/auth/login', config: Auth.login},
  { method: 'POST', path: '/api/auth/logout', config: Auth.logout},
  { method: 'GET', path: '/api/auth/isauth', config: Auth.isauth},
  { method: 'GET', path: '/api/auth/isadmin', config: Auth.isadmin},
  // { method: 'POST', path: '/api/auth/signup', config: Auth.signup },
  // { method: 'POST', path: '/api/auth/exists', config: Auth.exists },

  // { method: 'GET', path: '/api/link/{id}', config: Link.get },
  // { method: 'POST', path: '/api/link/exists', config: Link.exists },
  // { method: 'POST', path: '/api/link/create', config: Link.create },
  // { method: 'DELETE', path: '/api/link/delete/{id}', config: Link.delete },

  // { method: 'GET', path: '/api/note/{id}', config: Note.get },
  // { method: 'POST', path: '/api/note/exists', config: Note.exists },
  // { method: 'POST', path: '/api/note/create', config: Note.create },
  // { method: 'PUT', path: '/api/note/update/{id}', config: Note.update },
  // { method: 'DELETE', path: '/api/note/delete/{id}', config: Note.delete },

]
