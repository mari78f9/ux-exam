// All the code is in "strict mode", you can't have undeclared variables e.g.
"use strict";

// Calls the login function
login();

// Login function
async function login() {

    // Get the login form element from the DOM by #/id
    const login_form = document.querySelector("#login_form");

    // Adds a submit event listener to the login form
    login_form.addEventListener("submit", async (e) => {

        // Prevents the default form submission behaviour
        e.preventDefault();

        // Gets the user input values from the login form
        const email = document.querySelector("#email_login").value;
        const password = document.querySelector("#password_login").value;

        // Checks for valid login values in the db.json file
        const invalid_login = document.querySelector("#invalid_login");
        
        // Make the url to a variable
        const url = `http://localhost:3000/users?email=${email}&password=${password}`;

        // GET request (Read) to the server, checks the user credentials
        const response = await fetch(url);

        // If the response is OK, we want to do something 
        if (response.ok) {

            // Reads the JSON data
            const users = await response.json();

            // Checks if the users length is more than 0
            if (users.length > 0) {

                // Saves the users email in sessionStorage
                sessionStorage.setItem("user_email", email);

                // Redirects the user to the products page after succesful login
                window.location.href = "products.html";
            } 

            // If the response is not OK, then we want to do something else
            else {

                // Displays alerts for invalid email or password
                invalid_login.classList.add("block");
                invalid_login.classList.remove("hidden");
            }
        } 

         // If the response is not OK, then we want to do something else
        else {

            // If the connection and HTTP response status is not OK (not 200), an error message will be logged to the console
            console.error("Error logging in:", response.statusText);
        }
    });
}