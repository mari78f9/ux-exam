// All the code is in "strict mode", you can't have undeclared variables e.g.
"use strict";

// Calls the check_login function
check_login();

// Check login function
function check_login() {

    // Get the email from sessionStorage
    const user_email = sessionStorage.getItem("user_email");

    // If the email is not in sessionStorage -
    if (!user_email) {
        
        // - the user gets redirected to the login page
        window.location.href = "index.html";
    }
}