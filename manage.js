var color_counts = ['color3', 'color2', 'color_yellow'];
var colors = ['green', 'yellow', 'red'];
var works = ['auto', 'hand'];
var speeds = ['1', '2', '3', '4'];


var color_count = 0;
var color = '';
var work = '';
var traffic = false;
var smoke = false;
var speed = 1;

var main_light_interval;
var counter = 0;
			

$(document).ready(function(){

	//initial set 3 color to active
	$('#color3').attr('checked', 'checked');
	$('#auto').attr('checked', 'checked');
	$('#speed1').attr('checked', 'checked');

	check_states_and_run();

})


function disable_colors_count(){
	$('[name="color_count"]').attr('disabled', 'disabled');
}
function enable_colors_count(){
	$('[name="color_count"]').removeAttr('disabled');
}

function disable_colors(){
	$('[name="color"]').attr('disabled', 'disabled');
}
function enable_colors(){
	$('[name="color"]').removeAttr('disabled');
}

function red_on(){
	$('.light-item').removeClass('active');
	$('.light-top').addClass('active');
}

function yellow_on(){
	$('.light-item').removeClass('active');
	$('.light-center').addClass('active');
}

function green_on(){
	$('.light-item').removeClass('active');
	$('.light-bottom').addClass('active');
}
function turn_off(){
	$('.light-item').removeClass('active');	
}

function red_on_yellow_on(){
	$('.light-item').removeClass('active');
	$('.light-top').addClass('active');
	$('.light-center').addClass('active');
}

function get_checked(oItem){

}


function set_checked(oItem){
	
	return true;
}


function check_states_and_run(){
	smoke = $("input[id='smoke']").prop('checked');
	if (smoke){
		$('.noisy').show();
		$('#color_yellow').attr('checked', 'checked');
		$('#auto').attr('checked', 'checked');
	}else{
		$('.noisy').hide();		
	}


	clearInterval(main_light_interval);
	color_count = $("input[name='color_count']:checked").val();
	color = $("input[name='color']:checked").val();
	work = $("input[name='work']:checked").val();
	traffic = $("input[id='traffic']").prop('checked');
	speed = $("input[name='speed']:checked").val();
	counter = 0;
	var timer_range = 1000;
	timer_range = timer_range / parseInt(speed,10);
	var standart_second_summ = 50;
	if (traffic){
		standart_second_summ = 70;
	}




	console.log(color_count, color, work, traffic, smoke, speed);

	if (work == 'auto'){
		enable_colors_count();
		disable_colors();
		if (color_count == 'color3'){
			main_light_interval = setInterval(function() {
				var absolute_counter = counter % standart_second_summ;
			  	if(absolute_counter < 20){
			  		red_on();
			  	}else{
			  		if (absolute_counter >= 20 && absolute_counter < 22){
		  				red_on_yellow_on();
			  		}else{
			  			if(absolute_counter >= 22 && absolute_counter < 42){
			  				green_on();
			  			}else{
			  				if(absolute_counter >= 42 && absolute_counter < (standart_second_summ-2)){
			  					if(absolute_counter % 2 == 0){
			  						green_on();
			  					}else{
			  						turn_off();
			  					}
			  				}else{
			  					yellow_on();
			  				}
			  			}
			  		}
			  	}

				counter++;
				console.log(counter);
			}, timer_range);

		}else{
			if (color_count == 'color2'){
				main_light_interval = setInterval(function() {
					var absolute_counter = counter % standart_second_summ;
				  	if(absolute_counter < 20){
				  		red_on();
				  	}else{
				  		if(absolute_counter >= 20 && absolute_counter < 26){
		  					if(absolute_counter % 2 == 0){
		  						turn_off();
		  					}else{
		  						red_on();
		  					}
		  				}else{
		  					if(absolute_counter >= 26 && absolute_counter < (standart_second_summ - 6)){
		  						green_on();
		  					}else{
		  						if(absolute_counter >= (standart_second_summ - 6)){
				  					if(absolute_counter % 2 == 0){
				  						turn_off();
				  					}else{
				  						green_on();
				  					}
				  				}
		  					}

		  				}
				  		
				  	}

					counter++;
					console.log(counter);
				}, timer_range);
			}else{

				main_light_interval = setInterval(function() {
					
					var absolute_counter = counter % standart_second_summ;
					if (absolute_counter % 2 == 0){
						turn_off();
					}else{
						yellow_on();
					}

					counter++;
					console.log(counter);
				}, timer_range);

			}
		}

	}else{
		enable_colors();
		disable_colors_count();
		if (color == 'green'){
			green_on();
		}else{
			if (color == 'yellow'){
				yellow_on();
			}else{
				if (color == 'red'){
					red_on();
				}else{
					turn_off();
				}
			}
		}


	}


}



$('*').click(function(){
	check_states_and_run();
})







