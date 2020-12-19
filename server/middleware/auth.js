const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
  //POST
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/


//createUser - models.user, on Success use createSession (GET)
module.exports.createUser = (req, res, next) => {
  models.Users.get({username: req.body.username}).then(user => {
    if (user) {
      next('user exists');
    } else {
      models.Users.create({username: req.body.username, password: req.body.password}).then(success => {
        if (!success) {
          next(success);
        } else {
          //create sessionId and return it;
          next(null, success);
        }
      });
    }
  });
};

//login - models.user, on Success use createSession (GET)
module.exports.login = (req, res, next) => {
  //a bunch of stuff happens here
  models.Users.get({username: req.body.username})
    .then(user => {
      if (!user) {
        next('user does not exist');
      } else if (models.Users.compare(req.body.password, user.password, user.salt)) {
        //Create sessionID and return it;
        next(null, 'logged in');
      } else {
        next('could not log in');
      }
    });
};