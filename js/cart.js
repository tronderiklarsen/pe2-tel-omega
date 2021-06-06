import { getCartItems } from "./components/cartFunctions.js";

const cart = getCartItems();

const container = document.querySelector(".cart-container");

if (cart.length === 0) {
  container.innerHTML = "You have nothing in the cart";
}

const priceTotal = document.querySelector(".cart-total");
let total = 0;

cart.forEach((basket) => {

  container.innerHTML += `<a href="product-detail.html?id=${basket.id}">    
                                <div class="card">
                                    
                                 <div class="card-image">
                                    <img src="${basket.image}"></img>
                                </div>

                                <div class="card-header">
                                    <h2>${basket.title}</h2>
                                </div>

                                <div class="card-body">
                                    <p>Price: €${basket.price}<p>
                                </div>
                                <button id="remove-cart" data-id="${basket.id}" data-title="${basket.title}" data-price="${basket.price}"><a>Remove from cart</a></button>
                                </div>
                            </a>

                            <hr>
                            `;

  const price = parseFloat(basket.price);
  total = total + price;
  priceTotal.innerHTML = `<h2>Total: ${total} kr</h2>`;
});

const cartButton = document.querySelectorAll("#remove-cart");

cartButton.forEach((button) => {
  button.addEventListener("click", removeFromCart);
});

function removeFromCart(event) {
  const id = this.dataset.id;
  const title = this.dataset.title;
  const price = this.dataset.price;

  const currentCart = getCartItems();

  const productExists = currentCart.find(function (basket) {
      return basket.id == id;
  });

  if(!productExists) {
    const product = { id: id, title: title, price: price };

    currentCart.push(product);

    saveCart(currentCart);
  } else {
    const newCart = currentCart.filter(basket => basket.id !== id);
    saveCart(newCart);
    location.href = "/cart.html"
  }
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}