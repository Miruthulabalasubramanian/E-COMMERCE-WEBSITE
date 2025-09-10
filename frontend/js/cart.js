// Simple cart.js using localStorage and non-module script

const CART_KEY = 'arha_cart_v1';

function getCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch { return []; }
}
function saveCart(cart) { localStorage.setItem(CART_KEY, JSON.stringify(cart)); }

// Add item then go to cart page
function addToCart(id, name, price, image, qty = 1) {
  const cart = getCart();
  const idx = cart.findIndex(i => i.id === id);
  if (idx >= 0) {
    cart[idx].qty += Number(qty);
  } else {
    cart.push({ id, name, price: Number(price), image, qty: Number(qty) });
  }
  saveCart(cart);
  // Navigate to cart page
  window.location.href = 'cart.html';
}

function removeFromCart(id) {
  const cart = getCart().filter(i => i.id !== id);
  saveCart(cart);
  renderCart();
}

function updateQty(id, qty) {
  const cart = getCart();
  const item = cart.find(i => i.id === id);
  if (item) {
    item.qty = Math.max(1, Number(qty) || 1);
    saveCart(cart);
    renderCart();
  }
}

function formatINR(num) {
  return '₹' + (Number(num)||0).toLocaleString('en-IN', { maximumFractionDigits: 0 });
}

function renderCart() {
  const itemsEl = document.getElementById('cartItems') || document.getElementById('cart-items');
  const totalEl = document.getElementById('totalPrice') || document.getElementById('cart-total');
  if (!itemsEl || !totalEl) return;

  const cart = getCart();
  itemsEl.innerHTML = '';

  if (cart.length === 0) {
    itemsEl.innerHTML = '<p class="text-gray-500 text-center">Your cart is empty.</p>';
    totalEl.textContent = formatINR(0);
    return;
  }

  let total = 0;
  cart.forEach(item => {
    const line = document.createElement('div');
    line.className = 'flex items-center justify-between border-b py-3';
    const subtotal = item.price * item.qty;
    total += subtotal;
    line.innerHTML = `
      <div class="flex items-center gap-3">
        <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded">
        <div>
          <div class="font-medium">${item.name}</div>
          <div class="text-sm text-gray-500">${formatINR(item.price)} × 
            <input type="number" min="1" value="${item.qty}" class="w-16 border rounded px-2 py-1 qty-input" data-id="${item.id}">
          </div>
        </div>
      </div>
      <div class="flex items-center gap-3">
        <div class="font-semibold">${formatINR(subtotal)}</div>
        <button class="text-red-600 hover:underline remove-btn" data-id="${item.id}">Remove</button>
      </div>
    `;
    itemsEl.appendChild(line);
  });

  totalEl.textContent = formatINR(total);

  // Bind events
  itemsEl.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', e => removeFromCart(e.currentTarget.dataset.id));
  });
  itemsEl.querySelectorAll('.qty-input').forEach(inp => {
    inp.addEventListener('change', e => updateQty(e.currentTarget.dataset.id, e.currentTarget.value));
  });

  const checkoutBtn = document.getElementById('checkoutBtn') || document.getElementById('checkout-btn');
  if (checkoutBtn) {
    checkoutBtn.onclick = () => {
      // For now, just simulate order success and clear cart
      saveCart([]);
      alert('✅ Order placed successfully!');
      window.location.href = 'order-success.html';
    };
  }

  const continueBtn = document.getElementById('continueShopping') || document.getElementById('continue-shopping');
  if (continueBtn) {
    continueBtn.onclick = () => { window.location.href = 'home.html'; };
  }
}

document.addEventListener('DOMContentLoaded', renderCart);
