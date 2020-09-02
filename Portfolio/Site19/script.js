window.getUrlParameter = function(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};
$(document).ready(function(){
	$('.tabs a').click(function(){
		$('.tabbed_content, .tabs a').removeClass('current');
		$(this).addClass('current');
		$('.tabbed_content[data-tab="' + $(this).attr('data-tab') + '"]').addClass('current');
		return false;	
	});
	$('.tabs a[data-tab="info"]').click(function(){
		yaCounter21980659.reachGoal('MOBILE_INFO');	
	});
	$('a.phone').click(function(){
		yaCounter21980659.reachGoal('PHONE_CLICK');
	});
	$("form input[type='text']").mask("+7 (999) 999-99-99", { completed: function() { $.get("./send.php?phone=" + this.val()); yaCounter21980659.reachGoal('FEEDBACK_SUBMIT'); } });
	$("form input[type='submit']").click(function(){
		yaCounter21980659.reachGoal('FEEDBACK_SUBMIT');
		$(this).animate({opacity: 0}, 'fast');
		$.ajax({
           type: 'POST',
           url: './send.php',
           data: $(this).parents("form").serialize(),
           success: function(data)
           {
              $("form input[type='submit']").animate({opacity: 1}, 'fast');
		      alert(data);
           }
        });
		return false;	
	});
	$('a#jump_to_info').click(function(){
		event.preventDefault();
		$('html, body').animate({
			scrollTop: $('#main_tabs').offset().top
		}, 1000,function(){
			$('.tabs a[data-tab="info"]').click();
		});
	});
	$('a.rotate_screen').click(function(){
		$(this).remove();
		return false;
	});
	window.video_clicked = false;
	$('#video').click(function(){
		if(!window.video_clicked) {
			document.getElementById("video").play();
			yaCounter21980659.reachGoal('VIDEO_SHOWN');
		}
		window.video_clicked = true;
	});
  	$('a.jumpto').click(function(event){
		event.preventDefault();
		$('html, body').animate({
			scrollTop: $('[name="' + $.attr(this, 'href').substr(1) + '"]').offset().top
		}, 1000);
	});
});
$(window).load(function(){
	if(window.getUrlParameter('redirected')==1) {
		$('.redirect_notification').slideDown('fast');	
	}
	if($(window).width()>$(window).height()) {
		$('a.rotate_screen').fadeIn('fast',function(){
			setTimeout("$('a.rotate_screen').fadeOut('fast');",2000);
		});
	}
});