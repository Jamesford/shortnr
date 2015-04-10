var Dispatcher = require('../dispatcher/Dispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants/Constants');
var assign = require('object-assign');

var _hasLoaded = false;
var _data = {
  info: {},
  exists: {},
  created: {},
  list: []
};

function setInfo(data) {
  _data.info = data;
}

function setExists(data) {
  _data.exists = data;
}

function setSaved(data) {
  _data.created = data;
}

function setList(data) {
  _data.list = data;
}

function realtimeUpdateInfo(link) {
  if (_data.info._id === link._id) {
    _data.info = link
    Store.emitChange();
  }
}

function realtimeUpdateList(link) {
  var shouldEmitChange = false;
  _data.list.map(function(item) {
    if (item.id === link._id) {
      shouldEmitChange = true;
      item.value = link;
    }
    return item;
  });
  if (shouldEmitChange === true) {
    Store.emitChange()
  } else {
    // Probably need to refresh the data, unless filtering
  }
}

var Store = assign({}, EventEmitter.prototype, {

  getData: function() {
    return _data;
  },

  getInfo: function() {
    return _data.info;
  },

  getExists: function() {
    return _data.exists;
  },

  getSaved: function() {
    return _data.created;
  },

  getList: function() {
    return _data.list;
  },

  emitChange: function() {
    this.emit(Constants.CHANGE);
  },

  addChangeListener: function(callback) {
    this.on(Constants.CHANGE, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(Constants.CHANGE, callback);
  },

  emitSaved: function() {
    this.emit(Constants.SAVED);
  },

  addSavedListener: function(callback) {
    this.on(Constants.SAVED, callback);
  },

  removeSavedListener: function(callback) {
    this.removeListener(Constants.SAVED, callback);
  }

});

Dispatcher.register(function(action) {

  switch(action.actionType) {
    /*
     *  LINK INFO SECTION
     */
    case Constants.LINK_INFO_REQUEST:
      console.log(Constants.LINK_INFO_REQUEST);
      break;

    case Constants.LINK_INFO_SUCCESS:
      console.log(Constants.LINK_INFO_SUCCESS);
      setInfo(action.data);
      Store.emitChange();
      break;

    case Constants.LINK_INFO_FAILURE:
      console.log(Constants.LINK_INFO_FAILURE);
      break;

    /*
     *  LINK EXISTS SECTION
     */
    case Constants.LINK_EXISTS_REQUEST:
      console.log(Constants.LINK_EXISTS_REQUEST);
      break;

    case Constants.LINK_EXISTS_SUCCESS:
      console.log(Constants.LINK_EXISTS_SUCCESS);
      setExists(action.data);
      Store.emitChange();
      break;

    case Constants.LINK_EXISTS_FAILURE:
      console.log(Constants.LINK_EXISTS_FAILURE);
      break;

    /*
     *  LINK SAVE SECTION
     */
    case Constants.LINK_SAVE_REQUEST:
      console.log(Constants.LINK_SAVE_REQUEST);
      break;

    case Constants.LINK_SAVE_SUCCESS:
      console.log(Constants.LINK_SAVE_SUCCESS);
      setSaved(action.data);
      Store.emitSaved();
      break;

    case Constants.LINK_SAVE_FAILURE:
      console.log(Constants.LINK_SAVE_FAILURE);
      break;

    /*
     *  LINK INFO SECTION
     */
    case Constants.LINKS_LIST_REQUEST:
      console.log(Constants.LINKS_LIST_REQUEST);
      break;

    case Constants.LINKS_LIST_SUCCESS:
      console.log(Constants.LINKS_LIST_SUCCESS);
      setList(action.data);
      Store.emitChange();
      break;

    case Constants.LINKS_LIST_FAILURE:
      console.log(Constants.LINKS_LIST_FAILURE);
      break;

    /*
     *  REALTIME UPDATES SECTION
     */
    case Constants.LISTEN_CHANGE_START:
      console.log(Constants.LISTEN_CHANGE_START);
      break;

    case Constants.LISTEN_CHANGE_EVENT:
      console.log(Constants.LISTEN_CHANGE_EVENT);
      realtimeUpdateInfo(action.data);
      realtimeUpdateList(action.data);
      break;

  }

});

module.exports = Store;