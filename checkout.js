import { cart, updateCartQuantity, removeFromCart } from "./cart.js";
// import { products } from './products_data.js';
import { cartItemsHTML, cartProducts } from "./cart.js";

cartProducts();

document.querySelector(".cart-item-list").innerHTML = cartItemsHTML;

export function subtotal() {
  const cartTotalItems = cart.length;
  let cartTotal = "";
  let cartList = ``;
  let totalSum = 0;

  const items = document.querySelectorAll(".cart-item");

  items.forEach((item) => {
    const itemPrice = parseFloat(
      item.querySelector(".item-price").innerText.slice(1)
    );
    totalSum += itemPrice;
  });

  cartTotal += `
            <span>Subtotal
                (<span class="total-items">${cartTotalItems} item</span>):
                <span class="total-price">$${totalSum.toFixed(2)}</span>
            </span>
        `;

  if (cartTotalItems === 0) {
    cartTotal = "No item selected";
    cartList = `<p class="no-items">No items in the cart.</p>`;
    document.querySelector(".cart-item-list").innerHTML = cartList;
  }

  const subtotal = document.querySelectorAll(".subtotal");
  for (let i = 0; i < subtotal.length; i++) {
    subtotal[i].innerHTML = cartTotal;
  }

  updateCartQuantity();
}

window.addEventListener("pageshow", () => {
  updateCartQuantity();
  subtotal();
});

document.querySelectorAll(".delete-item").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const productId = link.dataset.productId;
    removeFromCart(productId);

    const maniCartContainer = document.querySelector(
      `.cart-container-${productId}`
    );
    maniCartContainer.remove();

    updateCartQuantity();
    subtotal();
  });
});

updateCartQuantity();
subtotal();
