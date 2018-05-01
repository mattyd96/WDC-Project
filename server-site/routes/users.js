var express = require("express");
var router = express();
var mongoose = require('mongoose');
var bodyParser = require("body-parser");
var session = require('express-session')
var User  = require("../models/users.js");

mongoose.connect("mongodb://localhost/27017");

router.use(bodyParser.urlencoded({extended: true}));
router.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false
}));

router.set("view engine", "ejs");

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

  if(req.body.firstName &&
    req.body.lastName &&
    req.body.username &&
    req.body.password &&
    req.body.passwordConf) {

    var userData = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      passwordConf: req.body.passwordConf,
    }

    User.create(userData, function (error, user) {
      if (error) {
        return next(error);
      } else {
        req.session.userId = user._id;
        return res.redirect('../');
      }
    });

  } else if (req.body.logusername && req.body.logpassword) {
    User.authenticate(req.body.logusername, req.body.logpassword, function (error, user) {
      if (error || !user) {
        var err = new Error('Wrong username or password.');
        err.status = 401;
        return next(err);
      } else {
        req.session.userId = user._id;
        return res.redirect('../');
      }
    });
  } else {
    var err = new Error('All fields required.');
    err.status = 400;
    return next(err);
  }
});


/*
//users array

var users = [];

var currentUser = {};

//user object

function User(firstName, lastName, userName, password, email) {
 this.firstName = firstName;
 this.lastName = lastName;
 this.userName = userName;
 this.password = password;
 this.email = email;
 this.favorites = [];
 this.wishlist = [];
 this.recentlyVisited = [];
 this.bookings = [];
 this.reviews = [];
 this.canEdit = false;
}*/

module.exports = router;
