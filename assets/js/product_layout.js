
var clothes = [{nos:'new', id:0, description:'Obey T-shirt with Tiger Print0', price:5, price_old: undefined, 
color:'blue', sizes:['XS', 'L'], url:'http://res.cloudinary.com/dx14yj8j9/image/upload/c_fill,h_450,w_270/v1501272946/d6fdea3b3a41a016caca0db39195fbbd--skate-fashion-tomboy-fashion_po5xz3.jpg'},
{nos:'new', id:1, description:'Obey T-shirt with Tiger Print1', price:10, price_old: undefined, 
color: 'blue', sizes:['M', 'L'], url:'http://res.cloudinary.com/dx14yj8j9/image/upload/c_fill,h_450,w_270/v1501260638/LonglineHoodedT-shirt_opvcru.jpg'},
{nos:'sale', id:2, description:'Obey T-shirt with Tiger Print2', price:20, price_old: undefined, 
color: 'black', sizes:['XS', 'L'], url:'http://res.cloudinary.com/dx14yj8j9/image/upload/c_fill,h_450,w_270/v1501260638/barbourInternationT-shirt_k4wq0c.jpg'},
{nos:'sale', id:3, description:'Obey T-shirt with Tiger Print3', price:30, price_old: 38, 
color: 'black', sizes:['XL', 'L'],url:'assets/img/NikeDrawstringBackpack.jpg'},
{nos:'sale', id:4, description:'Obey T-shirt with Tiger Print4', price:40, price_old: undefined,
color: 'red', sizes:['XS', 'M', 'S'], url:'https://cdn.vox-cdn.com/uploads/chorus_asset/file/5851535/GettyImages-465888368.0.jpg'},
{nos:'sale', id:5, description:'Obey T-shirt with Tiger Print5', price:50, price_old: 35, 
color: 'blue', sizes:['XS', 'L', 'XS'], url:'http://cometrend.com/wp-content/uploads/2016/03/33-11-684x1024.jpg'},
{nos:'new', id:6, description:'Obey T-shirt with Tiger Print6', price:60, price_old: 45, 
color: 'green', sizes:['XS', 'L', 'M'], url:'http://i.imgur.com/jyCXuJs.jpg'},
{nos:'sale', id:7, description:'Obey T-shirt with Tiger Print7', price:70, price_old: undefined, 
color: 'pink', sizes:['XS', 'L', 'XL'], url:'http://2.bp.blogspot.com/-NELJRBM5FNI/UlVLhlO-gNI/AAAAAAAAAsg/_BNRO-paQyA/s1600/Saskia+Elisa_DSC0223_01.JPG'},
{nos:'new', id:8, description:'Obey T-shirt with Tiger Print8', price:80, price_old: undefined,
color: 'black', sizes:['XS', 'L'], url:'http://www.123mobilewallpapers.com/wp-content/uploads/2015/03/hot_girl_sit_on_skateboard.jpg'}];
var arr = [];
var colors = ['red', 'blue', 'pink', 'green', 'black'];
var sz = ['xs', 's', 'm', 'l', 'xl'];
var chosen_color = undefined;
var chosen_size = undefined;

