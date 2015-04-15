// Modules
var React = require('react');
var moment = require('moment');
var Store = require('../stores/Store');
var Actions = require('../actions/Actions');

// Local Constants
var TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'

var ListItem = React.createClass({
  displayName: 'ListItem',
  render: function() {
    var link = this.props.link;
    return (
      <tr>
        <td>{link.value._id}</td>
        <td><a href={link.value.url}>{link.value.url}</a></td>
        <td>{moment(link.value.created).format(TIME_FORMAT)}</td>
        <td>{moment(link.value.accessed).format(TIME_FORMAT)}</td>
        <td>{link.value.access_count}</td>
      </tr>
    )
  }
});

var LinkLists = React.createClass({
  displayName: 'LinkList',
  getInitialState: function() {
    return {
      list: {
        type: 'links',
        range: 'all'
      },
      data: Store.getList()
    };
  },
  componentWillMount: function() {
    this.loadList();
  },
  componentDidMount: function() {
    Store.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    Store.removeChangeListener(this._onChange);
  },
  render: function() {
    var list = this.state.list;
    var data = this.state.data;

    return (
      <div>
        <div className='row'>
          <div className='three columns'>
            <select className='type u-full-width' value={list.type} onChange={this._typeChange}>
              <option value='links'>Links</option>
              <option value='accessed'>Accessed</option>
              <option value='created'>Created</option>
            </select>
          </div>
          <div className='two columns'>
            { list.type === 'links' &&
              <select className='range u-full-width' value={list.range} onChange={this._rangeChange} disabled>
                <option value='all'>All</option>
              </select>
            }
            { list.type !== 'links' &&
              <select className='range u-full-width' value={list.range} onChange={this._rangeChange}>
                <option value='day'>Day</option>
                <option value='week'>Week</option>
                <option value='month'>Month</option>
              </select>
            }
          </div>
        </div>
        { data.length > 0 &&
          <table className='u-full-width'>
            <thead>
              <tr>
                <th>ID</th>
                <th>URL</th>
                <th>Created</th>
                <th>Last Accessed</th>
                <th>Accessed Count</th>
              </tr>
            </thead>
            <tbody>
              {
                data.map(function(link) {
                  return <ListItem key={link.id} link={link} />
                })
              }
            </tbody>
          </table>
        }
      </div>
    )
  },
  _onChange: function() {
    this.setState({ data: Store.getList() });
  },
  _typeChange: function(event) {
    var range;
    if (event.target.value === 'links') {
      range = 'all';
    } else if (this.state.list.range === 'all') {
      range = 'day';
    } else {
      range = this.state.list.range;
    };
    var list = {
      type: event.target.value,
      range: range
    };
    this.setState({ list: list });
    this.loadList(list);
  },
  _rangeChange: function(event) {
    var list = {
      type: this.state.list.type,
      range: event.target.value
    };
    this.setState({ list: list });
    this.loadList(list);
  },
  loadList: function(list) {
    Actions.linkList(list || this.state.list);
  }
});

module.exports = LinkLists;