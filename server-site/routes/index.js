var express = require("express");
var router = express();
var bodyParser = require("body-parser");
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
var users = require('./users').users;

router.use(bodyParser.urlencoded({extended: true}));
router.set("view engine", "ejs");


//------------------routes---------------------------//

/* GET home page. */
router.get('/', function(req, res, next) {


  

    req.pool.getConnection(function(err, connection){
      if(err) throw err;
      var sql = "SELECT * FROM hotels";
      connection.query(sql, function(err, results){
        connection.release();
        console.log(results);
        var hotels2 = results;
        var recommended = [];
        var popular = [];
        var highestRated = [];

        recommended.push(hotels2[0]);
        recommended.push(hotels2[1]);
        recommended.push(hotels2[2]);

        popular.push(hotels2[1]);
        popular.push(hotels2[2]);
        popular.push(hotels2[3]);

        highestRated.push(hotels2[3]);
        highestRated.push(hotels2[0]);
        highestRated.push(hotels2[1]);

        if(req.session.username) {
          console.log("in session BOY");
          res.render('landing', {hotels:hotels2, recommended:recommended, popular:popular, highestRated: highestRated, session: req.session});
        } else {
          res.render('landing', {hotels:hotels2, recommended:recommended, popular:popular, highestRated: highestRated, session: false});
        } 
  
      });
    });

});

router.get('/getPhoneLines', function(req, res){
	req.pool.getConnection(function(err, connection){
		if(err) throw err;
		var sql = "SELECT hotel_name, hotel_id FROM hotels";
		connection.query(sql, function(err, results){
			connection.release();
			console.log(results);
			res.send(results);
		});
	});
});

/* GET search page. */
router.get('/search', function(req, res, next) {

  var hotels2 = [];

  req.pool.getConnection(function(err, connection){
		if(err) throw err;
		var sql = "SELECT * FROM hotels";
		connection.query(sql, function(err, results){
			connection.release();
      console.log(results);
      hotels2 = results;
      console.log(hotels2);

      if(req.session.username)
      {
        res.render('search',{hotels:hotels2, session: req.session});
      } else {
        res.render('search',{hotels:hotels2, session: false});
      }
		});
  });
});

/* GET about page. */
router.get('/about', function(req, res, next) {
  if(req.session.username)
  {
    res.render('about',{session: req.session});
  } else {
    res.render('about',{session: false});
  }
});

/* GET account management page. */ // probably wont use this get route - use the users/:id route
router.get('/manage-account', function(req, res, next) {
  res.render('manage-account');
});

/* GET unique page for each hotel */
//later on the id will be provided by the database, but for now i just removed whitespace from the hotel name and used that
router.get('/hotels/:id', function(req, res) {
  
  req.pool.getConnection(function(err, connection){
		if(err) throw err;
		var sql = "SELECT * FROM hotels";
		connection.query(sql, function(err, results){
			connection.release();
      var hotels = results;
      var thisHotel;
      for(var i = 0; i < hotels.length; i++) {
        if(hotels[i].hotel_id == req.params.id) {
          thisHotel = hotels[i];
          break;
        }
      }

      req.pool.getConnection(function(err, connection){
        if(err) throw err;
        var sql = "SELECT * FROM rooms WHERE hotel_id=?";
        connection.query(sql, [thisHotel.hotel_id],function(err, results){
          connection.release();

          var rooms = results;

          if(req.session.username) {
            res.render('hotel', {thisHotel: thisHotel, rooms: rooms, session: req.session});
          } else {
            res.render('hotel', {thisHotel: thisHotel, rooms: rooms, session: false});
          }

        });
      });
  
		});
  });
});

/* Booking routes */
router.get('/hotels/:id/:name/booking', function (req, res, next) {
  // debugging
  console.log('Booking date-select');

  if(req.session.username)
  {
    res.render('booking-dateSelect',{session: req.session, hotel: req.params.id, room: req.params.name});
  }
  else {
     res.status(403).send("You're are not signed in");
  }

});


router.post('/hotels/:id/:name/booking-confirmation', function (req, res) {
  //debugging
  console.log(req.body);
  var thisHotel;
  var thisRoom;
  //capturing the selected hotel
  for(var i = 0; i < hotels.length; i++) {
    if(hotels[i].id == req.params.id) {
      thisHotel = hotels[i];
    }
  }
  //capturing the selected room
  console.log(req.params.name);
  for(var i = 0; i < thisHotel.rooms.length; i++) {
    if(thisHotel.rooms[i].name == req.params.name) {
      thisRoom = thisHotel.rooms[i];
    }
  }
  //checking if the room is not booked between the to and from date

  //storing the booking object in the room and the selected user
  var currUser = req.session.username;
  thisRoom.booked  = { currUser : { from: req.body.from, to: req.body.to } };
  console.log(thisRoom.booked);
  users.forEach(function(user) {
    if(user.username == req.session.username) {
      user.bookings = req.body;
    }

  });

  res.render('booking-confirmation', { thisHotel: thisHotel, thisRoom: thisRoom, date: req.body, session: req.session } );
});

/* Booking confirmation page route */
router.get('/hotels/:id/:name/payment-details', function (req, res) {
  res.render('payment-details', {session: req.session});
});



/* Post Search Query for hotels */
router.post('/search', function(req, res, next) {

  var filterHotel = [];
  console.log("filtered hotels: " + filterHotel);

  //sanitize input for security
  console.log(req.body);
  sanitizeBody('location').trim().escape();
  sanitizeBody('dateStart').toDate();
  sanitizeBody('dateEnd').toDate();
  sanitizeBody('people').toInt();
  sanitizeBody('rooms').toInt();

  req.pool.getConnection(function(err, connection){
    if(err) throw err;
    var sql = "SELECT * FROM hotels WHERE ? IN (city, country, address1, address2, address3, district, postcode, longitude, latitude, hotel_name);";
    connection.query(sql,[req.body.location], function(err, results){
      connection.release();
      var hotels = results;

      if(hotels.length > 0) {

        if(req.session.username) {
          res.render('search', {hotels: hotels, session: req.session});
        } else {
          res.render('search', {hotels: hotels, session: false});
        }
        
      } else {
        res.redirect("/search");
      }
      
    });
  });


  



  //for each hotel in the hotels array  (all hotels)
  hotels.forEach(function(hotel) {

    //check if hotel is in the location searched, if it is add it to the filterHotel array
    if((hotel.location.toLowerCase() == req.body.location.toLowerCase()) && (req.body.location != '')) {
      filterHotel.push(hotel);
    }

  });
  
});







module.exports = router;

