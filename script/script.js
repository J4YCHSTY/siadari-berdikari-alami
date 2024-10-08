let bamboo = null;
fetch('data/bamboo.json')
.then(response => response.json())
.then(data => {
    bamboo = data;
    console.log(bamboo);
    addDataToHTML();
})

let listProduct =  document.querySelector('.listProduct');

function addDataToHTML() {

    bamboo.forEach(bamboo => {
        let newProduct = document.createElement('div');
        newProduct.classList.add('col-lg-4', 'col-md-12', 'mb-4');
        newProduct.href = '/detail.html?id=' + bamboo.id;
        newProduct.classList.add('item');
        newProduct.innerHTML = `
        <div class="bg-image hover-zoom ripple shadow-1-strong rounded listProduct">
            <img src="${bamboo.image}" class="w-100" />
            <a href="#">
                <div class="card-title">
                <div class="d-flex justify-content-center align-items-center h-100">
                    <h5><span class="badge bg-body-tertiary pt-2 mt-3 text-light">${bamboo.name}</span></h5>
                </div>
                </div>
            </a>
        </div>`;

        listProduct.appendChild(newProduct);
    })

    
}

let pandan = null;
fetch('data/pandan.json')
.then(response => response.json())
.then(data => {
    pandan = data;
    console.log(pandan);
})