import { baseUrl } from "./settings/api.js";
import { getHero } from "./components/getHero.js";
import { getFeatured } from "./components/getFeatured.js";

const heroUrl = baseUrl + "/home";

const productsUrl = baseUrl + "/products";

(async function () {

    try {
        const response = await fetch(heroUrl);
        const json = await response.json();

        getHero(json);


    } catch (error) {
        console.log(error);
    }

})();

(async function () {

    try {
        const response = await fetch(productsUrl);
        const json = await response.json();

        getFeatured(json);

    } catch (error) {
        console.log(error);
    }
})();