$(function() {
	height_header();
	validateform();
	$('.single-item').slick({
		autoplay: false,
		autoplaySpeed: 5000,
		arrows: true,
		dots: true,
			responsive: [
            { breakpoint: 769,
                 settings: { arrows: false,
                	}
            }
        ]
	});
	$('.multiple-items').slick({
		infinite: true,
		slidesToShow: 5,
		slidesToScroll: 4,
		autoplay: true,
		autoplaySpeed: 5000,
		arrows: true,
		dots: true,
			responsive: [
            { breakpoint: 769,
                 settings: { slidesToShow: 4,
                 	slidesToScroll: 4,
                 	arrows: false
                	}
            },
            { breakpoint: 600,
                 settings: { slidesToShow: 3,
                 	slidesToScroll: 3,
                 	arrows: false
                	}
            },
            { breakpoint: 321,
                 settings: { slidesToShow: 2,
                 	slidesToScroll: 2,
                 	arrows: false
                	}
            }
        ]

	});
});
$(window).resize(function(){
	height_header();
})

function height_header(){
	var $height = $(window).height(),
		$window_width = $(window).width(),
		$window_height = $(window).height(),
		$section = $(".section_height"),
		$headerHeight = $('.index_header').innerHeight();

	if ($window_width > 700) {
		$section.css("height", $height - $headerHeight);
	} else {
		$section.css("height", "auto");
	}

}


function validateform(){
		// patternName = /^[a-zа-я]{3,10}([\s])?([a-zа-я]{3,10})?$/i,
		// patternEmail = /^[a-z0-9_-]+@[a-z0-9-]+\.([a-z]{1,6}\.)?[a-z]{2,6}$/i,
		// patternMessage = /^[a-zа-я0-9_-\s]{30,700}$/i;
	var input = $(".input_necessarily");
	// var	number =$(".number");
	var popup = $('.fancybox-container');
	var	patternPhone = /^([\+\s0-9]{3,8})?[0-9\s]{6,12}$/i;
	$("#form222").submit(function(e) { //Change
		e.preventDefault();
		var inputGo = $(this).find(input);
		var th = $(this);
		if(inputGo.val() != ""){
			input.addClass('seccuses')
			input.removeClass('error');
			$("#form222").unbind('click');
			// $('form button').attr('disabled', true);
		$.ajax({
			type: "POST",
			url: "#", //Change
			data: th.serialize()
		}).done(function() {
			alert("Спасибо за вашу заявку. Скоро мы свяжемся с вами!");
			setTimeout(function() {
				// Done Functions
				th.trigger("reset");
				input.removeClass('seccuses')
			}, 1000);
		});
		return false;
	}else{
			input.addClass('error');
			// $('form button').attr('disabled', 'disabled');
		}
	})

}