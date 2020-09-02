$(window).on('load', function () {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
        $('body').addClass('ios');
    } else {
        $('body').addClass('web');
    }
    ;
    if (/Android/i.test(navigator.userAgent)) {
        $('body').addClass('android');
    }
    setTimeout(function () {
        $(".js-bg").each(function () {
            $(this).css('background-image', 'url(' + $(this).data("bg") + ')');
        });
        $(".js-img").each(function () {
            $(this).attr('src', $(this).data("src"));
        });
    }, 200);
    setTimeout(function () {
        $('body').removeClass('loaded');
    }, 400);
});

/* viewport width */
function viewport() {
    var e = window,
        a = 'inner';
    if (!('innerWidth' in window)) {
        a = 'client';
        e = document.documentElement || document.body;
    }
    return {width: e[a + 'Width'], height: e[a + 'Height']}
};
/* viewport width */


$(function () {
    /* placeholder*/
    $('input, textarea').each(function () {
        var placeholder = $(this).attr('placeholder');
        $(this).focus(function () {
            $(this).attr('placeholder', '');
        });
        $(this).focusout(function () {
            $(this).attr('placeholder', placeholder);
        });
    });
    /* placeholder*/

    if ($('#win_2').length) {
        $(document).on('mouseleave', function (e) {
            $.fancybox.open({
                src: '#win_2'
            });
            $(document).off('mouseleave');
        });
    }

    $(".accordeon .accordeon-hide:not(.active)").hide();
    $(".accordeon .accordeon-hide").prev().click(function (e) {
        e.preventDefault();
        $(this).parents(".accordeon").find(".accordeon-hide").not(this).slideUp().prev().removeClass("active").parent().removeClass("active");
        $(this).next().not(":visible").slideDown().prev().addClass("active").parent().addClass("active");
    });

    if ($('.js-range-slider').length) {
        let sliders = $('.js-range-slider'),
            inputs = $('.js-output-slider');

        for (let i = 0; i < sliders.length; i++) {
            noUiSlider.create(sliders[i], calcSettings);
            sliders[i].noUiSlider.on('update', function (values, handle) {
                inputs[i].innerHTML = accounting.formatNumber(values[handle], 0, " ", ".") + ' &#8381;';
            });

            sliders[i].noUiSlider.on('slide', function (values, handle) {
                bindSliders(values[handle]);
                estimateCalcReturnSum(parseInt(values[handle]));
            });
        }

        /* components */
        function bindSliders(value) {
            for (let i = 0; i < sliders.length; i++) {
                sliders[i].noUiSlider.set(value);
            }
        }

        function estimateCalcReturnSum(value) {
            var retVal = Math.round(parseInt(value) * (1 + calcPercent / 100));
            $('.js-output-percent').html(accounting.formatNumber(retVal, 0, " ", ".") + ' &#8381;');
        }
    }
    // SLIDER END

    if ($('.js-styled').length) {
        $('.js-styled').styler();
    }
    if ($('.js-fancybox').length) {
        $('.js-fancybox').fancybox({
            margin: 10,
            padding: 10
        });
    }
    /* components */
});

// var fixedBlock = function () {
// 	var offset_this = $('.js-fixed-block').height();
// 	var scr_top = $(window).scrollTop();
//
// 	if (scr_top >= offset_this) {
// 		$('.js-fixed-block').addClass("fixed");
// 		$('.content').addClass('pt');
// 	} else {
// 		$('.js-fixed-block').removeClass("fixed");
// 		$('.content').removeClass('pt');
// 	}
// };
//
// $(window).bind('load', fixedBlock);
// $(window).bind('scroll', fixedBlock);

function scrollAnim() {
    if ($('.js-boxes').length) {

        var scrollPage = $(this).scrollTop(),
            target = $('.js-boxes'),
            blockOffset = target.offset().top,
            blockHeight = target.innerHeight();

        if (scrollPage + viewport().height > blockOffset + 100) {
            target.addClass('active');
        } else {
            target.removeClass('active');
        }
    }
}

$(window).bind('load', scrollAnim);
$(window).bind('scroll', scrollAnim);
