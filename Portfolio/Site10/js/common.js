//Document OnReady
$(document).ready(function() { 	
	
	//fixed header -----------------------------------------------------------------------
	function getScrollTop() {
		var scrOfY = 0;
		if( typeof( window.pageYOffset ) == "number" ) {
			//Netscape compliant
			scrOfY = window.pageYOffset;
		} else if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) {
			//DOM compliant
			scrOfY = document.body.scrollTop;
		} else if( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) {
			//IE6 Strict
			scrOfY = document.documentElement.scrollTop;
		}
		return scrOfY;
	}
	
	$(window).scroll(function() {
		fixPaneRefresh();
	});
	function fixPaneRefresh(){
		if ( $(window).width() && $('.header').length) {
			var top  = getScrollTop();
			
			if (top >100) { $('.header').addClass('fix animated fadeIn'); }
			else { $('.header').removeClass('fix animated fadeIn'); }
			
			if (top >700) { 
				$('.sticky').addClass('fix'); 
				$('.sticky .skrol').hide(); 
			}
			else { 
				$('.sticky').removeClass('fix'); 
				$('.sticky .skrol').show(); 
			}
		}
	}

	//bootstrap menu open ---------------------------------------------------------------
	$('.navbar-toggler, .menu .nav-link, .menu-close').on('click', function() {
		$('.menu').toggleClass('open');
	});
	
	$('.navbar-toggler').click(function(){
		if ( $('.menu').hasClass('open') ) {
			$('.navbar-toggler').addClass('active');
			if ($(window).width() > 1200) { $('.dev').addClass('color'); }
		}
		else { 
			$('.navbar-toggler').removeClass('active'); 
			if ($(window).width() > 1200) { $('.dev').removeClass('color'); }
		}
	});

	//bootstrap menu close --------------------------------------------------------------
	$('body').bind('click', function(e) {
		if($(e.target).closest('.navbar').length == 0) {
			// click happened outside of .navbar, so hide
			var opened = $('.navbar-collapse').hasClass('collapse show');
			if ( opened === true ) {
				$('.navbar-collapse').collapse('hide');
			}
		}
	});
	
	$('.menu .nav-link').bind('click', function(e) {
		if ($('.navbar-collapse').hasClass('collapse show')) {
			$('.navbar-collapse').collapse('hide'); 
			$('.navbar-toggler').removeClass('active');
		}
	});
	
	
	//Scroll to page blocks -------------------------------------------------------------
	$('.goto').click( function(){ 
		var scroll_el = $(this).attr('href'); 
		if ($(scroll_el).length != 0) { 
			$('html, body').animate({ scrollTop: $(scroll_el).offset().top }, 600); // анимируем скроолинг к элементу scroll_el
			$('.navbar-toggler').removeClass('active');
		}
	    return false; // выключаем стандартное действие
    });
	
	
	//select & inputs custom ------------------------------------------------------------
	(function($) {
		$(function() {
			$('select, :checkbox').styler();
		});
	})(jQuery);
	
	
	// Slick sliders --------------------------------------------------------------------	
	$('.gallery-slider').slick({
		dots: true,
		centerMode: true,
		centerPadding: '300px',
		slidesToShow: 1,
		responsive: [
			{
				breakpoint: 1620,
				settings: { centerMode: true, centerPadding: '200px', slidesToShow: 1 }
			},
			{
				breakpoint: 1200,
				settings: { centerMode: true, centerPadding: '120px', slidesToShow: 1 }
			},
			{
				breakpoint: 768,
				settings: { centerMode: true, centerPadding: '80px', slidesToShow: 1 }
			},
			{
				breakpoint: 576,
				settings: { dots: false, centerMode: true, centerPadding: '0', slidesToShow: 1 }
			}
		]
	});
	
	$('.docs-slider').slick({
		dots: false,
		infinite: false,
		speed: 500,
		autoplay: false,
		slidesToShow: 4,
		slidesToScroll: 4,
		responsive: [
			{
				breakpoint: 640,
				settings: { slidesToShow: 3, slidesToScroll: 3 }
			},
			{
				breakpoint: 468,
				settings: { slidesToShow: 1, slidesToScroll: 1 }
			}
		]
	});	

	
	//Yandex map ------------------------------------------------------------------------
	ymaps.ready(init)
	var myMap,
	myPlacemark,
	centerCoord

	centerCoord = [59.90728406421673,30.3178355]

	function init () {
		myMap = new ymaps.Map('map', {
			center: centerCoord,
			zoom: 16,
		})

		myPlacemark = new ymaps.Placemark([59.90728406421673,30.3178355],
			{
				balloonContent: 'Санкт-Петербург, \n' +
				'пр. Московский, 65',
			},
			{
				iconLayout: 'default#image',
				iconImageHref: 'img/map-pin.svg',
				iconImageSize: [78, 78],
				iconImageOffset: [-39, -39]	
			},
		)
		
		if ($(window).width() < 767) {
			myPlacemark = new ymaps.Placemark([59.90728406421673,30.3178355],
				{
					balloonContent: 'Санкт-Петербург, \n' +
					'пр. Московский, 65',
				},
				{
					iconLayout: 'default#image',
					iconImageHref: 'img/map-pin.svg',
					iconImageSize: [50, 50],
					iconImageOffset: [-25, -25]	
				},
			)
		}

		myMap.geoObjects.add(myPlacemark)
		myMap.behaviors.disable('scrollZoom')
	}
	
	
	// FORMS & AJAX VALIDATION ----------------------------------------------------
	
	$('.btn-order').click(function(){
		flatRooms = $(this).attr('data-rooms');
		flatSquare = $(this).attr('data-square');
		flatPrice = $(this).attr('data-price');		
		$('.modal #flat-rooms').val(flatRooms);
		$('.modal #flat-square').val(flatSquare);
		$('.modal #flat-price').val(flatPrice);		
		$('.modal #flat-rooms-text').text(flatRooms);
		$('.modal #flat-square-text').text(flatSquare);	
		$('.modal #flat-price-text').text(flatPrice);	
		
		bankName = $(this).attr('data-bank');
		$('.modal #bank-name').val(bankName);
		
		formType = $(this).attr('data-form');
		$('.modal #form-type').val(formType);	
		
		$('.modal .field, .modal #flat-title, .modal #flat-info').hide();
		$('.modal .fname, .modal .ftel, .modal .femail').show();
	});
	
	$('.btn-order[data-form="discount"]').click(function(){
		$('.modal #form-title').show();
		$('.modal #form-title').text('Получите персональную скидку');
		$('.modal #form-name').val('Скидка');
		$('#send-order').val('Получить скидку');
	});
	
	$('.btn-order[data-form="excursion"]').click(function(){
		$('.modal #form-title').show();
		$('.modal #form-title').text('Назначим экскурсию на удобное для Вас время');
		$('.modal #form-name').val('Экскурсия');
		$('#send-order').val('Записаться на экскурсию');
	});
	
	$('.btn-order[data-form="ordercall"]').click(function(){
		$('.modal #form-title').show();
		$('.modal .ftime').show();
		$('.modal #form-title').text('Заказать звонок');
		$('.modal #form-name').val('Заказ звонка');
		$('#send-order').val('Жду звонка');
	});
	
	$('.btn-order[data-form="flat"]').click(function(){	
		$('.modal #form-title').hide();
		$('.modal #flat-title, .modal #flat-info').show();
		$('.modal #form-name').val('Забронировать квартиру');
		$('#send-order').val('Забронировать квартиру');
	});	
	
	$('.btn-order[data-form="plan"]').click(function(){
		$('.modal #form-title').show();
		$('.modal #form-title').text('Получите планировки и цены');
		$('.modal #form-name').val('Планировки и цены');
		$('#send-order').val('Получить планировки и цены');
	});
	
	$('.getall').click(function(){
		$('.modal #form-title').text('Информация о квартирах в наличии');
	});
	
	$('.btn-order[data-form="commerce"]').click(function(){
		$('.modal #form-title').show();
		$('.modal #form-title').text('Получите планировки и цены коммерческих объектов в ЖК «Московский, 65»');
		$('.modal #form-name').val('Планировки и цены коммерция');
		$('#send-order').val('Запросить планировки');
	});
	
	$('.btn-order[data-form="ipoteka"]').click(function(){
		$('.modal #form-title').show();
		$('.modal #form-title').text('Заявка на расчёт ипотеки в банке ' + '«' + bankName + '»');
		$('.modal #form-name').val('Заявка на ипотеку');
		$('#send-order').val('Отправить заявку');
	});
	
	$('.btn-order[data-form="ipoteka-ed"]').click(function(){
		$('.modal #form-title').show();
		$('.modal #form-title').text('Сформируем единую заявку на расчёт ипотеки');
		$('.modal #form-name').val('Единая заявка на ипотеку');
		$('#send-order').val('Подобрать лучшие условия');
	});
	
	$('.btn-order[data-form="calc"]').click(function(){
		$('#m-calc').modal('hide');
		$('.modal #form-title').show();
		$('.modal #form-title').text('Бесплатное оформление ипотеки');
		$('.modal #form-name').val('Заявка c формы калькулятора');
		$('#send-order').val('Отправить заявку');
	});
	
	$('.btn-order[data-form="offers"]').click(function(){
		$('.modal #form-title').show();
		$('.modal #form-title').text('Узнайте всё о акциях и условиях оплаты в ЖК «Московский, 65»');
		$('.modal #form-name').val('Акции');
		$('#send-order').val('Узнать подробности');
	});
	
	$('.btn-order[data-form="discount"]').click(function(){
		$('.modal #form-name').val('Скидки');
	});
	
	
	// 1 form ORDER
	$('#form-order').validate({
		rules:{ "name":{ required:true }, "tel":{ required:true } },
		messages:{ "name":{ required:"Введите своё имя" },  "tel":{ required:"Введите телефон" } },
					
		submitHandler: function(form){
			$(form).ajaxSubmit({
				url: 'send_order.php',
				type: 'POST',
				data: $(form).serialize(),					
				success: function(data) { 
					if (data)
					{							
						$('form input[type="text"]').val('');
						$('form input[type="tel"]').val('');
						$('form input[type="checkbox"]').val('');	
						
						window.location.href = "thanks.html";
						return false;	
					}
					else
					{
						$(".message-error").attr("id","mf-error").html(data).slideDown(300);
					}
				}  
			}); 
		}
	});
	
	
	// 2 form EXPERT
	$('#form-expert').validate({
		rules:{ "name":{ required:true }, "tel":{ required:true } },
		messages:{ "name":{ required:"Введите своё имя" },  "tel":{ required:"Введите телефон" } },
					
		submitHandler: function(form){
			$(form).ajaxSubmit({
				url: 'send_order.php',
				type: 'POST',
				data: $(form).serialize(),						
				success: function(data) { 
					if (data)
					{			
						$('form input[type="text"]').val('');
						$('form input[type="tel"]').val('');
						$('form input[type="checkbox"]').val('');
						
						window.location.href = "thanks.html";
						return false;
					}
					else
					{
						$(".message-expert").attr("id","mf-error").html(data).slideDown(300);
					}
				}  
			}); 
		}
	});
	
	
	// 3 form QUIZ
	$('#form-quiz').validate({
		rules:{ "name":{ required:true }, "tel":{ required:true } },
		messages:{ "name":{ required:"Введите своё имя" },  "tel":{ required:"Введите телефон" } },
					
		submitHandler: function(form){
			$(form).ajaxSubmit({
				url: 'send_quiz.php',
				type: 'POST',
				data: $(form).serialize(),						
				success: function(data) { 
					if (data)
					{			
						$('form input[type="text"]').val('');
						$('form input[type="tel"]').val('');
						window.location.href = "thanks-q.html";
						return false;
					}
					else
					{
						$(".message-quiz").attr("id","mf-error").html(data).slideDown(300);
					}
				}  
			}); 
		}
	});
	
	
	// smoove animation
	$("section").smoove({ offset:"7%" });
	$(".plan .item").smoove({ offset:"7%" });
	$(".about .carousel-item .foto, .about .carousel-item .desc").smoove({ offset:"7%" });
	$(".advant .item").smoove({ offset:"7%" });
	$(".ipoteka .col").smoove({ offset:"7%" });
	$(".banks .item").smoove({ offset:"7%" });
	$(".edin .text, .edin .img").smoove({ offset:"7%" });
	$(".offers .item").smoove({ offset:"7%" });
	$(".commerce .text, .commerce .img").smoove({ offset:"7%" });
	
});
