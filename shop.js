/*
 TODO:

 # methods
 1- product.toHTML()
 2- product.toHTMLForList()
 3- order_item.toHTML()
 4- order.toHTML()

 # callbacks
 1- window.onload              -> setInitialState()
 2- .addItem.onclick           -> addItem()
 3- .incrementQuantity.onclick -> incrementQuantity()
 4- .decrementQuantity.onclick -> decrementQuantity()
 5- .removeItem.onclick        -> removeItem()

 6- #discountCode.onsubmit     -> applyDiscount()
 7- #order.onsubmit            -> sumbitOrder()
*/



function Product(id, name, images, quantityAvailable, sizesAvailable, price, designer, type){
	this.id = id;
	this.name = name;
	this.images = images;
	this.quantityAvailable = quantityAvailable;
	this.sizesAvailable = sizesAvailable;
	this.price = price;  
	this.designer = designer; 
	this.type = type;
}

var pp = Product.prototype;
pp.toHTML = function() {

}

pp.toHTMLForList = function() {
  return "<div class=\"product\">".concat("<img src=\"", this.images[0], "\"/><h6 class=\"product-name\">", this.name, "</h6><span class=\"product-price\">$", this.price, "</span><a href=\"#\" data-product-id=\"", this.id, "\" class=\"add-to-order-button\">Add to cart</a></div>")
}

pp.hasSize = function(size) {
	for(var i = 0; i < this.sizesAvailable.length; i++){
		if(size === this.sizesAvailable[i]){
			return true;
		}
	}
	return false;
}

var OrderItem = function(product, quantity){
	this.product = product;
	this.quantity = quantity; 
}

var oip = OrderItem.prototype;
oip.totalPrice = function(){
	return this.product.price * this.quantity;
}

oip.toHTML = function() {
	return "<li>".concat(this.product.name, " Qnt: ", this.quantity, " Price: $", this.product.price, "</li>")
}

var Order = function(){
	this.items = [];
	this.discount = 0;
}

var op = Order.prototype;
op.addItem = function(newItem){
	var matchedItem = null;

	for(var i = 0, item = this.items[i]; item; item = this.items[i += 1]){
	   if(item.product === newItem.product) {
		  matchedItem = item;
		  break;
	   }
	}

	if(matchedItem){
		matchedItem.quantity += newItem.quantity;
	} else {
		this.items.push(newItem);
	}
}

op.availableCoupons = {
	'spring10' : 0.1,
	'first20'  : 0.2
}

op.applyCoupon = function(code) {
	this.discount = this.availableCoupons[code];
}

op.totalPrice = function(price){
	var tp = 0;

	for(var i = 0, item = this.items[i]; item; item = this.items[i += 1]){
	  tp += item.totalPrice();
	}

	return tp;
}

op.totalPriceWithDiscount = function() {
   return this.totalPrice() * (1 - this.discount);
}

op.shippingPrice = function(){
	var minTotalPriceForFreeShipping = 150,
		defaultShippingPrice         = 9.99;

	return (this.totalPrice() > minTotalPriceForFreeShipping) ? 0 : defaultShippingPrice;
}

op.toHTML = function() {
	if (this.items.length === 0) {
		return "You have not ordered anything yet"
	} else {
		var HTML = "<h3 id=\"cart-header\">Currently in your cart:</h3><div id=\"ordered-goods\"><ol>";

		for(var i = 0, item = this.items[i]; item; item = this.items[i += 1]){
			HTML = HTML.concat(item.toHTML());
		}

		return HTML.concat("</ol></div><span id=\"total-price\">Total Price:", this.totalPrice(), "</span><span id=\"shipping-price\">Shipping price:", this.shippingPrice(), "</span><span id=\"total-price-with-discount\">Total price with discount:", this.totalPriceWithDiscount(), "</span><button id=\"proceed-btn\">Order</button>")
	}
}

