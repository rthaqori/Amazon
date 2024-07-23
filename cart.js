export let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(productId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += 1;
  } else {
    cart.push({
      productId: productId,
      quantity: 1,
    });
  }

  saveToStorage();
}

export function updateCartQuantity() {
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  document.querySelector("#cart-count").innerHTML = cartQuantity;

  if (document.querySelector("#aside")) {
    if (cartQuantity) {
      document.querySelector("aside").style.display = "flex";
      document.querySelector("body").style.cssText = `
            width: 100%;
            height: 100%;
            display: grid;
            grid-template-areas:
                "header aside"
                "main aside"
                "footer aside";
            grid-template-rows: auto 1fr auto;
            grid-template-columns: 1fr auto;
            margin: 0;
        `;
    } else {
      document.querySelector("aside").style.display = "none";
      document.querySelector("body").style.cssText = "";
    }
  }
}

export function removeFromCart(productId) {
  const cartIndex = cart.findIndex((item) => item.productId === productId);
  if (cartIndex > -1) {
    cart.splice(cartIndex, 1);
    saveToStorage();
  }
}

import { products } from "./products_data.js";
