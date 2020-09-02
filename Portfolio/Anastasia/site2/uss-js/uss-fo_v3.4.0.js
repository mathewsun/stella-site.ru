var wtype = '';
$(document).ready(function() {
	$('.l-toggle .lt-caption').click(function() {
		$(this).siblings('.l-toggle .lt-content').toggle('fast');
		return false;
	});
});


function redyUSSfoto(link, fotoalbum, type) {
	fotoalbum = fotoalbum || false;
	type = type || false;
    window.wtype = type;
	$(link).live('click',function(e) {
		var pHeight = e.pageY;   // высот до окна
		var cHeight = e.clientY; // высота до документа
		var wHeight = $(window).height(); // высота окна
		var dHeight = $(document).height(); // высота документа

		// вычистяем середину окна браузера
		var center = (pHeight - cHeight) + wHeight/2;

		openUSSfoto($(this), center, fotoalbum, type);
		return false;
	});
	}


function openUSSfoto(_this, center, fotoalbum, type) {
	var time = 250;
	
	if (type == 'fotoalbum') {
		//начало и конец
		if($("div.uss_img_item:first").is(':visible')) $("div.uss_img_item:first").addClass('uss_img_item_first');
		if($("div.uss_img_item:last").is(':visible')) $("div.uss_img_item:last").addClass('uss_img_item_last'); 
		
		//определяем текущий элемент и его родителя
		$('div.uss_img_item').removeAttr('id');
		var parentBox = _this.parent().parent();
		parentBox.attr('id', 'uss_foto_point');
	}
	else if(type == 'eshop' || type == 'slide'){
		
		//начало и конец
		$("div.uss_img_ico:first").addClass('uss_img_item_first');
		$("div.uss_img_ico:last").addClass('uss_img_item_last');
		
		//определяем текущий элемент и его родителя
		//если первый элемент - большая картинка, переключаем на маленькую
		if(_this.parent().attr('class') == 'uss_img_big'){
			$('div.uss_img_big').removeAttr('id');
			if(type == 'eshop'){
				$('#uss_foto_point').removeAttr('id');
				$('div.uss_img_item_first').attr('id', 'uss_foto_point');
			}
						
			var parentBox = $('div#uss_foto_point');
		}
		else{
			$('div.uss_img_ico').removeAttr('id');
			var parentBox = _this.parent();
			parentBox.attr('id', 'uss_foto_point');
		}
	}

	if (center) {
	
		// выбираем уравление в зависимости от альбома
		var first = $('.uss_img_item_first').attr('class');
		var last = $('.uss_img_item_last').attr('class');
		var nextbutton = '';
		var prevbutton = '';

		if(fotoalbum) {
			nextbutton = '<a href="/" id="uss_foto_button_next" onclick="nextUSSfoto(\''+type+'\');return false;" title="Следующее изображение">Следущее</a>';
			prevbutton = '<a href="/" id="uss_foto_button_before" onclick="beforeUSSfoto(\''+type+'\');return false;" title="Предыдущее изображение">Предыдующее</a>';
		}
		
		var navigation = '	<div id="ufnav_left" class="uss_foto_button">\
								'+prevbutton+'\
								<a href="/" id="uss_foto_button_brightness" onclick="brightnessUSSfoto(0.75);return false;" title="Изменить затемнение фона">Фон</a>\
							</div>\
							<div id="ufnav_right" class="uss_foto_button">\
								<a href="/" id="uss_foto_button_close" onclick="closeUSSfoto();return false;" title="Завершить просмотр">Закрыть</a>\
								<a href="/" id="uss_foto_button_play" onclick="reviewUSSPlay(this);return false;" title="Включить автопросмотр">Автопросмотр</a>\
								'+nextbutton+'\
							</div>';
		
		$("body").append('<div id="uss_substrate" onclick="closeUSSfoto();return false;"></div><div id="uss_view_conteiner" style="top: '+center+'px"><div id="uss_inside_view_conteiner"></div>'+navigation+'</div>');

		$('#uss_substrate').css({'display': 'block', 'opacity': 0}).animate({opacity: 0.4}, 2000);
	} 
	else {
		$('#uss_insert_img').css('display', 'none');
		$('#uss_foto_description').css('display', 'none');
		// alert($('#uss_foto_description').html());
		$('#uss_inside_view_conteiner').css('background-position', '50% 50%');
	}

	right_left = '';
	if (fotoalbum) {
		// проверка доступности предыдущей фотографии .is(":first-child")
		if (parentBox.is('.uss_img_item_first')) {
			$('#uss_foto_button_before').css('visibility', 'hidden');
		} else {
			right_left +='<a href="/" id="uss_foto_button_before2" onclick="beforeUSSfoto(\''+type+'\');return false;" title="Предыдущее изображение"><span></span></a>';
			$('#uss_foto_button_before').css('visibility', 'visible');
		}
		// проверка доступности следующей фотографии
		if (parentBox.is('.uss_img_item_last')) {
			$('#uss_foto_button_next').css('visibility', 'hidden');
		} else {
			right_left +='<a href="/" id="uss_foto_button_next2" onclick="nextUSSfoto(\''+type+'\');return false;" title="Следующее изображение"><span></span></a>';
			$('#uss_foto_button_next').css('visibility', 'visible');
		}
	}

	var imgUrl = _this.attr('href');

	// загрузка изображения
	var imgPreloader = new Image();
	imgPreloader.onload = function() {
		imgPreloader.onload = null;

		var imageWidth = imgPreloader.width;
		var imageHeight = imgPreloader.height;

		if (imageWidth>800) {
			var coef=imageWidth/800;
			imageWidth=800;
			imageHeight=imageHeight/coef;
		}

		if (imageHeight>600) {
			var coef=imageHeight/600;
			imageHeight=600;
			imageWidth=imageWidth/coef;
		}


		// расширяем область
		var viewCont = $('#uss_view_conteiner');
		var insideView = $('#uss_inside_view_conteiner');

		insideView.css('background-position', '-100000px 50%');

		// вставка изображения
		var description;
		if (type == 'fotoalbum') {
			var parent = parentBox;
			var descriptionName = parent.find('div.uss_img_name').html();
			var descriptionInfo = parent.find('div.uss_img_description').html();
			}
		else if (type == 'slide') {
			var descriptionName = _this.attr('alt');
			var descriptionInfo = _this.attr('title');
		}
		else {
			var descriptionName = _this.attr('title');
		}
		
		if (descriptionName) {description = '<p><strong>' + descriptionName + '</strong></p>';} else {description = '';}
 		if (descriptionInfo) {description = description + descriptionInfo;}

		var data = '<img id="uss_insert_img" src="'+imgPreloader.src+'" width="'+imageWidth+'" height="'+imageHeight+'" style="display: none;" alt="" /><div id="uss_foto_description">'+description+'</div>'+right_left;
		insideView.html(data);

		// горизонталь
		viewCont.animate({marginLeft: '-'+imageWidth/2+'px'}, time);
		insideView.animate({width: imageWidth+'px'}, time);
		// вертикаль
		var adjust=0;
		if (center && (center-imageHeight/2)<0) {adjust=center-imageHeight/2;}
		viewCont.animate({marginTop: '-'+(imageHeight/2+adjust)+'px'}, time);
		insideView.animate({height: imageHeight+'px'}, time, function(){ viewImg(insideView, imageHeight, description); });

	}

	imgPreloader.src = imgUrl; // !объявляется после функции


}

