// Toggle navigation for hamburger menu
const hamburgerIcon = document.getElementById('hamburger-icon');
const navLinks = document.getElementById('nav-links');
hamburgerIcon.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Update the cart count in the header
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = cart.length;
    document.getElementById('cart-count').textContent = cartCount;
}

// Add items to the cart
const addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const productId = button.getAttribute('data-id');
        const productName = button.getAttribute('data-name');
        const productPrice = button.getAttribute('data-price');
        
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        // Check if the item is already in the cart
        const itemIndex = cart.findIndex(item => item.id === productId);
        
        if (itemIndex === -1) {
            // Add new item to the cart if not already present
            cart.push({ id: productId, name: productName, price: productPrice });
        }
        
        // Save the updated cart to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        
        updateCartCount(); // Update the cart count in the header
    });
});

// Populate cart page with items
function populateCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.querySelector('.cart-items');
    let total = 0;
    
    cartItemsContainer.innerHTML = ''; // Clear previous cart items

    cart.forEach(item => {
        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('cart-item');
        cartItemElement.innerHTML = `
            <p>${item.name}</p>
            <p>KSh ${item.price}</p>
            <button class="remove-item" data-id="${item.id}">Remove</button>
        `;
        cartItemsContainer.appendChild(cartItemElement);
        total += parseInt(item.price); // Sum up the total price
    });
    
    document.getElementById('cart-total').textContent = total; // Display total price
}

// Remove items from cart
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-item')) {
        const productId = e.target.getAttribute('data-id');
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        // Filter out the item with the specific ID
        const updatedCart = cart.filter(item => item.id !== productId);
        
        // Save the updated cart back to localStorage
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        
        populateCart(); // Re-populate the cart UI
        updateCartCount(); // Update the cart count in the header
    }
});

// Initial page setup
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount(); // Update cart count in header on page load
    if (document.querySelector('.cart-items')) {
        populateCart(); // Populate the cart on the cart page
    }
});
// Function to handle the "Proceed to Checkout" functionality
document.getElementById('checkout-btn')?.addEventListener('click', () => {
    // Retrieve cart from localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if the cart is empty
    if (cart.length === 0) {
        alert('Your cart is empty. Please add items before proceeding to checkout.');
    } else {
        // Prepare the order summary
        let orderDetails = 'Your Order Summary:\n\n';
        let totalAmount = 0;

        // Loop through cart items to display the order details
        cart.forEach(item => {
            orderDetails += `${item.name} - KSh ${item.price}\n`;
            totalAmount += parseInt(item.price); // Add price to total amount
        });

        // Add total amount to the summary
        orderDetails += `\nTotal Amount: KSh ${totalAmount}\n`;

        // Display a confirmation prompt with the order summary
        if (confirm(orderDetails + "\nProceed with Payment?")) {
            // Simulate clearing the cart after checkout
            localStorage.removeItem('cart'); // Remove cart from localStorage

            // Show a thank you message and redirect
            alert('Thank you for your purchase! Your order has been placed.');
            window.location.href = 'index.html'; // Redirect to home page or a "Thank You" page
        } else {
            // If the user cancels, do nothing
            alert('Your order has not been processed.');
        }
    }
});
// Function to update the cart total
function updateCartTotal() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalAmount = 0;

    // Loop through the cart items and calculate the total
    cart.forEach(item => {
        totalAmount += parseInt(item.price); // Add price to the total
    });

    // Update the total price on the page
    document.getElementById('cart-total').textContent = totalAmount;
}

// Function to populate cart items in the cart page
function populateCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.querySelector('.cart-items');
    cartItemsContainer.innerHTML = ''; // Clear previous cart items

    // Loop through the cart items and display each item
    cart.forEach(item => {
        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('cart-item');
        cartItemElement.innerHTML = `
            <p>${item.name}</p>
            <p>KSh ${item.price}</p>
            <button class="remove-item" data-id="${item.id}">Remove</button>
        `;
        cartItemsContainer.appendChild(cartItemElement);
    });

    // Update the total price on the page
    updateCartTotal();
}

// Function to remove an item from the cart
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-item')) {
        const productId = e.target.getAttribute('data-id');
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Remove the item from the cart
        cart = cart.filter(item => item.id !== productId);

        // Save the updated cart to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Re-populate the cart items and update the total
        populateCart();
        updateCartCount();
    }
});

// Function to update the cart count in the header
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = cart.length;
    document.getElementById('cart-count').textContent = cartCount;
}

