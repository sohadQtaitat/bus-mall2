'use strict';


function products(name, src) {
  this.name = name;
  this.src = src;
  this.clickCtr = 0;
  this.seenCounter = 0;
  products.all.push(this);
}

products.initialCounter = 0;
products.maxLimit = 25;
products.all = [];


products.container = document.getElementById('productForm');

products.leftImage = document.getElementById('left-product-image');
products.centerImage = document.getElementById('center-product-image');
products.rightImage = document.getElementById('right-product-image');


products.leftTitle = document.getElementById('left-product-title');
products.centerTitle = document.getElementById('center-product-title');
products.rightTitle = document.getElementById('right-product-title');

products.leftObject = null;
products.centerObject = null;
products.rightObject = null;





new products('pet-sweep', 'img/pet-sweep.jpg');
new products('scissors', 'img/scissors.jpg');
new products('shark', 'img/shark.jpg');
new products('sweep', 'img/sweep.png');
new products('tauntaun', 'img/tauntaun.jpg');
new products('unicorn', 'img/unicorn.jpg');
new products('usb', 'img/usb.gif');
new products('water-can', 'img/water-can.jpg');
new products('wine-glass', 'img/wine-glass.jpg');
new products('bag', 'img/bag.jpg');
new products('banana', 'img/banana.jpg');
new products('bathroom', 'img/bathroom.jpg');
new products('boots', 'img/boots.jpg');
new products('breakfast', 'img/breakfast.jpg');
new products('bubblegum', 'img/bubblegum.jpg');
new products('chair', 'img/chair.jpg');
new products('cthulhu', 'img/cthulhu.jpg');
new products('dog-duck', 'img/dog-duck.jpg');
new products('dragon', 'img/dragon.jpg');
new products('pen', 'img/pen.jpg');





































function renderNewProducts() {

  var forbidden = [products.leftObject, products.centerObject, products.rightObject];

  do {

    products.leftObject = getRandomProduct();

  } while (forbidden.includes(products.leftObject))
  forbidden.push(products.leftObject);
  do {

    products.centerObject = getRandomProduct();

  } while (forbidden.includes(products.centerObject));
  forbidden.push(products.centerObject);
  do {

    products.rightObject = getRandomProduct();
  } while (forbidden.includes(products.rightObject));

  products.leftObject.seenCounter++;                                      
  products.centerObject.seenCounter++;
  products.rightObject.seenCounter++;


  var leftProductImageElement = products.leftImage;
  var centerProductImageElement = products.centerImage;
  var rightProductImageElement = products.rightImage;


  leftProductImageElement.setAttribute('src', products.leftObject.src);           
  leftProductImageElement.setAttribute('alt', products.leftObject.name);

  centerProductImageElement.setAttribute('src', products.centerObject.src);       
  centerProductImageElement.setAttribute('alt', products.centerObject.name);

  rightProductImageElement.setAttribute('src', products.rightObject.src);         
  rightProductImageElement.setAttribute('alt', products.rightObject.name);


  products.leftTitle.textContent = products.leftObject.name;
  products.centerTitle.textContent = products.centerObject.name
  products.rightTitle.textContent = products.rightObject.name;

}   






function getRandomProduct() {
  var index = Math.floor(Math.random() * products.all.length);
  console.log('index', index);
  return products.all[index];
} 



function updateTotals() {

  var alloutput = document.getElementById('productList');

  alloutput.innerHTML = '';

  for (var i = 0; i < products.all.length; i++) {
    var newProduct = products.all[i];
    var output = addElement('output', alloutput);
    addElement('li', output, newProduct.name + '= ' + newProduct.clickCtr + ' votes and number of shown = ' + newProduct.seenCounter + ' .');
  }
} 



function addElement(tag, container, text) {

  var element = document.createElement(tag);
  container.appendChild(element);
  if (text) {
    element.textContent = text;
  }
  return element;

}  



function clickHandler(event) {

  var clickItemId = event.target.id;
  var productChlicked;

  if (clickItemId === 'left-product-image') {
    productChlicked = products.leftObject;
  } else if (clickItemId === 'center-product-image') {
    productChlicked = products.centerObject;
  } else if (clickItemId === 'right-product-image') {
    productChlicked = products.rightObject;

  } else {
    console.log('Finished ', clickItemId);
  }

  if (productChlicked) {
    productChlicked.clickCtr++;
    products.initialCounter++;

    updateTotals();

    if (products.initialCounter === products.maxLimit) {

      alert('sorry finish your trails  ');
      fullChart();

      products.container.removeEventListener('click', clickHandler);

    } else {

      renderNewProducts();
    } 
  }  
}  

products.container.addEventListener('click', clickHandler);

updateTotals();

renderNewProducts();






var ctx = document.getElementById('chart').getContext('2d');


var productsNames = [];
var productsSeen = [];
var productsClicks = [];


function makeProductname() {

  for (var i = 0; i < products.all.length; i++) {        
    var productName = products.all[i].name;
    productsNames.push(productName);
    console.log('productsnames', productsNames);
  }

  return productsNames;

}

function makeProductseen() {

  for (var i = 0; i < products.all.length; i++) {
    var productSeen = products.all[i];
    productsSeen.push(productSeen.seenCounter);
    console.log('productsSeen', productsSeen);
  }

  return productsSeen;
} 





function makeProductclick() {

  for (var i = 0; i < products.all.length; i++) {
    var productClick = products.all[i];
    productsClicks.push(productClick.clickCtr);
    console.log('productsClicks', productsClicks);
  }

  return productsClicks;

}




function fullChart()
{

  console.log('Chart : ', Chart);
  var chart = new Chart(ctx, {
    type: 'bar',
  
    
    data: {
      labels: makeProductname(),
      datasets: [
        {
          label: 'lab11 ',
          backgroundColor: 'rgb(205, 9, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: makeProductclick()
        }, 
{         label: 'lab12 ',
          backgroundColor: 'rgb(125, 3, 179)',
          borderColor: ' rgb(125, 63, 170)',
          data: makeProductseen(), 
          type: 'line'
        }            ]
        
        
    },
    options: {}
  });

}







var localStorgee = document.getElementById('productList');
  
  
function updateProducts() {
  var productString = JSON.stringify(products.all);
  localStorage.setItem('Products', productString);
}





function getProducts() {
  var productData = localStorage.getItem('Products');


  var ProductData = JSON.parse(productData);




  if (ProductData) {
      for (let i = 0; i < ProductData.length; i++) {
      var createProductObject = ProductData[i];
      var chgProductCtrs = products.all[i];
      
      chgProductCtrs.seenCounter = createProductObject.seenCounter;
      chgProductCtrs.clickCtr = createProductObject.clickCtr;
    }


    renderNewProducts();
  }else {
    
    alert('emptyyyyyy');

  }

}
renderNewProducts();
getProducts();
updateTotals();



