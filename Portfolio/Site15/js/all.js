/*------------------------------------*/
$("#forma_back_call .input_phone").mask("+7 (999) 999-9999");
$("#forma_back_call_2 .input_phone").mask("+7 (999) 999-9999");
$("#block_forma_footer .input_phone").mask("+7 (999) 999-9999");
$("#forma_1 .input_phone").mask("+7 (999) 999-9999");
$("#block_forma .input_phone").mask("+7 (999) 999-9999");

function back_call() { 
    var msg = $('#forma_back_call').serialize();
    $.ajax({
        type: 'POST',
        url: '/back_call.php',
        data: msg,
        success: function (data) {
            $('#forma_back_call .input_name').val('');
            $('#forma_back_call .input_phone').val('');
            $('#forma_back_call .input_checkbox').val('');
            $('#modal_thanks').show();
        },
        error: function () {
            $('#forma_back_call').find('.clear').html('<p>Что-то пошло не так, попробуйте снова позже!</p>');
        }
    });
}


function back_call_2() { 
    var msg = $('#forma_back_call_2').serialize();
    $.ajax({
        type: 'POST',
        url: '/back_call_2.php',
        data: msg,
        success: function (data) {
            $('#forma_back_call_2 .input_name').val('');
            $('#forma_back_call_2 .input_phone').val('');
            $('#forma_back_call_2 .input_checkbox').prop('checked', false);
            $('#modal_thanks').show();
        },
        error: function () {
            $('#forma_back_call_2').find('.clear').html('<p>Что-то пошло не так, попробуйте снова позже!</p>');
        }
    });
}


function forma_1() { 
    var msg = $('#forma_1').serialize();
    $.ajax({
        type: 'POST',
        url: '/back_call_3.php',
        data: msg,
        success: function (data) {
$('#modal_forma_1').hide();
            $('#forma_1 .input_name').val('');
            $('#forma_1 .input_phone').val('');
            $('#forma_1 .input_checkbox').prop('checked', false);
            $('#modal_thanks').show();
        },
        error: function () {
            $('#forma_1').find('.clear').html('<p>Что-то пошло не так, попробуйте снова позже!</p>');
        }
    });
}


function block_forma_footer() { 
    var msg = $('#block_forma_footer').serialize();
    $.ajax({
        type: 'POST',
        url: '/back_call_4.php',
        data: msg,
        success: function (data) {
            $('#block_forma_footer .input_name').val('');
            $('#block_forma_footer .input_phone').val('');
            $('#block_forma_footer .input_checkbox').prop('checked', false);
            $('#modal_thanks').show();
        },
        error: function () {
            $('#block_forma_footer').find('.clear').html('<p>Что-то пошло не так, попробуйте снова позже!</p>');
        }
    });
}

function block_forma() { 
    var msg = $('#block_forma').serialize();
    $.ajax({
        type: 'POST',
        url: '/back_call_5.php',
        data: msg,
        success: function (data) {
            $('#block_forma .input_text').val('');
            $('#modal_thanks').show();
        },
        error: function () {
            $('#block_forma').find('.clear').html('<p>Что-то пошло не так, попробуйте снова позже!</p>');
        }
    });
}

