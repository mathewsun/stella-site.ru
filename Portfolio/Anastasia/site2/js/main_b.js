function input_funct(element, text) {
    $(element).val(text).addClass('grey');
    $(element).focus(function() {
        if ($(this).val() == text) {
            $(this).val('').removeClass('grey').addClass('black');
        }
    });
    $(element).blur(function() {
        if ($(this).val() == '') {
            $(this).val(text).removeClass('black').addClass('grey');
        }
    });
}

function resetFormFilters() {
    location.replace($('.portfolio_filters .l_filter_sbros').attr('href'));
}
$(document).ready(function() {

    $('.mpp_inner2.exp_p .pos_link_a_filter.go_to_top').live('click', function(){
        var _this = $(this);
        var wrap = _this.closest('.fifth-examples');
        var inner = _this.closest('.mpp_inner2');

        $.ajax(_this.attr('href') + '&ajax_p_item=1', {
            type: 'get',
            beforeSend: function() {
                inner.append('<div class="ajax_loader"><img src="http://urallite.ru/uss-img/159.gif"></div>');
                inner.find('.ajax_loader').show();
                $('.fifth-examples').not(wrap).find('.portfolio_ajax_item').slideUp(300, function(){
                    $(this).remove();
                    $('html, body').animate({ scrollTop: (inner.offset().top - $('.lh_menu').outerHeight()) }, 300);
                })
                $('.fifth-examples').not(wrap).find('.mpp_inner2 ul li.active').removeClass('active');
            },
            success: function(response){
                _this.closest('ul').find('li').removeClass('active');
                _this.closest('li').addClass('active');
                inner.find('.ajax_loader').remove();
                if(wrap.find('.portfolio_ajax_item').length){
                    wrap.find('.portfolio_ajax_item').html(response);
                }
                else{
                    wrap.append('<div class="portfolio_ajax_item" style="display:none;">' + response + '</div>');
                    wrap.find('.portfolio_ajax_item').slideDown(300);
                }
                if(inner.find('.mp_left').hasClass('no_active') && inner.find('ul li:first').hasClass('active')){
                    wrap.find('.portfolio_ajax_item .link_to_prev').addClass('no_active');
                }
                if(inner.find('.mp_right').hasClass('no_active') && inner.find('ul li:last').hasClass('active')){
                    wrap.find('.portfolio_ajax_item .link_to_next').addClass('no_active');
                }

				$('html, body').animate({ scrollTop: (wrap.find('.portfolio_ajax_item').offset().top - $('.lh_menu').outerHeight()) }, 300);
            }
        });
        return false;
    });

    $('.fifth-examples .close_pos').live('click', function(){
        var wrap = $(this).closest('.fifth-examples');
        wrap.find('.mpp_inner2 ul li.active').removeClass('active');
        wrap.find('.portfolio_ajax_item').slideUp(300, function(){
            $(this).remove();
        });
        return false;
    });

    $('.portfolio_ajax_item .link_to_next a, .portfolio_ajax_item .link_to_prev a').live('click', function(){
        var wrap = $(this).closest('.fifth-examples').find('.mpp_inner2.exp_p');
        if(!wrap.length){
            return false;
        }
        if($(this).parent().hasClass('link_to_prev')){
            var isFirst = $(this).closest('.fifth-examples').find('.mpp_inner2.exp_p ul li:first').hasClass('active');
            if(isFirst){
                wrap.addClass('last_but_click');
                wrap.find('.mp_left').closest('a').trigger('click');
            }
            else{
                wrap.find('ul li.active').prev().find('.pos_link_a_filter.go_to_top:first').trigger('click');
            }
        }
        else{
            var isLast = $(this).closest('.fifth-examples').find('.mpp_inner2.exp_p ul li:last').hasClass('active');
            if(isLast){
                wrap.addClass('first_but_click');
                wrap.find('.mp_right').closest('a').trigger('click');
            }
            else{
                wrap.find('ul li.active').next().find('.pos_link_a_filter.go_to_top:first').trigger('click');
            }
        }

        return false;
    });


    // Слайдер в разделе мобильной версии

    lm_slider_pos = 0;
    lm_slider_pos_pix = 0;
    lm_slider_pages = 8;
    lm_slider_page_size = 230;

    $('.lm__slider_right').click(function(event) {
        if (lm_slider_pos < lm_slider_pages - 4) {
            lm_slider_pos = lm_slider_pos + 1;
            if ($('.lm__slider_left').hasClass('disabled')) {
                $('.lm__slider_left').removeClass('disabled');
            }
            lm_slider_pos_pix = lm_slider_pos_pix - lm_slider_page_size;
            $('.slider ul').animate({
                left: lm_slider_pos_pix
            }, 500);
            if (lm_slider_pos === 4) {
                $(this).addClass('disabled');
            }
        } else {
            $(this).addClass('disabled');
        }
    });

    $('.lm__slider_left').addClass('disabled');

    $('.lm__slider_left').click(function(event) {
        if (lm_slider_pos >= 1) {
            lm_slider_pos = lm_slider_pos - 1;
            lm_slider_pos_pix = lm_slider_pos_pix + lm_slider_page_size;
            if ($('.lm__slider_right').hasClass('disabled')) {
                $('.lm__slider_right').removeClass('disabled');
            }
            $('.slider ul').animate({
                left: lm_slider_pos_pix
            }, 500);
            if (lm_slider_pos === 0) {
                $(this).addClass('disabled');
            }
        } else {
            $(this).addClass('disabled');
        }
    });


    /* Слайдер - планшет */
    $('input.styler, select.styler').styler();
    $('.lp_develop_top a').click(function() {
        $('.lp_develop_top a').removeClass('active');
        $(this).addClass('active');
        $('.besplat, .plat').hide();
        $('.' + $(this).attr('id')).show();
        $('.l_planshet').attr('id', false);
        return false;
    });
    $('.lpd_l li').click(function() {
        if ($(this).hasClass('active')) {
            $('.lpd_l li').removeClass('active');
            $('.l_planshet').attr('id', false);
            return false;
        }
        $('.lpd_l li').removeClass('active');
        $(this).addClass('active');
        $('.l_planshet').attr('id', $(this).attr('id'));
        return false;
    });
    /* Ставим видюшке громкость по умолчанию на половину */
    var $vid = document.getElementById("uss_video");
    if ($vid) {
        $vid.volume = 0.5;
    }
    /**/
    if ($('.lb_development').length > 0 && $('.dsite_block4').length > 0) {
        $('.dsite_block4').html($('.lb_development').html());
        $('.lb_development').remove();
    }
    if ($('.lb_design').length > 0 && $('.dsite_block4').length > 0) {
        $('.dsite_block4').html($('.lb_design').html());
        $('.lb_design').remove();
    }
    $('.dsite_block2').click(function() {
        $('.dsite_block2').removeClass('hover');
        $(this).addClass('hover');
    });
    $('.dsite_block2 .tarif_conteiner').click(function() {
        $('.dsite_block2 .tarif_conteiner').removeClass('hover');
        $(this).addClass('hover');
    });
    var top = $(document).scrollTop();
    var already_num = 1;

    function NumAnimate() {
        $('.wtb_block1 .red span, .wtb_block2 .red span, .wtb_block3 .red span, .wtb_block4 .red span,.wtb_block5 .red span, .wtb_block6 .red span, .wtb_block7 .red span, .wtb_block8 .red span').stop();
        $('.wtb_block1 .red span').animateNumber({
            number: 3000
        }, 1500);
        $('.wtb_block2 .red span').animateNumber({
            number: 30
        }, 1200);
        $('.wtb_block3 .red span').animateNumber({
            number: 500
        }, 1200);
        $('.wtb_block4 .red span').animateNumber({
            number: 10
        }, 900);
        $('.wtb_block5 .red span').animateNumber({
            number: 80
        }, 900);
        $('.wtb_block6 .red span').animateNumber({
            number: 30
        }, 1200);
        $('.wtb_block7 .red span').animateNumber({
            number: 70
        }, 1200);
        $('.wtb_block8 .red span').animateNumber({
            number: 2
        }, 500);
    }
    // $('.l_content').find('.uss_shop_detail').parent().parent().find('.l_title').css('display','none');
    $('.lff_show, .mbtn_l, .lm_zakaz, .lff_show2, .t_zakaz a, .sc_btn').click(function() {
        if ($(this).hasClass('lff_show')) {
            $('#form_call_title').text('Заказать обратный звонок');
        } else if ($(this).hasClass('mbtn_l')) {
            $('#form_call_title').text('Заказать обратный звонок');
        } else if ($(this).parent().hasClass('tz_1')) {
            $('#form_call_title').text('Заказать тариф «Сайт-визитка»');
        } else if ($(this).parent().hasClass('tz_2')) {
            $('#form_call_title').text('Заказать тариф «Сайт-бизнес»');
        } else if ($(this).parent().hasClass('tz_3')) {
            $('#form_call_title').text('Заказать тариф «Интернет-магазин»');
        } else {
            $('#form_call_title').text('Заказать сайт');
        }
        $('.fb_form_bg').fadeIn(300);
        $('.fb_form:first').fadeIn(300);
        return false;
    });
    $('.fbf_close, .fb_form_bg').live('click',function() {
        $('.fb_form_bg').fadeOut(300);
        $('.fb_form').fadeOut(300);
        $('.popup_block').removeClass('popup_block');
        $('.uss_ok_form').remove();
        $('.uss_error_form').remove();
        $('.error_info').remove();
        $('.tmp_field').remove();
    });
    $('.fb_form').each(function() {
        $(this).find('.uss_form_item.uss_form_text:eq(1)').addClass('fbf_name');
        $(this).find('.uss_form_item.uss_form_text:eq(2)').addClass('fbf_phone');
        $(this).find('.uss_form_item.uss_form_text:eq(3)').addClass('fbf_mail');
    });
    $('#banner-rotator').royalSlider({
        imageAlignCenter: true,
        hideArrowOnLastSlide: true,
        slideSpacing: 20,
        controlNavEnabled: true,
        arrowsNav: false,
        slideshowEnabled: true,
        slideshowDelay: 5000,
        slideshowPauseOnHover: false,
        slideshowAutoStart: true,
        controlNavigation: 'bullets',
        welcomeScreenEnabled: true
    });
    var slider = $("#banner-rotator").data('royalSlider');
    $('#banner-rotator').click(function() {
        slider.next();
    });
    $(".lf_form .tit").click(function() {
        $(".lf_form .uss_form_tml").toggle(0, function() {
            if ($(".lf_form .uss_form_tml").css("display") == 'none') {
                $("body").addClass("hiddenform");
                $(".lf_form .tit i").text("Развернуть");
                $(".lf_form .tit span img").attr("src", "/img/arrow_bottom.png");
            } else {
                $("body").removeClass("hiddenform");
                $(".lf_form .tit i").text("Свернуть");
                $(".lf_form .tit span img").attr("src", "/img/arrow_top.png");
            }
        });
    });
    $(".mp_otziv table tr:first").addClass("tr_show");
    $(".mp_otziv .tit a").click(function() {
        var curent = $(".mp_otziv table tr.tr_show");
        var next = $(".mp_otziv table tr.tr_show").next();
        var last = $(".mp_otziv table tr:last");
        var first = $(".mp_otziv table tr:first");
        if (curent.html() == last.html()) {
            curent.hide(400, function() {
                curent.removeClass("tr_show");
                first.addClass("tr_show");
            });
        } else {
            curent.hide(400, function() {
                curent.removeClass("tr_show");
                next.addClass("tr_show");
            });
        }
        return false;
    });
    $(function() {
        $(window).scroll(function() {
            var h_hght = 90; // высота шапки
            var h_mrg = 0; // отступ когда шапка уже не видна
            var top = $(document).scrollTop();
            var elem = $('.lh_menu');
            if (top + h_mrg > h_hght) {
                elem.css('top', 0);
                elem.css('position', 'fixed');
            } else {
                elem.css('top', '90px');
                elem.css('position', 'absolute');
            }
            var elem2 = $('.tablecaption');
            var x_top = $(".l_tariftable:first tr:last").offset() || 0;
            /*if ((top>200)){
            	elem2.css('position', 'absolute');
            	if (top>(x_top.top-110)) {
            		elem2.css('top', x_top.top-305);
            	} else {elem2.css('top', top-200);}
            } else {
            	elem2.css('top', "0");
            	elem2.css('position', 'static');
            }*/
        });
    });
    /* Скрытие и показ блоков под контентом */
    $(".l_area h3, .l_area .tit").click(function() {
    	if(!$(this).closest('body').hasClass('l_inside')) return true;
        var block = $(this).parent();
        if (block.hasClass("l_hidden")) {
            block.removeClass("l_hidden");
            block.css("height", "auto");
        } else {
            block.animate({
                height: "30px"
            }, 500, function() {
                block.addClass("l_hidden");
            });
        }
    });
    $(".l_inside .l_area").find("h3").find("span").parent().parent().addClass("l_hidden");

    function hideBtns() {
        var width = $("body").width();
        if (width < 1050) {
            $(".mbtns").hide();
        } else {
            $(".mbtns").show();
        }
    }
    hideBtns();
    $(window).resize(function() {
        hideBtns();
    });
    $('.ajax_portfolio_slider').live('click', function() {
        var href = $(this).attr('href');
        if (!href) {
            return false;
        }
        $.ajax({
            url: href,
            beforeSend: function() {
                $('.ajax_loader').show();
            },
            success: function(rdata) {
                $('.mpp_inner').html(rdata);
                $('.ajax_loader').hide();
            }
        });
        return false;
    });
    $('.mpp_inner2 .ajax_portfolio_slider').live('click', function() {
        var href = $(this).attr('href');
        if (!href) {
            return false;
        }
        var inner = $(this).closest('.mpp_inner2');
        var fifth = $(this).closest('.fifth-examples');
        $.ajax({
            url: href,
            beforeSend: function() {
                inner.append('<div class="ajax_loader"><img src="/uss-img/159.gif"></div>');
                inner.find('.ajax_loader').show();

                if(!inner.hasClass('last_but_click') && !inner.hasClass('first_but_click')){
                    fifth.find('.portfolio_ajax_item').remove();
                    inner.find('ul li').removeClass('active');
                }
            },
            success: function(rdata) {
                inner.html(rdata);

                if(inner.hasClass('last_but_click')){
                    inner.find('ul li:last .pos_link_a_filter.go_to_top:first').trigger('click');
                    inner.removeClass('last_but_click');
                }
                else if(inner.hasClass('first_but_click')){
                    inner.find('ul li:first .pos_link_a_filter.go_to_top:first').trigger('click');
                    inner.removeClass('first_but_click');
                }
            }
        });
        return false;
    });
    $('#portfolio_filters_form').live('change', function() {
        var form_elements_str = getPortfolioFormFilters();
        setLocation("portfolio/?" + form_elements_str);
    });
    /* 	$('.one_filter_select .filter_title').live('click', function(){
    		var $this = $(this);
    		var this_id = $this.attr('id').substr(6);

    		if ($('#filters_'+this_id).is(':hidden')) {
    			$('#filters_'+this_id).slideDown();
    			$('#filters_'+this_id).addClass('active');
    			$this.addClass('active');
    		}
    		else {
    			$('#filters_'+this_id).slideUp();
    			$('#filters_'+this_id).removeClass('active');
    			$this.removeClass('active');
    		}
    	}); */

    $('.uss_button_i_want').click(function() {
        var _block = $('.hide_i_want');
        var popMargTop = _block.height() / 2;
        var popMargLeft = _block.width() / 2;
        var _id = $(this).attr('id').substr(6);
        var _form = $('#block_feedbackitem3addform_popup');
        _form.append('<input type="hidden" value="' + _form.find('input[type="submit"]').val() + '" name="' + _form.find('input[type="submit"]').attr('name') + '" />');
        _form.append('<input type="hidden" value="' + _id + '" name="pos_id" />');
        _block.css({
            'margin-top': -popMargTop,
            'margin-left': -popMargLeft
        });
        _block.addClass('popup_block');
        $('.fb_form_bg').fadeIn(300);
    });

	$('#block_feedbackitemaddform_pop, #block_feedbackitem3addform_popup, #block_feedbackitem4addform_popup, #block_feedbackitem5addform_popup').live('submit',function(){
		var form = $(this);

		addHiddenFieldToAjaxForm(form);

		form.ajaxSubmit({
			dataType: "json",
			success: function(rdata){
				if (rdata.ok) {
					form.before('<div class="uss_ok_form"><p>'+rdata.ok+'</p></div>');
					setTimeout(function() {$('.fbf_close').trigger('click')}, 1500);
					form.resetForm();
				}
				else {
					addErrorsToForm( form, rdata);
				}
			}
		});

		return false;
	});

	$('#block_feedbackitemaddform2, #block_feedbackitemaddform6_id, #block_feedbackitemaddform7_id, #block_feedbackitemaddform8_id').live('submit',function(){
		var form = $(this);

		addHiddenFieldToAjaxForm(form);

		form.ajaxSubmit({
			dataType: "json",
			success: function(rdata){
				if (rdata.ok) {
					form.before('<div class="uss_ok_form"><p>'+rdata.ok+'</p></div>');
					setTimeout(function() {$(".uss_ok_form").remove();}, 1500);
					form.resetForm();
				}
				else {
					addErrorsToForm( form, rdata);
				}
			}
		});

		return false;
	});

	function addErrorsToForm( form, rdata){
		var _childrens = form.find('input');
		$.each(_childrens, function(index){
			var name = $(this).attr('name');
			if (rdata[name]) {
				var width = $(this).outerWidth();
				var parent_width = $(this).parent().outerWidth();
				var diff = parent_width-width;
				var right = 10+diff;

				$(this).after('<div id="error_info_'+index+'" class="error_info" style="right:'+right+'px;" title="'+rdata[name]+'"></div>');
				$('#error_info_'+index).qtip({
					content: rdata[name],
					style: {
						classes: 'qtip-red qtip-shadow'
					},
					position: {
						my: 'center left',
						at: 'center right'
					}
				});
			}
		});
	};

	function addHiddenFieldToAjaxForm(form){
		if(form.find("input[name='"+form.find('input[type="submit"]').attr('name')+"'][type='hidden']").length == 0){
			form.prepend('<input class="tmp_field" type="hidden" value="'+form.find('input[type="submit"]').val()+'" name="'+form.find('input[type="submit"]').attr('name')+'" />');
		}

		if(form.find("input[name='getjsonerrors']").length == 0){
			form.prepend('<input class="tmp_field" type="hidden" value="1" name="getjsonerrors" />');
		}

		var form_tmp_title = $('.fb_form:visible').find('.fbf_title').text();
		if (form_tmp_title) {
			form.prepend('<input class="tmp_field" type="hidden" value="'+form_tmp_title+'" name="form_tmp_title" />');
		}

		$('.uss_error_form').hide().remove();
		$('.uss_ok_form').hide().remove();
		$('.error_info').hide().remove();
	}

    $('.go_and_close').live('click', function() {
        $('.fbf_close').click();
    });
    $('.close_popup').live('click', function() {
        $('.popup_block').removeClass('popup_block');
        $('.uss_ok_form').remove();
        $('.uss_error_form').remove();
        $('.error_info').remove();
        $('.tmp_field').remove();
    });
    $('.mp_portfolio h3 i').click(function() {
        document.location.href = $(this).parent().find('a').attr('href');
    });
    $('.fbf_form').each(function() {
        $(this).find('.uss_form_text.fbf_phone').after($(this).find('.uss_form_text.fbf_mail'));
    });
    $('.fbf_form .uss_form_textarea label').text('Комментарий (можно не заполнять)');
    if ($('.under_links').length > 0) {
        $('.under_links').parent().parent().find('.l_title h1').text('Портфолио, Пример');
    }
    $('.l_filter_sbros').click(function() {
        $('#input_filter_21686_0').attr('checked', true);
        $('#input_filter_21685_0').attr('checked', true);
        $('select.portfolio_filter').attr('selectedIndex', 0);
    });
    if ($('#yl_null4').length == 0) {
        $('.youLooked').parent().find('h3').click();
    }
    $('.t_block').click(function() {
        var t = $(this).attr('id');
        var tbr_more = $(this).find('.tbr_more');
        $('.' + t + ':not(.active)').slideDown(300, function() {
            $(this).addClass('active');
            tbr_more.addClass('active');
            tbr_more.html("<span>Свернуть</span>");
        });
        $('.' + t + '.active').slideUp(300, function() {
            $(this).removeClass('active');
            tbr_more.removeClass('active');
            tbr_more.html("<span>Развернуть</span>");
        });
    });
    $('.tt tr').hover(function() {
        $(this).prev().addClass('noborder');
    }, function() {
        $(this).prev().removeClass('noborder');
    });
    $('.lh_logo img').load(function() {
        $('.tt td:nth-child(2):contains("V")').html('<span class="t_enable1"></div>');
        $('.tt td:nth-child(3):contains("V")').html('<span class="t_enable2"></div>');
        $('.tt td:nth-child(4):contains("V")').html('<span class="t_enable3"></div>');
        $('.tt td:nth-child(2):contains("X")').html('<span class="t_disabled1"></div>');
        $('.tt td:nth-child(3):contains("X")').html('<span class="t_disabled2"></div>');
        $('.tt td:nth-child(4):contains("X")').html('<span class="t_disabled3"></div>');
    });
    var notice_time;
    $('.tt td:first-child div').hover(function() {
        var notice = $(this).find('.t_notice');
        var notice_parent = $(this).find('div').height();
        notice_time = setTimeout(function() {
            notice.css("top", -(notice.height() + 28));
            notice.fadeIn(250);
        }, 150);
    }, function() {
        clearTimeout(notice_time);
        $(this).find('.t_notice').hide();
    });
    $('.eshop').parent().parent().parent().addClass('eshop_tr');
    $('.eshop_tr').click(function() {
        var tr = $(this);
        if (tr.hasClass('active_shop')) {
            tr.removeClass('active_shop');
            $('strong.eshop').text('Развернуть');
            $('.t_subtable').slideUp(300);
        } else {
            tr.addClass('active_shop');
            $('strong.eshop').text('Свернуть');
            $('.t_subtable').slideDown(300);
        }
    });
    $(function() {
        $(window).scroll(function() {
            var top = $(document).scrollTop();
            var elem2 = $('.tc_first');
            var x_top = $('.lh_menu').offset().top;
            if ($('.t_zakaz').length) {
                x_top = $('.t_zakaz').offset().top;
            }
            /*
            if ((top>200)){
            	elem2.css('position', 'absolute');
            	if (top>(x_top.top-110)) {
            		elem2.css('top', x_top.top-305);
            	} else {elem2.css('top', top-205);}
            } else {
            	elem2.css('top', "0");
            	elem2.css('position', 'static');
            }
            */
            if (top > (240)) {
                if (top > (x_top - 110)) {
                    elem2.css('top', x_top - 312);
                    elem2.css('position', 'absolute');
                } else {
                    elem2.css('position', 'fixed');
                    elem2.css('top', '60px');
                }
            } else {
                elem2.css('position', 'absolute');
                elem2.css('top', '38px');
            }
            $('span.t_notice i').click(function() {
                $(this).parent().hide();
            });
        });
    });
    $('span.t_notice').prepend('<i>X</i>');
    // считаем для подменю расположение для оптикания (новый дизайн подменю)
    if ($('.with_submenu.active').length) {
        var w_width = parseFloat($('.with_submenu.active').outerWidth());
        var sub_width = parseFloat($('.content_right .content_menu').outerWidth());
        if (sub_width <= (w_width + 40)) {
            $('.content_right .content_menu').width(w_width + 40);
        }
        if ($('.with_submenu.last.active').length) {
            var ww = parseFloat($('.with_submenu.active').closest('.content_menu').outerWidth());
            var sub_width = parseFloat($('.content_right .content_menu').outerWidth());
            $('.content_right .content_menu').css('margin-left', (ww - sub_width) + 'px');
        } else {
            var q = $('.with_submenu.active').offset();
            var qw = $('.with_submenu.active').closest('.content_menu').offset();
            var rast = q.left - qw.left;
            if (sub_width < (rast + w_width)) {
                var sub_width = parseFloat($('.content_right .content_menu').outerWidth());
                $('.content_right .content_menu').css('margin-left', (rast + w_width - sub_width + 20) + 'px');
            }
        }
    }

	if (!$.cookie('hideConfirm')) {
		$(".fixed_confirm").addClass('opened');
		$('body').addClass('privacy_confirm').find('.l_footer').css('margin-bottom', $('.fixed_confirm').outerHeight());
	}
	$(".fixed_confirm button").click(function(event) {
		$(".fixed_confirm.opened").removeClass('opened');
		$.cookie('hideConfirm', 1, {expires: 60, path: '/', domain: '.7600.ru'});
		$('body').removeClass('privacy_confirm').find('.l_footer').css('margin-bottom', 0);
	});
});
$('#banner-rotator').royalSlider({
    imageAlignCenter: true,
    hideArrowOnLastSlide: true,
    slideSpacing: 20,
    controlNavEnabled: true,
    slideshowEnabled: true,
    slideshowDelay: 3000,
    slideshowPauseOnHover: false,
    slideshowAutoStart: true,
    welcomeScreenEnabled: true
});

