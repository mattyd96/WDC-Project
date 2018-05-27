INSERT INTO hotels(hotel_name, longitude, latitude, address1, address2, district, city, country, postcode, hotel_desc)
VALUES ("Cybernet Kissaten",139.6917, 35.6895, "1-chome-32", "Wada", "Suginami", "Tokyo", "Japan", "166-0012", 
        "A true Modern Tokyo experience! Full of all things cyberpunk to fulfill your dreary future just like in Blade Runner, Akira, or Ghost in the shell!
        Don't blame us if you don't return home though... ");

INSERT INTO rooms(hotel_id, room_name, price, currency, num_people, room_desc)
VALUES (1, "Pod 1", 100, "USD", 4, "A pod for 4! Nice and cozy! Features a double strength nuclear resistant walls.")
        ,(1, "Pod 2", 100, "USD", 4, "A pod for 4! Nice and cozy! Features a double strength nuclear resistant walls.")
        ,(1, "AI suite", 500, "USD", 6, "The AI suite of your dreams!. Features your very own AI butler! He's still in testing so be careful.");

INSERT INTO hotels(hotel_name, longitude, latitude, address1, city, country, postcode, hotel_desc)
VALUES ("kratos's Shack", 24.9384, 60.1699, "15 Snowy Drive", "Kattegat", "NorseLand", "1234",
        "Theres no room service here BOY. If you want to eat, hunt deer.");

INSERT INTO rooms(hotel_id, room_name, price, currency, num_people, room_desc)
VALUES (2, "The Shack", "1000", "USD", 10, "Theres only one room in this shack, and that's the shack itself. Make sure to leave room for Kratos if he stops by!");


INSERT INTO hotels(hotel_name, longitude, latitude, address1, city, country, postcode, hotel_desc)
VALUES ("Kaer Morhen", 19.027778,  54.039722, "00 Drowner Drive", "Wolf City", "Poland", "4242",
        "With a literally endless supply of rooms, some safe, some not; come hang out with
        Geralt and Company! Drinking competitions, sword practice, horse riding... come do it
        all at Kaer Morhen!");

INSERT INTO rooms(hotel_id, room_name, price, currency, num_people, room_desc)
VALUES (3, "Geralt's Suite", 2400, "USD", 2, "Come live the high life like only Yeneffer could! 
        Hot tubs, gorgeous views, and privacy from the rest of the castle! This is the best room
        Kaer Morhen has to offer")
        ,(3, "Vessimir's Dwelling", 300, "USD", 1, "It isn't much, but you get to pretend like you run the place!");

INSERT INTO users(username, first_name, last_name, email)
VALUES ("toru991", "Toru", "Tsuki", "toru@gmail.com")
       ,("geralt96", "Geralt", "of Rivia", "morhenhires@gmail.com")
       ,("Kratos12", "Kratos", "the God of War", "kratos@gmail.com");


INSERT INTO hotels(hotel_name, longitude, latitude, address1, address2, district, city, country, postcode, hotel_desc)
VALUES ("Yorha Bunker", 135.5013,  34.6687, "1-chome-10", "Dontonbori","chuo-ku", "Osaka", "Japan", "542-0071",
        "Humanities gone, but who cares! Hang out with your Android buddies! The Yorha Bunker can cater to all kinds with
        robots welcome as well. Come get an arm repaired or your battle supplies restoked at the in house market. The end of the
        world could never be better. Glory to mankind!");