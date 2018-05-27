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
  if(req.session.username) {
    console.log("in session BOY");
    res.render('landing', {hotels:hotels, recommended:recommended, popular:popular, highestRated: highestRated, session: req.session});
  } else {
    res.render('landing', {hotels:hotels, recommended:recommended, popular:popular, highestRated: highestRated, session: false});
  } 
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
        }
      }

      if(req.session.username) {
        res.render('hotel', {thisHotel: thisHotel, session: req.session});
      } else {
        res.render('hotel', {thisHotel: thisHotel, session: false});
      }
      
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

  //for each hotel in the hotels array  (all hotels)
  hotels.forEach(function(hotel) {

    //check if hotel is in the location searched, if it is add it to the filterHotel array
    if((hotel.location.toLowerCase() == req.body.location.toLowerCase()) && (req.body.location != '')) {
      filterHotel.push(hotel);
    }

  });

  //if the filterHotel has values, render search with that, else render the page with all hotels (later on we will want to produce an error that says we couldn't find any matches)
  if(filterHotel.length > 0) {

    if(req.session.username) {
      res.render('search', {hotels: filterHotel, session: req.session});
    } else {
      res.render('search', {hotels: filterHotel});
    }
    
  } else {

    if(req.session.username) {
      res.render('search', {hotels: hotels, session: req.session});
    } else {
      res.render('search', {hotels: hotels});
    }
  }
  
});


//----------------objects and arrays---------------------//
//these are needed to fill out all the pages, later on (in submssion 4 i think, this will all be transferred to a database)
//but for now i gues they can go here, no idea where else to stick them atm
var hotels = [];
var recommended = [];
var popular = [];
var highestRated = [];

//rooms array - dont need this at the moment

var rooms = [];

//hotel object

function Hotel(name, location, lat, lng) {
    this.name = name;
    this.location = location;
    this.lat = lat;
    this.lng = lng;
    this.rooms = [];
    this.images = [];
    this.description = "This is a default description. Ability to change to be included later";
    this.id = name.replace(/\s+/g, ''); 
    //this.hotelId = hotelNumber;
}

//Room object

function Room(name, hotel, people, price) {
    this.name = name;
    this.hotel = hotel;
    this.people = people;
    this.price = price;
    this.booked = [];
    this.images = [];
    this.description = "This is a default description. Ability to change to be included later";
}

//some dummy hotels for testing
var hotelTest = new Hotel("Cybernet Kissaten", "Tokyo", 35.6895, 139.6917);
var hotelTest2 = new Hotel("Kratos' shack", "Norway", 35.6897, 139.6917);
var hotelTest3 = new Hotel("Kaer Morhen", "Poland?", 35.6899, 139.6917);
var hotelTest4 = new Hotel("yorHa Bunker", "Orbit", 35.6895, 139.6915);
var hotelTest5 = new Hotel("Baggins Hobbit Hole", "The Shire", 35.6895, 139.6913);
var hotelTest6 = new Hotel("Konoha", "Kyoto", 35.0116, 135.7680);
var hotelTest7 = new Hotel("Konoha", "Kyoto", 35.0116, 136.7680);
var hotelTest8 = new Hotel("Hanshin Tigers Den", "Osaka", 34.7213, 135.3616);
var hotelTest9 = new Hotel("Nagano Nest", "Kyoto", 36.6486, 138.1948);
var hotelTest10 = new Hotel("Hakuba 47", "Kyoto", 36.6982, 137.8619);

hotels.push(hotelTest);
recommended.push(hotelTest);
hotels.push(hotelTest2);
recommended.push(hotelTest2);
hotels.push(hotelTest3);
recommended.push(hotelTest3);
hotels.push(hotelTest4);
popular.push(hotelTest4);
hotels.push(hotelTest5);
popular.push(hotelTest5);
hotels.push(hotelTest6);
popular.push(hotelTest6);
hotels.push(hotelTest7);
highestRated.push(hotelTest7);
hotels.push(hotelTest8);
highestRated.push(hotelTest8);
hotels.push(hotelTest9);
highestRated.push(hotelTest9);
hotels.push(hotelTest10);

//dummy room 
var roomTest1 = new Room("Pod 1", "all of them for now", "over 9000!", "alot");
roomTest1.images[0] = "pup.jpg";
roomTest1.images[1] = "kabukicho.jpg";

var roomTest2 = new Room("Pod 2", "all of them for now", "over 20,000!", "alot");
roomTest2.images[0] = "pup.jpg";
roomTest2.images[1] = "kabukicho.jpg";

//put the room into the room array of each hotel
hotels.forEach(function(hotel){
  hotel.rooms.push(roomTest1);
  hotel.rooms.push(roomTest2);
});


//this list will be used for filtering serach results ... it is a copy of hotels




module.exports = router;
module.exports.hotels = hotels;
