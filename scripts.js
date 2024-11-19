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
