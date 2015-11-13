var nano = require('nano')('http://127.0.0.1:5984')

var exports = module.exports = {};

exports.UsersDB = nano.use('shortnr_users')

exports.LinksDB = nano.use('shortnr_links')

exports.NotesDB = nano.use('shortnr_notes')

exports.LinkHitsDB = nano.use('shortnr_link_hits')

exports.NoteHitsDB = nano.use('shortnr_note_hits')
