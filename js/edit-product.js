import createMenu from "./components/createMenu.js";
import deleteButton from "./components/deleteButton.js";
import { baseUrl } from "./settings/api.js";
import { getToken } from "./utilities/storage.js";
import displayMessage from "./components/displayMessage.js";

const token = getToken();

if (!token) {
    location.href = "index.html"
}

createMenu();

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const productUrl = baseUrl + "/products/" + id;

const form = document.querySelector("form");
const name = document.querySelector("#name");
const price = document.querySelector("#price");
const description = document.querySelector("#description");
// const image = document.querySelector("#image")
const featured = document.querySelector("#featured");
const idInput = document.querySelector("#id");
const message = document.querySelector(".message-container");

(async function () {
    try {
        const response = await fetch(productUrl);
        const details = await response.json();

        name.value = details.title;
        price.value = details.price;
        description.value = details.description;
        //image.value = details.image_url;
        featured.value = details.featured;
        idInput.value = details.id;

        deleteButton(details.id);

    } catch (error) {
        console.log(error)
    } finally {
        form.style.display = "block";
    }
})();

form.addEventListener("submit", submitForm);

function submitForm(event) {
    event.preventDefault();

    message.innerHTML = "";

    const nameValue = name.value.trim();
    const priceValue = parseFloat(price.value);
    const descriptionValue = description.value.trim();
    // const imageValue = image.value;
    const idValue = idInput.value;
    const featuredValue = featured.value;

    console.log("featuredValue", featuredValue);

    if (nameValue.length === 0 || priceValue.length === 0 || isNaN(priceValue) || descriptionValue.length === 0) {
        return displayMessage("warning", "Please enter real values", ".message-container");
    }

    updateProduct(nameValue, priceValue, descriptionValue, idValue, featuredValue);
}

async function updateProduct(title, price, description, id, featured) {

    const url = baseUrl + "/products/" + id;
    const data = JSON.stringify({ title: title, price: price, description: description, featured: featured });

    const options = {
        method: "PUT",
        body: data,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    };

    try {
        const response = await fetch(url, options);
        const json = await response.json();

        if (json.updated_at) {
            displayMessage("success", "Product successfully updated", ".message-container");
        }

        if (json.error) {
            displayMessage("error", json.message, ".message-container");
        }
    } catch (error) {
        console.log(error);
    }
}