const products = [
    { name: "Mac & Cheese Beef Burger", price: 58000, image: "black burger.png" },
    { name: "Big Mac", price: 43500, image: "big mac.webp" },
    { name: "Triple Cheeseburger", price: 62500, image: "triple cheeseburger.webp" },
    { name: "Double Cheeseburger", price: 41500, image: "double cheeseburger.webp" },
    { name: "Cheeseburger Deluxe", price: 34500, image: "cheeseburger deluxe.webp" },
    { name: "Cheeseburger", price: 32500, image: "cheeseburger.webp" },
    { name: "Beef Burger Deluxe", price: 26500, image: "beef burger deluxe.webp" },
    { name: "Beef Burger", price: 22500, image: "beef burger.webp" }
];

function incrementQty(element) {
    const qtyElement = element.parentNode.querySelector('.qty');
    let qty = parseInt(qtyElement.textContent);
    qtyElement.textContent = qty + 1;
}

function decrementQty(element) {
    const qtyElement = element.parentNode.querySelector('.qty');
    let qty = parseInt(qtyElement.textContent);
    if (qty > 0) {
        qtyElement.textContent = qty - 1;
    }
}

function addToCart(product, qty) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItem = cart.find(item => item.name === product.name);
    if (cartItem) {
        cartItem.qty += qty;
    } else {
        cart.push({ ...product, qty });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
}

function renderProducts() {
    const productList = document.getElementById('product-list');
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'card m-2';
        productCard.style.width = '18rem';

        const imageSrc = product.image ? product.image : 'placeholder.png';  // Use a placeholder image if no image is provided

        productCard.innerHTML = `
            <img src="${imageSrc}" class="card-img-top" alt="${product.name}">
            <div class="card-body center-content">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text">Rp. ${product.price.toLocaleString()}</p>
                <div class="quantity-control">
                    <button class="btn btn-secondary" onclick="decrementQty(this)">-</button>
                    <span class="qty">0</span>
                    <button class="btn btn-secondary" onclick="incrementQty(this)">+</button>
                </div>
                <button class="btn btn-primary mt-2" onclick="orderProduct('${product.name}')">Order</button>
            </div>
        `;
        productList.appendChild(productCard);
    });
}

function orderProduct(productName) {
    const product = products.find(p => p.name === productName);
    const productCards = document.querySelectorAll('.card');
    productCards.forEach(card => {
        const cardTitle = card.querySelector('.card-title').textContent;
        if (cardTitle === productName) {
            const qtyElement = card.querySelector('.qty');
            const qty = parseInt(qtyElement.textContent);
            if (qty > 0) {
                addToCart(product, qty);
            }
        }
    });
    window.location.href = 'cart.html';
}

document.addEventListener('DOMContentLoaded', renderProducts);
