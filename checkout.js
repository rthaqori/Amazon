import { cart, updateCartQuantity, removeFromCart } from "./cart.js";
import { products } from "./products_data.js";

let cartItemsHTML = "";
let totalPrice = 0;

cart.forEach((cartItem) => {
  const productId = cartItem.productId;

  const matchingProduct = products.find((product) => product.id === productId);

  const options = [...Array(10).keys()]
    .map((i) => {
      const value = i + 1;
      return `<option value="${value}" ${
        value === cartItem.quantity ? "selected" : ""
      }>${value}</option>`;
    })
    .join("");

  // const itemPrice =
  //   (matchingProduct.price.sale.dollor +
  //     matchingProduct.price.sale.cents / 100) *
  //   cartItem.quantity;
  // totalPrice += itemPrice;

  console.log(matchingProduct);

  cartItemsHTML += `
            <div class="cart-item cart-container-${matchingProduct.id}">
                <div class="checkbox">
                    <input type="checkbox" name="" id="item-checkbox-${matchingProduct.id}">
                </div>
                <div class="cart-item-image">
                    <img src="assets/product_images/smartphones/${matchingProduct.image}" alt="${matchingProduct.image}">
                </div>
                <div class="cart-item-details">
                    <div class="cart-item-info">
                        <h2><a href="#">${matchingProduct.name}</a>
                        </h2>
                        <span class="stock">${matchingProduct.stock}</span>
                        <label for="gift-${matchingProduct.id}">
                            <input type="checkbox" id="gift-${matchingProduct.id}" class="gift">
                            <span> This is a gift</span>
                            <a href="#" id="lern-more">Lern More</a>
                        </label>
        
                        <span>
                            Color:
                            <span class="color">${matchingProduct.color}</span>
                        </span>
                        <span>
                            Style:
                            <span class="style">${matchingProduct.style}</span>
                        </span>
        
                        <div class="item-qty">
                            <span class="item-quentity">
                                Qty:
                                <select name="quantity" id="${matchingProduct.id}-quantity" class="quantity" onchange="updateCartItemQuantity(${matchingProduct.id}, this.value)">
                                    ${options}
                                </select>
                            </span>
                            <a href="#" class="delete-item" data-product-id="${matchingProduct.id}">Delete</a>
                            <a href="#" class="save-item">Save for later</a>
                        </div>
                        <a href="#" class="compare">Compare with similar items</a>
                        <a href="#" class="share">Share</a>
                    </div>
        
                    <div class="cart-item-price">
                        <span class="item-price">{itemPrice.toFixed(2)}</span>
                    </div>       
                </div>
            </div>
            `;
});

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
