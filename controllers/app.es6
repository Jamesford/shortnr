const Joi = require('joi');
const LinkDB = require('../db/linkdb')

function design_view(req, res, view) {
  LinkDB.views(view).then((result) => {
    res(result.rows)
  }).fail((err) => {
    res(err.reason).code(err.statusCode)
  })
}

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
  },

  links_all: {
    handler(req, res) {
      // Return all links
      design_view(req, res, 'all')
    }
  },

  created_day: {
    handler(req, res) {
      // Return links created in the past 24 hours
      design_view(req, res, 'created_day')
    }
  },

  accessed_day: {
    handler(req, res) {
      // Return links accessed in the past 24 hours
      design_view(req, res, 'accessed_day')
    }
  },

  created_week: {
    handler(req, res) {
      // Return links created in the past week
      design_view(req, res, 'created_week')
    }
  },

  accessed_week: {
    handler(req, res) {
      // Return links accessed in the past week
      design_view(req, res, 'accessed_week')
    }
  },

  created_month: {
    handler(req, res) {
      // Return links created in the past month (30 days)
      design_view(req, res, 'created_month')
    }
  },

  accessed_month: {
    handler(req, res) {
      // Return links accessed in the past month (30 days)
      design_view(req, res, 'accessed_month')
    }
  }

}

module.exports = Routes