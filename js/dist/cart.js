/*! JS Drag & Drop - Showcase Dinámico
 * Autor: Jose M. Coronado
 * Desc: Funcionalidad de uso de carrito con sistema de Drag and Drop para incluir los productos y datos.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

/* # Data Products and Cart
-------------------------------------------------------------- */
const items_product = document.querySelectorAll('.item-product');
const cart_product = document.querySelectorAll('#cart');
const list_products = document.querySelectorAll('.items__list-cart');

/* # List Products
-------------------------------------------------------------- */
var products = [
	{
		id: 1,
		sku: 'burger-01',
		title: 'Corona Burger',
		desc: 'Burger NoChicken con queso brie, cebolla caramelizada y salsa de miel y mostaza.',
		price: '9.50',
		image: './imgs/burger-01.png',
		image_cart: './imgs/burger-01.jpg',
		color: 'green',
	},
	{
		id: 2,
		sku: 'burger-02',
		title: 'Pancho Burger',
		desc: 'Burger de NoBeef con cebolla crunchy, queso raclette, cebolla caramelizada y salsa bbq.',
		price: '11',
		image: './imgs/burger-02.png',
		image_cart: './imgs/burger-02.jpg',
		color: 'green',
	},
	{
		id: 3,
		sku: 'burger-03',
		title: 'Woody Burger',
		desc: 'Burger hecha a base de verduras con guacamole, queso feta, lechuga y salsa ranchera.',
		price: '10',
		image: './imgs/burger-03.png',
		image_cart: './imgs/burger-03.jpg',
		color: 'green',
	},
	{
		id: 4,
		sku: 'complement-01',
		title: 'Ignacios con guacamole',
		desc: 'Guacamole casero al más puro estilo mexicano.',
		price: '7.50',
		image: './imgs/complement-01.png',
		image_cart: './imgs/complement-01.jpg',
		color: 'yellow',
	},
	{
		id: 5,
		sku: 'complement-02',
		title: 'Nuggets Nochicken',
		desc: 'Hechos a base de proteína de soja.',
		price: '6',
		image: './imgs/complement-02.png',
		image_cart: './imgs/complement-02.jpg',
		color: 'yellow',
	},
	{
		id: 6,
		sku: 'milkshake',
		title: 'Milkshake',
		desc: 'Helado con un toque de vainilla, leche, nata, crema de cacahuete y sirope de dulce de leche.',
		price: '4',
		image: './imgs/milkshake.png',
		image_cart: './imgs/milkshake.jpg',
		color: 'purple',
	},
];

/* # Drag % Drop
-------------------------------------------------------------- */
function onDrag(ev)  {
	ev.target.classList.add("product-drag");
	document.getElementById("cart").classList.add("product-drag");
	document.getElementById("hero").classList.add("opacity-section");
}

function onDragOver(ev)  {
	ev.preventDefault();
	ev.dataTransfer.dropEffect = "copy";
}

function onDrop(ev) {
	ev.preventDefault();

	try {
		let product = document.getElementById(ev.dataTransfer.getData("text/html"));
		if(ev.dataTransfer.dropEffect == 'copy') {
			const product_cart = product.cloneNode(true);
			product_cart.removeAttribute("id");
			document.getElementsByClassName("items__list-cart").appendChild(product_cart);
		}

	} catch(err) {
		console.error(err);
	}
}

function onDragEnd(ev) {
	let itemId = ev.target.getAttribute("id");
	ev.target.classList.remove("product-drag");
	document.getElementById("cart").classList.remove("product-drag");
	document.getElementById("hero").classList.remove("opacity-section");

	window.products.forEach((p) => {
		if("product-" + p.id == itemId) {
			saveListCart(p.id);
		}
	});
}

/* # Print list products
-------------------------------------------------------------- */
function showProducts(products)
{
	document.getElementById("productos").innerHTML = "";
	let delayElement = 100;

	products.forEach((product) => {
		const enableDraggable = 'draggable="true"';

		document.getElementById("productos").innerHTML += `
			<li id="product-${product.id}" class="item-product ${product.color}" ${enableDraggable} 
			data-aos="fade-up" data-aos-delay="${delayElement}" data-aos-duration="600" data-aos-offset="0" data-aos-once="true"  
			ondrag="onDrag(event)" ondragend="onDragEnd(event)">
				<div class="img__item-product">
					<img src="${product.image}" alt="${product.title}">
				</div>
				<div class="info__item-product">
					<h3>${product.title}</h3>
					<span class="price" data-price="${product.price}">${product.price}€</span>
					<span class="desc">${product.desc}</span>
				</div>
			</li>
   		`;

		delayElement = delayElement + 200;
	});
}

