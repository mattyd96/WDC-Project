/*Toggle Hamburger Menu style when clicked*/
function createHamburger(x) {
    x.classList.toggle("change");
}

//#################################################
//for simulation of a loggd in user with menu styles

function logOut() {
    console.log("pressed log out");

    $(".signInUp").css("display", "block");
    $(".loggedInWelcome").css("display", "none")

}

function logIn() {
    console.log("pressed log in");

    $(".signInUp").css("display", "none");
    $(".loggedInWelcome").css("display", "block")
}

//#####################################################

var visible = false; //Is the menu currently visible?
function menuChange() {
    if(visible) {
        $("#hamburgerMenu").css("display", "none");
        visible = false;
    } else {
        $("#hamburgerMenu").css("display", "flex");
        visible = true;
    }
}


//display sign in form on click
$( ".signInUp" ).click(function() {
    $(".modal").show();
  });

//hide sign in form on click
$( ".closeBtn" ).click(function() {
    $(".modal").hide();
  });

//hide on any click outside of modal
$(document).click(function(event) {
//if you click on anything except the modal itself or the "open modal" link, close the modal
if (!$(event.target).closest(".modal-content, .signInUp").length) {
    $("body").find(".modal").hide();
}
});
  


