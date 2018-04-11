$(document).ready(function () {

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

    $("#search-nav").click(function (){
        $(".nav-and-search").addClass("searchBG2");
        $(".nav-and-search").removeClass("searchBG");
        $("#home, #about").hide();
        $("#search, .search").show();
    });

    $("#home-nav").click(function (){
        $(".nav-and-search").addClass("searchBG");
        $(".nav-and-search").removeClass("searchBG2");
        $("#home, .search").show();
        $("#search, #about").hide();
    });

    $("#about-nav").click(function() {
        $("#search, #home, .search").hide();
        $("#about").show();
        $(".nav-and-search").removeClass("searchBG");
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

        $("#signBtn").click(function(e) {

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

                if(foundUser) {
                    foundUsername = foundUser[0];
                } else if(foundHost) {
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

             //prevent default form actions
             e.preventDefault();
        });


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
            } else {
                $(".loggedInWelcome").css("display", "none");
            }
        }

       


});// DOM Function