$(function() {
        ymaps.ready(init);
        var myMap;
        function init () { 
            myMap = new ymaps.Map("map", {
                    center: [45.016212, 38.960329],   
                   // behaviors: ['default', 'scrollZoom'],
                    zoom: 15 // тут масштаб
                });
            myMap.controls 
           // .add('routeEditor')
        		.add('zoomControl', { right: 10, top: 45 })
        		.add('typeSelector')
        		.add('mapTools', { right: 45, top: 45 })
        		//.add('searchControl', { right: 100, top: 5 });
             myMap.behaviors.disable('scrollZoom');
	        myPlacemark1 = new ymaps.Placemark([45.037318, 38.956044], {
	                balloonContent: '<div class="ballon"><p>г. Краснодар, ул. Кубанская Набережная, 274</p></div>'
	            	}, {
	            	iconImageHref: 'img/balun.png',
	            	iconImageSize: [40, 53],
	            	iconImageOffset: [-20, -30],
	                balloonContentSize: [267, 165],
	                balloonLayout: "default#imageWithContent",
	                balloonImageHref: '', 
	                balloonImageOffset: [-50, -155], 
	                balloonImageSize: [267, 165], 
	                balloonShadow: false,
	                balloonAutoPan: false 
	                });
	        myMap.geoObjects.add(myPlacemark1);
	        myPlacemark2 = new ymaps.Placemark([47.219863, 39.712610], {
	                balloonContent: '<div class="ballon"><p>Ростов-на-Дону, Социалистическая 74, БЦ «Купеческий дворъ»</p></div>'
	            	}, {
	            	iconImageHref: 'img/balun.png',
	            	iconImageSize: [40, 53],
	            	iconImageOffset: [-20, -30],
	                balloonContentSize: [267, 165],
	                balloonLayout: "default#imageWithContent",
	                balloonImageHref: '', 
	                balloonImageOffset: [-50, -155], 
	                balloonImageSize: [267, 165], 
	                balloonShadow: false,
	                balloonAutoPan: false 
	                });
	        myMap.geoObjects.add(myPlacemark2);
	        myPlacemark3 = new ymaps.Placemark([43.588339, 39.724032], {
	                balloonContent: '<div class="ballon"><p>г. Сочи, ул. Навагинская, 9д</p></div>'
	            	}, {
	            	iconImageHref: 'img/balun.png',
	            	iconImageSize: [40, 53],
	            	iconImageOffset: [-20, -30],
	                balloonContentSize: [267, 165],
	                balloonLayout: "default#imageWithContent",
	                balloonImageHref: '', 
	                balloonImageOffset: [-50, -155], 
	                balloonImageSize: [267, 165], 
	                balloonShadow: false,
	                balloonAutoPan: false 
	                });
	        myMap.geoObjects.add(myPlacemark3);
	        myPlacemark4 = new ymaps.Placemark([55.788353, 37.567922], {
	                balloonContent: '<div class="ballon"><p>Москва, Ленинградский проспект, 36, стр.11 SOK Арена Парк</p></div>'
	            	}, {
	            	iconImageHref: 'img/balun.png',
	            	iconImageSize: [40, 53],
	            	iconImageOffset: [-20, -30],
	                balloonContentSize: [267, 165],
	                balloonLayout: "default#imageWithContent",
	                balloonImageHref: '', 
	                balloonImageOffset: [-50, -155], 
	                balloonImageSize: [267, 165], 
	                balloonShadow: false,
	                balloonAutoPan: false 
	                });
	        myMap.geoObjects.add(myPlacemark4);

	        myMap.geoObjects.events.add(['balloonopen'], function (e) {
		        var geoObject = e.get('target');
		        myMap.panTo(geoObject.geometry.getCoordinates(), {delay: 0});
		    });
        
var el_1 = document.getElementById("bal_1");
el_1.addEventListener("click", showBal_1, false);
function showBal_1(){
myMap.setCenter([45.037318, 38.956044]).setZoom(15, {duration: 800});
}
var el_11 = document.getElementById("bal_11");
el_11.addEventListener("click", showBal_11, false);
function showBal_11(){
myMap.setCenter([45.037318, 38.956044]).setZoom(15, {duration: 800});
}

var el_2 = document.getElementById("bal_2");
el_2.addEventListener("click", showBal_2, false);
function showBal_2(){
myMap.setCenter([47.219863, 39.712610]).setZoom(15, {duration: 800});
}
var el_22 = document.getElementById("bal_22");
el_22.addEventListener("click", showBal_22, false);
function showBal_22(){
myMap.setCenter([47.219863, 39.712610]).setZoom(15, {duration: 800});
} 

var el_3 = document.getElementById("bal_3");
el_3.addEventListener("click", showBal_3, false);
function showBal_3(){
myMap.setCenter([43.588339, 39.724032]).setZoom(15, {duration: 800});
}
var el_33 = document.getElementById("bal_33");
el_33.addEventListener("click", showBal_33, false);
function showBal_33(){
myMap.setCenter([43.588339, 39.724032]).setZoom(15, {duration: 800});
}

var el_4 = document.getElementById("bal_4");
el_4.addEventListener("click", showBal_4, false);
function showBal_4(){
myMap.setCenter([55.788353, 37.567922]).setZoom(15, {duration: 800});
}
var el_44 = document.getElementById("bal_44");
el_44.addEventListener("click", showBal_44, false);
function showBal_44(){
myMap.setCenter([55.788353, 37.567922]).setZoom(15, {duration: 800});
}
    }

});

$(function() {

$('#map .blokirovka').click(function(){
$(this).css({'z-index':'0','display':'none'});
});

$('#map .no_blokirovka').click(function(){

if( $(this).hasClass('active') ) { $('#map .blokirovka').css({'z-index':'3','display':'block'}); $(this).html('Кликните на карту 2 раза, чтобы ей управлять.').removeClass('active')}
 else {
 $('#map .blokirovka').css({'z-index':'0','display':'none'});
 $(this).css({'color':'#000','font-weight':'700','background':'rgba(255,255,255,0.3)'}).html('Кликните, чтобы заблокировать карту').addClass('active');
 }


});

});






