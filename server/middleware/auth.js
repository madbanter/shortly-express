const models = require('../models');
const Promise = require('bluebird');
// const parseCookies = require('./cookieParser.js');

module.exports.createSession = (req, res, next) => {
  //Check the req for cookies
  //if there are no cookies !req.cookie, created one(models.Session.create)
  //else VerifySession()
  models.Sessions.create()
    .then(({insertId}) => {
      models.Sessions.get({id: insertId})
        .then((sessionObj) => {
          res.cookie = {hash: sessionObj.hash};
          req.cookie = {hash: sessionObj.hash};
          console.log(req.cookie);
          console.log(res.cookie);
          // update sessions db with userID for this session
        });
    });
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
        this.createSession(req, res, next);
        next(null, 'logged in');
      } else {
        next('could not log in');
      }
    });
};