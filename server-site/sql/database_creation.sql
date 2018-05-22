CREATE TABLE users (
    username VARCHAR(30)
    ,first_name VARCHAR(50)
    ,last_name VARCHAR(50)
    ,email VARCHAR(100)
    ,google_id VARCHAR(30)
    ,primary key (username)
);

CREATE TABLE hosts (
    username VARCHAR(30)
    ,business_name VARCHAR(100)
    ,email VARCHAR(100)
    ,google_id VARCHAR(30)
    ,primary key (username)
);

CREATE TABLE hotels (
    username VARCHAR(30)
    ,hotel_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY
    ,hotel_name VARCHAR(100)
    ,longitude FLOAT
    ,latitude FLOAT
    ,address1 VARCHAR(100)
    ,address2 VARCHAR(100)
    ,address3 VARCHAR(100)
    ,city VARCHAR(50)
    ,district VARCHAR(50)
    ,country VARCHAR(50)
    ,postcode VARCHAR(20)
    ,hotel_desc TEXT
    ,foreign key (username) references hosts(username)   
);

CREATE TABLE rooms (
    hotel_id INT NOT NULL
    ,room_id INT NOT NULL AUTO_INCREMENT Primary key
    ,room_name VARCHAR(100)
    ,room_desc TEXT
    ,price FLOAT(20,3)
    ,currency VARCHAR(15)
    ,num_people INT(10)
    ,foreign key (hotel_id) references hotels(hotel_id) on delete cascade
);

CREATE TABLE reviews (
    username VARCHAR(30) NOT NULL
    ,hotel_id INT NOT NULL
    ,content TEXT
    ,rating FLOAT(5,2)
    ,foreign key (username) references users(username)
    ,foreign key (hotel_id) references hotels(hotel_id) on delete cascade
);

CREATE TABLE bookings (
    booking_id INT NOT NULL AUTO_INCREMENT Primary key
    ,username VARCHAR(30)
    ,hotel_id INT
    ,room_id INT
    ,date_start DATE
    ,date_end DATE
    ,foreign key (username) references users(username) on delete cascade
    ,foreign key (hotel_id, room_id) references rooms(hotel_id, room_id) on delete cascade
);