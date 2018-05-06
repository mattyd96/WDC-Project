var express = require("express");
var router = express();
//var mongoose = require('mongoose');
var bodyParser = require("body-parser");
var session = require('express-session');
var User  = require("../models/users.js");

//mongoose.connect("mongodb://localhost/27017");

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

//POST route for updating data (create Account and sign in)
router.post('/', function (req, res, next) {

  // confirm that user typed same password twice
  if (req.body.password !== req.body.passwordConf) {
    var err = new Error('Passwords do not match.');
    err.status = 400;
    res.send("passwords dont match");
    return next(err);
  }

  //if the entire field for account creation is filled out
  if(req.body.firstName && req.body.lastName && req.body.username && req.body.password && req.body.passwordConf) {

    //check through the users array
    users.forEach(function(user) {
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

    //check through the hosts array
    hosts.forEach(function(user) {
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

    var newUser = new User(req.body.firstName, req.body.lastName, req.body.username, req.body.password, req.body.email);
    users.push(newUser);

    sess = req.session;
    sess.username = req.body.username;
    sess.password = req.body.password;
    console.log("created user");
    console.log(sess);

  //if host creation form is filled out
  } else if(req.body.businessName && req.body.username_host && req.body.password_host && req.body.passwordConf_host) {

      //check through users array
      users.forEach(function(user) {
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
  
      //check through hosts array
      hosts.forEach(function(user) {
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

      var newHost = new User(req.body.businessName, req.body.username_host, req.body.password_host, req.body.email);
      hosts.push(newHost);

      sess = req.session;
      sess.username = req.body.username;
      sess.password = req.body.password;
      console.log("created Host");
      console.log(sess);

  } else if (req.body.logusername && req.body.logpassword) {

    //search users array for a match
    users.forEach( function(user) {
      if(req.body.logusername == user.username && req.body.logpassword == user.password) {

        sess = req.session;
        sess.username = req.body.username;
        sess.password = req.body.password;
        console.log("foundUser");

        res.redirect('../');
      }
    });

    //search hosts array for a match
    hosts.forEach( function(user) {
      if(req.body.logusername == user.username && req.body.logpassword == user.password) {

        sess = req.session;
        sess.username = req.body.username;
        sess.password = req.body.password;
        console.log("foundUser");

        res.redirect('../');
      }
    });
    

  } else if(req.body.idtoken) {
    console.log("Google Token Recieved!");

    async function verify() {
      const ticket = await client.verifyIdToken({
        idToken: req.body.idtoken,
        audience: CLIENT_ID
      });
      const payload = ticket.getPayload();
      const userid = payload['sub'];

      users.forEach( function(user) {

        if(user.google === userid) {
          sess[req.session.id] = user.username;
          currentUser = user;
        } else {
          console.log("could not find google id");
        }
      });
      res.json(currentUser);
    }
    verify().catch(console.error);

  } else {
    console.log("nothing happened");
    var err = new Error('All fields required.');
    err.status = 400;
    return next(err);
  }
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

var testUser1 = new User1("Toru", "Sasaki", "toru991", "password", "example@gmail.com");
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
  this.userName = userName;
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
