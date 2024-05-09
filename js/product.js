// All the code is in "strict mode", you can't have undeclared variables e.g.
"use strict";

// Calls the display_single_view_product function
display_single_view_product();

// Single view product function
function display_single_view_product() {

    // Get the single_view from the DOM by #/id
    const single_view_container = document.querySelector("#single_view");

    // Get the product clicked on from local storage
    const stored_product = localStorage.getItem("selected_product");

    // If there is a product in local storage matching the one clicked on, we want to do something
    if (stored_product) {

        // Parses the data as JSON
        const product = JSON.parse(stored_product);

        // Shows a single view product in an article HTML tag
        const single_view_product = document.createElement("article");

        // Shows the single view product in HTML
        single_view_product.innerHTML = `
            <div class="grid_col_1">
            <div class="product_bg">
            <img src="${product.image}" alt="${product.title}" />
            </div>
                <p class="product_ratings">${product.rating.rate} &#9733; Based on ${product.rating.count} reviews</p>
            </div>
            <div class="grid_col_2">
                <p class="product_category">${product.category}</p>
                <h2>${product.title}</h2>
                <p class="product_price">$${product.price}</p>
                <button class="add_to_cart" data-id="${product.id}" data-title="${product.title}" data-image="${product.image}" data-price="${product.price}" aria-label="add product to cart">ADD TO CART</button>
                <p class="product_description">${product.description}</p>
            </div>
        `;

         // Appends/adds the article as a child to single_view_container 
        single_view_container.appendChild(single_view_product);

        // Get the add_to_cart button by ./class and use the data from single_view_product
        const add_to_cart_btn = single_view_product.querySelector(".add_to_cart");

        // Adds an event listener on a click for the add to cart button, and thereafter starts the add_to_cart_handler function
        add_to_cart_btn.addEventListener("click", add_to_cart_handler);
        
        // Calls the function, so the counter gets updated
        update_cart_counter();
    }

    // Or if the product is not in local storage, we want to do something else
    else {

        // Then an error message will be logged to the console
        console.error("Selected product not found in local storage")
    }
}

// Add to cart function
function add_to_cart_handler(event) {

    // Receives the product information from the display_products() function
    const product_id = event.target.getAttribute("data-id");
    const product_title = event.target.getAttribute("data-title");
    const product_image = event.target.getAttribute("data-image");
    const product_price = event.target.getAttribute("data-price");

    // How many products we want to add to the cart by one click (one click = one product added to the cart)
    const product_quantity = 1;

    // Retrieve existing cart data from local storage. If there is nothing in localStorage then it's just an empty array []
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

        // If the product is not in the cart (equal to -1), then it adds the product_id and so on
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