var express          = require("express");
var router           = express();
var bodyParser       = require("body-parser");
var session          = require('express-session');
const passport       = require('passport');
var passportSetup    = require('../models/passport-setup');
const {OAuth2Client} = require('google-auth-library');
const client         = new OAuth2Client('515705211844-17nbhti5hk7njhelk62kaeup52fggent.apps.googleusercontent.com');
const bcrypt         = require('bcrypt');

const { body,validationResult } = require('express-validator/check');
const { sanitizeBody }          = require('express-validator/filter');


router.use(bodyParser.urlencoded({extended: true}));
router.set("view engine", "ejs");

//variable used to store active sessions
var sess = {};

//variable used to store the active user
var currentUser = {};

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//this is an example route -- do not use in final!
router.get('/getPhoneLines', function(req, res){
	req.pool.getConnection(function(err, connection){
		if(err) throw err;
		var sql = "SELECT * FROM hotels";
		connection.query(sql, function(err, results){
			connection.release();
      console.log(results);
      results.forEach(function(hotel) {
        hotels.push(hotel);
      });
			res.send(results);
		});
	});
});

/* GET logout */
router.get('/logout', function (req, res, next) {

  req.session.destroy(function(err) {
    // cannot access session here
    res.redirect('../');
  })

});

/* GET google sign in page */
router.get('/google', passport.authenticate('google', {
  scope: ['profile','email']
}));

/*GET an add username form after google sign in*/
router.get('/google/addUsername', passport.authenticate('google'), (req,res) => {

      console.log("made it through auth");

      if(req.user.password == null) {
        req.session.username = req.user.username;
        req.session.isHost   = false;
        console.log("session is: " + req.session.user.username);
        res.render('google-account-creation', {newUser: req.user});
      } else {
        req.session.username = req.user.username;
        req.session.isHost   = false;
        console.log("session is: " + req.session.username);
        console.log("req.user is: " + req.user);
        res.redirect('/');
      }


});

/*POST add password to google account for local login*/
router.post('/google/addPassword', function (req,res, next) {

  var hash = bcrypt.hashSync(req.body.password, 10);
  req.pool.getConnection(function(err, connection){
		if(err) throw err;
		var sql = "UPDATE users SET password=? WHERE username=?";
		connection.query(sql, [hash, req.body.username], function(err, results){
			connection.release();
      res.redirect('/');
		});
	});

});

/*  Booking Management Route  */
router.post('/:id/manage-bookings', function(req, res, next) {

  res.render('manage-bookings', {currUser: req.body.currUser, bookings: req.body.bookings, session: req.session});
});


/* GET user account page*/
router.get('/:id', function(req, res, next) {

  if(!req.session) {
      res.redirect("../");
  } else {

    req.pool.getConnection(function(err, connection){
      if(err) throw err;
      var sql = "SELECT username, email, google_id, password, ishost FROM users UNION ALL SELECT username, email, google_id, password, ishost FROM hosts";
      connection.query(sql, function(err, results){
        connection.release();
        var allUsers = results;
        var length = allUsers.length;
        var currUser;

        for(var i = 0; i < length; i++) {
          if(req.session.username == allUsers[i].username) {
            currUser = allUsers[i];

            req.pool.getConnection(function(err, connection){
              if(err) throw err;
              var sql = "SELECT * FROM bookings WHERE username=?";
              connection.query(sql, [currUser.username], function(err, results){
                connection.release();
                var bookings = results;

                res.render('manage-account', {currUser: currUser, bookings: bookings, session: req.session});

              });
            });
          }
        }
      });
    });
  }

});

