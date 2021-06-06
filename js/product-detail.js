import { baseUrl } from "./settings/api.js";
import { getCartItems } from "./components/cartFunctions.js";

const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const id = params.get("id");

const productUrl = baseUrl + "/products/" + id;

(async function () {

    const response = await fetch(productUrl);
    const details = await response.json();

    document.title = details.title;

    const container = document.querySelector(".detail-container");

    let imageUrl = "";

    if (!details.image_url) {
        imageUrl = details.image.formats.large.url;
    } else {
        imageUrl = details.image_url;
    }

    container.innerHTML = `           
                            <div class="card">

                                <div class="card-image">
                                    <img src="${imageUrl}"></img>
                                </div>

                                <div class="card-header">
                                    <h1>${details.title}</h1>
                                </div>

                                <div class="card-body">
                                    <p>${details.description}</p>
                                    <p>€${details.price}</p>
                                </div>

                                <button class="cart-btn" data-id="${details.id}" data-title="${details.title}" data-price="${details.price}" data-image="${imageUrl}" type="button">Add to cart</button>

                            </div>
                            `;

    const cartButton = document.querySelector(".cart-btn");

    cartButton.addEventListener("click", addToCart);

    function addToCart(event) {

        const id = this.dataset.id;
        const title = this.dataset.title;
        const price = this.dataset.price;
        const image = this.dataset.image;

        const currentCart = getCartItems();

        const productExists = currentCart.find(function (basket) {
            return basket.id === id;
        });

        if (!productExists) {
            const product = { id: id, title: title, price: price, image: image };
            currentCart.push(product);
            saveCart(currentCart);

        } else {
            const newCart = currentCart.filter(basket => basket.id !== id);
            saveCart(newCart);
        }
    }
})();

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}