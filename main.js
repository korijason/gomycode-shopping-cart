// Predefined list of items (can be extended)
const items = [
    { id: 1, name: "Apple", price: 1.5, quantity: 2 },
    { id: 2, name: "Banana", price: 0.8, quantity: 3 },
    { id: 3, name: "Orange", price: 2, quantity: 1 },
  ];
  
  // DOM Elements
  const cartItemsContainer = document.getElementById('cart-items');
  const totalPriceElement = document.getElementById('total-price');
  
  // Function to render the cart items dynamically
  function renderCartItems() {
    cartItemsContainer.innerHTML = ""; // Clear previous content
    items.forEach(item => {
      const cartItemElement = document.createElement('div');
      cartItemElement.classList.add('cart-item');
      cartItemElement.innerHTML = `
        <div class="item-info">
          <span class="item-name">${item.name}</span>
          <span class="item-price">$${(item.price * item.quantity).toFixed(2)}</span>
        </div>
        <div class="button-group">
          <button class="decrease-btn">-</button>
          <span class="quantity">${item.quantity}</span>
          <button class="increase-btn">+</button>
          <button class="delete-btn">Delete</button>
          <span class="heart">&#9829;</span>
        </div>
      `;
  
      // Event Listeners
      cartItemElement.querySelector('.increase-btn').addEventListener('click', () => updateQuantity(item.id, 1));
      cartItemElement.querySelector('.decrease-btn').addEventListener('click', () => updateQuantity(item.id, -1));
      cartItemElement.querySelector('.delete-btn').addEventListener('click', () => deleteItem(item.id));
      cartItemElement.querySelector('.heart').addEventListener('click', (e) => toggleLike(e));
  
      // Append item to the cart
      cartItemsContainer.appendChild(cartItemElement);
    });
  
    updateTotalPrice();
  }
  
  // Function to update the quantity of an item
  function updateQuantity(itemId, change) {
    const item = items.find(item => item.id === itemId);
    if (item) {
      item.quantity += change;
      if (item.quantity < 1) item.quantity = 1; // Prevent going below 1
      renderCartItems(); // Re-render cart
    }
  }
  
  // Function to delete an item from the cart
  function deleteItem(itemId) {
    const itemIndex = items.findIndex(item => item.id === itemId);
    if (itemIndex > -1) {
      items.splice(itemIndex, 1);
      renderCartItems(); // Re-render cart
    }
  }
  
  // Function to toggle the like (heart) button
  function toggleLike(event) {
    event.target.classList.toggle('liked');
  }
  
  // Function to calculate and update the total price
  function updateTotalPrice() {
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    totalPriceElement.textContent = total.toFixed(2);
  }
  
  // Initial render
  renderCartItems();
  