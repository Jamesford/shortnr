// Modules
var React = require('react');
var moment = require('moment');
var Store = require('../stores/Store');
var Actions = require('../actions/Actions');

// Components
var LinkDetails = require('../components/LinkDetails');
var LinkExists = require('../components/LinkExists');

var Main = React.createClass({
  displayName: 'MainPage',
  render: function() {
    return (
      <div className='main'>
        <h2>Main</h2>
        <hr />
        <LinkDetails />
        <hr />
        <LinkExists />
      </div>
    )
  }
});

module.exports = Main;