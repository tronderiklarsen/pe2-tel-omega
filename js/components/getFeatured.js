import { baseUrl } from "../settings/api.js";

export function getFeatured(json) {

    const featuredContainer = document.querySelector(".featured-products");

    featuredContainer.innerHTML = "";

    json.forEach(function (product) {

        let imageUrl = "";

        if (!product.image_url) {
            imageUrl = product.image.formats.large.url;
        } else {
            imageUrl = product.image_url;
        }

        if (product.featured) {
            featuredContainer.innerHTML +=

                `
                <div class="card">
                    <div class="card-image">
                        <img src="${imageUrl}"></img>
                    </div>
            
                    <div class="card-header">
                        <h3>${product.title}</h3>
                    </div>
            
                    <div class="card-body">
                        <p>${product.description}</p>
                    </div>

                    <div>
                        <a class="details" href="product-detail.html?id=${product.id}">More info</a>
                    </div>
                </div>
                `;
        };
    });
}