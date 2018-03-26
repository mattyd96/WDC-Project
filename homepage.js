/*Toggle Hamburger Menu style when clicked*/
function createHamburger(x) {
    x.classList.toggle("change");
}

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
    

