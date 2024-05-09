// All the code is in "strict mode", you can't have undeclared variables e.g.
"use strict";

// Calls the start function
start();

// Start function - initializes the app
function start() {

    // Calls the functions we want to use
    fetch_products();
    update_cart_counter();

    // Get the filter and show all buttons from the DOM by ./class
    const filter_buttons = document.querySelectorAll(".filter-button");
    const show_all_buttons = document.querySelector(".show-all-button");

    // Makes a for each loop on buttons
    filter_buttons.forEach((button) => {

        // Adds an event listener on a click for the filter buttons
        button.addEventListener("click", () => {

            // Shows the category that matches with the data-category button
            const category = button.getAttribute("data-category");

            // Calls the fetch_products function and shows the category value
            fetch_products(category);
        });
    });

    // Adds an event listener on a click for the show all button
    show_all_buttons.addEventListener("click", () => {

        // Calls the fetch_products function and shows all products
        fetch_products();
    });
}

// Fetch products function
async function fetch_products(category) {

    // Make the API/url to a variable
    const url = "https://fakestoreapi.com/products";

    // Fetch the data/products from the API
    await fetch(url)

    // Then reads the JSON data
    .then((response) => response.json())

    // Then sends the JSON data 
    .then((data) => {

        // If the category parameter is not empty, null or undefined
        if (category != "" && category != null && category != undefined) {

            // Goes through the data array, to find the products that matches with the category clicked on
            data = data.filter((product) => product.category.toLowerCase() === category.toLowerCase());
        }

        // Sends starts the display_products(data) function
        display_products(data);
    })
}

// Display products function
function display_products(products) {

    // Where we want to show the products by the #/id
    const product_data = document.querySelector("#product_data");

    // Clears the existing data
    product_data.innerHTML = "";

    // Makes a loop for each product 
    products.forEach((product) => {
        
        // Shows a single product in an article HTML tag
        const single_product = document.createElement("article");

        // Shows the single product in HTML
        // The data-original-price is used to we can use the price for a total sum e.g.
        single_product.innerHTML = `
            <a href="product.html" class="product_link"  aria-label="open single view of product">
                <div class="product_bg">
                    <img 
                        src="${product.image}" 
                        alt="${product.title}"
                    />
                </div>
                <p class="product_title">
                    ${product.title}
                </p>
            </a>
            <div class="product_buy">
                <p class="product_price" 
                    data-original-price="${product.price}">
                    $${product.price}
                </p>
                <button class="add_to_cart" 
                    data-id="${product.id}" 
                    data-title="${product.title}" 
                    data-image="${product.image}" 
                    data-price="${product.price}" 
                    aria-label="add product to cart">
                </button>
            </div>
        `;

        // Appends/adds the single_product as a child to product_data 
        // adds the element to the DOM/HTML document.
        product_data.appendChild(single_product);

        // Get the add to cart button by ./class and use the data from single_product
        const add_to_cart_btn = single_product.querySelector(".add_to_cart");

        // Adds an event listener on a click for the add to cart button, and thereafter starts the add_to_cart_handler function
        add_to_cart_btn.addEventListener("click", add_to_cart_handler);

        // Gets the product_link button in the article/single_product
        const product_link = single_product.querySelector(".product_link");

        // Adds an event listener on a click
        product_link.addEventListener("click", () => {

            // Starts the product_single_view(product) function
            product_single_view(product);
        });
    });
}

// Show single product function
function product_single_view(product) {

    // Saves the clicked product to localStorage, so we can open it up in a single view
    localStorage.setItem("selected_product", JSON.stringify(product));
}

// Add to cart function
function add_to_cart_handler(event) {

    // Receives the product information from the display_products() function
    // event = event being handled
    // target = property of event object, refers to the HTML element on
    // which the event was triggered
    // getAttribute = retrieve the value of a specified attribute on the selected element
    const product_id = event.target.getAttribute("data-id");
    const product_title = event.target.getAttribute("data-title");
    const product_image = event.target.getAttribute("data-image");
    const product_price = event.target.getAttribute("data-price");

    // How many products we want to add to the cart by one click (one click = one product added to the cart)
    const product_quantity = 1;

    // Retrieve existing cart data from local storage. If there is nothing in local storage then it's just an empty array []
    const existing_cart_data = JSON.parse(localStorage.getItem("cart")) || [];

    // Checks if the product is already in the cart/localStorage by the product id
    // findIndex - returns the first matching value to what you are looking for
    const existing_product_index = existing_cart_data.findIndex((item) => item.id === product_id);

    // If the product (product_id) is not equal to -1, it is in the cart
    // If the product (product_id) is equal to -1, it is not in the cart
    if (existing_product_index !== -1) {

        // If the product is in the cart (not equal to -1), then it adds/updates the quantity of the product by +/adding 1
        existing_cart_data[existing_product_index].quantity += product_quantity;
    }

    // Or we want to do something else
    else {

        // If the product is not in the cart (equal to -1), then it adds the product_id as so on
        // parseFloat - floating-point number, for numeric values
        existing_cart_data.push({
            id: product_id,
            title: product_title,
            image: product_image,
            price: parseFloat(product_price),
            quantity: product_quantity
        });
    }

    // Save the updated cart data in the local storage (on the machine/computer)
    // JSON.stringify() - converts a JSON object into a JavaScript string
    localStorage.setItem("cart", JSON.stringify(existing_cart_data));

    // Calls the function, so the counter gets updated
    update_cart_counter();
}

// Cart counter function
function update_cart_counter() {

    // Gets the cart data from local storage
    const cart_data = JSON.parse(localStorage.getItem("cart")) || [];

    // Get the cart counter from the DOM by ./class from web and mobile version
    const cart_counter = document.querySelector(".cart_counter");
    const cart_counter_mobile = document.querySelector(".mobile_cart_counter");

    // If the cart data is more than 0, we want to do something
    if (cart_data.length > 0) {

        // Updates the cart_counter with text, by calculating the total quantity of products in the cart_data
        cart_counter.textContent = cart_data.reduce((total, product) => total + product.quantity, 0);
        cart_counter_mobile.textContent = cart_data.reduce((total, product) => total + product.quantity, 0);
    }

    // Or we want to do something else, if the cart_data is 0
    else {

        // If there is 0 data (no products in the cart), the counter is empty/hidden
        cart_counter.textContent = "";
        cart_counter_mobile.textContent = "";
    }
}