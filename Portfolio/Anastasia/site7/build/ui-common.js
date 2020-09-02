
/*

 Click and touch events helpers

 */

function click_touch_init() {

    $(document).on("click.touchfocused", ".touchevents .touch-focused, .touch-focused-all", function (e) {
        var $o = $(this);
        if (!$o.hasClass("focused")) {
            if (!$o.hasClass("disable-prevent-link-clicks")) {
                e.preventDefault();
            }
            $(".touch-focused").not($o).not($o.closest(".touch-focused")).removeClass("focused");
            $o.addClass("focused");
        }
        else {
            if ($o.hasClass('touch-focused-toggle')) {
                $o.removeClass("focused");
            }
        }
    });

    $(document).on("click", ".touchevents .touch-focused a, .touch-focused-all a", function (e) {
        var $tf = $(this).closest(".touch-focused");
        if (!$tf.hasClass("focused") && !$tf.hasClass("disable-prevent-link-clicks")) {
            e.preventDefault();
        }
    });

    $(document).on("click touchstart", "*", function (e) {
        if (!$(e.target).closest(".touch-focused").length) {
            $(".touch-focused").removeClass("focused");
        }
    });

    $(document).on("click", ".no-click", function (e) {
        e.preventDefault();
    });

    $(document).on("click", ".no-propagation", function (e) {
        e.stopPropagation();
    });

}



/*

Responsive design helpers

 */

function responsive_init() {
    responsive_update();
}

function responsive_update(force, no_animation) {
    if (typeof no_animation !== 'undefined' && no_animation) {
        $("body").addClass('no-transition no-animation');
    }
    if (typeof force === "undefined") force = false;
    var ww = window.innerWidth;
    if ($("body").data("ww") != ww || force)
    {
        if (typeof Blazy !== 'undefined' && typeof Blazy.revalidate !== 'undefined') {
            Blazy.revalidate();
        }
        $("[data-place]").each(function(){
            var places = $(this).data("place");
            var breakpoints = Object.keys(places).map(function(value) {
                return parseInt(value);
            }).sort(function(a,b) {
                return a - b;
            }).reverse();
            for (i in breakpoints) {
                if (window.matchMedia("(min-width: "+breakpoints[i]+"px)").matches) {
                    if ($(places[breakpoints[i]]).length)  {
                        if (!$(this).next(places[breakpoints[i]]).length) {
                            $(this).attr("data-place-breakpoint", breakpoints[i]).insertBefore(places[breakpoints[i]]);
                        }
                    }
                    break;
                }
            }
        });

        $("body").data("ww", ww);
    }
    if (typeof no_animation !== 'undefined' && no_animation) {
        $("body")[0].offsetHeight;
        $("body").removeClass('no-transition no-animation');
    }
}




/*

Scroll Lazy Loading

 */

function blazy_init(container) {

    $('.js-blazy-revalidate-on-scroll').on('scroll', function(){
        blazy_revalidate_on_scroll_delay(function(){
            if (typeof Blazy !== 'undefined' && typeof Blazy.revalidate !== 'undefined') {
                Blazy.revalidate();
            }
        }, 50);
    });

    window.Blazy = new Blazy({
        container: (container)?container:null,
        offset: 0,
        success: function(ele){
            var $o = $(ele).closest(".img-to-bg");
            img_to_bg($o);
            $o.addClass('img-to-bg-lazy-loaded');
            blazy_callback(ele);
        }
        , error: function(ele, msg){
            blazy_callback(ele);
            if(msg === 'missing'){
            }
            else if(msg === 'invalid'){
            }
        }
    });

    $(window).on('resize', function(){
        blazy_revalidate_delay(function(){
            blazy_revalidate();
        }, 100);
    });

    $(document).on('shown.bs.modal', function () {
        blazy_revalidate();
    });

    $('.js-slick-slider-revalidate-image').on('init reInit setPosition', function(event){
        blazy_revalidate();
    });
}

function blazy_callback(ele) {
    var callback = $(ele).not('.blazy-callback-executed').data('src-callback');
    if (callback) {
        var callback_params = $(ele).data('src-callback-params');
        if (!callback_params) {
            callback_params = [];
        }
        var fn = getFunctionFromString(callback);
        if (typeof fn === "function") {
            $(ele).addClass('blazy-callback-executed');
            fn.apply(null, callback_params);
        }
    }
}

function blazy_revalidate() {
    if (typeof Blazy !== 'undefined' && typeof Blazy.revalidate !== 'undefined') {
        Blazy.revalidate();
    }
}

var blazy_revalidate_delay = (function () {
    var timer = 0;
    return function (callback, ms) {
        clearTimeout(timer);
        timer = setTimeout(callback, ms);
    };
})();

var blazy_revalidate_on_scroll_delay = (function () {
    var timer = 0;
    return function (callback, ms) {
        clearTimeout(timer);
        timer = setTimeout(callback, ms);
    };
})();




/*

Set Background Image depending on img content inside it

 */

function img_to_bg($o, context) {

    if (!$("body").hasClass("img-to-bg-inited")) {

        $(window).on("resize", function(){
            delay_img_to_bg(function(){
                img_to_bg($(".img-to-bg-resp"));
            }, 100);
        });

        $("body").addClass("img-to-bg-inited");
    }

    if (typeof $o === "undefined" || !$o) $o = $(".img-to-bg", context);
    $o.each(function () {
        var $imgtobg = $(this);
        var $img = $imgtobg.find("> img").first();
        if (!$img.length) {
            $img = $imgtobg.find("> picture img").first();
        }
        var src = "";
        if ($img.length) {
            var src = $img[0].currentSrc;
        }
        if (!src) {
            src = $img.attr('src');
        }
        if ($img.length && src) {
            $imgtobg.css("background-image", "url('" + src + "')");
            $imgtobg.addClass("img-to-bg--inited");
        }
    });
}

var delay_img_to_bg = (function(){
    var timer = 0;
    return function(callback, ms){
        clearTimeout (timer);
        timer = setTimeout(callback, ms);
    };
})();

