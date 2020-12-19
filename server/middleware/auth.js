const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
  //POST
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/


//createUser - models.user, on Success use createSession (GET)
module.exports.createUser = (req, res, callback) => {
  models.Users.get({username: req.body.username}).then(user => {
    if (user) {
      callback('user exists');
    } else {
      models.Users.create({username: req.body.username, password: req.body.password});
    }
  });
};
//login - models.user, on Success use createSession (GET)
module.exports.login = (req, res, next) => {
  //a bunch of stuff happens here
};