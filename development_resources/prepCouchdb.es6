// Script to prepare a link database and add the design doc

var nano = require('nano')('http://localhost:5984');

var designDoc = {
   "views": {
       "all": {
           "map": "function(doc){emit(doc._id, doc)}"
       },
       "accessed_day": {
           "map": "function(doc){var time = new Date().getTime() - (1000*60*60*24);if(doc.accessed > time){emit(doc._id, doc);}}"
       },
       "created_day": {
           "map": "function(doc){var time = new Date().getTime() - (1000*60*60*24);if(doc.created > time){emit(doc._id, doc);}}"
       },
       "accessed_week": {
           "map": "function(doc){var time = new Date().getTime() - (1000*60*60*24*7);if(doc.accessed > time){emit(doc._id, doc);}}"
       },
       "created_week": {
           "map": "function(doc){var time = new Date().getTime() - (1000*60*60*24*7);if(doc.created > time){emit(doc._id, doc);}}"
       },
       "accessed_month": {
           "map": "function(doc){var time = new Date().getTime() - (1000*60*60*24*30);if(doc.accessed > time){emit(doc._id, doc);}}"
       },
       "created_month": {
           "map": "function(doc){var time = new Date().getTime() - (1000*60*60*24*30);if(doc.created > time){emit(doc._id, doc);}}"
       }
   },
   "language": "javascript"
}

nano.db.create('shortnr_links', function(err, res) {
  if (!err) {
    console.log('database shortnr_links created!');
    var db = nano.use('shortnr_links');
    db.insert(designDoc, '_design/views', function(err, res) {
      if (!err) {
        console.log('design view created');
      }
    });
  }
});