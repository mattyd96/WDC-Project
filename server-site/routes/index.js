var express = require("express");
var router = express();
var bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({extended: true}));
router.set("view engine", "ejs");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('landing');
});

/* GET search page. */
router.get('/search', function(req, res, next) {
  res.render('search');
});

/* GET about page. */
router.get('/about', function(req, res, next) {
  res.render('about');
});

/* GET account management page. */
router.get('/manage-account', function(req, res, next) {
  res.render('manage-account');
});

module.exports = router;
