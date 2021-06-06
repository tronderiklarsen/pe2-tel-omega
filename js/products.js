import { baseUrl } from "./settings/api.js";
import { renderProducts } from "./components/renderProducts.js";
import { filterProducts } from "./components/filterProducts.js";

async function getProducts() {

    const productsUrl = baseUrl + "/products";

    try {
        const response = await fetch(productsUrl);
        const json = await response.json();

        const products = json;

        filterProducts(products);
        renderProducts(products);

    } catch (error) {
        console.log(error);
    }
};

getProducts();

