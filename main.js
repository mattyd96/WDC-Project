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

    //display sign in form on click and hide others
    $(".signInUp").click(function () {
        $(".modal").show();
        $(".signInForm").show();
        $(".becomeHost").hide();
        $(".createAccount").hide();
        $(".createOrBecomeHost").hide();
    });

    //hide each form on click
    $(".closeBtn").click(function () {
        $(".modal").hide();
    });

    //hide modals on any click outside of modal
    $(document).click(function (event) {
        //if you click on anything except the modal itself or the "open modal" link, close the modal
        if (!$(event.target).closest(".modal-content, .signInUp, .createAccountClass").length) {
            $("body").find(".modal").hide();
        }
    });

    // on create Account click show create account opening modal and hide others
    $(".createAccountClass").click(function () {
        console.log("create button clicked");
        $(".modal").show();
        $(".signInForm").hide();
        $(".createOrBecomeHost").css("display", "flex");
    });

    // display user sign in if they click on create account button
    $(".createBtn").click(function () {
        $(".createOrBecomeHost").hide();
        $(".becomeHost").hide();
        $(".createAccount").show();
    });

    //display host sign in if they click on "become a host!"
    $(".hostBtn").click(function () {
        $(".createOrBecomeHost").hide();
        $(".createAccount").hide();
        $(".becomeHost").show();
    });

    //----------------------------- favorite functions ---------------------------------------//

    
    var isButtonRed = false; //boolean for favorite button color
    $(".favThis").click(function() {

        //change favorite button color
        $(this).children(".fa-heart").css('color', isButtonRed ? 'grey' : 'tomato');
        isButtonRed = !isButtonRed;
    });


});// DOM Function





