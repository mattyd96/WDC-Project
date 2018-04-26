var express = require("express");
var router = express();
var bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({extended: true}));
router.set("view engine", "ejs");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* create a user account */
router.post('/create-account', function(req, res, next) {
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var username = req.body.username;
  var password = req.body.password;
  var email = req.body.email;

  var user = new User(firstName, lastName, userName, password, email);
  users.push(user);
  console.log(firstName);
  res.redirect('/');
});

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

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
}

module.exports = router;
