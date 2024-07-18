document.addEventListener('DOMContentLoaded', renderCart);

function renderCart() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    let totalPrice = 0;
    let totalProducts = 0;

    // Clear previous cart items
    cartItemsContainer.innerHTML = '';

    cartItems.forEach((item, index) => {
        const totalItemPrice = item.price * item.qty;
        totalPrice += totalItemPrice;
        totalProducts += item.qty;

        const cartRow = document.createElement('tr');
        cartRow.innerHTML = `
            <td><img src="${item.image}" alt="${item.name}" style="width: 100px;"></td>
            <td>${item.name}</td>
            <td>${item.qty}</td>
            <td>Rp. ${item.price.toLocaleString()}</td>
            <td>Rp. ${totalItemPrice.toLocaleString()}</td>
            <td><button class="btn btn-danger btn-sm" onclick="deleteItem(${index})">Delete</button></td>
        `;
        cartItemsContainer.appendChild(cartRow);
    });

    const originalTotalPrice = totalPrice;
    let discount = 0;
    let finalPrice = totalPrice;

    // Apply discount if total price exceeds 300000
    if (totalPrice > 300000) {
        discount = totalPrice * 0.1; // 10% discount
        finalPrice -= discount;
    }

    // Update summary section
    document.getElementById('total-products').textContent = `Total Products: ${totalProducts}`;
    document.getElementById('total-price').textContent = `Total Price: Rp. ${originalTotalPrice.toLocaleString()}`;
    document.getElementById('discount').textContent = `Discount: Rp. ${discount.toLocaleString()}`;
    document.getElementById('final-price').textContent = `Total Payment: Rp. ${finalPrice.toLocaleString()}`;

    // Event listener for applying voucher
    document.getElementById('apply-voucher').addEventListener('click', () => {
        applyVoucher(originalTotalPrice, totalProducts, finalPrice);
    });

    // Event listener for payment button
    document.getElementById('payment-button').addEventListener('click', () => {
        // Clear the cart
        localStorage.removeItem('cart');
        // Redirect to home page
        window.location.href = 'index.html';
    });

    // Event listener for delete cart button
    document.getElementById('delete-cart').addEventListener('click', () => {
        // Clear the cart
        localStorage.removeItem('cart');
        // Reload the page to reflect empty cart
        location.reload();
    });
}

function applyVoucher(originalTotalPrice, totalProducts, finalPrice) {
    const voucherCode = document.getElementById('voucher-code').value;
    let discountMessage = '';
    let discount = 0;

    // Apply discount based on voucher code
    if (voucherCode === 'DISCOUNT10') {
        discount = originalTotalPrice * 0.1; // 10% discount
        discountMessage = '10% discount applied!';
    } else if (voucherCode === 'happyhour') {
        discount = originalTotalPrice * 0.2; // 20% discount
        discountMessage = '20% discount applied!';
    } else {
        discountMessage = 'Invalid voucher code!';
    }

    finalPrice -= discount;

    // Update summary section with applied voucher details
    document.getElementById('total-products').textContent = `Total Products: ${totalProducts}`;
    document.getElementById('total-price').textContent = `Total Price: Rp. ${originalTotalPrice.toLocaleString()}`;
    document.getElementById('discount').textContent = `Discount: Rp. ${discount.toLocaleString()}`;
    document.getElementById('final-price').textContent = `Total Payment: Rp. ${finalPrice.toLocaleString()}`;
    document.getElementById('discount-message').textContent = discountMessage;
    document.getElementById('order-summary').innerHTML = ''; // Clear order summary on applying voucher
}

function deleteItem(index) {
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    // Remove item at the specified index
    cartItems.splice(index, 1);

    // Update localStorage
    localStorage.setItem('cart', JSON.stringify(cartItems));

    // Render the cart again
    renderCart();
}