function viewImg(insideView, imageHeight, description) {
	$('#uss_insert_img').css({'display': 'block', 'opacity': 0}).animate({opacity: 1}, 500,
			function(){
				if(description) {
					var dDom = $('#uss_foto_description');
					var dHeight = dDom.height();
					insideView.animate({height: (imageHeight+dHeight+19)+'px'}, 500);
					dDom.slideDown(500);
				}
			}
		);
}


function nextUSSfoto(type)
{
	var nextNod = $('#uss_foto_point').next('.uss_img_ico, .uss_img_item');
	//var nextNod = $('#uss_foto_point').next();
	if (nextNod.length==0) {return false;}
	var a = nextNod.find('a');
	
    $('#uss_view_conteiner *').stop(true,true);
	
    openUSSfoto(a, false, true,type);
	if(a.hasClass('nextpage')) {
		var data={};
		data['type'] = 'next';
		$.get($('.uss_pagenator .uss_page_selected').next().find('a').attr('href'), data, function(data) {
			$('.uss_photoalbums').next('.uss_pagenator').remove();
			$('.uss_photoalbums').hide();
			$('.uss_photoalbums').addClass('tmp_uss_photoalbums');
			$('.uss_modul_txt').remove();
			$('.uss_photoalbums').after(data);
			$('.tmp_uss_photoalbums').remove();
			
			if ($('#uss_foto_point').is('.uss_img_item_last')) {
				$('#uss_foto_button_next').css('visibility', 'hidden');
				$('#uss_foto_button_next2').css('visibility', 'hidden');
			} else {
				$('#uss_foto_button_next').css('visibility', 'visible');
				$('#uss_foto_button_next2').css('visibility', 'visible');
			}
		});
	}
}

