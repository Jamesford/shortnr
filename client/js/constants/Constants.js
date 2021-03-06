var keyMirror = require('keymirror');

module.exports = keyMirror({
  CHANGE: null,
  SAVED: null,

  LISTEN_CHANGE_START: null,
  LISTEN_CHANGE_EVENT: null,

  LINK_INFO_REQUEST: null,
  LINK_INFO_SUCCESS: null,
  LINK_INFO_FAILURE: null,

  LINK_EXISTS_REQUEST: null,
  LINK_EXISTS_SUCCESS: null,
  LINK_EXISTS_FAILURE: null,

  LINK_SAVE_REQUEST: null,
  LINK_SAVE_SUCCESS: null,
  LINK_SAVE_FAILURE: null,

  LINKS_LIST_REQUEST: null,
  LINKS_LIST_SUCCESS: null,
  LINKS_LIST_FAILURE: null
});