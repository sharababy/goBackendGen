$(document).ready(function () {
				
	$('.group1').hide();
	$('#1option1').show();
	
		$(document).on("change",".action",function () {
	
			var router = $(this).attr("routerNumber");

			$('.group'+router).hide();
			$('#'+$(this).val()).show();
			
			if ($(this).val()==(router+"option2")) {
				$(".urlBlock"+router).hide();
			}
			else{
				$(".urlBlock"+router).show();
			}	
		});

	$('#object').click(function(){
			var inputValue = $(this).attr("value");
		$("." + inputValue).toggle();
	});

	$(document).on("click",".toggleLoginBox",function(){

		$(".loginInputs").toggle();

	});

});
