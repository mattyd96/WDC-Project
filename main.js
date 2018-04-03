  //#################################################
    //for simulation of a loggd in user with menu styles

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

    /*Toggle Hamburger Menu style when clicked*/
    function createHamburger(x) {
        x.classList.toggle("change");
    }

    //toggle Hamburger Menu
    var visible = false; //Is the menu currently visible?
    function menuChange() {
        if (visible) {
            $("#hamburgerMenu").css("display", "none");
            visible = false;
        } else {
            $("#hamburgerMenu").css("display", "flex");
            visible = true;
        }
    }


    //display sign in form on click and hide others
    $(".signInUp").click(function () {
        $(".modal").show();
        $("#signInForm").show();
        $("#becomeHost").hide();
        $("#createAccount").hide();
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
        $("#signInForm").hide();
        $("#createOrBecomeHost").css("display", "flex");
    });

    // display user sign in if they click on create account button
    $("#createBtn").click(function () {
        $("#createOrBecomeHost").hide();
        $("#becomeHost").hide();
        $("#createAccount").show();
    });

    //display host sign in if they click on "become a host!"
    $("#hostBtn").click(function () {
        $("#createOrBecomeHost").hide();
        $("#createAccount").hide();
        $("#becomeHost").show();
    });


});// DOM Function





