// смена изображения в подробном описании товара
function eshopUSSchangeDetailImage(_this)
{
	var uss_eshop_icons = $('.uss_img_big .uss_eshop_icons').html();
	var uss_eshop_icons_classes = $('.uss_img_big .uss_eshop_icons').attr('class');
	
	var imgUrl = _this.attr('href');

	var imgPreloader = new Image();
	imgPreloader.onload = function() {
		imgPreloader.onload = null;

		var imageWidth = imgPreloader.width;
		var imageHeight = imgPreloader.height;
		var insideView = $('div.uss_img_big');
		var data = '<img src="'+imgPreloader.src+'" width="'+imageWidth+'" height="'+imageHeight+'" style="margin-left: -'+parseInt(imageWidth/2)+'px; margin-top: -'+parseInt(imageHeight/2)+'px;" alt="" />';
		insideView.html(data);
		insideView.append('<div class="'+uss_eshop_icons_classes+'">'+uss_eshop_icons+'</div>');
	}
	imgPreloader.src = imgUrl;
}


/*
//Меняем количество товара в корзине, нажатием на +/-
function basketUpdateCount(id, change)
{
	var insertObj = $('#'+id);
	var newval = parseInt(insertObj.val()) + parseInt(change);
	if (newval >= 1) { 
		insertObj.val(newval); 
	}	
}
*/


function changeFilterFormAction(_this) {
	var form = $(_this).parents('form#uss_block_filters');
	//var form = $('#uss_block_filters');
	
	if ($(_this).attr('checked')) {
		var action=$('#filter_action').attr('class');
		form.attr('action',action);
	}
	else {
		var actiondefault=$('#filter_actiondefault').attr('class');
		form.attr('action',actiondefault);
	}
}