$(document).ready(function(){
	if (sessionStorage.getItem('total') === null) {
		$('#cart-price').html(`<i class="ion-social-usd"></i> 0`);
	} else {
		$('#cart-price').html(`<i class="ion-social-usd"></i> ${sessionStorage.getItem('total')}`);
	}

	if (sessionStorage.getItem('shop-cart-products') === null) {
		sessionStorage.setItem('shop-cart-products', '');
	} else {
		$('#products-display').html(sessionStorage.getItem('shop-cart-products'));
	}
	
	if (sessionStorage.getItem('buys') === null) {
		sessionStorage.setItem('buys', 0);
	} else {
		$('#the_bag span').html(sessionStorage.getItem('buys'));
	}

	cartIsEmpty();

	if (sessionStorage.getItem('preview_product') !== null) {
		var theid = sessionStorage.getItem('preview_product');
		// considering that the pattern is always the same 
		var new_url = clothes[theid].url.replace('c_fill,h_450,w_270', 'c_fill,h_490,w_335');
		$('#plimg').prop('src', new_url);
		$('#descrp').text(`${clothes[theid].description}`);
		$('#plprice').html(`<i class="ion-social-usd"></i>  ${clothes[theid].price}`);
		$('#pladdtocart').html(`<a onclick="hey(${clothes[theid].id})">Add To Cart</a>`);
	}

	
	$('#all-products').html(calculate_products('all', 'all'));

    $(".ion-bag").click(function(){
        $('#shop-cart').css({"right":"0"});
        $('#overlayer').css({"display":"block"});
    });

    $('.ion-plus').click(function() {
    	var actual = parseInt($('#counter-number').text())+1;
    	$('#counter-number').text(actual);
    });
    $('.ion-minus').click(function() {
    	var actual = parseInt($('#counter-number').text())-1;
    	if (actual > 1) {
    		$('#counter-number').text(actual);
    	} else {
    		$('#counter-number').text('1');
    	}
    	
    });

    $(".circle.circle-red").click(function() {
    	apply_color_filter('red', true);
    });
    $(".circle.circle-blue").click(function() {
    	apply_color_filter('blue', true);
    });
    $(".circle.circle-pink").click(function() {
    	apply_color_filter('pink', true);
    });
    $(".circle.circle-green").click(function() {
    	apply_color_filter('green', true);
    });
    $(".circle.circle-black").click(function() {
    	apply_color_filter('black', true);
    });
    $("#display-all").click(function() {

    	chosen_color = undefined;
    	chosen_size = undefined;
    	$('#all-products').html(calculate_products('all', 'all'));
    	
    });

    $('#close').click(close);

    $('#overlayer').click(close);
    $(".circle.circle-grey.s").click(function() {
    	apply_size_filter('s', true);
    });
    $(".circle.circle-grey.xs").click(function() {
    	apply_size_filter('xs', true);
    });
    $(".circle.circle-grey.m").click(function() {
    	apply_size_filter('m', true);
    });
    $(".circle.circle-grey.l").click(function() {
    	apply_size_filter('l', true);
    	
    });
    $(".circle.circle-grey.xl").click(function() {
    	apply_size_filter('xl', true);
    });
});

function apply_color_filter(color, proceed) {
	chosen_color = color;
	for (var i = 0; i < colors.length; i++) {
		if (color == colors[i]) {
			$(`.circle.circle-${color}`).addClass("active");
		} else {
			$(`.circle.circle-${colors[i]}`).removeClass("active");
		}
	}
	if (proceed) {
		$('#all-products').html(calculate_products(color, chosen_size));	
	}
	
}

function apply_size_filter (size, proceed) {
	chosen_size = size;
	for (var i = 0; i < sz.length; i++) {
		if (size == sz[i]) {
			$(`.circle.circle-grey.${size}`).addClass("active");
		} else {
			$(`.circle.circle-grey.${sz[i]}`).removeClass("active");
		}
	}
	if (proceed) {
		$('#all-products').html(calculate_products(chosen_color, size));	
	}
	
}

function calculate_products(color, size) {
	var products = "";
	console.log(`to calculate ${color} && ${size}`);
	for(var i=0; i<clothes.length; i++) {
		// just filtering by color
		if (color == 'all' && size == 'all'){
			apply_size_filter('all', false);
			apply_color_filter('all', false);
		} else {
			if (size == 'all') {
				
				if (!(color == clothes[i].color)) {
					continue;
				}
				
			} else if (color == 'all') { // just filtering by size
				
				if (!(clothes[i].sizes.some(el => el==size.toUpperCase()) )) { // if the size is not among the available ones then continue;
					continue;
				}
							
			} else { // filtering by either, size and color
				if (! (clothes[i].color == color && clothes[i].sizes.some(el => el==size.toUpperCase()))) {
					continue;
				}
			}		
		}


		
		products += `
			<div class="col-lg-4">
				<div class="relative-position std-model">
					<span class="ribbon ${clothes[i].nos}-product">${clothes[i].nos}</span>
					<div class="product-image" id="pi${clothes[i].id}">
						<img src="${clothes[i].url}" class="img-responsive std-model">
						<div class="bottom-panel-img">
							<ul class="no-style">`;
		if (isBought(clothes[i].id)) {
			products += `<li><a class="addtocart" onclick="return hey(${clothes[i].id}, this);" href="#">ADDED</a></li>`;
		} else {
			products += `<li><a class="addtocart" onclick="return hey(${clothes[i].id}, this);" href="#">ADD TO CART</a></li>`;
		}
			
		products +=	`<li class="eye"><a onclick="view_product(${clothes[i].id})"><i class="ion-eye lenght-md"></i></a></li>
								<li class="heart"><a href="#"><i class="ion-heart lenght-md"></i></a></li>
								<li class="stats"><a href="#"><i class="ion-stats-bars lenght-md"></i></a></li>
							</ul>
						</div>	
					</div>
						
					<div class="data-description">
						<p class="description">${clothes[i].description}</p>`;

		if (clothes[i].price_old != undefined) {
			products += `
				<p class="price red"><i class="   ion-social-usd"></i> ${clothes[i].price}  </p>
				<p class="price line-through"><i class="ion-social-usd"></i> ${clothes[i].price_old}</p>
				</div>
		
				</div>
			</div>
			`;
		} else {
			products += `
				<p class="price"><i class="ion-social-usd"></i> ${clothes[i].price}</p>
				</div>
		
				</div>
			</div>
			`;
		}
	}
	return products;
}

