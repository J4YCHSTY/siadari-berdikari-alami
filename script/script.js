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
        <img src="${bamboo.image}" alt="">
        <h2>${bamboo.name}</h2>`;

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