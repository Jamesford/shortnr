var Dispatcher = require('../dispatcher/Dispatcher');
var Constants = require('../constants/Constants');
var API = require('../utils/API');

var Actions = {
  
  linkInfo: function (_id) {
    Dispatcher.dispatch({
      actionType: Constants.LINK_INFO_REQUEST
    });
    API.get(_id).then(function(data) {
      Dispatcher.dispatch({
        actionType: Constants.LINK_INFO_SUCCESS,
        data: data
      });
    }).fail(function(err) {
      Dispatcher.dispatch({
        actionType: Constants.LINK_INFO_FAILURE,
        error: err
      });
    });
  },

  linkExists: function (_id) {
    Dispatcher.dispatch({
      actionType: Constants.LINK_EXISTS_REQUEST
    });
    API.exists(_id).then(function(data) {
      Dispatcher.dispatch({
        actionType: Constants.LINK_EXISTS_SUCCESS,
        data: data
      });
    }).fail(function(err) {
      Dispatcher.dispatch({
        actionType: Constants.LINK_EXISTS_FAILURE,
        error: err
      });
    });
  },

  linkSave: function (data) {
    Dispatcher.dispatch({
      actionType: Constants.LINK_SAVE_REQUEST
    });
    API.save(data).then(function(data) {
      Dispatcher.dispatch({
        actionType: Constants.LINK_SAVE_SUCCESS,
        data: data
      });
    }).fail(function(err) {
      Dispatcher.dispatch({
        actionType: Constants.LINK_SAVE_FAILURE,
        error: err
      });
    });
  },

  linkRemove: function (data) {
    Dispatcher.dispatch({
      actionType: Constants.LINK_REMOVE_REQUEST
    });
    API.remove(data).then(function(data) {
      Dispatcher.dispatch({
        actionType: Constants.LINK_REMOVE_SUCCESS,
        data: data
      });
    }).fail(function(err) {
      Dispatcher.dispatch({
        actionType: Constants.LINK_REMOVE_FAILURE,
        error: err
      });
    });
  }

};

module.exports = Actions;