import { baseUrl } from "../settings/api.js";

export function renderProducts(products) {

    const productContainer = document.querySelector(".product-list");

    productContainer.innerHTML = "";

    products.forEach(function (product) {

        let imageUrl = "";

        if (!product.image_url) {
            imageUrl = product.image.formats.large.url;
        } else {
            imageUrl = product.image_url;
        }

        productContainer.innerHTML += `<a href="product-detail.html?id=${product.id}">    
                                                <div class="card">
        
                                                    <div class="card-image">
                                                        <img src="${imageUrl}"></img>
                                                    </div>
        
                                                    <div class="card-header">
                                                        <h2>${product.title}</h2>
                                                    </div>
        
                                                    <div class="card-body">
                                                        <p>€${product.price}</p>
                                                    </div>
        
                                                </div>
                                            </a>
                                            `;
    });
}