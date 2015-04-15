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
            <span>Successfully created <a href={window.location.origin+'/'+this.state.saved.id}>{window.location.origin+'/'+this.state.saved.id}</a></span>
          </div>
        }

        { status !== null &&
          status.result === true &&
          <div className='u-full-width notification error'>
            <span>That ID is already taken, try another ID</span>
          </div>
        }

        <form>
          <div className='row'>
            <div className='six columns'>
              <label htmlFor='linkID'>Link ID</label>
              <input className='u-full-width' id='linkID' type='text' value={this.state.id} onChange={this.formChangeID} />
            </div>
            
            <div className='six columns'>
              <label htmlFor='linkURL'>Link URL</label>
              <input className='u-full-width' id='linkURL' type='text' value={this.state.url} onChange={this.formChangeURL} />
            </div>
          </div>
          <button className='u-full-width button-primary' type='button' onClick={this.createLink}>Create</button>
        </form>
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

        // <div className='u-full-width notification info'>
        //   <span>vkq.io is powered by Shortnr. It's Open Source &amp; available on <a href='http://github.com/jamesford/shortnr'>GitHub</a></span>
        // </div>

module.exports = LinkExists;