//Переключаем вывод похожих позиций, на цены или категории
function changeItemInBasket(_this,item_id,amount,change,specsAmount) {
	var body=$('body');
	body.css('cursor','wait');
	var basketMini=$('.uss_basket_mini');
	var basketBig=$('.uss_basket_big');
	var basketMain=$('.uss_user_basket');
	
	if (basketMini.html()) {type='mini';}
	else if (basketBig.html()) {type='big';}
	else {type='none';}

	var link = $(_this).attr('href');

	if(!change) {
		var val= $(_this).val();
		val = val.replace(',','.');
		val = parseFloat(val).toFixed(2)*1;
		if  (!val || val<=0) {val=1;}
		$(_this).val(val);
	}
	
	if (!link && !val) {return false;}
	
	
	if (link) {
		var cont = $(_this);
		var oldContHtml=cont.html();
		$(_this).removeAttr('href');
		cont.html('<span class="uss_basket_loader">&nbsp;&nbsp;&nbsp;&nbsp;</span>');
	}
	
	
	//Указываем жестко ссылку, если меняли количество через прямой ввод числа в инпуте
	if (val && !link) {link='basket/?change='+item_id+'&amount='+val;}
	
	if (!change) {change=0;}
	
	//change = parseFloat(change).toFixed(0);
	change = parseFloat(change);
	if (change>0) {addAmount=change;} else {addAmount=0;}
	
	if ($(_this).parents('tr.basket_item').length) {
		arr = $(_this).parents('tr.basket_item').attr('id').split('_');
	}
	
	//Создаем массив для параметров в скрипт
	data={};
	//Если у позиции присутствовал набор характеристик, то получаем выбраные значения, и передаем их скрипту корзины
	if (specsAmount && specsAmount>0) {
		for (var i=0;i<specsAmount;i++) {
			if ($('.uss_specifications').length) {
				specItem = $('.uss_specifications .spec_item #specification_'+item_id+'_'+i).val();
				if (specItem) {data['spec'+i] = specItem;}
			} else {
				data['spec'+i] = arr[3+i];
			}
		}
	}
	
	data['baskettype']=type;
	data['addamount']=addAmount;
	
	//Если итого лежит в span, то это старая корзина, которой отправляем доп.параметр стиля
	if ($('.uss_basket_mini span.totals').html()) {data['style']=1;}
	
	$.get(link, data, function(data) {
		if (type=='mini' && data) {
			//тк служебные слова могут быть произвольными, и не известно, какими именнно, то запоминаем старые, и заменяем новые на них
			var oldAmountsTitle=basketMini.find('.amounts').find('.countword').html();
			var oldTotalsTitle=basketMini.find('.totals').find('.priceword').html();
			
			basketMini.html(data);
			
			if (oldAmountsTitle) {basketMini.find('.amounts').find('.countword').html(oldAmountsTitle);}
			if (oldTotalsTitle) {basketMini.find('.totals').find('.priceword').html(oldTotalsTitle);}
			
		}
		else if (type=='big' && data) {basketBig.html(data);}
 		
		if (type=='none') {
			var totals=$('#uss_basket_totals');
			if (totals.html()) {totals.html(data);}
			else {
				$('body').append(data);
				var message_window=$('#uss_basket_ask_where_to_go_block');
				message_window.siblings('span.currency_total').remove();
			}
			
			}
		else {
			var newTotals=$('#uss_block_basket_totals').html();
			$('#uss_basket_totals').html(newTotals);
		}
		
		var item_amount=$('#basket_amount_'+item_id);
		
		if (amount) {var new_amount=amount;}
		else if (change) {var new_amount=parseFloat(item_amount.val())+parseFloat(change);}
		else {var new_amount=parseFloat(item_amount.val());}
		
		new_amount = new_amount.toFixed(2)*1;
		
		if (new_amount<=0) {new_amount=parseFloat(item_amount.val());}
		
		if (new_amount) {
			item_amount.val(new_amount);
			var price=parseFloat($('#basket_item_price_'+item_id).attr('rel'));
			if (!isNaN(price)) {
				var total = new_amount*price
				arr = total+'';
				arr = arr.split('.');
				if (arr.length>1) {count=2;}
				else {count=0;}
				total = number_format(total, count, '.', $('#basket_item_price_'+item_id).attr('razd'));
				$('#basket_item_total_'+item_id).html(total);
			}
		}
		
		
		//Ставим ссылку "оформить заказ", вместо ссылки "в корзину"
		
		if (cont) {var contClass=cont.attr('class');}
		
		if (cont  && cont.hasClass('add_to_cart') && (!specsAmount || specsAmount==0)) {
			cont.attr('href','/basket/');
			cont.attr('onclick','');
			//cont.removeClass('add_to_cart');
			cont.addClass('already_in_cart');
			
			cont.html($('.text_after_order_'+item_id).eq(0).html());
			
			// if (oldContHtml=='add to cart') {cont.html('Proceed to checkout');}
			// else {cont.html('оформить заказ');}
			
			
			var amountInput=$('.basket_amount_pos_'+item_id);
			if (amountInput) {
				var amountTitle=amountInput.siblings('.amount_title');
				amountTitle.remove();
				amountInput.remove();
			}
		}
		else if (cont) {
			$(_this).attr('href',link);
			cont.html(oldContHtml);
		}
			
		//Выводим всплывающее окно в центре экрана, если оно пришло в ответе
		var message_window=$('#uss_basket_ask_where_to_go_block');
		if (message_window.find('div').html()) {
			$('body').append('<div id="uss_basket_ask_where_to_go_block">'+message_window.html()+'</div>');
			message_window.remove();
			var message_window=$('#uss_basket_ask_where_to_go_block');
					
			var top = Math.round((getClientHeight()-message_window.height()*2)/2)+getScrollY();
			var left = Math.round((getClientWidth()-message_window.width())/2);
			
			message_window.css('top', top+'px');
			message_window.css('left', left+'px');
		}
		
		if (body) {body.css('cursor','default');}
		
		if (basketMain.html()) {
			change_all_sum();
		}
		
	});
	return false;
}
	
function change_all_sum() {
	main_type='main';
	data2={};
	data2['main_type']=main_type;
	$.get('basket/', data2, function(data2) {
		var splstr=data2.split("|");
		if(parseInt(splstr[0])<parseInt(splstr[3]) || parseInt(splstr[4])<parseInt(splstr[3])) {
			$('.uss_shop_form .uss_form_tml').addClass('form_basket_hide');
			$('.uss_min_sum_order_text_wrapper').html(splstr[5]);
			$('.uss_shop_form .uss_error_form').remove();
		} else {
			$('.uss_shop_form .uss_form_tml').removeClass('form_basket_hide');
			$('.uss_min_sum_order_text_wrapper').html('');
			$('.uss_shop_form .uss_error_form').remove();
		}
		if(!splstr[0]) {
			$('.uss_bottom.summ_without_discount').html('');
		} else {
			$('.uss_bottom.summ_without_discount').html('<td colspan="7" class="totals"><span class="title">'+splstr[1]+':</span> <span id="uss_basket_summ_without_discount">'+splstr[0]+'</span></td>');
		}
		if(!splstr[2]) {
			$('.uss_bottom.summ_with_discount').html('');
		} else {
			$('.uss_bottom.summ_with_discount').html('<td colspan="7" class="totals">'+splstr[2]+'</td>');
		}
	});
}
	
