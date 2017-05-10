
var routerCount = 1;
 
var optionCount = 4;

 $('#submit').click(function(){

 	var url_temp=$( "#url" ).val();
 	var method_temp=$( "#method" ).val();
 	var action_temp=$( "#action1" ).val();
 	var pathToHTML_temp = $( "#pathToHTML" ).val();
 	var routerNumber = 1;
 	var pathToCSS_temp = $( "#pathToCSS" ).val();

 	var fillCheck = 0;

 	// var routerDetails = {

 		// RouterURL : url_temp,
		// Method : method_temp,
		// UseCase : action_temp,
		// PathToHTML : pathToHTML,
		// RouterNumber : routerNumber

 	// }



 	if (action_temp.substring(1) == "option1"){
 		if (url_temp == "" || pathToHTML_temp == ""){
 			window.alert("Please fill out all parameters");
 			fillCheck = 1;
 		}
 	}
 	else if (action_temp.substring(1) == "option2"){
 		if ( pathToCSS_temp == "" ){
 			window.alert("Please fill out all parameters");
 			fillCheck = 2;
 		}
 	}

 	if( fillCheck == 0 ){
		 $.ajax({
			  type: 'POST',
			  url: '/make/',
			  data: {
			  	router : url_temp,
			  	method : method_temp,
			  	action : action_temp,
			  	pathToHTML : pathToHTML_temp,
			  	routerNumber : routerNumber,
			  	pathToCSS : pathToCSS_temp,

			  },
			  success: function (response) {
			   $('#result').empty();
			   $('#result').append("//Code for Backend <br>"+response);
			  }
		 });
	}
	}); 


 $('#addRouter').click(function(){

 	routerCount++;

 	console.log("router Count: ",routerCount);

 	$( ".lastBox" ).after('<div class="box1" id="router'+routerCount+'">\
					<div class="heading">Basics \
\						<div class="dropdown floatRight">\
							<div class="f11 grey roundBorder dropMenu" routerNumber = "'+routerCount+'">\
								<i class="fa fa-chevron-down floatRight down_arrow" aria-hidden="true"></i>\
								Router '+routerCount+' \
							</div>\
							<div class="dropdowncontent">\
	    						<a href="#" class="f11 grey remove" routerNumber = "'+routerCount+'">Remove Router</a>\
	    						<a href="#" class="f11 grey lock" routerNumber = "'+routerCount+'">Lock Parameters</a>\
	  						</div>\
	  					</div>\
					</div>\
					<div class="opt2">\
						What happens when this route is called :<br><br>\
						<select name="action" id="action'+routerCount+'" class="action" routerNumber = "'+routerCount+'">\
							<option value="'+routerCount+'option1">\
								Serve HTML ( Template )\
							</option>\
							<option value="'+routerCount+'option2">\
								Serve Static Files (CSS/JS)\
							</option>\
							<option value="'+routerCount+'option3"> \
								Fetch Data from Database (MongoDB / MySQL)\
							</option>\
							<option value="'+routerCount+'option4"> \
								Insert Data into Database (MongoDB / MySQL)\
							</option>\
							<option value="'+routerCount+'option5"> \
								Update Data in Database (MongoDB / MySQL)\
							</option>\
							<option value="'+routerCount+'option6"> \
								Delete Data from Database (MongoDB / MySQL)\
							</option>\
							<option value="'+routerCount+'option7"> \
								Generate REST APIs\
							</option>\
							<option value="'+routerCount+'option8">\
								Accept Form Data\
							</option>\
						</select>\
					</div>	\
					<div class="opt1" class="urlBlock'+routerCount+'">\
						<input type="text" id="url" name="url" placeholder="Router URL (eg: /yourRoute/:user/:data/ ) " required>\
					</div>\
					\
					<div class="opt1">\
						\
						HTTP Method :\
						<select name="method" id="method">\
							<option value="GET">\
								GET\
							</option>\
							<option value="POST">\
								POST\
							</option>\
							<option value="PUT"> \
								PUT\
							</option>\
							<option value="DELETE">\
								DELETE\
							</option>\
						</select>\
\
					</div>\
									\
				</div>\
\
\
				<div class="box1 group'+routerCount+'" id="'+routerCount+'option1">\
					<div class="heading" >Serve HTML <div class="floatRight f11 grey roundBorder metaButton" routerNumber = "'+routerCount+'">\
							Router '+routerCount+' \
						</div></div>\
\
					<div class="opt1">\
						<input type="text" name="pathToHTML" placeholder="Path to HTML file (w.r.t local Directory)" id="pathToHTML" required>\
					</div>\
\
					<p class="normal">\
						Enclose Object in Template : <input type="checkbox" name="object" value="object" id="object"><br>\
						<small>(Leave unchecked for static HTML Pages)</small>\
					</p>\
\
					<p class="normal object">\
						Select Object : \
\
						<select name="objectSelect" id="objectSelect">\
							<option value="option1">\
								User\
							</option>\
							<option value="option2">\
								Foo\
							</option>\
							<option value="option3"> \
								Bar\
							</option>\
							\
						</select>\
						\
					</p>\
\
					\
				</div>\
\
\
				<div class="box1 group'+routerCount+'" id="'+routerCount+'option2">\
					<div class="heading" >Serve Static Files (CSS/JS) <div class="floatRight f11 grey roundBorder metaButton" routerNumber = "'+routerCount+'">\
							Router '+routerCount+' \
						</div></div>\
					<div class="opt1">\
						\
						<input type="text" name="pathToCSS" placeholder="Path to CSS/JS files (w.r.t local Directory)" id="pathToCSS" required>\
						<small>(eg: /static/styles/)</small>\
\
					</div>\
				</div>\
\
\
				<div class="box1 group'+routerCount+'" id="'+routerCount+'option3">\
					<div class="heading" >Save Data To Database <div class="floatRight f11 grey roundBorder metaButton" routerNumber = "'+routerCount+'">\
							Router '+routerCount+' \
						</div></div>\
\
				</div>\
\
				<div class="box1 group'+routerCount+' ll" id="'+routerCount+'option4">\
					<div class="heading"  >Accept Form Data <div class="floatRight f11 grey roundBorder metaButton" routerNumber = "'+routerCount+'">\
							Router '+routerCount+' \
						</div></div>\
\
				</div>');


 	$(".group"+routerCount).hide();
 	$('#'+routerCount+'option1').show();
 	$(".lastBox").removeClass("lastBox");
 	$(".ll").addClass("lastBox").removeClass("ll");

 });


