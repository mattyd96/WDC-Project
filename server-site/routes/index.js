var express = require("express");
var router = express();
var bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({extended: true}));
router.set("view engine", "ejs");


//------------------routes---------------------------//

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('landing');
});

/* GET search page. */
router.get('/search', function(req, res, next) {
  res.render('search',{hotels:hotels});
});

/* GET about page. */
router.get('/about', function(req, res, next) {
  res.render('about');
});

/* GET account management page. */
router.get('/manage-account', function(req, res, next) {
  res.render('manage-account');
});

router.get('/hotels/:id', function(req, res) {
  
  var thisHotel;
  for(var i = 0; i < hotels.length; i++) {
    if(hotels[i].id == req.params.id) {
      thisHotel = hotels[i];
    }
  }

  res.render('hotel', {thisHotel: thisHotel});
  
});


//----------------objects and arrays---------------------//
//these are needed to fill out all the pages, later on (in submssion 4 i think, this will all be transferred to a database)
//but for now i gues they can go here, no idea where else to stick them atm
var hotels = [];

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
hotels.push(hotelTest);
hotels.push(hotelTest2);
hotels.push(hotelTest3);
hotels.push(hotelTest4);
hotels.push(hotelTest5);

//dummy room 
var roomTest1 = new Room("Pod 1", "all of them for now", "over 9000!", "alot");

//put the room into the room array of each hotel
hotels.forEach(function(){
  rooms.push(roomTest1);
});

console.log(hotels);



module.exports = router;
