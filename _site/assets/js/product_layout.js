
var clothes = [{nos:'new', id:0, description:'Obey T-shirt with Tiger Print0', price:0, price_old: undefined, url:'https://dummyimage.com/77x101/000/fff.png'},
{nos:'new', id:1, description:'Obey T-shirt with Tiger Print1', price:10, price_old: undefined, url:'https://dummyimage.com/77x101/000/fff.png'},
{nos:'sale', id:2, description:'Obey T-shirt with Tiger Print2', price:20, price_old: undefined, url:'https://dummyimage.com/77x101/000/fff.png'},
{nos:'sale', id:3, description:'Obey T-shirt with Tiger Print3', price:30, price_old: 38, url:'https://dummyimage.com/77x101/000/fff.png'},
{nos:'sale', id:4, description:'Obey T-shirt with Tiger Print4', price:40, price_old: undefined, url:'https://dummyimage.com/77x101/000/fff.png'},
{nos:'sale', id:5, description:'Obey T-shirt with Tiger Print5', price:50, price_old: 35, url:'https://dummyimage.com/77x101/000/fff.png'},
{nos:'new', id:6, description:'Obey T-shirt with Tiger Print6', price:60, price_old: 45, url:'https://dummyimage.com/77x101/000/fff.png'},
{nos:'sale', id:7, description:'Obey T-shirt with Tiger Print7', price:70, price_old: undefined, url:'https://dummyimage.com/77x101/000/fff.png'},
{nos:'new', id:8, description:'Obey T-shirt with Tiger Print8', price:80, price_old: undefined, url:'https://dummyimage.com/77x101/000/fff.png'}];
var arr = [];

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

	var products = "";
	for(var i=0; i<clothes.length; i++) {
		products += `
			<div class="col-lg-4">
				<div class="relative-position std-model">
					<span class="ribbon ${clothes[i].nos}-product">${clothes[i].nos}</span>
					<div class="product-image">
						<img src="assets/img/dummy.jpg" class="img-responsive std-model">
						<div class="bottom-panel-img">
							<ul class="no-style">
								<li><a onclick="return hey(${clothes[i].id});" href="#">ADD TO CART</a></li>
								<li class="eye"><a href="#"><i class="ion-eye lenght-md"></i></a></li>
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
	console.log(products);
	$('#all-products').html(products);

    $(".ion-bag").click(function(){
        $('#shop-cart').css({"right":"0"});
        $('#overlayer').css({"display":"block"});
        
    });

    $('#close').click(close);

    $('#overlayer').click(close);
});

function close () {
	$('#shop-cart').css({"right":"-500px"});
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

function hey(id) {
	
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
			<img src="${cloth.url}" alt="dummy image">
			<div>
				<p class="description">${cloth.description}</p>
				<p class="price"><i class="ion-social-usd"></i> ${cloth.price}</p>
			</div>
			<a onclick="remove_item(${cloth.id})" href="#"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></a>
		</div>
	`;
	sessionStorage.setItem('shop-cart-products', sessionStorage.getItem('shop-cart-products')+thumbnail);

	$('#products-display').append(thumbnail);
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

	sessionStorage.setItem('total', (parseInt(sessionStorage.getItem('total'))-parseInt(cloth.price)));
	$('#cart-price').html(`<i class="ion-social-usd"></i> ${sessionStorage.getItem('total')}`);		
}