function cartIsEmpty () {
	if (sessionStorage.getItem('buys') == 0) {
		$('#products-display').html(`
			<div id="nothing-bought-msg">
				<div class="msg">
					<span class="glyphicon glyphicon-inbox" aria-hidden="true"></span>
					<p>Nothing bought yet...</p>	
				</div>
			</div>
		`);
	}
}

function isBought(id) {
	return sessionStorage.getItem('shop-cart-products').includes(`id="thumb${id}"`);
}

function close () {
	if ($(window).width() <= 1430 ) {
		$('#shop-cart').css({"right":"-350px"});
	} else {
		$('#shop-cart').css({"right":"-500px"});
	}
	
    $('#overlayer').css({"display":"none"});
}

function findCloth(id) {
	for (var i=0; i < clothes.length; i++) {
		console.log(clothes[i].id);
		if (clothes[i].id == id) {
			return clothes[i];
		}
	}
}

function hey(id, tag) {
	if (sessionStorage.getItem('buys') == 0) {
		$('#nothing-bought-msg').remove();
	}
	/* check if a certain div is being displayed in order to avoid display it again */
	if ( $( `#thumb${id}` ).length > 0) return false;
	var cloth = findCloth(id);
	arr.push(id);
	sessionStorage.setItem('arr', arr);
	
	if (sessionStorage.getItem('total') === null) {
		sessionStorage.setItem('total', parseInt(cloth.price));
	} else {
		sessionStorage.setItem('total', (parseInt(sessionStorage.getItem('total'))+parseInt(cloth.price)));
	}
	sessionStorage.setItem('buys', parseInt(sessionStorage.getItem('buys'))+1);
	var thumbnail = `
		<div class="thumbnail" id="thumb${id}">
			<img src="${cloth.url}" alt="dummy image" class="img-responsive xs-model">
			<div>
				<p class="description">${cloth.description}</p>
				<p class="price"><i class="ion-social-usd"></i> ${cloth.price}</p>
			</div>
			<a onclick="remove_item(${cloth.id}, this)" href="#"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></a>
		</div>
	`;
	sessionStorage.setItem('shop-cart-products', sessionStorage.getItem('shop-cart-products')+thumbnail);

	$('#products-display').append(thumbnail);
	$(tag).text('ADDED');
	$('#the_bag span').html(sessionStorage.getItem('buys'));
	$('#cart-price').html(`<i class="ion-social-usd"></i> ${sessionStorage.getItem('total')}`);

	return false; // avoid href executing
}

function remove_item (id) {
	sessionStorage.setItem('buys', parseInt(sessionStorage.getItem('buys'))-1);
	$('#the_bag span').html(sessionStorage.getItem('buys'));
	$(`#thumb${id}`).remove();
	sessionStorage.setItem('shop-cart-products', $('#products-display').html());
	var cloth = findCloth(id);
	$(`#pi${id} a.addtocart`).text('ADD TO CART');
	sessionStorage.setItem('total', (parseInt(sessionStorage.getItem('total'))-parseInt(cloth.price)));
	$('#cart-price').html(`<i class="ion-social-usd"></i> ${sessionStorage.getItem('total')}`);	
	cartIsEmpty();	
}

function view_product(id) {
	sessionStorage.setItem('preview_product', id);
	window.location.replace("product_layout.html");
}