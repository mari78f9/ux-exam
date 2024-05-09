// All the code is in "strict mode", you can't have undeclared variables e.g.
"use strict";

// Calls the signup function
signup();

// Sign up function
async function signup() {

    // Get the signup form element from the DOM by #/id
    const signup_form = document.querySelector("#signup_form");

    // Focuses on the input field with the selected #/id
    document.querySelector("#email_signup").focus();

    // Adds a submit event listener to the signup form
    signup_form.addEventListener("submit", async (e) => {

        // Prevents the default form submission behaviour
        e.preventDefault();

        // Gets the user input values from the signup form
        const email = document.querySelector("#email_signup").value;
        const password = document.querySelector("#password_signup").value;
        const confirm_password = document.querySelector("#confirm_password_signup").value;

        // Regular expressions (Regex) for password validation
        // /^...$/ - /^ start of regex and $/ end of regex
        // (?=.*[a-z]) - the password can and must contain any lowercase letters
        // (?=.*[A-Z]) - the password can and must contain any uppercase letters
        // (?=.*\d) - the password can and must contain any digits
        // (?=.*[\W_]) - the password can and must contain any special characters (non-word character)
        // [A-Za-z\d\W_] - the password can and must match any combination of letters, digits and non-word characters
        // {8,20} - the password must be between 8 and 20 characters
        const password_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,20}$/;

        // Regular expressions (Regex) for email validation
        // /^...$/ - /^ start of regex and $/ end of regex
        // [a-zA-Z0-9._%+-] - the email can and must contain any lowercase letter, uppercase letter, digit, period, 
        // underscore, percent sign, plus sign and minus/hyphen sign
        // +@ - plus the email must contain a commercial at sign (snabel a)
        // [a-zA-Z0-9.-] - the email can and must contain any lowercase letter, uppercase letter, digit, period, 
        // and minus/hyphen sign
        // +\. - plus the email must contain a full stop
        // [a-zA-Z] - the email can and must contain any lowercase -or uppercase letter
        // {2,} - the email must be atleast 2 characters
        const email_regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        // Show error messages if the email, password or confirm password isn't approved
        const password_error = document.querySelector("#password_error");
        const confirm_password_error = document.querySelector("#confirm_password_error");
        const email_error = document.querySelector("#email_error");

        // If the validation/regex is not followed, we want to show or hide the error messages
        // test - method to determine whether the given string matches the regex
        if (!email_regex.test(email)) {

            // Removes the display: hidden and adds display: block
            email_error.classList.remove("hidden");
            email_error.classList.add("block");
            return;
        }

        // Or it will do something else 
        else {

            // Removes the display: block and adds the display: hidden
            email_error.classList.add("block");
            email_error.classList.remove("hidden");
        }

        
        // If the validation/regex is not followed, we want to show or hide the error messages
        // test - method to determine whether the given string matches the regex
        if (!password_regex.test(password)) {

            // Removes the display: hidden and adds display: block
            password_error.classList.remove("hidden");
            password_error.classList.add("block");
            return;
        }

        // Or it will do something else 
        else {

            // Removes the display: block and adds the display: hidden
            password_error.classList.add("block");
            password_error.classList.remove("hidden");
        }

        // If the password is not equal to confirm_password, we want to show or hide the error messages
        if (password !== confirm_password) {

            // Removes the display: hidden and adds display: block
            confirm_password_error.classList.remove("hidden");
            confirm_password_error.classList.add("block");
            return;
        }

        // Or it will do something else 
        else {

            // Removes the display: block and adds the display: hidden
            confirm_password_error.classList.add("block");
            confirm_password_error.classList.remove("hidden");
        }

        // Make the url to a variable
        const url = "http://localhost:3000/users";

        // Fetch the users from the json server
        // POST request (Create) to the server, to sign up a user
        await fetch(url, {

            // To use the POST method for creating a new user (by default it's a GET)
            method: "POST",

            // To specify that the data is in JSON format
            headers: {
                "Content-Type": "application/json"
            },

            // To convert the user data to JSON and include it in the request body
            body: JSON.stringify({
                email, password
            })
        })

        // Then we want to do something with the response
        .then((response) => {

            // Logs the response to the console
            console.log(response);

            // If the response is not OK, we want to do something
            if(!response.ok){

                // If the response wasn't OK, it will show an HTTP error 
                throw new Error (`HTTP error! Status: ${response.status}`);
            }

            // Returns the JSON data from the response
            return response.json();
        })

        // Then we want to do something with the data
        .then((data) => {

            // Logs the data to the console
            console.log(data);

            // Redirects the user to the login page, after succesful sign up
            window.location.href = "index.html";
        })

        // Catches any errors that occurred during the fetch request
        .catch((error) => {

            // Logs the error to the console
            console.log(error);
        });
    });
}