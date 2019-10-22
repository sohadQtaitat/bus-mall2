'use strict';




function Products(name, src) {
    this.name = name;
    this.src = src;
    this.clickCtr = 0;
    this.shownCtr = 0;
    Products.all.push(this);
}

Products.firstCtr = 0;
Products.maxLimit = 25;
Products.all = [];






Products.container = document.getElementById('formProduct');

Products.leftImage = document.getElementById('left-product-image');
Products.centerImage = document.getElementById('center-product-image');
Products.rightImage = document.getElementById('right-product-image');


Products.leftTitle = document.getElementById('left-product-title');
Products.centerTitle = document.getElementById('center-product-title');
Products.rightTitle = document.getElementById('right-product-title');

Products.leftObject = null;
Products.centerObject = null;
Products.rightObject = null;






new Products('bag product', 'img/bag.jpg');
new Products('banana product', 'img/banana.jpg');
new Products('boots product', 'img/boots.jpg');
new Products('bubblegum product', 'img/bubblegum.jpg');
new Products('chair product', 'img/chair.jpg');


new Products('cthulhu product', 'img/cthulhu.jpg');
new Products('dog-duck product', 'img/dog-duck.jpg');
new Products('dragon product', 'img/dragon.jpg');
new Products('pen product', 'img/pen.jpg');


new Products('pet-sweep product', 'img/pet-sweep.jpg');
new Products('breakfast product', 'img/breakfast.jpg');
new Products('sweep product', 'img/sweep.png');
new Products('bathroom product', 'img/bathroom.jpg');
new Products('scissors product', 'img/scissors.jpg');
new Products('shark product', 'img/shark.jpg');


new Products('tauntaun product', 'img/tauntaun.jpg');
new Products('unicorn product', 'img/unicorn.jpg');
new Products('usb product', 'img/usb.gif');
new Products('water-can product', 'img/water-can.jpg');
new Products('wine-glass product', 'img/wine-glass.jpg');





////////////////////////////////////////////////////////////////////////////////////////////

function renderProducts() {

    var forbidden = [Products.leftObject, Products.centerObject, Products.rightObject];

    do {

        Products.leftObject = getRandomProduct();

    } while (forbidden.includes(Products.leftObject))
    forbidden.push(Products.leftObject);
    do {

        Products.centerObject = getRandomProduct();

    } while (forbidden.includes(Products.centerObject));
    forbidden.push(Products.centerObject);
    do {

        Products.rightObject = getRandomProduct();
    } while (forbidden.includes(Products.rightObject));

    ///////////////////////////////////////////////////////////////////////////////////////////////////////

    Products.leftObject.shownCtr++;
    Products.centerObject.shownCtr++;
    Products.rightObject.shownCtr++;


    var leftProductImageElement = Products.leftImage;
    var centerProductImageElement = Products.centerImage;
    var rightProductImageElement = Products.rightImage;


    leftProductImageElement.setAttribute('src', Products.leftObject.src);
    leftProductImageElement.setAttribute('alt', Products.leftObject.name);

    centerProductImageElement.setAttribute('src', Products.centerObject.src);
    centerProductImageElement.setAttribute('alt', Products.centerObject.name);

    rightProductImageElement.setAttribute('src', Products.rightObject.src); t
    rightProductImageElement.setAttribute('alt', Products.rightObject.name);


    Products.leftTitle.textContent = Products.leftObject.name;
    Products.centerTitle.textContent = Products.centerObject.name
    Products.rightTitle.textContent = Products.rightObject.name;

}

///////////////////////////////////////////////////////////////////////////////////////////////////////////


function getRandomProduct() {
    var index = Math.floor(Math.random() * Products.all.length);
    console.log('index', index);
    return Products.all[index];
}



function updateTotals() {

    var alloutput = document.getElementById('productItem');

    alloutput.innerHTML = '';

    for (var i = 0; i < Products.all.length; i++) {
        var newProduct = Products.all[i];
        var output = addProduct('output', alloutput);
        addProduct('li', output, newProduct.name + ' have ' + newProduct.clickCtr + ' votes ,number of shown ' + newProduct.shownCtr + '.');
    }
}





////////////////////////////////////////////////////////////////////////////////////////
function addProduct(tag, container, text) {

    var element = document.createElement(tag);
    container.appendChild(element);
    if (text) {
        element.textContent = text;
    }
    return element;

}



function clickProduct(event) {

    var productId = event.target.id;
    var formProduct;

    if (productId === 'left-product-image') {
        formProduct = Products.leftObject;
    } else if (productId === 'center-product-image') {
        formProduct = Products.centerObject;
    } else if (productId === 'right-product-image') {
        formProduct = Products.rightObject;

    } else {
        console.log(' Finish ', productId);
    }

    if (formProduct) {
        formProduct.clickCtr++;
        Products.firstCtr++;

        updateTotals();

        if (Products.firstCtr === Products.maxLimit) {

            alert('sorry you finish click trail');

            Products.container.removeEventListener('click', clickProduct);

        } else {

            renderProducts();
        } 
    }
} 

Products.container.addEventListener('click', clickProduct);

updateTotals();

renderProducts();