$(function() {

$('.click_map').click(function(){
$(this).parents('.block_about').find('.block').removeClass('active');
$(this).parents('.block').addClass('active');
});

});

$('.slide').magnificPopup({
delegate: 'a',
type: 'iframe',
iframe: {
  markup: '<div class="mfp-iframe-scaler">'+
            '<div class="mfp-close"></div>'+
            '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>'+
          '</div>', // HTML markup of popup, `mfp-close` will be replaced by the close button

  patterns: {
    youtube: {
      index: 'youtube.com/', // String that detects type of video (in this case YouTube). Simply via url.indexOf(index).

      id: 'v=', // String that splits URL in a two parts, second part should be %id%
      // Or null - full URL will be returned
      // Or a function that should return %id%, for example:
      // id: function(url) { return 'parsed id'; }

      src: '//www.youtube.com/embed/%id%?autoplay=1' // URL that will be set as a source for iframe.
    },
    vimeo: {
      index: 'vimeo.com/',
      id: '/',
      src: '//player.vimeo.com/video/%id%?autoplay=1'
    },
    gmaps: {
      index: '//maps.google.',
      src: '%id%&output=embed'
    }

    // you may add here more sources

  },

  srcAction: 'iframe_src', // Templating object key. First part defines CSS selector, second attribute. "iframe_src" means: find "iframe" and set attribute "src".
}
});



/*----------------поэтапный скроллинг----------------*/
$(function() {
if ($(document).width() < 1479) {
$('.totop').click(function(evt) {
$(this).parents('nav').find('a').removeClass('active');
	evt.preventDefault();
	var href=$(this).attr('href');
	var myRegEx=/#/;
	var position=href.search(myRegEx);
	var url=href.slice(position);
	var top_elem=$(url).offset().top-'30';
	var top=$(this).offset().top;
$(this).addClass('active');
$('html,body').animate( {scrollTop: top_elem},1000);
});
}
else {
$('.totop').click(function(evt) {
$(this).parents('nav').find('a').removeClass('active');
	evt.preventDefault();
	var href=$(this).attr('href');
	var myRegEx=/#/;
	var position=href.search(myRegEx);
	var url=href.slice(position);
	var top_elem=$(url).offset().top-'100';
	var top=$(this).offset().top;
$(this).addClass('active');
$('html,body').animate( {scrollTop: top_elem},1000);
});
}




});

/*--------------фиксируем меню--------------*/

$(function() {
var docWidth = $(document).width();

var startMenu = $(".menu").offset().top;
var starthead = $(".head").offset().top;

var docWidth = $(document).width();
var scrollTop = $(window).scrollTop();
$(window).scroll(function(){
if (docWidth < 1479) {

if ($(window).scrollTop()>= startMenu ) {
if ( $('.menu').hasClass() == false ) {
$('.menu').addClass('stick');
}
} else {
$('.menu').removeClass('stick');
}

}
else {
if ($(window).scrollTop()>= starthead ) {
if ( $('.head').hasClass() == false ) {
$('.head').addClass('stick');
}
} else {
$('.head').removeClass('stick');
}

}

});

/*************************/

$(window).scroll(function() {
if(!$('.navbar-toggle').hasClass('collapsed')) { 
$('.navbar-toggle').addClass('collapsed');
$('.navbar-collapse.collapse').removeClass('in')
}
});

/**************************/
$('.button_instrument_for_mobile_open').click(function() {

if( $('.block_instrument_for_mobile').is(':hidden') ) { $('.block_instrument_for_mobile').show(); $('.button_instrument_for_mobile_hidden').css({'display':'block'}); $(this).hide();}
else { $('.block_instrument_for_mobile').hide(); $('.button_instrument_for_mobile_hidden').css({'display':'block'});}

});


$('.button_instrument_for_mobile_hidden').click(function() {
$('.block_instrument_for_mobile').hide(); 
$(this).hide();
$('.button_instrument_for_mobile_open').show();
});

/**************************/
$('.button_block_11_for_mobile_open').click(function() {
$('.block_11_for_mobile_hidden').show(); 
$(this).hide();
$('.button_block_11_for_mobile_hidden').show();
});

$('.button_block_11_for_mobile_hidden').click(function() {
$('.block_11_for_mobile_hidden').hide(); 
$(this).hide();
$('.button_block_11_for_mobile_open').show();
});





});


