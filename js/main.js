document.addEventListener('DOMContentLoaded', () => {
    const cart = document.getElementById('cart');
    const totalPriceElement = document.getElementById('totalPrice');
    const items = [
        { id: 1, name: 'Item 1', price: 20, imageUrl: 'https://via.placeholder.com/50' },
        { id: 2, name: 'Item 2', price: 15, imageUrl: 'https://via.placeholder.com/50' }
    ];

    function renderCart() {
        cart.innerHTML = '';
        items.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="item-details">
                    <img src="${item.imageUrl}" alt="${item.name}">
                    <div class="item-name">${item.name}</div>
                </div>
                <div class="quantity-controls">
                    <button class="quantity-decrease">-</button>
                    <span class="quantity">1</span>
                    <button class="quantity-increase">+</button>
                </div>
                <div>$${item.price}</div>
                <button class="like-button" data-id="${item.id}">&#9829;</button>
                <button class="delete-button" data-id="${item.id}">&times;</button>
            `;
            cart.appendChild(cartItem);
        });
        updateTotalPrice();
    }

    function updateTotalPrice() {
        const quantities = document.querySelectorAll('.quantity');
        let total = 0;
        quantities.forEach((quantityElem, index) => {
            const quantity = parseInt(quantityElem.textContent);
            const price = items[index].price;
            total += quantity * price;
        });
        totalPriceElement.textContent = total.toFixed(2);
    }

    function handleCartActions(event) {
        if (event.target.classList.contains('quantity-increase')) {
            const quantityElem = event.target.previousElementSibling;
            quantityElem.textContent = parseInt(quantityElem.textContent) + 1;
            updateTotalPrice();
        }
        if (event.target.classList.contains('quantity-decrease')) {
            const quantityElem = event.target.nextElementSibling;
            if (parseInt(quantityElem.textContent) > 1) {
                quantityElem.textContent = parseInt(quantityElem.textContent) - 1;
                updateTotalPrice();
            }
        }
        if (event.target.classList.contains('delete-button')) {
            const cartItem = event.target.closest('.cart-item');
            cartItem.remove();
            updateTotalPrice();
        }
        if (event.target.classList.contains('like-button')) {
            event.target.classList.toggle('liked');
        }
    }

    cart.addEventListener('click', handleCartActions);
    renderCart();
});
