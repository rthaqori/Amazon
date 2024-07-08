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
            quantity: 1
        });
    }

    saveToStorage();
};

export function updateCartQuantity() {
    let cartQuantity = 0;

    cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
    });

    document.querySelector("#cart-count").innerHTML = cartQuantity

    if (document.querySelector("#aside")) {
        if (cartQuantity) {
            document.querySelector('aside').style.display = "flex";
            document.querySelector('body').style.cssText = `
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
            document.querySelector('aside').style.display = "none";
            document.querySelector('body').style.cssText = "";
        }
    }

};

export function removeFromCart(productId) {
    const cartIndex = cart.findIndex(item => item.productId === productId);
    if (cartIndex > -1) {
        cart.splice(cartIndex, 1);
        saveToStorage();
    }
}

import { products } from './products_data.js';

export let cartItemsHTML = "";
export let miniCartHTML = "";
export let totalPrice = 0;

export function cartProducts() {
    cart.forEach((cartItem) => {

        const productId = cartItem.productId;

        const matchingProduct = products.find(product => product.id === productId);

        const options = [...Array(10).keys()].map(i => {
            const value = i + 1;
            return `<option value="${value}" ${value === cartItem.quantity ? 'selected' : ''}>${value}</option>`;
        }).join('');

        const itemPrice = (matchingProduct.price.sale.dollor + (matchingProduct.price.sale.cents / 100)) * cartItem.quantity;
        totalPrice += itemPrice;

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
                        <span class="item-price">$${itemPrice.toFixed(2)}</span>
                    </div>       
                </div>
            </div>
            `;

        miniCartHTML += `
                    <div class="cart-item-mini cart-container-${matchingProduct.id}">
                        <div>
                            <img src="assets/product_images/smartphones/${matchingProduct.image}" alt="${matchingProduct.image}">
                        </div>
                        <div class="edit">
                            <select name="quantity" id="${matchingProduct.id}-quantity" class="quantity">
                                ${options}
                            </select>
                            <button class="delete-item" data-product-id="${matchingProduct.id}"></button>
                        </div>
                    </div>
                `;

    });
}
