$(document).on("click",'#login',function(){


	var username=$( "#username" ).val();
 	var password=$( "#password" ).val();


 	var fillCheck = 0;

 	if (username == "" || password == ""){
 			window.alert("Please fill out username/password.");
 			fillCheck = 1;
 	}

 	if( fillCheck == 0 ){
		 $.ajax({
			  type: 'POST',
			  url: '/challenge/',
			  dataType: 'json',
			  data: {
			  	username:username,
			  	password:password
			  },
			  success: function (response) {
			  	
				if (response == "falied@userAuth@confirmed"){
					$.notify(
					"Login Failed !"
					,"error");
				}
				else{
				  	$('.toggleLoginBox').empty();
					$('.toggleLoginBox').addClass("toggleUserBox");
					$('.loginInputs').remove();
					$('.toggleLoginBox').removeClass("toggleLoginBox");
					$('.toggleUserBox').append("Welcome "+response.Session.Username);
					$('.loginBox').append('<a href="#" id="signOut" class="normallink"> (Logout)</a>');

					$("#codeBox").after('\
						<div class="box1 objectBox">\
							<div class="Fullbox objectBoxInner" >\
								<div class="heading " >Objects Defined by You</div>\
									\
								</div>\
							</div>'
					);
					
					for (var i = 0; i < (response.ObjectList).length; i++) {
						
						$('.objectBoxInner').append('<div class="objectName normal objectName'+response.ObjectList[i].ObjectName+'">\
										'+response.ObjectList[i].ObjectName+'<details>{<ul></ul>}</details>\
										</div>');
										
						for( var j=0 ; j< (response.ObjectList[i].KeyValArray).length; j++){
							$('.objectName'+response.ObjectList[i].ObjectName+' ul').append('<div class="normal">\
												'+response.ObjectList[i].KeyValArray[j].Field+' '+response.ObjectList[i].KeyValArray[j].Type+' ,</div>');
											
						}

					}

				}

				console.log(response);
			   }
		 });
	}

});


$(document).on("click",'#signOut',function(){


	$.ajax({
			  type: 'POST',
			  url: '/logout/',
			  data: {},
			  success: function (response) {
			  	
					$('.objectBox').remove();
				  	$('.loginBox').empty();
					$('.loginBox').append('<a href="#" class="navLinks toggleLoginBox">LOGIN / SIGN UP</a>\
					<div class="loginInputs">\
						<input type="text" id="username" name="username" placeholder="Username">\
						<input type="password" id="password" name="password" placeholder="Password"><br><br>\
						<a href="#" class="f11 normallink">Forgot Password ?</a>\
						<button type="submit" class="f13" id="login">Login</button>\
						<hr>\
						<div class="f13">New User ?</div>\
						<button type="signup" class="f13">Sign Up</button>\
					</div>');
					
			  }
	});


});