function getPNPage(pageId) {
    if (!pageId) {
        return false;
    }
    var form_elements_str = getPortfolioFormFilters();
    if ($('#hide_portfolio_filters_form').length) {
        form_elements_str = form_elements_str;
    }
    setLocation("portfolio/?page=" + pageId + '&' + form_elements_str);
}

function setLocation(curLoc) {
    try {
        history.pushState(null, null, curLoc);
    } catch (e) {
        location.hash = '#' + curLoc;
    }
    portfolio_load(curLoc);
}

function portfolio_load(url) {
    $.ajax({
        url: '/' + url,
        data: 'ajax_url=portfolio',
        success: function(rdata) {
            if (rdata) {
                $('.l_area.l_mainarea .l_content').html(rdata);
                $('input.styler, select.styler').styler();
            } else {
                return false;
            }
        },
        statusCode: {
            404: function() {
                document.location.href = window.global_site_url + '/portfolio/';
            }
        }
    });
}

function getPortfolioFormFilters() {
    var _form = document.getElementById('portfolio_filters_form');
    var els = _form ? _form.elements : '',
        map = {},
        el, i = 0;
    while (el = els[i++])
        if (el.name != '' && !el.disabled) switch (el.type.toLowerCase()) {
            case 'checkbox':
            case 'radio':
                if (el.checked) map[el.name] = el.value;
                break;
            case 'select-multiple':
                var opt = el.options,
                    lst = [],
                    j = 0,
                    o;
                while (o = opt[j++])
                    if (o.selected) lst[lst.length] = o.value || o.text;
                if (lst.length) map[el.name] = lst;
                break;
            case 'select-one':
                if (!el.value) break;
            default:
                map[el.name] = el.value;
            case 'reset':
                break;
        };
    var str = '';
    $.each(map, function(i, val) {
        // if($("#all_colors:checked").length>0 && i=='filter_21771'){
        // val = '';
        // }
        // if($("#all_costs:checked").length>0 && i=='filter_21772'){
        // val = '';
        // }
        // if($("#all_tags:checked").length>0 && i=='filter_21687'){
        // val = '';
        // }
        if (i != 'portfolio_filters_submit' && i != 'portfolio_filters_ajax_status') {
            if (val) {
                str = str + i + '=' + val + '&';
            }
        }
    });
    str = str.substr(0, str.length - 1);
    return str;
}



