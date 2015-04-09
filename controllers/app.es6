var Joi = require('joi');
var LinkDB = require('../db/linkdb')

var Routes = {

  index: {
    handler(req, res) {
      res.file('client/dist/index.html')
    }
  },

  files: {
    handler: {
      directory: {
        path: 'client/dist'
      }
    }
  },

  redirect: {
    handler(req, res) {
      // Ignore favicon.ico
      if (req.params.id === 'favicon.ico') return res().code(404)
      // Redirect to url
      LinkDB.get(req.params.id).then((result) => {
        res.redirect(result.url)
        LinkDB.update(result)
      })
    }
  },

  link: {
    handler(req, res) {
      // Ignore favicon.ico
      if (req.params.id === 'favicon.ico') return res().code(404)
      // Fetch url data
      LinkDB.get(req.params.id).then((result) => {
        res(result)
      }).fail((err) => {
        res(err.reason).code(err.statusCode)
      })
    }
  },

  links_all: {
    handler(req, res) {
      // Return all links
      LinkDB.views().then((result) => {
        res(result)
      }).fail((err) => {
        res(err.reason).code(err.statusCode)
      })
    }
  },

  save: {
    validate: {
      payload: {
        _id: Joi.string().alphanum().required(),
        url: Joi.string().uri().required()
      }
    },
    handler(req, res) {
      // Shorten link
      LinkDB.create(req.payload).then((result) => {
        res(result)
      }).fail((err) => {
        res(err.reason).code(err.statusCode)
      })
    }
  },

  remove: {
    handler(req, res) {
      // Remove a shortened link
      let data = JSON.parse(req.payload)
      LinkDB.delete(data._id, data).then((result) => {
        res(result);
      }).fail((err) => {
        res(err.reason).code(err.statusCode);
      })
    }
  },

  exists: {
    validate: {
      payload: {
        _id: Joi.string().alphanum().required()
      }
    },
    handler(req, res) {
      // Check if id exists, if exists true else false
      LinkDB.info(req.payload._id).then(() => {
        res({ result: true, _id: req.payload._id });
      }).fail(() => {
        res({ result: false, _id: req.payload._id });
      });
    }
  }

}

module.exports = Routes