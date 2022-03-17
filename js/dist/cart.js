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