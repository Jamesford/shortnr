// Modules
var React = require('react');
var moment = require('moment');
var Store = require('../stores/Store');
var Actions = require('../actions/Actions');

// Local Constants
var TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'

var LinkDetails = React.createClass({
  displayName: 'LinkDetails',
  getInitialState: function() {
    return {
      linkID: '',
      data: Store.getInfo()
    };
  },
  componentDidMount: function() {
    Store.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    Store.removeChangeListener(this._onChange);
  },
  render: function() {
    var linkID = this.state.linkID
    var data = this.state.data;
    return (
      <div>
        <input type='text' value={linkID} onChange={this.handleChange} />
        <button type='button' onClick={this.loadInfo}>Load Data</button>
        { data._id &&
          <table>
            <tr>
              <th>ID:</th>
              <td>{ data._id }</td>
            </tr>
            <tr>
              <th>URL:</th>
              <td><a href={ data.url }>{ data.url }</a></td>
            </tr>
            <tr>
              <th>Created:</th>
              <td>{ moment(data.created).format(TIME_FORMAT) }</td>
            </tr>
            <tr>
              <th>Last Accessed:</th>
              <td>{ moment(data.accessed).format(TIME_FORMAT) }</td>
            </tr>
            <tr>
              <th>Accessed Count:</th>
              <td>{ data.access_count }</td>
            </tr>
          </table>
        }
      </div>
    );
  },
  _onChange: function() {
    this.setState({
      data: Store.getInfo()
    });
  },
  handleChange: function(event) {
    this.setState({
      linkID: event.target.value
    });
  },
  loadInfo: function() {
    Actions.linkInfo(this.state.linkID);
  }
});

module.exports = LinkDetails;