import createMenu from "./components/createMenu.js";
import displayMessage from "./components/displayMessage.js";
import { getToken } from "./utilities/storage.js";
import { baseUrl } from "./settings/api.js";

const token = getToken();

if (!token) {
    location.href = "index.html"
}

createMenu();

const form = document.querySelector("form");
const name = document.querySelector("#name");
const price = document.querySelector("#price");
const description = document.querySelector("#description");
const imageUrl = document.querySelector("#image");
const featured = document.querySelector("#featured");
const message = document.querySelector(".message-container");


form.addEventListener("submit", submitForm);

function submitForm(event) {
    event.preventDefault();

    message.innerHTML = "";

    const nameValue = name.value.trim();
    const priceValue = parseFloat(price.value.trim());
    const descriptionValue = description.value.trim();
    const featuredValue = featured.value;
    const imageValue = imageUrl.value.trim();

    console.log(featuredValue)

    if (nameValue.length === 0 || priceValue.length === 0 || isNaN(priceValue) || descriptionValue.length === 0 || imageValue.length === 0) {
        return displayMessage("warning", "Please enter real values", ".message-container");
    }

    addProduct(nameValue, priceValue, descriptionValue, imageValue, featuredValue);
}

async function addProduct(title, price, description, image, featured) {
    const url = baseUrl + "/products";

    const data = JSON.stringify({ title: title, price: price, description: description, image_url: image, featured: featured });

    const options = {
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    };

    try {
        const response = await fetch(url, options);
        const json = await response.json();

        if (json.created_at) {
            displayMessage("success", "Product added", ".message-container");
            form.reset();
        }

        if (json.error) {
            displayMessage("error", json.message, ".message-container");
        }
    } catch (error) {
        console.log(error)
        displayMessage("error", "An error occured", ".message-container");
    }
}