const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');
const category = urlParams.get('category');

function fetchProductDetails() {
    let jsonFile = `data/${category}.json`;
    fetch(jsonFile)
        .then(response => response.json())
        .then(data => {
            let product = data.find(p => p.id == productId);
            if (product) {
                displayProductDetails(product);
            } else {
                console.error('Product not found');
            }
        })
        .catch(error => console.error('Error fetching product data:', error));
}

function displayProductDetails(product) {
    const productImage = document.querySelector('#product-image');
    let images = [product.image, product.image1]; 
    let currentImageIndex = 0;  

    
    setInterval(() => {
        currentImageIndex = (currentImageIndex + 1) % images.length;  
        productImage.src = images[currentImageIndex];  
    }, 3000);  

    document.querySelector('#product-image').src = product.image;
    document.querySelector('#style-number').innerText = product.code;
    document.querySelector('#description').innerText = product.Description;
    document.querySelector('#dimension').innerText = product.Dimension;
    document.querySelector('#material').innerText = product.Material;
    document.querySelector('#color').innerText = product.color;
}

fetchProductDetails();
