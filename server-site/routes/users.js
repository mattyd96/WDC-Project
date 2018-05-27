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

var hotels           = require('../models/User').hotels;

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
            res.render('manage-account', {currUser: currUser, session: req.session});
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
    res.send("passwords dont match");
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
            res.send("this username is already taken");
            return next(err);
          } else if(req.body.email == user.email) {
            var err = new Error("email taken");
            err.status = 400;
            res.send("an account under this email address has already been created");
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
            var err = new Error("username taken");
            err.status = 400;
            res.send("this username is already taken");
            return next(err);
          } else if(req.body.email == user.email) {
            var err = new Error("email taken");
            err.status = 400;
            res.send("an account under this email address has already been created");
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

        for(var i = 0; i < length; i++) {

          var user = allUsers[i];
          console.log("user password: " + user.password);
          console.log("entered passord: " + req.body.logpassword);

          var passwordMatch = bcrypt.compareSync(req.body.logpassword, user.password);
          if(req.body.logusername == user.username && passwordMatch) {

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
            res.redirect('../');
            break;

          } else if(req.body.logusername == user.username && !passwordMatch) {
            res.send(JSON.stringify({error: "Password and Username do not match"}));
            break;
          }
        }   
      }
		}); //query end
  });//connection end
  
   /*if (req.body.idtoken) {
    console.log("Google Token Recieved!");

    var userid, useremail, userfirst, userlast;

    async function verify() {
      const ticket = await client.verifyIdToken({
          idToken: req.body.idtoken,
          audience: '515705211844-17nbhti5hk7njhelk62kaeup52fggent.apps.googleusercontent.com',  // Specify the CLIENT_ID of the app that accesses the backend
      });
      const payload = ticket.getPayload();
      userid = payload['sub'];
      useremail = payload['email'];
      userfirst = payload['family_name'];
      userlast = payload['given_name'];

      console.log(userid);
      console.log(useremail);

      //check through the users array
      users.forEach(function(user) {
        console.log("going through users array");
        if(userid == user.google) {
          //log this user in
          req.session.username = user.username;
          req.session.password = user.password;
          req.session.isHost   = false;

          //res.redirect('../');
          res.send("localhost:3000");

        } else if(useremail == user.email) {
          //log this person in and...
          req.session.username = user.username;
          req.session.password = user.password;
          req.session.isHost   = false;

          //assign google id to account
          user.google = userid;

          //res.redirect('../');
          res.send("localhost:3000");
        } 
      });

      //check through the hosts array
      hosts.forEach(function(user) {
        if(userid == user.google) {
          //log this user in
          req.session.username = user.username;
          req.session.password = user.password;
          req.session.isHost   = true;

          res.redirect('../');
        } else if(useremail == user.email) {
          //log this person in and...
          req.session.username = user.username;
          req.session.password = user.password;
          req.session.isHost   = true;

          //assign google id to account
          user.google = userid;

          //res.redirect('../');
          res.send("localhost:3000");
        } 
      });

      //if there is no user redirect to a special page with just the user account creation modal
      //fill that modal with what google does give you
      //prompt the user to fill out the rest - specifically a unique password and username
      //submit that form through the normal route

      var newUser = {
        first_name: userfirst,
        last_name: userlast,
        email: useremail,
      }
      //res.render('google-account-creation', {newUser: newUser});
      console.log("went through entire 'then'");
      console.log(newUser);
    }
    verify().catch(console.error);
    

  } else {
    console.log("nothing happened");
    var err = new Error('All fields required.');
    err.status = 400;
    return next(err);
  }*/

  console.log('request finished');
});



//users array

var users = [];

var currentUser = {};

//user object

function User1(firstName, lastName, userName, password, email) {
 this.firstName = firstName;
 this.lastName = lastName;
 this.username = userName;
 this.password = password;
 this.email = email;
 this.google;
 this.favorites = [];
 this.wishlist = [];
 this.recentlyVisited = [];
 this.bookings = [];
 this.reviews = [];
 this.canEdit = false;
}

var testUser1 = new User1("Toru", "Sasaki", "toru991", "password", "mdcodejam@gmail.com");
testUser1.bookings = [1,2,3];
testUser1.favorites = hotels;
var testUser2 = new User1("Toru2", "Sasaki", "toru992", "password", "example@gmail.com");
var testUser3 = new User1("Toru3", "Sasaki", "toru993", "password", "example@gmail.com");
var testUser4 = new User1("Toru4", "Sasaki", "toru994", "password", "example@gmail.com");
var testUser5 = new User1("Toru5", "Sasaki", "toru995", "password", "example@gmail.com");
users.push(testUser1);
users.push(testUser2);
users.push(testUser3);
users.push(testUser4);
users.push(testUser5);

//hosts array
var hosts = [];


function Host(name, userName, password, email) {
  this.name = name;
  this.username = userName;
  this.password = password;
  this.email = email;
  this.favorites = [];
  this.listings = [];
  this.canEdit = true;
}

var testHost1 = new Host("Hanka Robotics", "moto", "password", "hostexample@gmail.com");
var testHost2 = new Host("Hanka Robotics2", "moto2", "password", "hostexample@gmail.com");
var testHost3 = new Host("Hanka Robotics3", "moto3", "password", "hostexample@gmail.com");

hosts.push(testHost1);
hosts.push(testHost2);
hosts.push(testHost3);

module.exports = router;
module.exports.users = users;
module.exports.hosts = hosts;
