
$(function () {
    document_ready();
    window_onload();
});

function document_ready() {
    ts = (new Date()).getTime();

    $("body").removeClass("no-transition");
    $('body')[0].offsetHeight;
    $("body").addClass("ready");

    responsive_init();
    init_event_handlers();
    bind_widgets();

    te = (new Date()).getTime();
    console.log("On-Ready Load Time: ", te - ts);
}

function window_onload() {
    ts = (new Date()).getTime();
    $("body").removeClass("not-loaded").addClass("loaded");

    responsive_update();

    te = (new Date()).getTime();
    console.log("Window Load Time: ", te - ts);
}

$(window).scroll(function () {
});

$(window).on("resize", function (e) {
    responsive_update(null, true);
});

function init_event_handlers() {
    blazy_init();
    fix_touch_hovers();
    click_touch_init();
}

function bind_widgets(context) {
    img_to_bg(context);
}