// Checkout button functionality
document.getElementById('checkout-btn')?.addEventListener('click', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        alert('Your cart is empty. Please add items before proceeding to checkout.');
    } else {
        // Prepare the order summary
        let orderDetails = 'Your Order Summary:\n\n';
        let totalAmount = 0;

        // Loop through cart items to display the order details
        cart.forEach(item => {
            orderDetails += `${item.name} - KSh ${item.price}\n`;
            totalAmount += parseInt(item.price); // Add price to total amount
        });

        // Add total amount to the summary
        orderDetails += `\nTotal Amount: KSh ${totalAmount}\n`;

        // Display a confirmation prompt with the order summary
        if (confirm(orderDetails + "\nProceed with Payment?")) {
            // Simulate clearing the cart after checkout
            localStorage.removeItem('cart'); // Remove cart from localStorage

            // Show a thank you message and redirect
            alert('Thank you for your purchase! Your order has been placed.');
            window.location.href = 'index.html'; // Redirect to home page or a "Thank You" page
        } else {
            // If the user cancels, do nothing
            alert('Your order has not been processed.');
        }
    }
});

// Initialize cart when the page loads
document.addEventListener('DOMContentLoaded', () => {
    populateCart(); // Display cart items when the page loads
    updateCartCount(); // Update cart count in the header
});

// Handle the registration form
document.getElementById("register-form")?.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Store the user data (you can replace this with an API call to save the data on the server)
    localStorage.setItem("user", JSON.stringify({ name, email, password }));

    // Redirect to the login page after successful registration
    alert("Registration Successful! Please log in.");
    window.location.href = "login.html";
});

// Handle the login form
document.getElementById("login-form")?.addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Get user data from localStorage
    const user = JSON.parse(localStorage.getItem("user"));

    // Check if the credentials match
    if (user && user.email === email && user.password === password) {
        alert("Login Successful!");
        window.location.href = "cart.html";  // Redirect to the cart page after login
    } else {
        alert("Invalid credentials, please try again.");
    }
});

// Cart checkout button logic
document.getElementById("checkout-btn")?.addEventListener("click", function() {
    const user = localStorage.getItem("user");
    if (!user) {
        window.location.href = "register.html";  // Redirect to register if not logged in
    } else {
        window.location.href = "checkout.html"; // Proceed to checkout if logged in
    }
});

// Select the hamburger menu and off-screen menu
const hamMenu = document.querySelector('.ham-menu');
const offScreenMenu = document.querySelector('.off-screen-menu');

// Toggle the menu when clicking on the hamburger menu
hamMenu.addEventListener('click', (event) => {
    event.stopPropagation(); // Prevent the event from bubbling up
    hamMenu.classList.toggle('active');
    offScreenMenu.classList.toggle('active');
});

// Close the menu if you click outside the menu
document.addEventListener('click', (event) => {
    if (!hamMenu.contains(event.target) && !offScreenMenu.contains(event.target)) {
        hamMenu.classList.remove('active');
        offScreenMenu.classList.remove('active');
    }
});

document.getElementById("search-bar").addEventListener("input", function() {
    const searchTerm = this.value.toLowerCase();
    const products = document.querySelectorAll(".product");
    const suggestionsContainer = document.getElementById("suggestions");
    
    // If there's no search term, hide the suggestions
    if (searchTerm === "") {
        suggestionsContainer.style.display = "none";
        return;
    }

    const matchingProducts = [];

    // Loop through products and collect the ones that match
    products.forEach(product => {
        const productName = product.querySelector("h3").textContent.toLowerCase();
        if (productName.includes(searchTerm)) {
            matchingProducts.push(productName);
        }
    });

    // If no matching products, hide the suggestions
    if (matchingProducts.length === 0) {
        suggestionsContainer.style.display = "none";
        return;
    }

    // Clear previous suggestions
    suggestionsContainer.innerHTML = "";

    // Display matching product names as suggestions
    matchingProducts.forEach(name => {
        const suggestionDiv = document.createElement("div");
        suggestionDiv.textContent = name;
        suggestionDiv.addEventListener("click", function() {
            document.getElementById("search-bar").value = name; // Set the value to the clicked suggestion
            suggestionsContainer.style.display = "none"; // Hide suggestions
            filterProducts(name); // Filter products based on the suggestion
        });
        suggestionsContainer.appendChild(suggestionDiv);
    });

    // Show the suggestions container
    suggestionsContainer.style.display = "block";
});

// Filter products based on the search input
function filterProducts(searchTerm) {
    const products = document.querySelectorAll(".product");
    
    products.forEach(product => {
        const productName = product.querySelector("h3").textContent.toLowerCase();
        if (productName.includes(searchTerm.toLowerCase())) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }
    });
}

// Hide suggestions when clicking outside
document.addEventListener("click", function(event) {
    if (!event.target.closest(".search-container")) {
        document.getElementById("suggestions").style.display = "none";
    }
});
