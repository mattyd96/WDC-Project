  //#################################################
    //for simulation of a logged in user with menu styles

    function logOut() {
        console.log("pressed log out");

        $(".signInUp").css("display", "block");
        $(".createAccount").css("display", "block");
        $(".loggedInWelcome").css("display", "none")

    }

    function logIn() {
        console.log("pressed log in");

        $(".signInUp").css("display", "none");
        $(".createAccount").css("display", "none");
        $(".loggedInWelcome").css("display", "flex")
    }

    //#####################################################


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
        $(".createOrBecomeHost").css("display", "flex");
        hostIsVisible = false;
    });

    // display user sign in if they click on create account button
    $(".createBtn").click(function () {
        $(".createOrBecomeHost").hide();
        $(".becomeHost").hide();
        $(".createAccount").show();
        hostIsVisible = false;
    });

    //display host sign in if they click on "become a host!"
    $(".hostBtn").click(function () {
        $(".createOrBecomeHost").hide();
        $(".createAccount").hide();
        $(".becomeHost").show();
        hostIsVisible = true;
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

        //user object

        function user(firstName, lastName, userName, password, email) {
            this.firstName = firstName;
            this.lastName = lastName;
            this.userName = userName;
            this.password = password;
            this.email = email;
            this.favorites = [];
            this.wishlist = [];
            this.recentlyVisited = [];
            this.bookings = [];
            this.canEdit = false;
        }

        function host(name, userName, password, email) {
            this.name = name;
            this.userName = userName;
            this.password = password;
            this.email = email;
            this.favorites = [];
            this.listings = [];
            this.canEdit = true;
        }

        $("#create-user-submit").click(function () {
            console.log("creating");
            var $firstName = $("#firstName");
            var $lastName = $("#lastName");
            var $userName = $("#username");
            var $password = $("#create-password");
            var $email = $("#create-account-form input[type='email']");

            var user = new user($firstName, $lastName, $userName, $password, $email);
            console.log(user.firstName);
            console.log(user.userName);

        });


});// DOM Function





