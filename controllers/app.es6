var LinkDB = require('../db/linkdb')

var Routes = {

  index: {
    handler(req, res) {
      res('Shortnr App')
    }
  },

  files: {
    handler: {
      directory: {
        path: 'public'
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

  view: {
    handler(req, res) {
      // Ignore favicon.ico
      if (req.params.id === 'favicon.ico') return res().code(404)
      // Fetch url data
      LinkDB.get(req.params.id).then((result) => {
        res(result)
      })
    }
  },

  save: {
    handler(req, res) {
      // Shorten link
      data = JSON.parse(req.payload)
      LinkDB.create(data).then((result) => {
        res(result)
      }).fail((err) => {
        res(err.reason).code(err.statusCode)
      })
    }
  },

  remove: {
    handler(req, res) {
      // Remove a shortened link
      data = JSON.parse(req.payload)
      LinkDB.delete(data._id, data).then((result) => {
        res(result)
      }).fail((err) => {
        res(err.reason).code(err.statusCode)
      })
    }
  },

  exists: {
    handler(req, res) {
      // Check if id exists, if exists true else false
      id = JSON.parse(req.payload)._id
      LinkDB.info(id).then(() => {
        res({ result: true })
      }).fail(() => {
        res({ result: false })
      })
    }
  }

}

module.exports = Routes