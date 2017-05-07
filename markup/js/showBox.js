$(document).ready(function () {
				
	$('.group1').hide();
	$('#1option1').show();
	
	// $('.action').each(function() {
		
	// 	var ele = $(this);

		

		$(document).on("change",".action",function () {
	
			var router = $(this).attr("routerNumber");

			console.log(router+"Hello");

			$('.group'+router).hide();
			$('#'+$(this).val()).show();
			if ($(this).val()==router+"option2") {
				$(".urlBlock"+router).hide();
			}
			else{
				$(".urlBlock"+router).show();
			}	
		});
	//});

	$('#object').click(function(){
			var inputValue = $(this).attr("value");
		$("." + inputValue).toggle();
	});
});
