var socket = require('socket.io-client')('http://localhost:3001')
var Dispatcher = require('../dispatcher/Dispatcher');
var Constants = require('../constants/Constants');

function listenStart() {
  Dispatcher.dispatch({
    actionType: Constants.LISTEN_CHANGE_START
  });
};

function listenEvent(data) {
  Dispatcher.dispatch({
    actionType: Constants.LISTEN_CHANGE_EVENT,
    data: data
  });
};

socket.on('connected', listenStart);

socket.on('change', listenEvent);