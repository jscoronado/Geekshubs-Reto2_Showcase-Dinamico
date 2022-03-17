$(function () {

	/* DRAG AND DROP - Estados Carrito
    -------------------------------------------------------------- */
	$("#product li").draggable({
		revert: true,
		containment: '#body',
		snap: 'cart',
		helper: 'clone',
		zIndex: 100,

		drag: function () {
			$(this).addClass("active");
			$(this).closest("#product").addClass("active");
		},

		stop: function () {
			$(this).removeClass("active").closest("#product").removeClass("active");
		}
	});

	$("#cart").droppable({
		activeClass: "active",
		hoverClass: "hover",
		helper: 'clone',
		tolerance: "touch",

		drop: function (event, ui) {

			var itemsCart = $('.items__list-cart'),
				getProduct = ui.draggable,
				itemId = itemsCart.find("ul li[data-id='" + getProduct.attr("data-id") + "']");

			if (itemId.html() != null) {
				itemId.find("input").val(parseInt(itemId.find("input").val()) + 1);
			} else {
				addToCart(itemsCart, getProduct);
				getProduct.find("input").val(parseInt(getProduct.find("input").val()) + 1);
			}

			verifyInputCart(getProduct);

		}
	});

	/* ESTADOS ELEMENTOS
	-------------------------------------------------------------- */

	$('#checkout').hide();
	$('#help').hide();
	$('#clear').hide();
	

	/* FUNCIONES
	-------------------------------------------------------------- */
	function addToCart(itemsCart, getProduct) {

		itemsCart.find("ul").append('<li data-id="' + getProduct.attr("data-id") + '" class="item item-cart">'
			+ '<img src="./imgs/' + getProduct.attr("data-id") + '.jpg" class="img__item-cart">'
			+ '<div class="data__item-cart">'
			+ '<h4 class="name__item-cart">' + getProduct.find("h3").html() + '</h4>'
			+ '<span class="price__item-cart">' + getProduct.find(".price").html() + '</span>'
			+ '<label for="qty">Cantidad:</label><input class="count form-control input-sm" id="qty" value="1" type="number" min="1" step="1">' + ''
			+ '</div>'
			+ '<a href="javascript:void(0);" class="delete delete-item" onclick="removeFromCart('+getProduct.attr("data-id")+');">-</a>'
		);

		if (typeof $('.items__list-cart ul li') !== "undefined") {
			$('#checkout').fadeIn('fast');
			$('#clear').fadeIn('fast');
		}

		// Avisos
		$(".aviso").text('¡Producto añadido al carrito!').fadeIn();
		setTimeout(function() { $(".aviso").fadeOut(); }, 3000);
		$("#list-cart .subtitle__list-cart").text('¡Revisa que lo tengas todo y selecciona "Enviar pedido" para preparar tu comanda!').fadeIn();
	}

	function emptyBasket() {
		$('.items__list-cart ul li').fadeOut(800, function () {
			$('.items__list-cart ul li').remove();
		});
		$('#checkout').fadeOut('fast');
		$('#clear').fadeOut('fast');
	}

	function removeFromCart(product) {
		var nameProduct = $('#list-cart .items__list-cart ul li.item.item-cart[data-id="' + product + '"] h4').val();
		$('#list-cart .items__list-cart ul li.item.item-cart[data-id="' + product + '"]').fadeOut('fast', function () {
			$(this).remove();
		});
		$(".aviso").text('¡Producto' + nameProduct + ' eliminado!').fadeIn();
		setTimeout(function() { $(".aviso").fadeOut(); }, 3000);
	}


	/* VERIFICACIONES
	-------------------------------------------------------------- */
	function verifyInputCart(getProduct) {

		var returnVerify = "";

		if (typeof $('li[data-id="' + getProduct.attr("data-id") + '"] .count').val() !== "undefined") {
			if ($('li[data-id="' + getProduct.attr("data-id") + '"] .count').val() <= 0 || $('li[data-id="' + getProduct.attr("data-id") + '"] .count').val().length === 0 || $('li[data-id="' + getProduct.attr("data-id") + '"] .count').val() % 1 !== 0) {
				returnVerify = false;
			} else {
				returnVerify = true;
			}
		} else {
			returnVerify = true;
		}

		if (!returnVerify) {
			$('#checkout').attr('disabled', true);
		} else {
			$('#checkout').attr('disabled', false);
		}
	}

	/* EVENTOS
	-------------------------------------------------------------- */

	$('body').on('change', '.items__list-cart ul li .count', function () {
		verifyInputCart();
	});

	$('body').on('keyup', '.items__list-cart ul li .count', function () {
		verifyInputCart();
	});

	/* No funciona */
	$('a.delete.delete-item').on('click', function () {
		alert('hola');
		if ($('.items__list-cart ul li').size() === 1) {
			emptyBasket();
		} else {
			$(this).closest("li").fadeOut('fast', function () {
				$(this).closest("li").remove();
				verifyInputCart();
			});
		}
	});

	$('button#checkout').on('click', function () {
		emptyBasket();
		$(".aviso").text('¡Pedido solicitado!').fadeIn();
		setTimeout(function() { $(".aviso").fadeOut(); }, 3000);
		$("#list-cart .subtitle__list-cart").text('¡Tu carrito está vacío! Vuelve a la carta para solicitar una comanda').fadeIn();

	});

	$('button#clear').on('click', function () {
		emptyBasket();
		$(".aviso").text('¡Carrito vaciado!').fadeIn();
		setTimeout(function() { $(".aviso").fadeOut(); }, 3000);
		$("#list-cart .subtitle__list-cart").text('¡Tu carrito está vacío! Vuelve a la carta para solicitar una comanda').fadeIn();
	});

});