const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');
const category = urlParams.get('category');

let images = [];
let currentImageIndex = 0;
let intervalId;

function fetchProductDetails() {
    let jsonFile = `data/${category}.json`;
    fetch(jsonFile)
        .then(response => response.json())
        .then(data => {
            let product = data.find(p => p.id == productId);
            if (product) {
                images = [product.image, product.image1, product.image2, product.image3, product.image4].filter(Boolean); // Only keep non-empty images
                displayProductDetails(product);
                startImageRotation(); // Start automatic rotation
            } else {
                console.error('Product not found');
            }
        })
        .catch(error => console.error('Error fetching product data:', error));
}

function displayProductDetails(product) {
    const productImage = document.querySelector('#product-image');
    productImage.src = product.image;

    document.querySelector('#style-number').innerText = product.code;
    document.querySelector('#description').innerText = product.Description;
    document.querySelector('#dimension').innerText = product.Dimension;
    document.querySelector('#material').innerText = product.Material;
    document.querySelector('#color').innerText = product.color;

    // Add event listener to open modal
    productImage.addEventListener('click', openModal);
}

function startImageRotation() {
    intervalId = setInterval(() => {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        document.querySelector('#product-image').src = images[currentImageIndex];
    }, 3000);
}

function stopImageRotation() {
    clearInterval(intervalId);
}

document.querySelector('#prevBtn').addEventListener('click', () => {
    stopImageRotation(); // Stop automatic rotation when manual navigation is used
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    document.querySelector('#product-image').src = images[currentImageIndex];
    startImageRotation(); // Restart automatic rotation
});

document.querySelector('#nextBtn').addEventListener('click', () => {
    stopImageRotation();
    currentImageIndex = (currentImageIndex + 1) % images.length;
    document.querySelector('#product-image').src = images[currentImageIndex];
    startImageRotation();
});

// Modal image functionality
const modal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");

function openModal() {
    const imageModal = new bootstrap.Modal(modal);
    modalImage.src = images[currentImageIndex];
    imageModal.show();
}   

fetchProductDetails();