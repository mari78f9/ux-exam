// All the code is in "strict mode", you can't have undeclared variables e.g.
"use strict";

//Calls the start function
start();

// Start function - initializes the log out button for the menu
function start(){

    // By default we hide the burger menu/mobile menu
    document.querySelector("#mobile_menu_links").classList.add("hide");

    // When the #burger_icon is clicked, then we start the toggle_burger_menu function
    document.querySelector("#burger_icon").addEventListener("click", toggle_burger_menu);
    
}

// Toggle (open/close) burger menu function
function toggle_burger_menu() {

    // Get the mobile menu from the DOM by #/id from the DOM
    const burger_menu_btn = document.querySelector("#mobile_menu_links");

    // Toggle between adding and removing the class hide, to show and hide the menu links in mobile version
    burger_menu_btn.classList.toggle("hide");
}