function removeItemFromBasket (_this,item_id) {
	var basketMini=$('.uss_basket_mini');
	var basketBig=$('.uss_basket_big');
	var basketMain=$('.uss_user_basket');
	
	if (basketMini.html()) {type='mini';}
	else if (basketBig.html()) {type='big';}
	else {type='none';}

	var link = $(_this).attr('href');
	if (!link) {return false;}
	var cont = $(_this);
	var oldContHtml=cont.html();
	$(_this).removeAttr('href');
	cont.html('<span class="uss_basket_loader">&nbsp;&nbsp;&nbsp;&nbsp;</span>');
	
	data={};
	data['baskettype']=type;
	//Если итого лежит в span, то это старая корзина, которой отправляем доп.параметр стиля
	if ($('.uss_basket_mini span.totals').html()) {data['style']=1;}
	
	$.get(link, data, function(data) {
		if (type=='mini' && data) {
		
			//тк служебные слова могут быть произвольными, и не известно, какими именнно, то запоминаем старые, и заменяем новые на них
			var oldAmountsTitle=basketMini.find('.amounts').find('.countword').html();
			var oldTotalsTitle=basketMini.find('.totals').find('.priceword').html();
			
			basketMini.html(data);
			
			if (oldAmountsTitle) {basketMini.find('.amounts').find('.countword').html(oldAmountsTitle);}
			if (oldTotalsTitle) {basketMini.find('.totals').find('.priceword').html(oldTotalsTitle);}

		}
		else if (type=='big' && data) {basketBig.html(data);}
		
		
		$('.uss_user_basket #basket_item_'+item_id).remove();
		
		
		//Изменяем сумму итого в основной корзине, либо очищаем весь контент корзины, если в корзине ничего не лежит
		
		var newTotals=$('#uss_block_basket_totals').html();
		
		if (newTotals) {$('#uss_basket_totals').html(newTotals);}
		else if (type=='none' && trim(data)) {$('#uss_basket_totals').html(data);}
		else {
			
			$('.uss_user_basket').html(data);
			$('#eshoporderaddform_id').html('');
		}
		if (newTotals==' ') {$('.uss_bottom').hide();}
		else {$('.uss_bottom').show();}
		
		if (basketMain.html()) {
			change_all_sum();
		}
	});
	return false;

}

function closePopupBasketWindow() {
	$('#uss_basket_ask_where_to_go_block').remove();
}


/* *Ряд функций для определения середины экрана* */
function getClientWidth() {
  return document.compatMode=='CSS1Compat' && !window.opera?document.documentElement.clientWidth:document.body.clientWidth;
}
 
function getClientHeight() {
  return document.compatMode=='CSS1Compat' && !window.opera?document.documentElement.clientHeight:document.body.clientHeight;
}
 
function getScrollY() {
    scrollY = 0;   
    if (typeof window.pageYOffset == "number") {
        scrollY = window.pageYOffset;
    } else if (document.documentElement && document.documentElement.scrollTop) {
        scrollY = document.documentElement.scrollTop;
    }  else if (document.body && document.body.scrollTop) {
        scrollY = document.body.scrollTop;
    } else if (window.scrollY) {
        scrollY = window.scrollY;
    }
    return scrollY;
} 
/* END *Ряд функций для определения середины экрана* */

function trim(str) {
	return str.replace(/\s+$/, '').replace(/^\s+/, '');
	
}


function deleteWish(a,id,harakteristics) {
	harakteristics = harakteristics || '';
	$.ajax({
		url: $(a).attr('href')+'&harakteristics='+harakteristics,
		success: function(data){
			if ($('.uss_user_wishlist table tr#basket_item_'+id+harakteristics).length) {
				$('.uss_user_wishlist table tr#basket_item_'+id+harakteristics).remove();
			}
			if ($('.uss_user_wishlist table td').length <= 0 ) {
				$('.uss_user_wishlist').html('У вас нет отложенных товаров');
			}
			if($('.uss_wishlist_big .wishlist_item').length) {
				$('.uss_wishlist_big .wishlist_item_'+id+harakteristics).remove();
				if(!$('.uss_wishlist_big .wishlist_item').length) {
					$('.uss_wishlist_big').append('У вас нет отложенных товаров');
				}
			}
		}
	});	
}

