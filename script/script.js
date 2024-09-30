let bamboo = null;
fetch('data/bamboo.json')
.then(response => response.json())
.then(data => {
    bamboo = data;
    console.log(bamboo);
})

let pandan = null;
fetch('data/pandan.json')
.then(response => response.json())
.then(data => {
    pandan = data;
    console.log(pandan);
})