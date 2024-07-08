import { cart, addToCart, updateCartQuantity } from './cart.js';
import { products } from './products_data.js';

let productsHTML = "";

products.forEach((product) => {

    productsHTML += `
                 <div class="item">
                    <div class="product-image">
                        <img src="assets/product_images/smartphones/${product.image}" alt="${product.image}">
                    </div>
                    <div class="item-details">
                        <h2><a href="#">${product.name}</a></h2>
                        <div class="rating">
                            <a href="#">
                                <img src="assets/rating-${product.ratings.stars * 10}.png" alt="">
                                <span id="total-ratings">${product.ratings.numReviews}</span>
                            </a>
                        </div>
                        <span class="stock-history">${product.details.sales}</span>
                        <div class="price">
                            <a href="#">
                                <div class="after-discount">
                                    <span>$</span>
                                    <span id="item-price-dollar">${product.price.sale.dollor}</span>
                                    <span id="item-price-cents">${product.price.sale.cents}</span>
                                </div>
                            </a>
                            <a href="#">
                                <div class="before-discount">
                                    <span><s>${product.price.original}</s></span>
                                </div>
                            </a>
                        </div>
                        <span id="stock-detail">Only ${product.stock} left in stock - order soon.</span>
                        <button class="add-to-cart" data-product-id="${product.id}">Add to cart</button>
                        <span class="more-choices">More Buying Choices</span>
                        <div class="radio-buttons">
                            <input type="radio" name="${product.id}" id="${product.id}black" checked>
                            <label for="${product.id}black"></label>
                            <input type="radio" name="${product.id}" id="${product.id}white" >
                            <label for="${product.id}white"></label>
                            <input type="radio" name="${product.id}" id="${product.id}tomato" >
                            <label for="${product.id}tomato"></label>
                            <input type="radio" name="${product.id}" id="${product.id}skyblue" >
                            <label for="${product.id}skyblue"></label>
                        </div>
                    </div>
                </div>

                <style>

                    #${product.id}black:checked~label[for=${product.id}black] {
                        outline: 2px solid rgb(160, 153, 153);
                    }
                    label[for=${product.id}black]{
                        background-color: #000;
                    }

                    #${product.id}white:checked~label[for=${product.id}white] {
                        outline: 2px solid rgb(160, 153, 153);
                    }
                    label[for=${product.id}white]{
                        background-color: #fff;
                    }                        

                    #${product.id}tomato:checked~label[for=${product.id}tomato] {
                        outline: 2px solid rgb(160, 153, 153);
                    }
                    label[for=${product.id}tomato]{
                        background-color: tomato;
                    }                        

                    #${product.id}skyblue:checked~label[for=${product.id}skyblue] {
                        outline: 2px solid rgb(160, 153, 153);
                    }
                    label[for=${product.id}skyblue]{
                        background-color: skyblue;
                    }

                </style>
            `;
});

document.querySelector(".js-product-list")
    .innerHTML = productsHTML;

window.addEventListener("pageshow", () => {
    updateCartQuantity();
});

document.querySelectorAll(".add-to-cart")
    .forEach((button) => {
        button.addEventListener("click", () => {
            const productId = button.dataset.productId;

            addToCart(productId);
            updateCartQuantity();
        });
    });

