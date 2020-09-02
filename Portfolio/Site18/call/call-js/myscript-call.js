$(document).ready(function(e) {
   
	$(".lt-xbutton-input").mask("+7(999)999-99-99");
	$(".lt-xbutton-phone-icon").click(function(e) {
        $(".lt-xbutton").addClass("lt-xbutton-active");
		
    });
	$(".lt-close-main").click(function(e) {
        $(".lt-xbutton").removeClass("lt-xbutton-active");
		$(".lt-xbutton.tr_btn").removeClass("lt-status-busy");

    });
	$(".lt-xwidget-close").click(function(e) {
        $(".lt-xbutton-main-wrapper").removeClass("active-timer");	
		$(".lt-xbutton-main-wrapper").removeClass("lt-call-is-on");
		$(".lt-xbutton.tr_btn").removeClass("lt-status-busy");
		$(".lt-xbutton-input").show();
		$(".lt-xbutton-bttn-wrap").show();
		$(".lt-xbutton-input").val("");
    });
	$(".lt-xwidget-close").click(function(e) {
        $(".lt-xbutton").removeClass("lt-xbutton-active");
    });
	
	/*Звонить если даже не нажал кнопку позвонить
	addEventListener("keyup", function(event)


	{	
		var inp_s = $(".lt-xbutton-input").val()
		if(!inp_s.match(/_/ ) && $(".lt-xbutton-input").val().length == 16){
			console.log(1);
			act_timot()	;
			$('.lt-xbutton-main-wrapper').addClass('active-timer');	timer_s(); timer_ds(); 
			$(".lt-xbutton-input").hide();
		    $(".lt-xbutton-bttn-wrap").hide();
			$(".lt-xbutton-input").css("border","1px solid green");
		}
	});
	End*/
	
});

function timer_s(){
		  var s_e = Number($("#lt-xwidget-counter__count-left").text());
		  s_e--;
		  $("#lt-xwidget-counter__count-left").text(s_e);
		  var tim_2 = setTimeout("timer_s()",1000); 
		  if(s_e == 0){
			clearTimeout(tim_2)
		  }
		  $(".lt-xwidget-close").click(function(e) {
				clearTimeout(tim_2)
				$("#lt-xwidget-counter__count-left").text(28)
			});
		if(s_e == 10){
		$(".lt-xbutton-main-wrapper").addClass("lt-call-is-on");	
		}
	  }
	  
  
function timer_ds(){
		var sd_e = Number($("#lt-xwidget-counter__count-right").text());
		sd_e--;
		$("#lt-xwidget-counter__count-right").text(sd_e);
		var timd_2 = setTimeout("timer_ds()",10);	 
		if(sd_e == 0){
		  $("#lt-xwidget-counter__count-right").text(59);
		  clearTimeout(timd_2)
		  timer_ds()	
		} 
}



function act_timot(){
	var oki = 0;
   if ($(".lt-xbutton-input").val().length < 16)
   {
	   $(".lt-xbutton-input").css("border","1px solid red");
	   oki = 1;
   }
	if (oki == 0){
		$(".lt-xbutton-input").hide();
		$(".lt-xbutton-bttn-wrap").hide();
		
		
		go_zvonok();
	/* 	
		$.post(
			  "../php/mail.php",
			  {
				  type: "text/plain",
				  tel: $(".lt-xbutton-input").val(),
				  zvon: 1
			 })
			 */
		
	
	}
}

function go_zvonok()
{
	var customer_contact1 = $(".lt-xbutton-input").val();

		if ('' == customer_contact1)
		{
			$(".lt-xbutton-input").css("border","1px solid red");
			$(".lt-xbutton-input").focus();
			return false;
		}
	
		customer_contact1 = str_replace('+7', '7', customer_contact1);
		customer_contact1 = str_replace('(', '', customer_contact1);
		customer_contact1 = str_replace(')', '', customer_contact1);
		customer_contact1 = str_replace('-', '', customer_contact1);
		customer_contact1 = str_replace(' ', '', customer_contact1);
	
		var script1 = document.createElement('script');
		var tel_21 = customer_contact1;
		
		script1.src = 'call/call-a/action.php?number2=' + tel_21 + '&cruc=2&title='+$('title').text();
		
		document.getElementsByTagName('head')[0].appendChild(script1);
		$(".lt-xbutton-input").val(0)
		$(".lt-xbutton-input").mask("+7(999)999-99-99");
		act_timot()	;
			$('.lt-xbutton-main-wrapper').addClass('active-timer');	timer_s(); timer_ds(); 
			$(".lt-xbutton-input").hide();
		    $(".lt-xbutton-bttn-wrap").hide();
			$(".lt-xbutton-input").css("border","1px solid green");
		
}

function str_replace(search, replace, subject){return subject.split(search).join(replace);}