const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get('category');

function fetchProductData(category) {
    let jsonFile = `data/${category}.json`;  
    fetch(jsonFile)
        .then(response => response.json())
        .then(data => {
            displayProductList(data);
        })
        .catch(error => console.error('Error fetching product data:', error));
}


function displayProductList(products) {
    let listProduct = document.querySelector('.listProduct');
    listProduct.innerHTML = '';  

    products.forEach(product => {
        let productCard = `
            <div class="col-lg-4 col-md-12 mb-4 card-product">
                <a href="product.html?id=${product.id}&category=${category}">
                    <div class="bg-image hover-zoom ripple shadow-1-strong rounded listProduct">
                        <img src="${product.image}" class="w-100" />
                        <div class="card-title">
                            <div class="d-flex justify-content-center align-items-center h-100">
                                <h5><span class="badge bg-body-tertiary pt-2 mt-3 text-light">${product.name}</span></h5>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
        `;
        listProduct.innerHTML += productCard;
    });
}


if (category) {
    fetchProductData(category);
} else {
    console.error('Category not found in URL');
}
