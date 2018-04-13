//$(document).ready(function () {

    //---------------------------- Hamburger menu functions --------------------------------------//

    /*Toggle Hamburger Menu style when clicked*/
    $(".bars").click(function createHamburger() {
        this.classList.toggle("change");
        console.log("hamburger clicked");
    });

    //toggle Hamburger Menu
    var visible = false; //Is the menu currently visible?
    $(".bars").click(function menuChange() {
        if (visible) {
            $("#hamburgerMenu").css("display", "none");
            visible = false;
        } else {
            $("#hamburgerMenu").css("display", "flex");
            visible = true;
        }
    });

    //----------------------------- sign in modal functions ---------------------------------------//

    //boolean needed for account creation functions
    //determines which values to use for account creation (host or user)
    var hostIsVisible = false;

    //display sign in form on click and hide others
    $(".signInUp").click(function () {
        $(".modal").show();
        $(".signInForm").show();
        $(".becomeHost").hide();
        $(".createAccount").hide();
        $(".createOrBecomeHost").hide();
        hostIsVisible = false;
    });

    //hide each form on click
    $(".closeBtn").click(function () {
        $(".modal").hide();
        $(".signInForm").hide();
        $(".becomeHost").hide();
        $(".createAccount").hide();
        $(".createOrBecomeHost").hide();
        hostIsVisible = false;
    });

    //hide modals on any click outside of modal
    $(document).click(function (event) {
        //if you click on anything except the modal itself or the "open modal" link, close the modal
        if (!$(event.target).closest(".modal-content, .signInUp, .createAccountClass").length) {
            $("body").find(".modal").hide();
            hostIsVisible = false;
        }
    });

    // on create Account click show create account opening modal and hide others
    $(".createAccountClass").click(function () {
        console.log("create button clicked");
        $(".modal").show();
        $(".signInForm").hide();
        $(".createAccount").hide();
        $(".createOrBecomeHost").css("display", "flex");
        hostIsVisible = false;
    });

    // display user sign in if they click on create account button
    $(".createBtn").click(function (e) {
        $(".createOrBecomeHost").hide();
        $(".becomeHost").hide();
        $(".createAccount").show();
        hostIsVisible = false;
        e.preventDefault();
    });

    //display host sign in if they click on "become a host!"
    $(".hostBtn").click(function (e) {
        $(".createOrBecomeHost").hide();
        $(".createAccount").hide();
        $(".becomeHost").show();
        hostIsVisible = true;
        e.preventDefault();
    });


    //----------------------------- nav functions ---------------------------------------//

    $(".search-nav").click(function (){
        $(".nav-and-search").addClass("searchBG2");
        $(".nav-and-search").removeClass("searchBG");
        $("#home, #about, #account-management, #hotels").hide();
        $("#search, .search").show();
    });

    $(".home-nav").click(function (){
        $(".nav-and-search").addClass("searchBG");
        $(".nav-and-search").removeClass("searchBG2");
        $("#home, .search").show();
        $("#search, #about, #account-management, #hotels").hide();
    });

    $(".about-nav").click(function() {
        $("#search, #home, #account-management, .search, #hotels").hide();
        $("#about").show();
        $(".nav-and-search").removeClass("searchBG");
        $(".nav-and-search").removeClass("searchBG2");
    });

    $(".nav-welcome, .manage-account-nav, .favorites-nav, .bookings-nav, .listings-nav").click(function() {
        $("#search, #home, #about, .search, #hotels").hide();
        $("#account-management").show();
        $(".nav-and-search").removeClass("searchBG");
        $(".nav-and-search").removeClass("searchBG2");
    });

    $(".manage-account-nav").click(function() {
        $("#bookings, #favorites, #listings").hide();
        if(currentUser.bookings) {
            $("#account-information-user").show();
            $("#bookings, #favorites, #listings, #account-information-host").hide();
        } else {
            $("#account-information-host").show();
            $("#bookings, #favorites, #listings, #account-information-user").hide();
        }
    });

    $(".bookings-nav").click(function() {
        $("#bookings").show();
        $("#account-information-user, #account-information-host, #favorites, #listings").hide();
    });

    $(".favorites-nav").click(function() {
        $("#favorites").show();
        $("#bookings, #account-information-user, #account-information-host, #listings").hide();
    });

    $(".listings-nav").click(function() {
        $("#listings").show();
        $("#bookings, #account-information-user, #account-information-host, #favorites").hide();
    });

    $(".sign-out").click(function() {
        $(".nav-and-search").addClass("searchBG");
        $("#home, .search").show();
        $("#search, #about, #account-management").hide();
    });

    

    //----------------------------- map toggle functions ---------------------------------------//

    $("#map-view").click(function() {

        //hide list view and show map view
        $(".homeResultGrid").hide();
        $(".map").show();

        //hide map button and show list button
        $("#map-view").hide();
        $("#list-view").show();
    });

    $("#list-view").click(function() {

        //hide map view and show list view
        $(".homeResultGrid").css("display", "grid");
        $(".map").hide();

        //show map button and hide list button
        $("#map-view").show();
        $("#list-view").hide();
    });

    //----------------------------- favorite functions ---------------------------------------//

    
    var isButtonRed = false; //boolean for favorite button color
    $(".favThis").click(function() {

        //change favorite button color
        $(this).children(".fa-heart").css('color', isButtonRed ? 'grey' : 'tomato');
        isButtonRed = !isButtonRed;
    });


    //----------------------------- Account Creation functions ---------------------------------------//

    //check that confirm password and password are matching

        //check whether host or user create account is visible and assigns appropriate id's to variables
        var $submitBtn = $("#create-account-form-host input[type='submit']"); 
        var $passwordBox =$("#create-password");
        var $confirmBox = $("#confirm-password");

        $(".createAccountClass, .hostBtn").click(function () {
            console.log("function has ran");
            if(hostIsVisible) {
                console.log(".becomeHost confirmed");
                $submitBtn = $("#create-account-form-host input[type='submit']");
                $passwordBox = $("#create-password-host");
                $confirmBox = $("#confirm-password-host");
            } else {
                $submitBtn = $("#create-account-form input[type='submit']");
                $passwordBox = $("#create-password");
                $confirmBox = $("#confirm-password");
            }
        });
        
        var $errorMsg =  $('<span id="error-msg"><i class="fas fa-exclamation"></i></span>');
        var $successMsg =  $('<span id="success-msg"><i class="fas fa-check"></i></span>');


        // This is incase the user hits refresh - some browsers will maintain the disabled state of the button.
        $submitBtn.removeAttr("disabled");

        function checkMatchingPasswords(){
            console.log("checking passwords");
            if($confirmBox.val() != "" && $passwordBox.val != ""){
                if($confirmBox.val() != $passwordBox.val() ){
                    console.log("passwords not equal");
                    $submitBtn.attr("disabled", "disabled");
                    $errorMsg.insertAfter($confirmBox);

                    console.log("inserted msg");
                } else {
                    $successMsg.insertAfter($confirmBox);
                }
            }
        }

        function resetPasswordError(){
            $submitBtn.removeAttr("disabled");
            var $errorCont = $("#error-msg");
            var $successCont = $("#success-msg");
            if($errorCont.length > 0){
                $errorCont.remove();
            }  
            if($successCont.length > 0){
                $successCont.remove();
            }  
        }

        $("#confirm-password, #create-password, #confirm-password-host, #create-password-host")
             .on("keydown", function(e){
                /* only check when the tab or enter keys are pressed
                 * to prevent the method from being called needlessly  */
                if(e.keyCode == 13 || e.keyCode == 9) {
                    checkMatchingPasswords();
                }
             })
             .on("blur", function(){                    
                // also check when the element looses focus (clicks somewhere else)
                checkMatchingPasswords();
            })
            .on("focus", function(){
                // reset the error message when they go to make a change
                resetPasswordError();
            })

    //create an object based on inputs to create an account for a person or business

        //users array

        var users = [];

        //host array

        var hosts = [];

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

        //host object

        function Host(name, userName, password, email) {
            this.name = name;
            this.userName = userName;
            this.password = password;
            this.email = email;
            this.favorites = [];
            this.listings = [];
            this.canEdit = true;
        }

        //check existing usernames against submitted one to check uniqueness

        function checkUserNames() {
            
            //users
            for(var i = 0; i < users.length; i++) {
                if($("#username").val() === users[i].userName || $("#username-host").val() === users[i].userName) {
                    return false;
                }
            }

            //hosts
            for(var i = 0; i < hosts.length; i++) {
                if($("#username").val() === hosts[i].userName || $("#username-host").val() === hosts[i].userName) {
                    return false;
                }
            }

            return true;
        }

        //error message if username already exists
        var $userNameErrorMsg =  $('<span id="error-msg-username"><i class="fas fa-exclamation"></i> Sorry! this username is already taken :(</span>');

        //reset error message if username is valid
        function resetUsernameError(){

            var $errorCont = $("#error-msg-username");
            if($errorCont.length > 0){
                $errorCont.remove();
            }  
        }

        //create new user object
        $(".create-user-submit").click(function (e) {

            if(checkUserNames()) {
                //assign form values to user object properties
                console.log("creating");
                var $firstName = $("#firstName").val();
                var $lastName = $("#lastName").val();
                var $userName = $("#username").val();
                var $password = $("#create-password").val();
                var $email = $("#create-account-form input[type='email']").val();

                //create user object
                var user = new User($firstName, $lastName, $userName, $password, $email);
                console.log(user.firstName);
                console.log(user.userName);

                //push to user array
                users.push(user);

                //reset form - required remove to resolve chrome browser issue
                $('#create-account-form input').removeAttr('required');
                $("#create-account-form")[0].reset();

                //hide modal
                $(".create-account-form").hide;
                $(".modal").hide();

                console.log(users);

                resetUsernameError();
                resetPasswordError();
                e.preventDefault();
            } else {
                $userNameErrorMsg.insertAfter($("#user-username-label"));
            }

            //prevent default form actions
            e.preventDefault();
        });

        //create host object 
        $(".create-host-submit").click(function (e) {
            console.log("doing something");
            if(checkUserNames()) {
                //assign form values to host object properties
                console.log("creating host");
                var $businessName = $("#businessName").val();
                var $userName = $("#username-host").val();
                var $password = $("#create-password-host").val();
                var $email = $("#create-account-form-host input[type='email']").val();

                //create user object
                var host = new Host($businessName, $userName, $password, $email);
                console.log(host.name);
                console.log(host.userName);

                //push to user array
                hosts.push(host);

                //reset form - - required remove to resolve chrome browser issue
                $('#create-account-form-host input').removeAttr('required');
                $("#create-account-form-host")[0].reset();

                //hide modal
                $(".create-account-form-host").hide;
                $(".modal").hide();

                console.log(hosts);

                resetUsernameError();
                resetPasswordError();
                e.preventDefault();
            } else {
                $userNameErrorMsg.insertAfter($("#host-username-label"));
            }

            //prevent default form actions
            e.preventDefault();
        });


    //----------------------------- Sign In functions ---------------------------------------//

        var currentUser ={};
        var loggedIn;

        function signMeIn(e) {

            var signInErrorMsg =  $('<span id="error-msg-sign-in"><i class="fas fa-exclamation"></i> Sorry! this username is not registered :(</span>');
            var signInPasswordErrorMsg =  $('<span id="error-msg-sign-in"><i class="fas fa-exclamation"></i> Sorry! this passwrod is incorrect :(</span>');
            
            var signInUserName = $("#signInEmail").val();
            var signInPassword = $("#password").val();

            var foundUser = $.grep(users, function(v) {
                return v.userName === signInUserName;
            });

            var foundHost = $.grep(hosts, function(v) {
                return v.userName === signInUserName;
            });

            var foundUsername;

            function returnUsername() {

                if(foundUser.length > 0) {
                    foundUsername = foundUser[0];

                } else if(foundHost.length > 0) {
                    foundUsername = foundHost[0];
                } else {
                    signInErrorMsg.insertAfter($("#username-sign-in-label"));
                }

            }

            function checkUsernamePasswordMatch () {

                var signInPassword = $("#password").val();

                console.log(signInPassword);
                console.log(foundUsername.password);
                
                if(foundUsername.password == signInPassword) {
                    signIn(); //TODO make this function
                } else {
                    signInPasswordErrorMsg.insertAfter($("#password-label"));
                }
            }


            function signIn () {

                //put username in "welcome, ..." li element
                var $userWelcomeName = $("#signInEmail").val();
                $(".nav-welcome").html("Welcome, " + $userWelcomeName);

                console.log("signed in");

                $(".signInUp").css("display", "none");
                $(".createAccount").css("display", "none");
                $(".createAccountClass").css("display", "none");
                
                $(".signIn Form, .modal").hide();

                loggedIn = true;
                isLoggedIn();
                e.preventDefault();
            }

            returnUsername();
            checkUsernamePasswordMatch();

            currentUser = foundUsername;
            signIn();

            $('#signInEmail, #password').removeAttr('required');
            $(".signInForm")[0].reset();

             //prevent default form actions
             e.preventDefault();
        }


        //signing out

        $(".sign-out").click(function(e) {

            currentUser = {};

            console.log("pressed log out");

            $(".signInUp").css("display", "block");
            $(".createAccount").css("display", "block");
            $(".loggedInWelcome").css("display", "none");
            $(".createAccountClass").css("display", "block");

            loggedIn = false;
            isLoggedIn();
        });

        //navbar display based on log in

        function isLoggedIn() {
            if(loggedIn) {
                $(".loggedInWelcome").css("display", "flex");

                //change menu based on host or user status
                if(currentUser.bookings) {
                    $(".bookings-nav, .booking-toggle").css("display", "block");
                    $(".listings-nav, .listing-toggle").css("display", "none");
                } else {
                    $(".listings-nav, .listing-toggle").css("display", "block");
                    $(".bookings-nav, .booking-toggle").css("display", "none");
                }
            } else {
                $(".loggedInWelcome").css("display", "none");
            }
        }

        $("#signBtn").click(function(e) {
            signMeIn(e);
            e.preventDefault();
        });


        //------------------------------------------ Account Management functions ------------------------------------->


        //------------------------------------------ Hotel and Booking Page functions ------------------------------------->

        //Booking Modal functions
        $(function () {
            $(".bookBtn").click(function () {
                console.log("Clicked Book for a room");
                $(".bookModal").show();
            });
        });

        //closing ALL modals on clicking the (X) buttion
        $(function () {
            $(".closeBookBtn").click(function () {
                console.log("Closed Booking Modal");
                $(".bookModal").hide();
                $(".paymentModal").hide();
                $(".receiptModal").hide();
            });
        });

        //closing the booking when somewhere outside BOOKING modal is clicked
        $(document).click(function (event) {
            if (!$(event.target).closest(".bookModal-content, .bookBtn").length) {
                $("body").find(".bookModal").hide();
            }
        });

        //Calendar booking select Modal functions
        $(function () {
            $("#calBkBtn").click(function () {

                var available = true;

                //get this button
                var thisBtn = $(this);

                //book the dates if they are available
                bookingRoom(thisBtn);
                
                //if the dates are available
                if(available === true) {

                    //continue to next window
                    console.log("selected booking date");
                    $(".bookModal").hide();
                    $(".paymentModal").show();
                } else {
                    //stay at current window and alert that dates are not available
                }
                
            });
        });

        //closing the booking when somewhere outside PAYMENT modal is clicked
        $(document).click(function (event) {
            if (!$(event.target).closest(".paymentModal-content, #calBkBtn").length) {
                $("body").find(".paymentModal").hide();
            }
        });

        //Payment select Modal functions
        $(function () {
            $("#confirmBookBtn").click(function () {
                console.log("confirmed booking payment");
                $(".paymentModal").hide();
                $(".receiptModal").show();
            });
        });

        //closing the booking when somewhere outside PAYMENT modal is clicked
        $(document).click(function (event) {
            if (!$(event.target).closest(".receiptModal-content, #confirmBookBtn").length) {
                $("body").find(".receiptModal").hide();
            }
        });

        //close receiptModal on clicking any of the two buttons
        $(function () {
            $("#contBrowse").click(function () {
                console.log("closed receipt modal");
                $(".receiptModal").hide();
            });
            $("#myAccount").click(function () {
                console.log("closed receipt modal");
                $(".receiptModal").hide();
            });
        });

       
        //Review Button function
        $(function () {
            $("#reviewBtn").click(function () {
                $(".roomGrid").toggle();
                $("#Reviews").toggle();
            });
        });


        //THIS SECTION IS FOR ROOM OBJECT AND HOTEL OBJECT CREATION

         //hotels array

         var hotels = [];
         var hotelNumber;

         //rooms array - dont need this at the moment
 
         var rooms = [];
 
         //hotel object
 
         function Hotel(name, location) {
             this.name = name;
             this.location = location;
             this.rooms = [];
             this.images = [];
             this.description = "This is a default description. Ability to change to be included later";
             this.hotelId = hotelNumber;
             hotelNumber++;
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

         var currentHotel = {};
         var currentRoom = {};

         //booking object -- these will be inserted into the currentUser object

         function Booking(room, hotel) {
            this.room = room;
            this.hotel = hotel;
            this.dates =[];
         }


         //hard coding a hotel and room for testing purposes  TODO remove after testing is finished

         var hotelTest = new Hotel("Cybernet Kissaten", "Tokyo");
         var roomTest = new Room("room ichi", "Tokyo Tavern", 10, "1000");

         hotels.push(hotelTest);
         hotels[0].rooms.push(roomTest);

         console.log(hotels);


         //find hotel object when thumbnail is clicked

         function findHotel(a) {
            
            //get name in thumbnail
            var hotel = a.find(".room-name-thumb p").html();

            console.log(hotel); // debugging

            //match thumbnail name with the hotel object that has that name
            var foundHotel = $.grep(hotels, function(v) {
                return v.name === hotel;
            });

            //set hotel as the current hotel
            currentHotel = foundHotel;

            console.log(foundHotel); //debugging

         }

         //find room in hotel object when book button clicked

         function findRoom(a) {
            var room = a.parents(".roomGrid").find(".roomName h3").html();

            console.log(currentHotel);

            var foundRoom = $.grep(currentHotel[0].rooms, function(v) {
                return v.name === room;
            });

            console.log(foundRoom);

            currentRoom = foundRoom;
         }

          // date array
          function getBookingDate(start, end) {

            var
            arr = new Array(),
            dt = new Date(start);
        
            while (dt <= end) {
            arr.push(new Date(dt));
            dt.setDate(dt.getDate() + 1);
            }
        
            return arr;
        
        }

        function bookingRoom(a) {
            var from = a.parent().find("#bookFrom").val();
            var to = a.parent().find("#bookTo").val();

            var startDate = new Date(from); //YYYY-MM-DD
            var endDate = new Date(to); //YYYY-MM-DD

            var getDateArray = getBookingDate(startDate, endDate);

            for(var i = 0; i < getDateArray.length; i++) {

                var bookYear = getDateArray[i].getFullYear();
                var bookMonth = getDateArray[i].getMonth();
                var bookDay = getDateArray[i].getDate();

                for(var j = 0; j < currentRoom[0].booked.length; j++) {

                    var year = currentRoom[0].booked[j].getFullYear();
                    var month = currentRoom[0].booked[j].getMonth();
                    var day = currentRoom[0].booked[j].getDate();

                    if(bookYear === year && bookMonth === month && bookDay === day) {
                        console.log("dates not available");
                        available = false;
                        console.log(available);
                        return false;
                    }
                }
            }

            available = true;

            console.log(available + "after loop");

            for(var k = 0; k < getDateArray.length; k++) {
                currentRoom[0].booked.push(getDateArray[k]);
            }

            console.log('current bookings are' + currentRoom[0].booked);

            console.log(from);
            console.log(to);
        }

         //dynamically setting description based on objects -- its just hard coded at the moment so will need to work on later
         $("#room1 .roomDescription p").html(hotels[0].rooms[0].description);

         //when the first book button in the room object is selected
         $(".bookBtn").click(function() {
            
            var currentBtn = $(this);
            findRoom(currentBtn);

         });

         //when modal book button is clicked
        /*$("#calBkBtn").click(function () {
            var thisBtn = $(this);
            bookingRoom(thisBtn);
            
            if(bookingRoom) {
                continue;
            } else {

            }
        });*/

         //displaying hotel page when clicking on thumbnail

         $(".hotelRoomThumbnail").click(function() {
            var currentThumb = $(this);
            findHotel(currentThumb);
            $("#search, #home, #account-management, .search, #about").hide();
            $("#hotels").show();
            $(".nav-and-search").removeClass("searchBG");
            $(".nav-and-search").removeClass("searchBG2");
         });


//});// DOM Function



//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//$$$$$$$$$$$$$$$     lightbox functions below        $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$



 /*  !!!!!!!!!! LIGHTBOX JAVASCRIPT - NOT TO BE MESSED WITH !!!!!!!!  */

        // Uses Node, AMD or browser globals to create a module.
        (function (root, factory) {
            if (typeof define === 'function' && define.amd) {
                // AMD. Register as an anonymous module.
                define(['jquery'], factory);
            } else if (typeof exports === 'object') {
                // Node. Does not work with strict CommonJS, but
                // only CommonJS-like environments that support module.exports,
                // like Node.
                module.exports = factory(require('jquery'));
            } else {
                // Browser globals (root is window)
                root.lightbox = factory(root.jQuery);
            }
        }(this, function ($) {

            function Lightbox(options) {
                this.album = [];
                this.currentImageIndex = void 0;
                this.init();

                // options
                this.options = $.extend({}, this.constructor.defaults);
                this.option(options);
            }

            // Descriptions of all options available on the demo site:
            // http://lokeshdhakar.com/projects/lightbox2/index.html#options
            Lightbox.defaults = {
                albumLabel: 'Image %1 of %2',
                alwaysShowNavOnTouchDevices: false,
                fadeDuration: 600,
                fitImagesInViewport: true,
                imageFadeDuration: 600,
                // maxWidth: 800,
                // maxHeight: 600,
                positionFromTop: 50,
                resizeDuration: 700,
                showImageNumberLabel: true,
                wrapAround: false,
                disableScrolling: false,
                /*
                Sanitize Title
                If the caption data is trusted, for example you are hardcoding it in, then leave this to false.
                This will free you to add html tags, such as links, in the caption.
            
                If the caption data is user submitted or from some other untrusted source, then set this to true
                to prevent xss and other injection attacks.
                    */
                sanitizeTitle: false
            };

            Lightbox.prototype.option = function (options) {
                $.extend(this.options, options);
            };

            Lightbox.prototype.imageCountLabel = function (currentImageNum, totalImages) {
                return this.options.albumLabel.replace(/%1/g, currentImageNum).replace(/%2/g, totalImages);
            };

            Lightbox.prototype.init = function () {
                var self = this;
                // Both enable and build methods require the body tag to be in the DOM.
                $(document).ready(function () {
                    self.enable();
                    self.build();
                });
            };

            // Loop through anchors and areamaps looking for either data-lightbox attributes or rel attributes
            // that contain 'lightbox'. When these are clicked, start lightbox.
            Lightbox.prototype.enable = function () {
                var self = this;
                $('body').on('click', 'a[rel^=lightbox], area[rel^=lightbox], a[data-lightbox], area[data-lightbox]', function (event) {
                    self.start($(event.currentTarget));
                    return false;
                });
            };

            // Build html for the lightbox and the overlay.
            // Attach event handlers to the new DOM elements. click click click
            Lightbox.prototype.build = function () {
                if ($('#lightbox').length > 0) {
                    return;
                }

                var self = this;
                $('<div id="lightboxOverlay" class="lightboxOverlay"></div><div id="lightbox" class="lightbox"><div class="lb-outerContainer"><div class="lb-container"><img class="lb-image" src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" /><div class="lb-nav"><a class="lb-prev" href="" ></a><a class="lb-next" href="" ></a></div><div class="lb-loader"><a class="lb-cancel"></a></div></div></div><div class="lb-dataContainer"><div class="lb-data"><div class="lb-details"><span class="lb-caption"></span><span class="lb-number"></span></div><div class="lb-closeContainer"><a class="lb-close"></a></div></div></div></div>').appendTo($('body'));

                // Cache jQuery objects
                this.$lightbox = $('#lightbox');
                this.$overlay = $('#lightboxOverlay');
                this.$outerContainer = this.$lightbox.find('.lb-outerContainer');
                this.$container = this.$lightbox.find('.lb-container');
                this.$image = this.$lightbox.find('.lb-image');
                this.$nav = this.$lightbox.find('.lb-nav');

                // Store css values for future lookup
                this.containerPadding = {
                    top: parseInt(this.$container.css('padding-top'), 10),
                    right: parseInt(this.$container.css('padding-right'), 10),
                    bottom: parseInt(this.$container.css('padding-bottom'), 10),
                    left: parseInt(this.$container.css('padding-left'), 10)
                };

                this.imageBorderWidth = {
                    top: parseInt(this.$image.css('border-top-width'), 10),
                    right: parseInt(this.$image.css('border-right-width'), 10),
                    bottom: parseInt(this.$image.css('border-bottom-width'), 10),
                    left: parseInt(this.$image.css('border-left-width'), 10)
                };

                // Attach event handlers to the newly minted DOM elements
                this.$overlay.hide().on('click', function () {
                    self.end();
                    return false;
                });

                this.$lightbox.hide().on('click', function (event) {
                    if ($(event.target).attr('id') === 'lightbox') {
                        self.end();
                    }
                    return false;
                });

                this.$outerContainer.on('click', function (event) {
                    if ($(event.target).attr('id') === 'lightbox') {
                        self.end();
                    }
                    return false;
                });

                this.$lightbox.find('.lb-prev').on('click', function () {
                    if (self.currentImageIndex === 0) {
                        self.changeImage(self.album.length - 1);
                    } else {
                        self.changeImage(self.currentImageIndex - 1);
                    }
                    return false;
                });

                this.$lightbox.find('.lb-next').on('click', function () {
                    if (self.currentImageIndex === self.album.length - 1) {
                        self.changeImage(0);
                    } else {
                        self.changeImage(self.currentImageIndex + 1);
                    }
                    return false;
                });

                /*
                    Show context menu for image on right-click
            
                    There is a div containing the navigation that spans the entire image and lives above of it. If
                    you right-click, you are right clicking this div and not the image. This prevents users from
                    saving the image or using other context menu actions with the image.
            
                    To fix this, when we detect the right mouse button is pressed down, but not yet clicked, we
                    set pointer-events to none on the nav div. This is so that the upcoming right-click event on
                    the next mouseup will bubble down to the image. Once the right-click/contextmenu event occurs
                    we set the pointer events back to auto for the nav div so it can capture hover and left-click
                    events as usual.
                    */
                this.$nav.on('mousedown', function (event) {
                    if (event.which === 3) {
                        self.$nav.css('pointer-events', 'none');

                        self.$lightbox.one('contextmenu', function () {
                            setTimeout(function () {
                                this.$nav.css('pointer-events', 'auto');
                            }.bind(self), 0);
                        });
                    }
                });


                this.$lightbox.find('.lb-loader, .lb-close').on('click', function () {
                    self.end();
                    return false;
                });
            };

            // Show overlay and lightbox. If the image is part of a set, add siblings to album array.
            Lightbox.prototype.start = function ($link) {
                var self = this;
                var $window = $(window);

                $window.on('resize', $.proxy(this.sizeOverlay, this));

                $('select, object, embed').css({
                    visibility: 'hidden'
                });

                this.sizeOverlay();

                this.album = [];
                var imageNumber = 0;

                function addToAlbum($link) {
                    self.album.push({
                        alt: $link.attr('data-alt'),
                        link: $link.attr('href'),
                        title: $link.attr('data-title') || $link.attr('title')
                    });
                }

                // Support both data-lightbox attribute and rel attribute implementations
                var dataLightboxValue = $link.attr('data-lightbox');
                var $links;

                if (dataLightboxValue) {
                    $links = $($link.prop('tagName') + '[data-lightbox="' + dataLightboxValue + '"]');
                    for (var i = 0; i < $links.length; i = ++i) {
                        addToAlbum($($links[i]));
                        if ($links[i] === $link[0]) {
                            imageNumber = i;
                        }
                    }
                } else {
                    if ($link.attr('rel') === 'lightbox') {
                        // If image is not part of a set
                        addToAlbum($link);
                    } else {
                        // If image is part of a set
                        $links = $($link.prop('tagName') + '[rel="' + $link.attr('rel') + '"]');
                        for (var j = 0; j < $links.length; j = ++j) {
                            addToAlbum($($links[j]));
                            if ($links[j] === $link[0]) {
                                imageNumber = j;
                            }
                        }
                    }
                }

                // Position Lightbox
                var top = $window.scrollTop() + this.options.positionFromTop;
                var left = $window.scrollLeft();
                this.$lightbox.css({
                    top: top + 'px',
                    left: left + 'px'
                }).fadeIn(this.options.fadeDuration);

                // Disable scrolling of the page while open
                if (this.options.disableScrolling) {
                    $('html').addClass('lb-disable-scrolling');
                }

                this.changeImage(imageNumber);
            };

            // Hide most UI elements in preparation for the animated resizing of the lightbox.
            Lightbox.prototype.changeImage = function (imageNumber) {
                var self = this;

                this.disableKeyboardNav();
                var $image = this.$lightbox.find('.lb-image');

                this.$overlay.fadeIn(this.options.fadeDuration);

                $('.lb-loader').fadeIn('slow');
                this.$lightbox.find('.lb-image, .lb-nav, .lb-prev, .lb-next, .lb-dataContainer, .lb-numbers, .lb-caption').hide();

                this.$outerContainer.addClass('animating');

                // When image to show is preloaded, we send the width and height to sizeContainer()
                var preloader = new Image();
                preloader.onload = function () {
                    var $preloader;
                    var imageHeight;
                    var imageWidth;
                    var maxImageHeight;
                    var maxImageWidth;
                    var windowHeight;
                    var windowWidth;

                    $image.attr({
                        'alt': self.album[imageNumber].alt,
                        'src': self.album[imageNumber].link
                    });

                    $preloader = $(preloader);

                    $image.width(preloader.width);
                    $image.height(preloader.height);

                    if (self.options.fitImagesInViewport) {
                        // Fit image inside the viewport.
                        // Take into account the border around the image and an additional 10px gutter on each side.

                        windowWidth = $(window).width();
                        windowHeight = $(window).height();
                        maxImageWidth = windowWidth - self.containerPadding.left - self.containerPadding.right - self.imageBorderWidth.left - self.imageBorderWidth.right - 20;
                        maxImageHeight = windowHeight - self.containerPadding.top - self.containerPadding.bottom - self.imageBorderWidth.top - self.imageBorderWidth.bottom - 120;

                        // Check if image size is larger then maxWidth|maxHeight in settings
                        if (self.options.maxWidth && self.options.maxWidth < maxImageWidth) {
                            maxImageWidth = self.options.maxWidth;
                        }
                        if (self.options.maxHeight && self.options.maxHeight < maxImageWidth) {
                            maxImageHeight = self.options.maxHeight;
                        }

                        // Is the current image's width or height is greater than the maxImageWidth or maxImageHeight
                        // option than we need to size down while maintaining the aspect ratio.
                        if ((preloader.width > maxImageWidth) || (preloader.height > maxImageHeight)) {
                            if ((preloader.width / maxImageWidth) > (preloader.height / maxImageHeight)) {
                                imageWidth = maxImageWidth;
                                imageHeight = parseInt(preloader.height / (preloader.width / imageWidth), 10);
                                $image.width(imageWidth);
                                $image.height(imageHeight);
                            } else {
                                imageHeight = maxImageHeight;
                                imageWidth = parseInt(preloader.width / (preloader.height / imageHeight), 10);
                                $image.width(imageWidth);
                                $image.height(imageHeight);
                            }
                        }
                    }
                    self.sizeContainer($image.width(), $image.height());
                };

                preloader.src = this.album[imageNumber].link;
                this.currentImageIndex = imageNumber;
            };

            // Stretch overlay to fit the viewport
            Lightbox.prototype.sizeOverlay = function () {
                this.$overlay
                    .width($(document).width())
                    .height($(document).height());
            };

            // Animate the size of the lightbox to fit the image we are showing
            Lightbox.prototype.sizeContainer = function (imageWidth, imageHeight) {
                var self = this;

                var oldWidth = this.$outerContainer.outerWidth();
                var oldHeight = this.$outerContainer.outerHeight();
                var newWidth = imageWidth + this.containerPadding.left + this.containerPadding.right + this.imageBorderWidth.left + this.imageBorderWidth.right;
                var newHeight = imageHeight + this.containerPadding.top + this.containerPadding.bottom + this.imageBorderWidth.top + this.imageBorderWidth.bottom;

                function postResize() {
                    self.$lightbox.find('.lb-dataContainer').width(newWidth);
                    self.$lightbox.find('.lb-prevLink').height(newHeight);
                    self.$lightbox.find('.lb-nextLink').height(newHeight);
                    self.showImage();
                }

                if (oldWidth !== newWidth || oldHeight !== newHeight) {
                    this.$outerContainer.animate({
                        width: newWidth,
                        height: newHeight
                    }, this.options.resizeDuration, 'swing', function () {
                        postResize();
                    });
                } else {
                    postResize();
                }
            };

            // Display the image and its details and begin preload neighboring images.
            Lightbox.prototype.showImage = function () {
                this.$lightbox.find('.lb-loader').stop(true).hide();
                this.$lightbox.find('.lb-image').fadeIn(this.options.imageFadeDuration);

                this.updateNav();
                this.updateDetails();
                this.preloadNeighboringImages();
                this.enableKeyboardNav();
            };

            // Display previous and next navigation if appropriate.
            Lightbox.prototype.updateNav = function () {
                // Check to see if the browser supports touch events. If so, we take the conservative approach
                // and assume that mouse hover events are not supported and always show prev/next navigation
                // arrows in image sets.
                var alwaysShowNav = false;
                try {
                    document.createEvent('TouchEvent');
                    alwaysShowNav = (this.options.alwaysShowNavOnTouchDevices) ? true : false;
                } catch (e) { }

                this.$lightbox.find('.lb-nav').show();

                if (this.album.length > 1) {
                    if (this.options.wrapAround) {
                        if (alwaysShowNav) {
                            this.$lightbox.find('.lb-prev, .lb-next').css('opacity', '1');
                        }
                        this.$lightbox.find('.lb-prev, .lb-next').show();
                    } else {
                        if (this.currentImageIndex > 0) {
                            this.$lightbox.find('.lb-prev').show();
                            if (alwaysShowNav) {
                                this.$lightbox.find('.lb-prev').css('opacity', '1');
                            }
                        }
                        if (this.currentImageIndex < this.album.length - 1) {
                            this.$lightbox.find('.lb-next').show();
                            if (alwaysShowNav) {
                                this.$lightbox.find('.lb-next').css('opacity', '1');
                            }
                        }
                    }
                }
            };

            // Display caption, image number, and closing button.
            Lightbox.prototype.updateDetails = function () {
                var self = this;

                // Enable anchor clicks in the injected caption html.
                // Thanks Nate Wright for the fix. @https://github.com/NateWr
                if (typeof this.album[this.currentImageIndex].title !== 'undefined' &&
                    this.album[this.currentImageIndex].title !== '') {
                    var $caption = this.$lightbox.find('.lb-caption');
                    if (this.options.sanitizeTitle) {
                        $caption.text(this.album[this.currentImageIndex].title);
                    } else {
                        $caption.html(this.album[this.currentImageIndex].title);
                    }
                    $caption.fadeIn('fast')
                        .find('a').on('click', function (event) {
                            if ($(this).attr('target') !== undefined) {
                                window.open($(this).attr('href'), $(this).attr('target'));
                            } else {
                                location.href = $(this).attr('href');
                            }
                        });
                }

                if (this.album.length > 1 && this.options.showImageNumberLabel) {
                    var labelText = this.imageCountLabel(this.currentImageIndex + 1, this.album.length);
                    this.$lightbox.find('.lb-number').text(labelText).fadeIn('fast');
                } else {
                    this.$lightbox.find('.lb-number').hide();
                }

                this.$outerContainer.removeClass('animating');

                this.$lightbox.find('.lb-dataContainer').fadeIn(this.options.resizeDuration, function () {
                    return self.sizeOverlay();
                });
            };

            // Preload previous and next images in set.
            Lightbox.prototype.preloadNeighboringImages = function () {
                if (this.album.length > this.currentImageIndex + 1) {
                    var preloadNext = new Image();
                    preloadNext.src = this.album[this.currentImageIndex + 1].link;
                }
                if (this.currentImageIndex > 0) {
                    var preloadPrev = new Image();
                    preloadPrev.src = this.album[this.currentImageIndex - 1].link;
                }
            };

            Lightbox.prototype.enableKeyboardNav = function () {
                $(document).on('keyup.keyboard', $.proxy(this.keyboardAction, this));
            };

            Lightbox.prototype.disableKeyboardNav = function () {
                $(document).off('.keyboard');
            };

            Lightbox.prototype.keyboardAction = function (event) {
                var KEYCODE_ESC = 27;
                var KEYCODE_LEFTARROW = 37;
                var KEYCODE_RIGHTARROW = 39;

                var keycode = event.keyCode;
                var key = String.fromCharCode(keycode).toLowerCase();
                if (keycode === KEYCODE_ESC || key.match(/x|o|c/)) {
                    this.end();
                } else if (key === 'p' || keycode === KEYCODE_LEFTARROW) {
                    if (this.currentImageIndex !== 0) {
                        this.changeImage(this.currentImageIndex - 1);
                    } else if (this.options.wrapAround && this.album.length > 1) {
                        this.changeImage(this.album.length - 1);
                    }
                } else if (key === 'n' || keycode === KEYCODE_RIGHTARROW) {
                    if (this.currentImageIndex !== this.album.length - 1) {
                        this.changeImage(this.currentImageIndex + 1);
                    } else if (this.options.wrapAround && this.album.length > 1) {
                        this.changeImage(0);
                    }
                }
            };

            // Closing time. :-(
            Lightbox.prototype.end = function () {
                this.disableKeyboardNav();
                $(window).off('resize', this.sizeOverlay);
                this.$lightbox.fadeOut(this.options.fadeDuration);
                this.$overlay.fadeOut(this.options.fadeDuration);
                $('select, object, embed').css({
                    visibility: 'visible'
                });
                if (this.options.disableScrolling) {
                    $('html').removeClass('lb-disable-scrolling');
                }
            };

            return new Lightbox();
        }));