/*!
 * jQuery Cookie Plugin v1.4.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2006, 2014 Klaus Hartl
 * Released under the MIT license
 */
(function(factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD (Register as an anonymous module)
		define(['jquery'], factory);
	} else if (typeof exports === 'object') {
		// Node/CommonJS
		module.exports = factory(require('jquery'));
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function($) {
	var pluses = /\+/g;

	function encode(s) {
		return config.raw ? s : encodeURIComponent(s);
	}

	function decode(s) {
		return config.raw ? s : decodeURIComponent(s);
	}

	function stringifyCookieValue(value) {
		return encode(config.json ? JSON.stringify(value) : String(value));
	}

	function parseCookieValue(s) {
		if (s.indexOf('"') === 0) {
			// This is a quoted cookie as according to RFC2068, unescape...
			s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
		}
		try {
			// Replace server-side written pluses with spaces.
			// If we can't decode the cookie, ignore it, it's unusable.
			// If we can't parse the cookie, ignore it, it's unusable.
			s = decodeURIComponent(s.replace(pluses, ' '));
			return config.json ? JSON.parse(s) : s;
		} catch (e) {}
	}

	function read(s, converter) {
		var value = config.raw ? s : parseCookieValue(s);
		return $.isFunction(converter) ? converter(value) : value;
	}
	var config = $.cookie = function(key, value, options) {
		// Write
		if (arguments.length > 1 && !$.isFunction(value)) {
			options = $.extend({}, config.defaults, options);
			if (typeof options.expires === 'number') {
				var days = options.expires,
					t = options.expires = new Date();
				t.setMilliseconds(t.getMilliseconds() + days * 864e+5);
			}
			return (document.cookie = [
				encode(key), '=', stringifyCookieValue(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path ? '; path=' + options.path : '',
				options.domain ? '; domain=' + options.domain : '',
				options.secure ? '; secure' : ''
			].join(''));
		}
		// Read
		var result = key ? undefined : {},
			// To prevent the for loop in the first place assign an empty array
			// in case there are no cookies at all. Also prevents odd result when
			// calling $.cookie().
			cookies = document.cookie ? document.cookie.split('; ') : [],
			i = 0,
			l = cookies.length;
		for (; i < l; i++) {
			var parts = cookies[i].split('='),
				name = decode(parts.shift()),
				cookie = parts.join('=');
			if (key === name) {
				// If second argument (value) is a function it's a converter...
				result = read(cookie, value);
				break;
			}
			// Prevent storing a cookie that we couldn't decode.
			if (!key && (cookie = read(cookie)) !== undefined) {
				result[name] = cookie;
			}
		}
		return result;
	};
	config.defaults = {};
	$.removeCookie = function(key, options) {
		// Must not alter options, thus extending a fresh object...
		$.cookie(key, '', $.extend({}, options, {
			expires: -1
		}));
		return !$.cookie(key);
	};
}));