var DATA = {
	products: [
	   new Product(1,  "DSQUARED2 Barbed Wire Sandal",    ["http://a3.zassets.com/images/z/3/2/5/4/1/3/3254131-p-LARGE_SEARCH.jpg", "http://a3.zassets.com/images/z/3/2/5/4/1/3/3254131-1-MULTIVIEW.jpg", "http://a1.zassets.com/images/z/3/2/5/4/1/3/3254131-3-MULTIVIEW.jpg","http://a1.zassets.com/images/z/3/2/5/4/1/3/3254131-6-MULTIVIEW.jpg"],  10, [35,36,37,38],       500,  "DSQUARED2",         ["Heels", "Sandals"]),
	   new Product(2,  "DSQUARED2 Victorian Bootie",      ["http://a3.zassets.com/images/z/3/7/1/9/3/8/3719388-p-LARGE_SEARCH.jpg","http://a3.zassets.com/images/z/3/7/1/9/3/8/3719388-3-MULTIVIEW.jpg", "http://a1.zassets.com/images/z/3/7/1/9/3/8/3719388-4-MULTIVIEW.jpg","http://a2.zassets.com/images/z/3/7/1/9/3/8/3719388-5-MULTIVIEW.jpg"],   10, [35,36,37,38,40],    1986, "DSQUARED2",         ["Heels"]), 
	   new Product(3,  "DSQUARED2 Jeweled Wedge Sandal",  ["http://a3.zassets.com/images/z/3/0/8/4/5/1/3084513-p-LARGE_SEARCH.jpg", "http://a2.zassets.com/images/z/3/0/8/4/5/1/3084513-3-MULTIVIEW.jpg", "http://a3.zassets.com/images/z/3/0/8/4/5/1/3084513-5-MULTIVIEW.jpg", "http://a1.zassets.com/images/z/3/0/8/4/5/1/3084513-6-MULTIVIEW.jpg"], 10, [35,36,38,39,40],    750,  "DSQUARED2",         ["Heels","Sandals"]), 
	   new Product(4,  "CoSTUME NATIONAL 40639 22295",    ["http://a1.zassets.com/images/z/3/2/7/6/6/1/3276612-p-LARGE_SEARCH.jpg", "http://a1.zassets.com/images/z/3/2/7/6/6/1/3276612-4-MULTIVIEW.jpg","http://a3.zassets.com/images/z/3/2/7/6/6/1/3276612-5-MULTIVIEW.jpg","http://a1.zassets.com/images/z/3/2/7/6/6/1/3276612-3-MULTIVIEW.jpg"],   10, [35,36,37,38,39,40], 830,  "CoSTUME NATIONAL",  ["Boots"]),
	   new Product(5,  "Sergio Rossi Puzzle Basic",       ["http://a2.zassets.com/images/z/3/2/6/2/2/8/3262284-p-LARGE_SEARCH.jpg","http://a2.zassets.com/images/z/3/2/6/2/2/8/3262284-3-MULTIVIEW.jpg", "http://a2.zassets.com/images/z/3/2/6/2/2/8/3262284-4-MULTIVIEW.jpg", "http://a2.zassets.com/images/z/3/2/6/2/2/8/3262284-6-MULTIVIEW.jpg"],  10, [35],                899,  "Sergio Rossi",      ["Heels"]),
	   new Product(6,  "DSQUARED2 Ankle Boot",            ["http://a2.zassets.com/images/z/3/2/6/2/2/8/3262284-p-LARGE_SEARCH.jpg", "http://a2.zassets.com/images/z/3/3/1/5/6/5/3315656-4-MULTIVIEW.jpg", "http://a2.zassets.com/images/z/3/3/1/5/6/5/3315656-5-MULTIVIEW.jpg", "http://a3.zassets.com/images/z/3/3/1/5/6/5/3315656-6-MULTIVIEW.jpg"],    10, [39,40],             905,  "DSQUARED2",         ["Boots", "Heels"]), 
	   new Product(7,  "Philipp Plein High Heels Turtle", ["http://a3.zassets.com/images/z/3/3/1/2/7/1/3312717-p-LARGE_SEARCH.jpg", "http://a1.zassets.com/images/z/3/3/1/2/7/1/3312717-2-MULTIVIEW.jpg", "http://a1.zassets.com/images/z/3/3/1/2/7/1/3312717-3-MULTIVIEW.jpg","http://a2.zassets.com/images/z/3/3/1/2/7/1/3312717-5-MULTIVIEW.jpg"],  10, [35,36,37,38,39,40], 701,  "Philipp Plein",     ["Heels"]),
	   new Product(8,  "Marchesa Camilla",                ["http://a3.zassets.com/images/z/3/3/1/2/7/1/3312717-p-LARGE_SEARCH.jpg", "http://a3.zassets.com/images/z/3/6/6/2/7/3/3662730-3-MULTIVIEW.jpg", "http://a3.zassets.com/images/z/3/6/6/2/7/3/3662730-5-MULTIVIEW.jpg","http://a3.zassets.com/images/z/3/6/6/2/7/3/3662730-6-MULTIVIEW.jpg"],     10, [35,36,39,40],       822,  "Marchesa",          ["Heels"]),
	   new Product(9,  "Dolce & Gabbana Maolica",         ["http://a1.zassets.com/images/z/3/7/0/8/9/1/3708918-p-LARGE_SEARCH.jpg","http://a1.zassets.com/images/z/3/7/0/8/9/1/3708918-4-MULTIVIEW.jpg","http://a1.zassets.com/images/z/3/7/0/8/9/1/3708918-5-MULTIVIEW.jpg","http://a3.zassets.com/images/z/3/7/0/8/9/1/3708918-6-MULTIVIEW.jpg"],    10, [35,36,37,38,39,40], 768,  "Dolce & Gabbana",   ["Sandals"]), 
	   new Product(10, "CoSTUME NATIONAL 16012 22288",    ["http://a2.zassets.com/images/z/3/2/7/6/6/1/3276618-p-LARGE_SEARCH.jpg", "http://a2.zassets.com/images/z/3/2/7/6/6/1/3276618-3-MULTIVIEW.jpg", "http://a1.zassets.com/images/z/3/2/7/6/6/1/3276618-4-MULTIVIEW.jpg","http://a1.zassets.com/images/z/3/2/7/6/6/1/3276618-5-MULTIVIEW.jpg"],  10, [35,40],             1001, "CoSTUME NATIONAL",  ["Heels"]),
	   new Product(11, "Vivienne Westwood Conjurer",      ["http://a3.zassets.com/images/z/3/6/6/0/4/7/3660470-p-LARGE_SEARCH.jpg","http://a1.zassets.com/images/z/3/6/6/0/4/7/3660470-3-MULTIVIEW.jpg","http://a2.zassets.com/images/z/3/6/6/0/4/7/3660470-4-MULTIVIEW.jpg","http://a2.zassets.com/images/z/3/6/6/0/4/7/3660470-5-MULTIVIEW.jpg"],    10, [35,36,37,40],       754,  "Vivienne Westwood", ["Heels"])
	],

	availableSizes: [35, 36, 37, 38, 39, 40],
	shoeTypes:      ["Sandals", "Heals", "Sneakers & athletic shoes", "Flats", "Boots"],
	order:          new Order()
}

