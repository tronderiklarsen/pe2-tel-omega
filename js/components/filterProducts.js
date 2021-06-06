import { renderProducts } from "./renderProducts.js";

export function filterProducts(products) {

    const filter = document.querySelector(".filter");

    filter.onkeyup = function () {

        const filterValue = event.target.value.trim().toLowerCase();

        const filteredProducts = products.filter(function (item) {
            if (item.title.toLowerCase().includes(filterValue)) {
                return true;
            }
        });

        renderProducts(filteredProducts);
    };
}