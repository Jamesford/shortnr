var Dispatcher = require('../dispatcher/Dispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants/Constants');
var assign = require('object-assign');

var _hasLoaded = false;
var _data = {
  info: {},
  exists: {},
  created: {}
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

  }

});

module.exports = Store;