function addWish(a,this_id, del_from_cart, specsAmount){
	var whislist = $('.uss_wishlist_big');
	var href = $(a).attr('href');
	var url = $(a).attr('href').split('?');
	var not_in_pos = 1;
	if ($(a).parents('tr').length) {
		arr = $(a).parents('tr').attr('id').split('_');
	}
	//Создаем массив для параметров в скрипт
	params={};
	if (specsAmount && specsAmount>0) {
		for (var i=0;i<specsAmount;i++) {
			if ($('.uss_specifications').length) { 
				specItem = $('.uss_specifications .spec_item #specification_'+this_id+'_'+i).val();
				if (specItem) {params['spec'+i] = specItem;}
				not_in_pos = 0;
			} else {
				params['spec'+i] = arr[3+i];
				not_in_pos = 1;
			}
		}
	}
	
	if (del_from_cart && !not_in_pos) {
		$(a).attr('href','/basket/?remove='+this_id);
		removeItemFromBasket(a,this_id);
	}
	if (del_from_cart && not_in_pos) {
		$(a).next().click();
	}
	
   	if (!specsAmount) {
		$(a).attr('href',url[0]);
		$(a).attr('onClick','');
	}
	
	$.ajax({
   		url: href,
		data: params,
		type: "POST",
   		success: function(msg){
			if (!specsAmount) {$(a).html('Товар отложен');}
			if(whislist.length && !$(a).hasClass('already_in_wish')) {
				whislist.find('p').remove();
				whislist.append(msg);
			}
		}
 	});
}

function addCompare(_this,item_id) {
	var current_element = $(_this);
	var link = current_element.attr('href');
	
	if (link) {
		var oldContHtml=current_element.html();
		$(_this).removeAttr('href');
		current_element.html('<span class="uss_basket_loader">&nbsp;&nbsp;&nbsp;&nbsp;</span>');
	}
	
	var store_link = link.split('?',1);
	store_link = store_link[0];
	
	//Создаем массив для параметров в скрипт
	data={};
	data['item_id']=item_id;
	$.get(link, data, function(data) {
		current_element.attr('href', store_link);
		current_element.removeAttr('onclick');
		current_element.addClass('already_in_compare');
		if (oldContHtml=='add to compare') {current_element.html('To checkout');}
		else {current_element.html('Перейти к сравнению');}
	});
}

function delCompare(_this) {
	event.preventDefault();
	var link = _this.attr('href');
	var rel = _this.attr('rel');
	//Создаем массив для параметров в скрипт
	data={};
	$.get(link, data, function(data) {
		$('.tab_item.current .compare_table td.td_item_'+rel).each(function(event) {
			if ($(this).nextAll('.hidden_compare').length) {
				temp = $(this).nextAll('.hidden_compare');
				$(temp[0]).removeClass('hidden_compare').addClass('visible_compare');
				if (!$(this).nextAll('.hidden_compare').length) {$('.tab_item.current #compare_table_scroll_right').hide();}
				$(this).remove();
			}
			else if ($(this).prevAll('.hidden_compare').length) {
				temp = $(this).prevAll('.hidden_compare');
				$(temp[0]).removeClass('hidden_compare').addClass('visible_compare');
				if (!$(this).prevAll('.hidden_compare').length) {$('.tab_item.current #compare_table_scroll_left').hide();}
				$(this).remove();
			}
			else {
				if ($(this).siblings().length-1 == 0) {
					$('#compare_block .tab_item.current,#compare_block_tabs .current').remove();
					if ($('#compare_block_tabs .tab_action').length) {
						$('#compare_block_tabs .tab_action:first').click();
					}
					else {
						$('#compare_block_tabs').remove();
						$('#compare_block').replaceWith('Вы не выбрали позиции для сравнения');
					}
					return false;
				}
				temp = Math.round(100/($(this).siblings().length-1));
				$('.tab_item.current .compare_table td.td_item').css('width',temp+'%');
				$('.tab_item.current #compare_table_scroll_right').hide();
				$('.tab_item.current #compare_table_scroll_left').hide();
				$(this).remove();
			}
		});
		$('.tab_item.current .compare_table tr').not('.del_link_item,.image_item,.title_item,.price_item,.old_price_item,.to_basket_item,.big_title_tr').each(function() {
			cur_tds = $(this).find('td.td_item');
			current_text = $(cur_tds[0]).html();
			diff_tr = false;
			cur_tds.each(function() {
				if (current_text != $(this).html()) {diff_tr = true; return false;}
			});
			if (!diff_tr) {
				$(this).removeClass('various_positions').addClass('same_positions');
			}
			if ($.trim(current_text) == '' && !diff_tr) {$(this).remove();} 
		});
		
		$('.tab_item.current .compare_table tr.big_title_tr').each(function() {
			if (!$(this).next().length || $(this).next().hasClass('big_title_tr')) {$(this).remove();}
		});
	});
	return false;
}

