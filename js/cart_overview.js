// All the code is in "strict mode", you can't have undeclared variables e.g.
"use strict";

// Calls the display_cart function
display_cart();

function display_cart() {
  // Retrieve cart data from local storage or an empty array
  const cart_data = JSON.parse(localStorage.getItem("cart")) || [];

  // Get the element where you want to display the cart overview
  const cart_overview = document.querySelector("#cart_overview");

  // "Reset" specific information in the cart when there is no products
  if (cart_data.length === 0) {
    // Display a message if the cart is empty
    cart_overview.innerHTML = "<p>Your cart is empty.</p>";

    // Set the total products to 0 when the cart is empty
    const total_products_element = document.querySelector("#total_products");
    total_products_element.textContent = "0";

    // Set the total price to be $0.0 when the cart is empty
    const total_price_element = document.querySelector("#total_price");
    total_price_element.textContent = "$0.0";
  } else {
    // Clear the existing content and replace it with new calculations
    cart_overview.innerHTML = "";

    // Initialize the total price variable
    let totalPrice = 0;
    let totalProducts = 0;

    // Iterate through the cart data and create HTML elements for the products in there
    // index represents the products placement in the array as it's used for the delete button, to delete it from localStorage
    cart_data.forEach((product, index) => {
      const productElement = document.createElement("article");
      productElement.innerHTML = `
            <div class="product_bg">
              <img src="${product.image}" alt="Product Image" />
            </div>
            <p class="product_id">${product.id}</p>
            <p class="product_title">${product.title}</p>
            <div class="product_buy">
              <p>Price:<b>  $${product.price} </b></p>
              <p>Quantity: <b> ${product.quantity} </b></p>
            </div>
              <button class="delete_button" data-index="${index}">&times;</button>
          `;
      cart_overview.appendChild(productElement);

      // Update the total price and product quantity
      totalPrice += product.price * product.quantity;
      totalProducts += product.quantity;
    });

    // Display the total price
    const total_price_element = document.querySelector("#total_price");
    total_price_element.textContent = `$${totalPrice.toFixed(2)}`; 
    // toFixed make sure that there is no more than two digits after the decimal

    // Display the total products count
    const total_products_element = document.querySelector("#total_products");
    total_products_element.textContent = `${totalProducts}`;

    // Add event listeners to the delete buttons
    const deleteButtons = document.querySelectorAll(".delete_button");
    deleteButtons.forEach((button) => {
      button.addEventListener("click", deleteProduct);
      updateCartCounter(); // Make sure to update the cart counter when a product is deleted
    });
  }

  document.querySelector("#payment-page").addEventListener("click", function() {
    window.location.href = "payment-page.html";
  });

  // Link button to payment-page
  // document.querySelector("#payment-page").addEventListener("click", function () {
  //   window.location.href = "payment-page.html";
  // });

  updateCartCounter(); // update the cart counter
}

/* ########## DELETE PRODUCTS FROM YOUR CART ########## */
function deleteProduct(event) {
  // Get the index of the product you want to delete from the button's data attribute
  const indexToDelete = event.target.getAttribute("data-index");

  // Retrieve cart data from local storage
  const cart_data = JSON.parse(localStorage.getItem("cart")) || [];

  // Remove the product at the specified index
  // splice changes the content of the array by removing or replacing existing elements. In this instant removing it
  cart_data.splice(indexToDelete, 1); // The number 1 indicates that there should only be removed 1 element from the array

  // Save the updated cart data after deleting a product to local storage
  localStorage.setItem("cart", JSON.stringify(cart_data));

  // Reload the cart view to reflect the changes
  display_cart();
}

// ############### THE LITTLE COUNTER BY THE CART ICON ###############
function updateCartCounter() {
  // Retrieve cart data from local storage
  const cart_data = JSON.parse(localStorage.getItem("cart")) || [];

  // Get the cart counter element
  const cartCounter = document.querySelector(".cart_counter");
  const cartCounterMobile = document.querySelector(".mobile_cart_counter");

  // Conditionally update the cart counter
  if (cart_data.length > 0) {
    cartCounter.textContent = cart_data.reduce((total, product) => total + product.quantity, 0);
    cartCounterMobile.textContent = cart_data.reduce((total, product) => total + product.quantity, 0);
  } else {
    // If there are no products, hide the cart counter
    cartCounter.textContent = "";
    cartCounterMobile.textContent = "";
  }
}
