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

//these are needed to fill out all the pages, later on (in submssion 4 i think, this will all be transferred to a database)
//but for now i gues they can go here, no idea where else to stick them atm
var hotels = [];
var recommended = [];
var popular = [];
var highestRated = [];

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

module.exports.users = users;
module.exports.hosts = hosts;
module.exports.hotels = hotels;