function beforeUSSfoto(type)
{
	var prevNod = $('#uss_foto_point').prev();
	if (prevNod.length==0) {return false;}
	var a = prevNod.find('a');
	
	$('#uss_view_conteiner *').stop(true,true);
	
	openUSSfoto(a, false, true,type);
	if(a.hasClass('prevpage')) {
		var data={};
		data['type'] = 'prev';
		$.get($('.uss_pagenator .uss_page_selected').prev().find('a').attr('href'), data, function(data) {
			$('.uss_photoalbums').next('.uss_pagenator').remove();
			$('.uss_photoalbums').hide();
			$('.uss_photoalbums').addClass('tmp_uss_photoalbums');
			$('.uss_modul_txt').remove();
			$('.uss_photoalbums').after(data);
			$('.tmp_uss_photoalbums').remove();
			
			if ($('#uss_foto_point').is('.uss_img_item_first')) {
				$('#uss_foto_button_before').css('visibility', 'hidden');
				$('#uss_foto_button_before2').css('visibility', 'hidden');
			} else {
				$('#uss_foto_button_before').css('visibility', 'visible');
				$('#uss_foto_button_before2').css('visibility', 'visible');
			}
		});
	}
}

function brightnessUSSfoto()
{
	var substrate = $('#uss_substrate');
	var  num = parseFloat(substrate.css('opacity'));
	var  setNum;
	if(num < 1) {
		setNum = num + 0.2;
	} else {
		setNum = 0;
	}
	substrate.css('opacity', setNum);
}

function reviewUSSPlay(_this) {
	_this = _this || false;
}

function closeUSSfoto() {
	$('#uss_substrate').remove();
	$('#uss_view_conteiner').remove();
}

// управление с клавиатуры
document.onkeydown = navigateKey;
function navigateKey (event)
{
	if (window.event) event = window.event;
	if ($("#uss_substrate").length && event) { // с доп. клавишей CTRL event.ctrlKey
		switch (event.keyCode ? event.keyCode : event.which ? event.which : null) {
			case 0x1B: //esc
				closeUSSfoto();
				break;
			case 0x25: //лево
				beforeUSSfoto(window.wtype)
				break;
			case 0x27: //право
				nextUSSfoto(window.wtype);
				break;
			/*
			case 0x20: //пробел, плей и стоп
				reviewUSSPlay(1);
				break;
			*/
		}
	}
}