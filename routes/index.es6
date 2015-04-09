var App = require('../controllers/app')

var Endpoints = [
    // App
    { method: 'GET',    path: '/',                config: App.index    },
    { method: 'GET',    path: '/assets/{param*}', config: App.files    },
    { method: 'GET',    path: '/{id}',            config: App.redirect },
    
    // Api
    { method: 'GET',    path: '/api/{id}',        config: App.link      },
    { method: 'GET',    path: '/api/links_all',   config: App.links_all },
    { method: 'POST',   path: '/api/exists',      config: App.exists    },
    { method: 'POST',   path: '/api/save',        config: App.save      },
    { method: 'POST',   path: '/api/remove',      config: App.remove    }
]

module.exports = Endpoints