/* # Get and set data in session cart
-------------------------------------------------------------- */
function getListCart() {
	const cartData = window.sessionStorage.getItem("cart_data");
	if(!cartData) {
		return null;
	}
	return JSON.parse(cartData);
}

function saveListCart(productId) {
	if(productId) {
		const shoppingCart = getListCart();

		const prod = window.products.find((i) => i.id == productId);

		let data = [];
		if (shoppingCart === null) {
			data.push({pid: productId, amount: 1, unit_price: prod.price});
		} else {
			data = shoppingCart;

			const checkProductIndex = data.findIndex((i) => i.pid == productId);
			if (checkProductIndex >=0 && checkProductIndex !== undefined) {
				data[checkProductIndex].amount = parseInt(data[checkProductIndex].amount) + 1;
			} else {
				data.push({pid: productId, amount: 1, unit_price: prod.price});
			}
		}

		window.sessionStorage.setItem("cart_data", JSON.stringify(data));

		displayTotalAmountInCart();
		displayCartProducts();
	}

	showMessage('aviso', '¡Producto añadido al carrito!');
}

function getCountProductsCart() {
	const shoppingCart = getListCart();

	let total = {count: 0, total_price: 0};

	if(shoppingCart != null) {
		const data = shoppingCart;
		data.forEach((i) => {
			total.count += i.amount;
			total.total_price += i.amount * i.unit_price;
		});
	}

	return total;
}

function removeFromCart(productId) {
	const shoppingCart = getListCart();

	if(confirm("¿Seguro que quieres eliminar?")) {

		if (shoppingCart != null) {
			const removedProduct = shoppingCart.find(i => i.pid == productId);
			const newData = shoppingCart.filter(i => i.pid != productId);

			window.sessionStorage.setItem("cart_data", JSON.stringify(newData));

			// re-render products
			showProducts(window.products);

			displayTotalAmountInCart();
			displayCartProducts();
		}

		showMessage('aviso-cart', '¡Producto eliminado del carrito!');
	}

	return false;
}

function displayTotalAmountInCart() {
	const iconQuantity = document.getElementById("quantity");
	const dataQuantity = document.getElementById("data-cart");

	const totalProds = getCountProductsCart();

	if(totalProds.count > 0) {
		const productos = 'productos'
		if(totalProds.count == 1) {
			const productos = 'producto'
		}

		iconQuantity.style.display = "block";
		iconQuantity.innerHTML = "<span class='total'>" + totalProds.count + "</span>";

		dataQuantity.style.display = "block";
		dataQuantity.innerHTML = "<div class='total'><h5>Pedido</h5><span>" + totalProds.count + " " + productos + " </span></div>" +
			"<div class='total-price'><h5>Total</h5><span>" + (totalProds.total_price).toFixed(1) + "€</span></div>";
	} else {
		iconQuantity.style.display = "none";
		iconQuantity.innerHTML = "";
	}
}

function displayCartProducts() {
	const shoppingCart = getListCart();

	if(shoppingCart != null && shoppingCart.length > 0) {
		const data = shoppingCart;

		let html = "<ul>";

		data.forEach((i) => {
			const findProd = window.products.find((prod) => prod.id == i.pid);
			const totalPricePerProd = (i.amount * i.unit_price).toFixed(1);
			html +=
			`<li data-id="${findProd.sku}" class="item item-cart">
				<img src="${findProd.image_cart}" class="img__item-cart">
				<div class="data__item-cart">
					<h4 class="name__item-cart">${findProd.title}</h4>
					<span class="price__item-cart">${findProd.price}</span>
					<label for="qty">Cantidad:</label>
					<input class="count form-control input-sm" id="qty" value="${i.amount}" type="number" min="1" step="1">
				</div>
				<a href="javascript:void(0);" class="delete delete-item" onclick="removeFromCart(${i.pid});">-</a>
			</li>`
		});

		html += "</ul>";

		document.getElementById("products-in-cart").innerHTML = html;
		return;
	}

	showMessage('aviso-cart', '¡Tu carrito está vacío!')
}

window.onload = (e) => {
	sessionStorage.clear();
	showProducts(products);
	displayTotalAmountInCart();
	displayCartProducts();
}

/* # Add event to drag and drop to cart
-------------------------------------------------------------- */
function addEvent(element, event, delegate ) {
	if (typeof (window.event) != 'undefined' && element.attachEvent)
		element.attachEvent('on' + event, delegate);
	else
		element.addEventListener(event, delegate, false);
}

addEvent(document, 'readystatechange', function() {
	addEvent(cart_product, 'drop', onDrop);
	addEvent(cart_product, 'dragover', onDragOver);
});

