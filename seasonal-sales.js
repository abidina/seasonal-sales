var prodEl = document.getElementById('product-sales');
var prices = [];
var season = 0;
var discounts = 1;

function forProducts() {
  var product = JSON.parse(this.responseText);
 //structure in the DOM through for loop
 for (var i = 0; i < product.products.length; i++) {
    var currentProduct = product.products[i];
    var addTo = "";
    addTo += `<article>
      <h1>${currentProduct.name}</h1>
      <section name='num${currentProduct.category_id}'>
      </section>
      <p id='id${i}' name='discounts${currentProduct.category_id}'>${currentProduct.price}</p>
      </article>`
    prodEl.innerHTML += addTo;
    prices[i] = currentProduct.price;
 }
};

//plugs category names into product articles
function forCategories() {
  var cats = JSON.parse(this.responseText);
  for (i in cats.categories) {
    var catName = cats.categories[i].name;
    var grabCatNames = document.getElementsByName('num' + cats.categories[i].id);
    for (j in grabCatNames) {
      grabCatNames[j].innerHTML = catName;
    };
  }
};

//XHR to load products
var prodLoad = new XMLHttpRequest();
prodLoad.addEventListener('load', forProducts);
prodLoad.open("GET", "products.json");
prodLoad.send();

//XHR to load categories
var catLoad = new XMLHttpRequest();
catLoad.addEventListener('load', forCategories);
catLoad.open("GET", "categories.json");
catLoad.send();

// GET means grab whatever you're trying to link into the page (ie. products.JSON)

// CLICK EVENTS
var dropdown = document.getElementById('dropdownMenu');
dropdown.addEventListener("click", discountMe);

function discountMe() {
  var dropdownVal = dropdown.value;
  if(dropdownVal === "spring") {
    discount = .15;
    season = 3;
    fullPrice();
    runDiscount();
  } else if (dropdownVal === "autumn") {
    discount = .25;
    season = 2;
    fullPrice();
    runDiscount();
  } else if (dropdownVal === "winter") {
    discount = .1;
    season = 1;
    fullPrice();
    runDiscount();
  } else { 
    fullPrice();
  };
};

function fullPrice() {
  for(i in prices) {
    document.getElementById('id' + i).innerHTML = prices[i];
  }
};

function runDiscount() {
  var seasonalDiscount = document.getElementsByName('discounts' + season);
  for (i in seasonalDiscount){
    seasonalDiscount[i].innerHTML = (parseFloat(seasonalDiscount[i].innerHTML) - parseFloat(seasonalDiscount[i].innerHTML) * discount).toFixed(2);
  };
};