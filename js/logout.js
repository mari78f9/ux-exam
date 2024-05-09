// All the code is in "strict mode", you can't have undeclared variables e.g.
"use strict";

// Calls the start function
start();

// Start function - initializes the log out button for the menu
function start() {

    // Gets the button from the DOM by the ./class
    const logout_btn_desk = document.querySelector(".logout_btn_desk");
    const logout_btn_mobile = document.querySelector(".logout_btn_mobile");

    // Adds an event listener on a click for the log out button, and thereafter starts the logout function
    logout_btn_desk.addEventListener("click", logout);
    logout_btn_mobile.addEventListener("click", logout);

}

// Log out function
function logout(){

    // Removes the users email from the sessionStorage
    sessionStorage.removeItem("user_email");

    // Redirects the user to the login page
    window.location.href = "index.html";

    // Removes all products/data in the local storage, when you log out
    localStorage.clear();
}