var renderOrder = function(container, order) {
	container.innerHTML = order.toHTML();
}

var renderSizeFilter = function(container, sizes) {

}

var renderTypes = function(container, types) {

}

var addToOrder = function(e) {
	var pid   = parseInt(e.target.dataset.productId),
	    order = DATA.order;

	for (var i = 0, product = DATA.products[i]; product; product = DATA.products[i += 1]) {
		if (product.id === pid) {
			console.log(product, order);

			order.addItem(new OrderItem(product, 1));
			renderOrder(document.getElementById("order"), order);

			break;
		}
	}
}

var renderProductList = function(container, products) {
	var HTML = "";

	for(var i = 0, product = products[i]; product; product = products[i += 1]) {
		HTML = HTML + product.toHTMLForList()
	}

	container.innerHTML = HTML;

	var addToOrderBtns = document.getElementsByClassName("add-to-order-button");

	for(var i = 0; i < addToOrderBtns.length; i++){
		addToOrderBtns[i].onclick = addToOrder;
	}
}

var selectAndRender = function(container, selectFn, productsToSelect) {
	var products = [];

	for (var i = 0, product = productsToSelect[i]; product; product = productsToSelect[i += 1]) {
		if (selectFn(product)) {
			products.push(product)
		}
	}

	renderProductList(container, products);
}

var generateSelectFn = function(type, size) {
	return function(product) {
		if (type && size) {
			return product.type === type && product.hasSize(size)
		} else if (type) {
			return product.type === type;
		} else if (size) {
			return product.hasSize(size)
		} else {
			return true;
		}
	}
}

window.onload = function() {
	renderOrder(document.getElementById("order"), DATA.order)

	/* Renders all the products by default */
	var productsList = document.getElementById("products-list");
	renderProductList(productsList, DATA.products);
}

