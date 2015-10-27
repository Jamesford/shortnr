import session from '../lib/session';

var exports = module.exports = {};

exports.login = {
  auth: false,    
  handler: (req, res) => {
    session.start(req.payload, (err, token) => {
      if (err) { return res(err); }

      return res({ token: token }).header("Authorization", token);
    });
  }
};

exports.logout = {
  auth: false,
  handler: (req, res) => {
    if (!req.headers.authorization) { return res('You are not logged in').code(412); }

    session.end(req.headers.authorization, (err) => {
      if (err) { return res(err); }
      return res('Successfully logged out');
    });
  }
};

exports.isauth = {
  auth: 'jwt',
  handler: (req, res) => {
    return res('Logged in as ' + req.auth.credentials.session.username)
      .header("Authorization", req.auth.credentials.token);
  }
};

exports.isadmin = {
  auth: { strategy: 'jwt', scope: 'admin' },
  handler: (req, res) => {
    return res('You have admin access, ' + req.auth.credentials.session.username)
      .header("Authorization", req.auth.credentials.token);
  }
};
