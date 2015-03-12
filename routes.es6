var App = require('./controllers/app')

var Endpoints = [
    // App
    { method: 'GET',    path: '/',                config: App.index },
    // { method: 'GET',    path: '/files/{param*}',  config: App.files },
    { method: 'GET',    path: '/{id}',            config: App.redirect },
    
    // Api
    { method: 'GET',    path: '/api/{id}',        config: App.view },
    { method: 'POST',   path: '/api/save',        config: App.save },
    { method: 'POST',   path: '/api/remove',      config: App.remove },
    { method: 'POST',   path: '/api/exists',      config: App.exists }
]

module.exports = Endpoints