//POST route for updating data (create Account and sign in)
router.post('/', function (req, res, next) {

  // confirm that user typed same password twice
  if (req.body.password !== req.body.passwordConf) {
    var err = new Error('Passwords do not match.');
    err.status = 400;
    res.status(400).send(err.message);
    return next(err);
  }

  req.pool.getConnection(function(err, connection){
		if(err) throw err;
		var sql = "SELECT username, email, google_id, password, ishost FROM users UNION ALL SELECT username, email, google_id, password, ishost FROM hosts";
		connection.query(sql, function(err, results){
      connection.release();
      var allUsers = results;
      console.log(allUsers);
      //if the entire field for account creation is filled out
      if(req.body.firstName && req.body.lastName && req.body.username && req.body.password && req.body.passwordConf) {

        sanitizeBody('password').trim().escape();
        sanitizeBody('firstName').trim().escape();
        sanitizeBody('lastName').trim().escape();
        sanitizeBody('username').trim().escape();
        sanitizeBody('email').trim().escape();


        //check through the users array
        allUsers.forEach(function(user) {
          if(req.body.username == user.username) {
            var err = new Error("username taken");
            err.status = 400;
            res.status(400).send(err.message);
            return next(err);
          } else if(req.body.email.length > 2 && req.body.email == user.email) {
            var err = new Error("an account under this email address has already been created");
            err.status = 400;
            res.status(400).send(err.message);
            return next(err);
          }
        });

        bcrypt.hash(req.body.password, 10, function(err, hash) {
          // Store hash in database
          req.pool.getConnection(function(err, connection){
            if(err) throw err;
            var sql = "INSERT INTO users (username, first_name, last_name, email, password) VALUES (?, ?, ?, ?,?);";
            connection.query(sql, [req.body.username, req.body.firstName, req.body.lastName, req.body.email, hash], function(err, results){
              console.log(results);
              connection.release();

              req.session.username = req.body.username;
              req.session.password = req.body.password;
              req.session.isHost   = false;

              console.log("created user");
              console.log(req.session);
              res.redirect('/');
            });
          })
        });

      //if host creation form is filled out
      } else if(req.body.businessName && req.body.username_host && req.body.password_host && req.body.passwordConf_host) {

        sanitizeBody('businessName').trim().escape();
        sanitizeBody('username_host').trim().escape();
        sanitizeBody('password_host').trim().escape();
        sanitizeBody('email').trim().escape();

        //check through users array
        allUsers.forEach(function(user) {
          if(req.body.username_host == user.username) {
            var err = new Error("this username is already taken");
            err.status = 400;
            res.status(400).send(err.message);
            return next(err);
          } else if(req.body.email.length > 2 && req.body.email == user.email) {
            var err = new Error("an account under this email address has already been created");
            err.status = 400;
            res.status(400).send(err.message);
            return next(err);
          }
        });

        bcrypt.hash(req.body.password_host, 10, function(err, hash) {
          // Store hash in database
          req.pool.getConnection(function(err, connection){
            if(err) throw err;
            var sql = "INSERT INTO hosts (username, business_name, email, password) VALUES (?, ?, ?,?);";
            connection.query(sql, [req.body.username_host, req.body.businessName, req.body.email, hash], function(err, results){
              console.log(results);
              connection.release();

              req.session.username = req.body.username_host;
              req.session.password = req.body.password_host;
              req.session.isHost   = true;

              console.log("created host");
              console.log(req.session);
              res.redirect('/');
            });
          })
        });

      } else if (req.body.logusername && req.body.logpassword) {

        sanitizeBody('logpassword').trim().escape();
        sanitizeBody('logusername').trim().escape();

        var length = allUsers.length;
        var userFound = false;

        for(var i = 0; i < length; i++) {

          if(req.body.logusername == allUsers[i].username) {

            var user = allUsers[i];
            console.log("user password: " + user.password);
            console.log("entered passord: " + req.body.logpassword);

            var passwordMatch = bcrypt.compareSync(req.body.logpassword, user.password);
            if(passwordMatch) {

              if(user.ishost == 'false') {
                req.session.username = user.username;
                req.session.isHost   = false;

                console.log("foundUser");

              } else if(user.ishost == 'true') {
                req.session.username = user.username;
                req.session.isHost   = true;

                console.log("foundHost");
              }

              console.log(req.session);
              userFound = true;
              res.redirect('../');
              break;

            } else if(!passwordMatch) {
              res.send(JSON.stringify({error: "Password and Username do not match"}));
              userFound = true;
              break;
            }
          }
        }

        if(!userFound) {
          var err = new Error("This Username does not exist in our system :(");
          err.status = 400;
          res.status(400).send(err.message);
          return next(err);
        }
      }
		}); //query end
  });//connection end

  console.log('request finished');
});



module.exports = router;
