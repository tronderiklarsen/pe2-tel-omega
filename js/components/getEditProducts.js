import { baseUrl } from "../settings/api.js";

export async function getEditProducts() {

    const productsUrl = baseUrl + "/products";

    const productContainer = document.querySelector(".product-list");

    try {
        const response = await fetch(productsUrl);
        const json = await response.json();

        productContainer.innerHTML = "";

        json.forEach(function (product) {

            let imageUrl = "";

            if (!product.image_url) {
                imageUrl = baseUrl + product.image.formats.large.url;
            } else {
                imageUrl = product.image_url;
            }

            productContainer.innerHTML += `<a href="edit-product.html?id=${product.id}">    
                                                <div class="card">
        
                                                    <div class="card-image">
                                                        <img src="${imageUrl}"></img>
                                                    </div>
        
                                                    <div class="card-header">
                                                        <h2>${product.title}</h2>
                                                    </div>
        
                                                    <div class="card-body">
                                                        <p>€${product.price} NOK</p>
                                                    </div>
        
                                                </div>
                                            </a>
                                            `;

        });

    } catch (error) {
        console.log(error);
    }
};