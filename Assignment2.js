//schy192
//360750149
const PRODUCTS_DATA = {
  "PRODUCTS": {
    "brocoli": {
      "key": "brocoli",
      "name": "Brocoli",
      "imageURL": "https://cdn.jsdelivr.net/gh/josecarlosgt/infosys280/broccoli.jpg",
      "keywords": ["vegetable", "diet", "food", "fresh", "green"],
      "price": 4
    },
    "grapes": {
      "name": "Grapes",
      "key": "grapes",
      "imageURL": "https://cdn.jsdelivr.net/gh/josecarlosgt/infosys280/grape.jpg",
      "keywords": ["food", "fresh", "fruit", "green"],
      "price": 5
    },
    "strawberries": {
      "name": "Strawberries",
      "key": "strawberries",
      "imageURL": "https://cdn.jsdelivr.net/gh/josecarlosgt/infosys280/strawberry.jpg",
      "keywords": ["food", "fresh", "fruit", "breakfast"],
      "price": 6
    },
    "cheese": {
      "name": "Cheese",
      "key": "cheese",
      "imageURL": "https://cdn.jsdelivr.net/gh/josecarlosgt/infosys280/cheese2.png",
      "keywords": ["dairy", "breakfast", "food"],
      "price": 5
    },
    "yogurt": {
      "name": "Yogurt",
      "key": "yogurt",
      "imageURL": "https://cdn.jsdelivr.net/gh/josecarlosgt/infosys280/yoghurt.png",
      "keywords": ["dairy", "food", "breakfast"],
      "price": 3
    },
    "toothpaste": {
      "name": "Toothpaste",
      "key": "toothpaste",
      "imageURL": "https://cdn.jsdelivr.net/gh/josecarlosgt/infosys280/toothpaste.png",
      "keywords": ["dental", "hygiene"],
      "price": 10
    },
    "shampoo": {
      "name": "Shampoo",
      "key": "shampoo",
      "imageURL": "https://cdn.jsdelivr.net/gh/josecarlosgt/infosys280/shampoo.png",
      "keywords": ["hair", "hygiene"],
      "price": 15
    },
    "soap": {
      "name": "Soap",
      "key": "soap",
      "imageURL": "https://cdn.jsdelivr.net/gh/josecarlosgt/infosys280/soap.jpg",
      "keywords": ["body", "hygiene"],
      "price": 2
    },
    "wine": {
      "name": "Wine",
      "key": "wine",
      "imageURL": "https://cdn.jsdelivr.net/gh/josecarlosgt/infosys280/wine.png",
      "keywords": ["alcohol", "bar", "beverage"],
      "price": 12
    },
    "napkins": {
      "name": "Napkins",
      "key": "baby",
      "imageURL": "https://cdn.jsdelivr.net/gh/josecarlosgt/infosys280/napkin.png",
      "keywords": ["bar", "table"],
      "price": 4
    }
  }
}

const SHOPPING_DATA = {
  searchResults: [],
  cart: [],
  sumOfPrices: []
};

function search() {
  let query = $("#searchbox").val();
  query = query.toLowerCase().trim();

  SHOPPING_DATA.searchResults = [];
  for (let proKey in PRODUCTS_DATA.PRODUCTS) {
    let product = PRODUCTS_DATA.PRODUCTS[proKey];
    let proSearch = product.name.toLowerCase();
    let productKey = product.key.trim();
    if (proSearch == query || productKey.includes(query)) {
      SHOPPING_DATA.searchResults.push(product);
    }
    displaySearchResults();
  }
}

function generateItemHTML(product, clickable = false) {
  let productItem = $("#searchResults");

  let proImg = product.imageURL;
  let proName = product.name;
  let proPrice = product.price

  productItem = $("<li><img src='" + proImg + "'/></li>");
  productItem.append();
  productItem.append("<figcaption>" + proName + " $" + proPrice + "</figcaption>");
  productItem.attr('id', product.key);

  if (clickable) {
    $(productItem).on("click", addProduct);
  }
  return productItem;
}

function displaySearchResults() {
  $("#searchResults").empty();

  for (let product of SHOPPING_DATA.searchResults) {
    let productItem = generateItemHTML(product, true);
    $("#searchResults").append(productItem);
  }
}

//special feature here to give a discount when customer buy 10 products
function addProduct() {
  let productKey = $(this).attr("id");
  SHOPPING_DATA.cart.push(PRODUCTS_DATA.PRODUCTS[productKey]);
  console.log(SHOPPING_DATA.cart.length)
  if (SHOPPING_DATA.cart.length==5){
  alert("Buy 5 more products to get a $5 discount")
  } else if (SHOPPING_DATA.cart.length==10){
  alert ("You had earned $5 discount")
  }
  displayCart();
  $("#total").text("$" + SHOPPING_DATA.sumOfPrices.reduce(function(a, b) {
    return a + b;
  }, 0));
  showPrice();
  SHOPPING_DATA.sumOfPrices.push(Object.values(PRODUCTS_DATA)[selectedProduct.attr("id")].price);

}


function removeProductFromCart() {
  let productKey = $(this).attr("id");
  SHOPPING_DATA.cart.pop(PRODUCTS_DATA.PRODUCTS[productKey]);
  displayCart();
  productKey("click", removeProductFromCart);
  showPrice();
}

function displayCart() {
  $("#shoppingCart").empty();

  for (let product of SHOPPING_DATA.cart) {
    let productItem = generateItemHTML(product);
    $("#shoppingCart").append(productItem);

  }
  $("#shoppingCart").on("click", removeProductFromCart);
}

function init() {
  $("#search").on("click", search);
}
init();
$("#totalPrice").text("$0");

function showPrice() {
  let total = SHOPPING_DATA.cart.reduce(function(acc, productKey) {
    let product = PRODUCTS_DATA[productKey];
    return acc + product.price;
  }, 0);

  $("#totalPrice").text("$" + total);
}
