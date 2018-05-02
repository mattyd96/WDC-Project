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
var sess;

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
  if(req.body.firstName &&
    req.body.lastName &&
    req.body.username &&
    req.body.password &&
    req.body.passwordConf) {

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

    var newUser = new User(req.body.firstName, req.body.lastName, req.body.username, req.body.password, req.body.email);
    users.push(newUser);

    sess = req.session;
    sess.username = req.body.username;
    sess.password = req.body.password;
    console.log("created user");

  } else if (req.body.logusername && req.body.logpassword) {

    users.forEach( function(user) {
      if(req.body.logusername == user.username && req.body.logpassword == user.password) {

        sess = req.session;
        sess.username = req.body.username;
        sess.password = req.body.password;
        console.log("foundUser");

        res.redirect('../');
      }
    });
    

  } else {
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

module.exports = router;
