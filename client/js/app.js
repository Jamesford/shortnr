// Modules
window.React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;

// Pages
var Main = require('./pages/Main');
var Viewer = require('./pages/Viewer');

// Layout
var App = React.createClass({
  render: function() {
    return (
      <div>
        <header className='nav'>
          <ul>
            <li><Link to='main'>Main</Link></li>
            <li><Link to='viewer'>Viewer</Link></li>
          </ul>
        </header>
        <RouteHandler />
      </div>
    )
  }
})

// App Routes
var Routes = (
  <Route name='main' path='/' handler={App}>
    <DefaultRoute handler={Main} />
    <Route name='viewer' handler={Viewer} />
  </Route>
);

// Render App
Router.run(Routes, function(Handler) {
  React.render(<Handler />, document.body);
});