function compare_scroll(way){
	if (way) { a = 'first'; b = 'last'; b1 = 1; }
	else { a = 'last'; b = 'first'; b1 = -1; }
	
	var ind = $('.tab_item.current .compare_table tr:first td').index($('.tab_item.current .compare_table tr:first td.visible_compare:'+a));
	var indd = $('.tab_item.current .compare_table tr:first td').index($('.tab_item.current .compare_table tr:first td.visible_compare:'+b))+b1;
	
	$('.tab_item.current .compare_table tr').each(function() {
		temp = $(this).children();
		$(temp[ind]).removeClass('visible_compare').addClass('hidden_compare');
		$(temp[indd]).removeClass('hidden_compare').addClass('visible_compare');
	});
	
	if (way) {
		if (indd == $('.tab_item.current .compare_table tr:first td').length - 1) {
			$('.tab_item.current #compare_table_scroll_right').hide();
		}
		if (ind >= 1) {
			$('.tab_item.current #compare_table_scroll_left').show();
		}
	}
	else {
		if (indd == 1) {
			$('.tab_item.current #compare_table_scroll_left').hide();
		}
		if (ind < $('.tab_item.current .compare_table tr:first td').length) {
			$('.tab_item.current #compare_table_scroll_right').show();
		}
	}
}

function number_format( number, decimals, dec_point, thousands_sep ) {
	var i, j, kw, kd, km, minus = "";
	
	if(number < 0){
		minus = "-";
		number = number*-1;
	}

	// input sanitation & defaults
	if( isNaN(decimals = Math.abs(decimals)) ){
		decimals = 2;
	}
	if( dec_point == undefined ){
		dec_point = ",";
	}
	if( thousands_sep == undefined ){
		thousands_sep = ".";
	}

	i = parseInt(number = (+number || 0).toFixed(decimals)) + "";

	if( (j = i.length) > 3 ){
		j = j % 3;
	} else{
		j = 0;
	}

	km = (j ? i.substr(0, j) + thousands_sep : "");
	kw = i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands_sep);
	//kd = (decimals ? dec_point + Math.abs(number - i).toFixed(decimals).slice(2) : "");
	kd = (decimals ? dec_point + Math.abs(number - i).toFixed(decimals).replace(/-/, 0).slice(2) : "");


	return minus + km + kw + kd;
}



$(document).ready(function() {
	$('td.uss_delete_pos a').click(function(){
		if ($(this).hasClass('add_to_cart') && !$(this).hasClass('already_in_cart')) {
			if ($('#buy_count').length) {
				$('#buy_count').text($('#buy_count').text()*1+1);
			}
			$(this).parent().find('.del_wish').click();
		}
		if ($(this).hasClass('add_to_cart') && $(this).hasClass('already_in_cart')) {
			$(this).parent().find('.del_wish').click();
		}
		if ($(this).hasClass('add_to_wishlist') && !$(this).hasClass('already_in_wish')) {
			if ($('#wish_count').length) {
				$('#wish_count').text($('#wish_count').text()*1+1);
			}
		}
		
		if ($(this).hasClass('del_wish')) {
			if ($('#wish_count').length) {
				$('#wish_count').text($('#wish_count').text()-1);
			}
		}
		if ($(this).hasClass('del_basket_item')) {
			if ($('#buy_count').length) {
				$('#buy_count').text($('#buy_count').text()-1);
			}
		}
	});
	$('.wishlist_item .delete_link a').click(function(){
		if ($('#wish_count').length) {
			$('#wish_count').text($('#wish_count').text()-1);
		}
	})
	$('.basket_item .delete_link a').click(function(){
		if ($('#buy_count').length) {
			$('#buy_count').text($('#buy_count').text()-1);
		}
	})
});



	