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
        let newProduct = document.createElement('a');
        newProduct.href = '/detail.html?id=' + bamboo.id;
        newProduct.classList.add('item');
        newProduct.innerHTML = `
        <img src="${bamboo.image}" class="w-100" />
        <a href="#!">
        <div class="card-title">
            <div class="d-flex justify-content-start align-items-start h-100">
            <h5><span class="badge bg-body-tertiary pt-2 ms-3 mt-3 text-light">${bamboo.name}</span></h5>
            </div>
        </div>
        </a>`;

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