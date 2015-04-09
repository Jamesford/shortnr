// Modules
var React = require('react');

// Components
var LinkLists = require('../components/LinkLists');

var Viewer = React.createClass({
  displayName: 'ViewerPage',
  render: function() {
    return (
      <div className='main'>
        <h2>Viewer</h2>
        <LinkLists />
      </div>
    )
  }
});

module.exports = Viewer;