/*--------------slick--------------*/
$('.block_slider').slick();

$('.block_video').slick( {
dots: false,
infinite: true,
slidesToShow: 3,
slidesToScroll: 1,
/*centerMode: true,*/
responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: true,
        dots: false
      }
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: true,
        dots: false
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: false
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
});


$(document).ready(function() {

/*==============модальное окно==================*/
$(function() {
$('.modal_open').click(
function(evt){
evt.preventDefault();
var href=$(this).attr('href');
$('.overlay_write').show();
$(href).show(100);
});
$('.overlay_write').click(
function(){
$(this).hide();
$('.modal_write').hide();
});
$('.close_write').click(
function(){
$('.overlay_write').hide();
$('.modal_write').hide(); 
});
});

/*---------------для слайдера-ползунка---------*/
$(function() {
$('#range').val();
$('#range').mousemove(function() { $('#value_range').html($('#range').val()+' p.'); });
$('#range').change(function() { $('#value_range').html($('#range').val()+' p.'); });
});

/*-------------radioblock------------*/
$(function() {
$('.block_risk .radioblock').find('.radio_risk').each(function(){
	$(this).click(function(){
		var valueRadio = $(this).html();
		$(this).parent().find('.radio_risk').removeClass('active');
		$(this).addClass('active');
		$(this).parent().find('input').val(valueRadio);
	});
});

});


$(function() {
$('.block_srok .radioblock').find('.radio_risk').each(function(){
	$(this).click(function(){
		var valueRadio = $(this).html();
		$(this).parent().find('.radio_risk').removeClass('active');
		$(this).addClass('active');
		$(this).parent().find('input').val(valueRadio);
	});
});

});



/*-------------раскрытие блока-----------*/


$(function() {

$('.block_1 .button_instrument').each(function(){
var height_block_duble = $('.block_1.block_duble').css('height');
$(this).click(function(){

$(this).parents('.block_instrument').find('.block_1 .button_instrument').removeClass('noactive');
$(this).parents('.block_instrument').find('.block_1').removeClass('active');
$(this).parents('.block_instrument').find('.block_1 .button_instrument_modal').removeClass('active');
$(this).parents('.block_instrument').find('.block_1 .block_text').removeClass('index');
$(this).parents('.block_instrument').find('.block_1.block_duble').css({'height':height_block_duble});
$(this).parents('.block_1.block_duble').css({'height':'auto'});

$(this).parents('.block_1').addClass('active');
$(this).parents('.block_1').find('.button_instrument_modal').addClass('active');
$(this).parents('.block_1').find('.block_text').addClass('index');
$(this).parents('.block_1.block_duble').find('.block_text.index').css({'box-shadow':'none'});

$(this).addClass('noactive');

});
});


/*-------------------------------------*/
$(document).click(function (event) {
 if ($(event.target).closest('.block_1 .button_instrument').length) return;
$('.block_1').removeClass('active');
$('.block_1').find('.button_instrument').removeClass('noactive');
$('.block_1').find('.button_instrument_modal').removeClass('active');
$('.block_instrument').find('.block_1 .block_text').removeClass('index');
  event.stopPropagation();  /*препятствует продвижению события дальше*/
});





$('.block_info_close').click(function(){
$(this).parents('.block_1').removeClass('active');
$(this).parents('.block_1').find('.button_instrument').removeClass('noactive');
$(this).parents('.block_1').find('.button_instrument_modal').removeClass('active');
$(this).parents('.block_instrument').find('.block_1 .block_text').removeClass('index');
});






$('.vopros img.plus').each(function(){
$(this).click(function(){
$(this).parents('.block_vopros').find('.vopros').removeClass('active');
$(this).parents('.block_vopros').find('.vopros img.plus').removeClass('noactive');
$(this).parents('.block_vopros').find('.vopros img.minus').removeClass('active');
$(this).parents('.block_vopros').find('.vopros p').removeClass('active');

$(this).parents('.vopros').addClass('active');
$(this).addClass('noactive');
$(this).parents('.vopros').find('img.minus').addClass('active');
$(this).parents('.vopros').find('p').addClass('active');
});
});


$('.vopros img.minus').each(function(){
$(this).click(function(){
$(this).parents('.vopros').removeClass('active');
$(this).parents('.vopros').find('img.plus').removeClass('noactive');
$(this).parents('.vopros').find('p').removeClass('active');
$(this).removeClass('active');
});
});





});











/*end ready*/
});








