
var clothes = [{nos:'new', id:0, description:'Obey T-shirt with Tiger Print0', price:0, price_old: undefined, url:'https://dummyimage.com/77x101/000/fff.png'},
{nos:'new', id:1, description:'Obey T-shirt with Tiger Print1', price:10, price_old: undefined, url:'https://dummyimage.com/77x101/000/fff.png'},
{nos:'sale', id:2, description:'Obey T-shirt with Tiger Print2', price:20, price_old: undefined, url:'https://dummyimage.com/77x101/000/fff.png'}];




$(document).ready(function(){

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
								<li><a onclick="hey(${clothes[i].id})" href="#">ADD TO CART</a></li>
								<li class="eye"><a href="#"><i class="ion-eye lenght-md"></i></a></li>
								<li class="heart"><a href="#"><i class="ion-heart lenght-md"></i></a></li>
								<li class="stats"><a href="#"><i class="ion-stats-bars lenght-md"></i></a></li>
							</ul>
						</div>	
					</div>
						
					<div class="data-description">
						<p class="description">${clothes[i].description}</p>`

		if (clothes.price_old == undefined) {
			products += `
				<p class="price red"><i class="   ion-social-usd"></i> ${clothes[i].price}  </p>
				<p class="price line-through"><i class="ion-social-usd"></i> ${clothes[i].price_old}</p>
				</div>
		
				</div>
			</div>
			`;
		} else {
			products += `
				<p class="price"><i class="ion-social-usd"></i> ${clothes[i].price_old}</p>
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

    $('#close').click(function() {
    	$('#shop-cart').css({"right":"-500px"});
    	$('#overlayer').css({"display":"none"});
    });


});

function findCloth(id) {
	for (var i=0; i < clothes.length; i++) {
		console.log(clothes[i].id);
		if (clothes[i].id == id) {
			return clothes[i];
		}
	}
}

function hey(id) {
	
	var cloth = findCloth(id);
	
	$('#products-display').append(`
		<div class="thumbnail" id="thumb${id}">
			<img src="${cloth.url}" alt="dummy image">
			<div>
				<p class="description">${cloth.description}</p>
				<p class="price"><i class="ion-social-usd"></i> ${cloth.price}</p>
			</div>
			<a onclick="remove_item(${cloth.id})" href="#"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></a>
		</div>		
	`);
}