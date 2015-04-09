var App = require('../controllers/app')

var Endpoints = [
    // App
    { method: 'GET',    path: '/',                      config: App.index          },
    { method: 'GET',    path: '/assets/{param*}',       config: App.files          },
    { method: 'GET',    path: '/{id}',                  config: App.redirect       },
    
    // Api
    { method: 'GET',    path: '/api/{id}',              config: App.link           },
    { method: 'POST',   path: '/api/save',              config: App.save           },
    { method: 'POST',   path: '/api/exists',            config: App.exists         },
    { method: 'GET',    path: '/api/links/all',         config: App.links_all      },
    { method: 'GET',    path: '/api/created/day',       config: App.created_day    },
    { method: 'GET',    path: '/api/accessed/day',      config: App.accessed_day   },
    { method: 'GET',    path: '/api/created/week',      config: App.created_week   },
    { method: 'GET',    path: '/api/accessed/week',     config: App.accessed_week  },
    { method: 'GET',    path: '/api/created/month',     config: App.created_month  },
    { method: 'GET',    path: '/api/accessed/month',    config: App.accessed_month }
]

module.exports = Endpoints