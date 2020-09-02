
function location_hash_update(hash, loc) {
    if (history.replaceState) {
        history.replaceState({
            time: (new Date()).getTime(),
            hash: hash
        }, null, ((typeof loc !== "undefined" && loc) ? loc : "") + ((typeof hash !== "undefined" && hash) ? hash : ""));
    }
    else {
        location.hash = hash;
    }
}

function location_hash_remove() {
    var scrollV, scrollH, loc = window.location;
    if ("pushState" in history) {
        history.pushState("", document.title, loc.pathname + loc.search);
    }
    else {
        // Prevent scrolling by storing the page's current scroll offset
        scrollV = document.body.scrollTop;
        scrollH = document.body.scrollLeft;

        loc.hash = "";

        // Restore the scroll offset, should be flicker free
        document.body.scrollTop = scrollV;
        document.body.scrollLeft = scrollH;
    }
}

function touchclick() {
    if ($(".no-touchevents").length) return "click";
    else return "touchstart";
}

var addCSSRule = function (sheet_id, rules) {
    $("#" + sheet_id).remove();
    $("<style type='text/css' id='" + sheet_id + "'>" + rules + "</style>").appendTo("head");
};

var removeCSSRule = function (sheet_id) {
    $("#" + sheet_id).remove();
};

var delay = (function () {
    var timer = 0;
    return function (callback, ms) {
        clearTimeout(timer);
        timer = setTimeout(callback, ms);
    };
})();

var forceRedraw = function( $el ) {
    return ( $el && $el.length && $el[0].offsetHeight );
};

$.fn.hasScrollBar = function() {
    return this.get(0).scrollHeight > this.outerHeight();
}

$.fn.startScrollBar = function() {
    return this.get(0).scrollTop <= 0;
}

$.fn.endScrollBar = function() {
    return this.get(0).scrollTop >= this.get(0).scrollHeight - this.outerHeight();
}

$.fn.hasHorzScrollbar = function() {
    return this.get(0).scrollWidth > this.width();
}

function fix_touch_hovers()
{
    if (Modernizr.touchevents)
    {
        try
        {
            var count = 0;
            var ignore = /:hover/;
            for (var i=0; i<document.styleSheets.length; i++)
            {
                var sheet = document.styleSheets[i];
                for (var j=sheet.cssRules.length-1; j>=0; j--)
                {
                    var rule = sheet.cssRules[j];
                    if (rule.type === CSSRule.STYLE_RULE)
                    {
                        if (ignore.test(rule.selectorText)) {
                            sheet.deleteRule(j);
                            count++;
                        }
                    }
                    else if (rule.type === CSSRule.MEDIA_RULE) {
                        var mrules = rule.cssRules;
                        for (var k=mrules.length-1; k>=0; k--)
                        {
                            var mrule = mrules[k];
                            if (mrule.type === CSSRule.STYLE_RULE)
                            {
                                if (ignore.test(mrule.selectorText)) {
                                    rule.deleteRule(k);
                                    count++;
                                }
                            }
                        }
                    }
                }
            }
        }
        catch(e){
            console.log('Fix Hovers ERROR', e);
        }
    }
}

// Get function from string, with or without scopes (by Nicolas Gauthier)
window.getFunctionFromString = function(string)
{
    var scope = window;
    var scopeSplit = string.split('.');
    for (i = 0; i < scopeSplit.length - 1; i++)
    {
        scope = scope[scopeSplit[i]];

        if (scope == undefined) return;
    }

    return scope[scopeSplit[scopeSplit.length - 1]];
};