$(document).on("click",".remove",function () {

	var currentrouter = $(this).attr("routerNumber");

	var lastrouter = routerCount;

	$("#router"+currentrouter).remove();
	$(".group"+currentrouter).remove();

	$.notify.defaults({globalPosition: 'top center'});
	

	$.notify(
		"Router Removed !"
		,"success");



	console.log("Current: ",currentrouter," last: ",lastrouter);
	
	for (var i = parseInt(currentrouter)+1 ;i <= lastrouter; i++) {

		console.log("changing ",i);
		var newNum = i-1;
		$("#router"+i).addClass("w");
		

		var selected = $('.dropMenu[routerNumber="'+i+'"]');
		$(selected).each(function() {

			$(this).empty();

		});

		$(selected).each(function() {

			$(this).html(
			'<i class="fa fa-chevron-down floatRight down_arrow" aria-hidden="true"></i>\
								Router '+newNum
			);

		});

		$(' .metaButton[routerNumber="'+i+'"]').each(function() {

			$(this).empty();

		});

		$('.metaButton[routerNumber="'+i+'"]').each(function() {
			
			$(this).html('Router '+newNum);

		});

		$(' div[routerNumber="'+i+'"]').each(function() {
			    // `this` is the div
			$(this).attr( "routerNumber",newNum);

		});
		$(' select[routerNumber="'+i+'"]').each(function() {
			    // `this` is the div
			$(this).attr( "routerNumber",newNum);
			$(this).attr('id','action'+newNum);

		});
		$(' a[routerNumber="'+i+'"]').each(function() {
			    // `this` is the div
			$(this).attr( "routerNumber",newNum);

		});

		$(' .group'+i).each(function() {
			    // `this` is the div
			$(this).removeClass('group'+i).addClass('group'+newNum);

		});	

		for (var j = 1; j <= optionCount+4; j++) { // update this dummy 4 optioncount
					var thiss = $('option[value="'+i+'option'+j+'"]');

					$(thiss).attr('value',newNum+'option'+j);

			}

		for (var j = 1; j <= optionCount; j++) {
					var thiss = $('#'+i+'option'+j);

					$(thiss).removeAttr("id");
					$(thiss).attr('id',newNum+'option'+j);

			}	
		$("#router"+i).removeAttr('id');
		$(".w").attr('id','router'+newNum);

		$(".w").removeClass("w");
	}

	lastrouter--;
	$("#"+lastrouter+"option4").addClass("lastBox");// update this when options are increased
	routerCount = lastrouter;

	

});
