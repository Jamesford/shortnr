// Modules
var React = require('react');
var Store = require('../stores/Store');
var Actions = require('../actions/Actions');

var LinkExists = React.createClass({
  displayName: 'LinkExists',
  getInitialState: function() {
    return {
      saved: null,
      status: null,
      id: '',
      url: ''
    }
  },
  componentDidMount: function() {
    Store.addChangeListener(this._onChange);
    Store.addSavedListener(this._onSaved);
  },
  componentWillUnmount: function() {
    Store.removeChangeListener(this._onChange);
    Store.removeSavedListener(this._onSaved);
  },
  render: function() {
    var status = this.state.status;
    return (
      <div>

        { this.state.saved !== null &&
          <div className='u-full-width notification success'>
            <span>Successfully created <a href='http://vkq.io/{this.state.saved.id}'>http://vkq.io/{this.state.saved.id}</a></span>
          </div>
        }

        <form>
          <div className='row'>
            <div className='six columns'>
              <label for='linkID'>Link ID</label>
              <input className='u-full-width' id='linkID' type='text' value={this.state.id} onChange={this.formChangeID} />
            </div>
            
            <div className='six columns'>
              <label for='linkURL'>Link URL</label>
              <input className='u-full-width' id='linkURL' type='text' value={this.state.url} onChange={this.formChangeURL} />
            </div>
          </div>
          <button className='u-full-width button-primary' type='button' onClick={this.createLink}>Create</button>
        </form>
        { status === 'loading' &&
          <p>Checking Status...</p>
        }
        { status !== null &&
          status.result === true &&
          <p>Thats Taken</p>
        }
        { status !== null &&
          status.result === false &&
          <p>Not Taken</p>
        }
        { this.state.saved !== null &&
          <pre><code>{ JSON.stringify(this.state.saved, null, 4) }</code></pre>
        }
      </div>
    );
  },
  _onChange: function() {
    this.setState({
      status: Store.getExists()
    });
  },
  _onSaved: function() {
    this.setState({
      saved: Store.getSaved(),
      status: null,
      id: '',
      url: ''
    });
  },
  formChangeID: function(event) {
    // Check ID doesnt already exist
    Actions.linkExists(event.target.value);
    this.setState({
      id: event.target.value
    });
  },
  formChangeURL: function(event) {
    this.setState({
      url: event.target.value
    });
  },
  createLink: function() {
    Actions.linkSave({
      _id: this.state.id,
      url: this.state.url
    });
  }
});

module.exports = LinkExists;