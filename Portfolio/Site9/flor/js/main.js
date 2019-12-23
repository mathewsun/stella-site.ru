!function (t) {
    "use strict";
    function e(t) {
        t.parent instanceof Function && (e.apply(this, [t.parent]), this.sup = a(this, n(this, this.constructor))),
        t.apply(this, arguments)
    }
    function a(t, e) {
        for (var a in t)
            "sup" !== a && t[a]instanceof Function && (e[a] = t[a].sup || n(t, t[a]));
        return e
    }
    function n(t, e) {
        var a = t.sup;
        return e.sup = function () {
            return t.sup = a,
            e.apply(t, arguments)
        }
    }
    t.Class = function () {},
    t.Class.extend = function t(n) {
        function i() {
            e !== arguments[0] && (e.apply(this, [n]), a(this, this), this.initializer instanceof Function && this.initializer.apply(this), this.constructor.apply(this, arguments))
        }
        return i.prototype = new this(e),
        i.prototype.constructor = i,
        i.toString = function () {
            return n.toString()
        },
        i.extend = function (e) {
            return e.parent = n,
            t.apply(i, arguments)
        },
        i
    },
    t.Class = t.Class.extend(function () {
            this.constructor = function () {}
        })
}
(this);
var app = function () {
    "use strict";
    var t = {
        root: "",
        base: "",
        dom: {
            $window: $(window),
            $document: $(document),
            $body: $("body")
        },
        utils: {},
        components: {},
        modules: {},
        views: {},
        initialize: function () {
            this.base = $("base").attr("href"),
            this.base ? this.root = this.base.substr(8).substr(this.base.substr(8).indexOf("/")) : this.root = "/",
            this._initGlobal()
        },
        _initHistory: function () {
            var t = this,
            e = !1;
            app.dom.$document.on("keydown", function (t) {
                17 !== t.keyCode && 16 !== t.keyCode || (e = !0)
            }).on("keyup", function (t) {
                17 !== t.keyCode && 16 !== t.keyCode || (e = !1)
            }),
            this.dom.$document.on("click.routing", "a[href]:not([data-not-ajax]):not([href$='.jpg'],a[href$='.png'],a[href$='.svg'])", function (a) {
                if (!e) {
                    var n = $(this),
                    i = {
                        prop: n.prop("href"),
                        attr: n.attr("href")
                    };
                    if (app.utils.getData = app.utils.parseUrlQuery(i.attr), "./" === i.attr && (i.attr = ""), i.prop.slice(0, t.base.length) === t.base)
                        a.preventDefault(), window.location.protocol + "//" + window.location.hostname + window.location.pathname === i.prop.split("?")[0] ? (app.Router.navigate(i.attr, {
                                trigger: !1
                            }), app.trigger("checkGetParams")) : app.Router.navigate(i.attr, {
                            trigger: !0
                        })
                }
            })
        },
        _initGlobal: function () {
            app.utils.getDirection.init(),
            app.components.loader = app.components.Loader,
            app.components.loader.show(),
            app.Router = new app.modules.Router,
            app.GlobalView = new app.views.GlobalView({
                    el: $(".grid")
                }),
            app.Header = new app.views.Header,
            app.Footer = new app.views.Footer,
            app.utils.isMobile && app.Header.render(),
            app.Footer.render(),
            Backbone.history.start({
                pushState: !0,
                hashChange: !1,
                root: this.root
            }),
            console.log("_initGlobal")
        }
    };
    return _.extend(t, Backbone.Events),
    t
}
();
app.AjaxCatalogPageManager = Class.extend(function () {
        this.$container = null,
        this.constructor = function (t) {
            if (self.$container = t, !self.$container.length)
                return !1;
            var e = !1,
            a = 2,
            n = self.$container.attr("data-last-page"),
            i = $("html").get(0),
            o = $("footer").get(0),
            s = $("[ data-bottom-text]").get(0),
            r = i.clientHeight + o.offsetHeight + s.offsetHeight,
            c = self.$container.data("catalog-ajax_url");
            return $(window).on("scroll", $.throttle(200, function () {
                    var t = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop);
                    if ($isNextPage = i.scrollHeight - t <= r, $isNextPage && !e && a <= n) {
                        var o = {};
                        o.page = a,
                        $.ajax({
                            url: c,
                            data: o,
                            type: "GET",
                            beforeSend: function () {
                                e = !0,
                                $("[data-preloader-bottom]").show()
                            },
                            success: function (t) {
                                self.$container.append(t),
                                app.log("Page - " + a),
                                $("img.lazy").each(function (t, e) {
                                    e.src = e.dataset.original
                                })
                            },
                            error: function (t) {
                                app.log(t)
                            }
                        }).done(function (t) {
                            e = !1,
                            a++,
                            $("[data-preloader-bottom]").hide()
                        })
                    }
                })),
            app.log("Init app.AjaxCatalogPageManager"),
            !0
        }
    }), app.ChosenCityManager = Class.extend(function () {
        this.constructor = function (t, e) {
            return e && (t = t.filter(":not([data-in-tpl])")),
            !!t.length && (t.each(function () {
                    var t = $(this),
                    e = t.data("placeholder");
                    t.chosen({
                        no_results_text: t.data("chosenItemNo"),
                        search_contains: !0,
                        disable_search_threshold: 10,
                        max_selected_options: 1
                    }).change(function (a, n) {
                        var i = t.find("option:selected"),
                        o = i.data("cityChangeLink"),
                        s = i.data("link");
                        return t.val("").attr("data-placeholder", n.selected).data("placeholder", n.selected).trigger("chosen:updated"),
                        setTimeout(function () {
                            t.parent().click()
                        }, 0),
                        $.post(o, function (a) {
                            a.popup ? ($("[data-choice-region-close]").trigger("click"), $.fancybox({
                                    wrapCSS: "fc-base _popups _close-inside",
                                    content: $(a.popup),
                                    fitToView: !1,
                                    openEffect: "none",
                                    closeEffect: "none",
                                    padding: 0,
                                    beforeClose: function () {
                                        t.val("").attr("data-placeholder", e).data("placeholder", e).trigger("chosen:updated")
                                    },
                                    helpers: {
                                        overlay: {
                                            css: {
                                                background: "rgba(0, 0, 0, 0.7)"
                                            },
                                            locked: !1
                                        }
                                    }
                                })) : document.location.href = s
                        }, "json"),
                        !1
                    })
                }), app.log("Exec app.ChosenManager"), !0)
        }
    }), app.ContentLazyLoader = Class.extend(function () {
        this.$container = null,
        this.$dataContainerTarget = null,
        this.$filterManager = null,
        this.$dataSource = null;
        var t = this;
        function e(e) {
            t.$dataContainerTarget.html(e),
            t.$dataContainerTarget.find("[data-preloader]").hide()
        }
        this.constructor = function (e, a) {
            if (t.$container = e, !t.$container.length)
                return !1;
            var n = t.$container.find("[lazy-load-content]");
            return !!n.length && (t.$filterManager = a, t.$dataSource = $.parseJSON(n.attr("lazy-load-content")), t.$dataContainerTarget = t.$container.find(t.$dataSource.data_container_target), t.init(), console.log("Init app.ContentLazyLoader"), !0)
        },
        this.init = function () {
            t.sendAjaxRequest(t.$dataSource.data_source)
        },
        this.onAjaxSuccess = function (a) {
            return "error" == a.status ? (e(a.message), console.log(a), !0) : "ok" == a.status ? (t.insertData(a), !0) : (e("Неизвестный ответ сервера."), void console.log(a))
        },
        this.insertData = function (e) {
            t.$dataContainerTarget.html(e.content),
            t.$dataContainerTarget.find("input[type=checkbox], input[type=radio]").not(".no-ideal").idealRadioCheck(),
            t.$filterManager.init()
        },
        this.onAjaxError = function (t) {
            e("Сервер недоступен."),
            console.log(t)
        },
        this.sendAjaxRequest = function (e, a) {
            $.ajax({
                type: "GET",
                url: e,
                data: a,
                dateType: "JSON",
                success: function (e, a, n) {
                    t.onAjaxSuccess(e)
                },
                error: function (e) {
                    t.onAjaxError(e)
                }
            })
        }
    }), app.FilterManager = Class.extend(function () {
        this.$container = null,
        this.$infoContainer = null,
        this.$filterContainer = null,
        this.$tagsContainer = null,
        this.$tagTpl = null,
        this.$subCategories = null,
        this.$lastBlock = null,
        this.$checkBlocks = null,
        this.$prices = null,
        this.$sortings = null,
        this.$direction = null,
        this.$pagination = null,
        this.$paginationItems = null,
        this.$counter = null,
        this.timeout = null,
        this.timestamp = null,
        this.url = null;
        var t = this;
        function e(e) {
            t.$infoContainer.html(e),
            t.$infoContainer.find("[data-preloader]").hide()
        }
        this.constructor = function (e) {
            return t.$container = e,
            !!t.$container.length && (t.url = t.$container.data("url") ? t.$container.data("url") : "filter/", t.$infoContainer = t.$container.find("[data-catalog-data]"), t.$filterContainer = $("[data-form-filter]"), t.$checkBlocks = t.$filterContainer.find("[data-check-block]"), t.$tagsContainer = t.$container.find("[data-sorted-tags-container]"), t.$tagTpl = t.$container.find("[data-sorted-tags-tpl]"), t.$subCategories = t.$filterContainer.find("[data-sub-block]"), t.$prices = t.$filterContainer.find("[data-price-item]"), t.$filterContainer.submit(function () {
                    return !1
                }), t.$filterContainer.find("input[type=checkbox], input[type=radio]").not(".no-ideal").idealRadioCheck(), t.$prices.change(function () {
                    var t = $(this);
                    t.val().length || t.val(t.attr(t.data("priceItem")))
                }), t.$filterContainer.find("[data-category-item]").change(function (e) {
                    var a = $(this);
                    if (!a.prop("checked") && ("podarki" === a.data("categoryItem") || "all" === a.data("categoryItem")))
                        return a.prop("checked", !0).attr("checked", "checked").change(), e.stopPropagation(), !1;
                    t.unsetSub(a.data("categoryItem"))
                }), t.$filterContainer.find("[data-toggle-block-title]").click(t.toggleBlock), t.$filterContainer.find("[data-btn-update-filters]").click(t.updateInfo), t.$filterContainer.on("change", "[data-filter-input]", t.updateInfo), t.$filterContainer.find("[data-tabs-item]").click(t.switchTabs), t.hideFilterItems(t.$filterContainer.find("[data-tabs-item]._active").data("tabs-item")), t.$filterContainer.find("[data-top-filter-check] input").on("change", function () {
                    var e = $(this);
                    e.is(":checked") ? e.prop("checked", !0).closest("[data-top-filter-check]").addClass("_active") : e.prop("checked", !1).closest("[data-top-filter-check]").removeClass("_active"),
                    t.setTags()
                }), t.$container.on("click", "[data-sorted-tag-close]", function () {
                    var e = $(this);
                    t.$filterContainer.find("[data-top-filter-check] input[value=" + e.data("sortedTagClose") + "]").prop("checked", !1).change()
                }), t.init(), t.setTags(), app.$window.on("popstate", t.restoreInputs), t.initSticky(), console.log("Init app.FilterManager"), !0)
        },
        this.initSticky = function () {
            var e = "needReCalc",
            a = t.$filterContainer.parent(),
            n = $("[data-header-bottom]").height() + 10;
            a.css({
                minHeight: "100vh"
            }),
            app.$window.on("scroll.FilterManager.Sticky", function () {
                if (t.$filterContainer.length)
                    if (-1 === app.utils.getDirection.direction) {
                        if ("needReCalc" === e) {
                            t.$filterContainer.css({
                                position: "relative",
                                top: n
                            });
                            var i = Math.max(app.$window.scrollTop() - t.$filterContainer.height() - t.$filterContainer.offset().top, 0);
                            t.$filterContainer.css({
                                position: "relative",
                                top: i
                            }),
                            e = "topOffset"
                        }
                        "fixed" !== e && t.$filterContainer[0].getBoundingClientRect().top > n && (t.$filterContainer.css({
                                position: "fixed",
                                top: n
                            }), e = "fixed"),
                        "fixed" === e && a[0].getBoundingClientRect().top > n && (t.$filterContainer.css({
                                position: "relative",
                                top: 0
                            }), e = "topOffset")
                    } else
                        e = app.$window.scrollTop() > t.$filterContainer.height() + t.$filterContainer.offset().top ? "needReCalc" : "topOffset", t.$filterContainer.css({
                            position: "relative",
                            top: t.$filterContainer.offset().top - a.offset().top
                        })
            })
        },
        this.init = function () {
            t.$sortings = t.$container.find("[data-sorting-item=sorting]"),
            t.$direction = t.$container.find("[data-sorting-item=direction]"),
            t.$pagination = t.$container.find("[data-pagination]"),
            t.$paginationItems = t.$pagination.find("[data-pagination-item]"),
            t.$counter = t.$filterContainer.find("[data-filter-counter]"),
            t.$sortings.click(function (e) {
                var a = $(this),
                n = a.closest("label");
                n.hasClass("_active") ? (n.toggleClass("_reverse"), t.$direction.val("0" == t.$direction.val() ? 1 : 0)) : (t.$direction.val(a.data("default")), t.$sortings.closest("label").removeClass("_active _reverse"), "0" == t.$direction.val() && n.addClass("_reverse")),
                t.updateInfo(e)
            }),
            t.$paginationItems.click(function (e) {
                return t.updateInfo(e, $(this).data("pagination-item-page")),
                !1
            })
        },
        this.setTags = function () {
            var e = t.$filterContainer.find("[data-top-filter-check] input:checked");
            t.$tagsContainer.html(""),
            e.each(function () {
                var e = $(this),
                a = e.closest("div").find("[data-check-text]").text();
                t.$tagTpl.clone().find("[data-sorted-tag-name]").text(a).end().find("[data-sorted-tag-close]").attr("data-sorted-tag-close", e.val()).data("sortedTagClose", e.val()).end().appendTo(t.$tagsContainer).fadeIn()
            })
        },
        this.switchTabs = function (e) {
            var a = $(e.target);
            t.$filterContainer.find("[data-tabs-item]").removeClass("_active"),
            a.addClass("_active"),
            t.$filterContainer.find("[ data-tabs-content]").hide().find("[data-category-item]").prop("checked", !1).end().filter('[data-tabs-content="' + a.data("tabsItem") + '"]').fadeIn().find("[data-category-item]").first().prop("checked", !0).change(),
            t.hideFilterItems(a.data("tabs-item"))
        },
        this.hideFilterItems = function (e) {
            t.$filterContainer.find("[data-filter-input-menu-area]").each(function () {
                "" != $(this).data("filter-input-menu-area") && ("infinity" == $(this).data("filter-input-menu-area") || e == $(this).data("filter-input-menu-area") ? $(this).parents("[data-top-filter-check]").css("display", "block") : e != $(this).data("filter-input-menu-area") && $(this).parents("[data-top-filter-check]").css("display", "none"))
            }),
            t.$filterContainer.find("[data-toggle-block-title]").parents("[data-toggle-block]").each(function () {
                var t = 0;
                $(this).find("[data-filter-input-menu-area]").each(function () {
                    var e = $(this).parents("[data-top-filter-check]").is(":hidden"),
                    a = $(this).parents("[data-top-filter-check]").hasClass("_disabled");
                    e || a || t++
                }),
                0 == t ? $(this).parents("[data-check-block]").css("display", "none") : $(this).parents("[data-check-block]").css("display", "block")
            })
        },
        this.showCounter = function (e, a) {
            t.$counter.hide().text(a).prependTo(e).show(),
            clearTimeout(t.timeout),
            t.timeout = setTimeout(function () {
                    t.$counter.fadeOut()
                }, 3e3)
        },
        this.toggleBlock = function (t) {
            $(t.target).toggleClass("_active").closest("[data-toggle-block]").find("[data-toggle-block-options]").slideToggle()
        },
        this.updateInfo = function (e, a) {
            var n = $(e.target).closest("[data-message-show]");
            t.$lastBlock = n.length ? n.first() : t.$filterContainer.find("[data-message-show]").first(),
            t.setCategories(e),
            t.setSelectedBlocks(),
            t.setVendors(),
            t.sendAjaxRequest(t.createUrl(t.getFilterData(), a), {}, !!a)
        },
        this.setVendors = function () {
            t.$filterContainer.find("[data-check-item]:checked:not([data-vendor-item])").length && t.$filterContainer.find("[data-vendor-item]").prop("checked", !1).next().removeClass("checked")
        },
        this.setCategories = function (e) {
            var a = $(e.target);
            if (a.is("[data-category-item]")) {
                var n = a.closest("[data-category-block]");
                t.unsetAnotherBlock(n.data("categoryBlock"));
                var i = n.find("[data-category-item]");
                "podarki" === n.data("categoryBlock") && t.unsetAnotherItems(i, a.data("categoryItem")),
                i.first().data("categoryItem") === a.data("categoryItem") ? t.setAllItem(i) : t.unsetAllItem(i)
            }
        },
        this.unsetAnotherBlock = function (e) {
            t.$filterContainer.find("[data-category-block]").filter("[data-category-block!=" + e + "]").find("[data-category-item]").prop("checked", !1).next().removeClass("checked").closest("[data-top-filter-check]").removeClass("_active")
        },
        this.setAllItem = function (t) {
            t.each(function (t, e) {
                t && $(e).prop("checked", !1).next().removeClass("checked").closest("[data-top-filter-check]").removeClass("_active")
            })
        },
        this.unsetAllItem = function (t) {
            t.first().prop("checked", !1).next().removeClass("checked").closest("[data-top-filter-check]").removeClass("_active")
        },
        this.unsetAnotherItems = function (t, e) {
            t.each(function (t, a) {
                $(a).data("categoryItem") !== e && $(a).prop("checked", !1).next().removeClass("checked").closest("[data-top-filter-check]").removeClass("_active")
            })
        },
        this.setSelectedBlocks = function () {
            t.$checkBlocks.each(function () {
                var t = $(this);
                t.find("[data-check-item]:checked").length ? t.find("[data-toggle-block-title]").addClass("_selected") : t.find("[data-toggle-block-title]").removeClass("_selected")
            })
        },
        this.getFilterData = function () {
            var e = t.$filterContainer.serializeJSON();
            return e.f || (e.f = {}),
            e.f.s = t.getSortingData(),
            e
        },
        this.getSortingData = function () {
            var e = {};
            return e.v = t.$sortings.filter(":checked").val(),
            e.d = t.$direction.val(),
            e.v ? e : {}
        },
        this.setChecked = function (e) {
            $.each(e, function (e, a) {
                t.$filterContainer.find("[value=" + a + "]").prop("checked", !0).next().addClass("checked")
            })
        },
        this.resetFilters = function () {
            t.$filterContainer.find("[data-check-item]").prop("checked", !1).prop("disabled", !1).next().removeClass("checked").end().closest("div").removeClass("_disabled")
        },
        this.setPriceData = function (e) {
            e && e.min && e.max && t.$prices.filter("[data-price-item=min]").val(e.min).end().filter("[data-price-item=max]").val(e.max)
        },
        this.setSortingData = function (e) {
            if (e && e.v) {
                var a = 1 == e.d ? " _reverse" : "";
                t.$sortings.closest("label").removeClass("_active _reverse").end().filter("[data-sorting-name=" + e.v + "]").prop("checked", !0).addClass("_active" + a),
                t.$direction.val(e.d)
            }
        },
        this.restoreInputs = function () {
            history.state ? (t.resetFilters(), t.setChecked(history.state.f.f), t.setChecked(history.state.f.c), t.setChecked(history.state.f.v), t.setChecked(history.state.f.sc), t.setPriceData(history.state.f.p), t.setSortingData(history.state.f.s), t.setSelectedBlocks(), t.sendAjaxRequest(history.state.url, {})) : location.reload()
        },
        this.createUrl = function (e, a) {
            var n = decodeURIComponent($.param(e));
            return e.url = t.url,
            a && (e.url += a + "/"),
            e.url += n.length ? "?" + n : "",
            history.pushState(e, null, e.url),
            e.url
        },
        this.changeBanner = function (t) {
            var e = $("[data-catalog-gift-banner]");
            t ? (e.find("img").attr("src", t), e.show()) : e.hide()
        },
        this.unsetSub = function (e) {
            t.$subCategories.filter("[data-sub-block!=" + e + "]").find("[data-sub-container]").html("").end().hide()
        },
        this.fillSubCategories = function (e) {
            var a = t.$filterContainer.find("[data-sub-block]"),
            n = a.find("[data-sub-container]"),
            i = a.find("[data-sub-tpl]");
            n.html(""),
            e ? (a.attr("data-sub-block", e.code).data("subBlock", e.code).end().find("[data-toggle-block-title]").text(e.name).end(), e.checked ? a.find("[data-toggle-block-title]").addClass("_selected") : a.find("[data-toggle-block-title]").removeClass("_selected"), $.each(e.data, function (t, e) {
                    var a = i.clone();
                    e.disabled ? a.addClass("_disabled") : a.removeClass("_disabled"),
                    a.removeAttr("data-sub-tpl").removeData("subTpl").find("[data-check-text]").text(e.name).end().find("[data-filter-input]").removeClass("no-ideal").prop("disabled", e.disabled).prop("checked", e.checked).attr("data-sub-item", e.code).data("subItem", e.code).val(e.code).end().removeClass("hide").appendTo(n)
                }), a.show()) : a.hide()
        },
        this.insertData = function (e, a) {
            e.sidebarData && e.sidebarData.timestamp && e.sidebarData.timestamp != t.timestamp || (t.$infoContainer.html(e.content), setTimeout(function () {
                    var e;
                    (e = a ? t.$infoContainer.offset().top : t.$infoContainer.height() + t.$infoContainer.offset().top - t.$filterContainer.height() - $(".footer").height(), $(document).outerHeight(!0) - $(window).scrollTop() - $(window).height() < t.$filterContainer.height()) && $("html, body").stop().animate({
                        scrollTop: e
                    }, 500, "swing")
                }, 100), e.sidebarData && (t.fillSubCategories(e.sidebarData.subCategories), t.changeBanner(e.sidebarData.banner), $.each(e.sidebarData.filters, function (e, a) {
                        var n = a.partName;
                        "vendor" !== n && (t.$filterContainer.find("[data-" + n + "-block=" + a.code + "] [data-toggle-block-title]").text(a.name), $.each(a.data, function (e, a) {
                                var i = t.$filterContainer.find("[data-" + n + "-item=" + a.code + "]"),
                                o = i.closest("div");
                                i.prop("disabled", a.disabled).siblings("[data-check-text]").text(a.name),
                                a.disabled ? (o.addClass("_disabled"), i.prop("checked", !1).prop("disabled", !0).next().removeClass("checked")) : o.removeClass("_disabled")
                            }))
                    })), t.$infoContainer.find("img.lazy").lazyload({
                    effect: "fadeIn",
                    threshold: 10
                }), t.$infoContainer.find("input[type=checkbox], input[type=radio]").not(".no-ideal").idealRadioCheck(), t.$filterContainer.find("input[type=checkbox], input[type=radio]").not(".no-ideal").closest("label").not(".ideal-radiocheck-label").find("input").idealRadioCheck(), e.sidebarData && t.showCounter(t.$lastBlock, e.sidebarData.message), app.FavoritesManager(t.$infoContainer), t.init(), t.setTags())
        },
        this.onAjaxSuccess = function (a, n) {
            return "error" == a.status ? (e(a.message), console.log(a), !0) : "ok" == a.status ? (t.insertData(a, n), !0 === a.sidebarData.podarki ? $("[data-filter-block]").addClass("hide") : $("[data-filter-block]").removeClass("hide"), !0) : (e("Неизвестный ответ сервера."), void console.log(a))
        },
        this.onAjaxError = function (t) {
            e("Сервер недоступен."),
            console.log(t)
        },
        this.sendAjaxRequest = function (e, a, n) {
            t.$infoContainer.find("[data-preloader]").show(),
            a.t = t.timestamp = moment().valueOf(),
            $.ajax({
                type: "GET",
                url: e,
                data: a,
                dateType: "JSON",
                success: function (e, a, i) {
                    t.onAjaxSuccess(e, n)
                },
                error: function (e) {
                    t.onAjaxError(e)
                }
            })
        }
    }), app.components.Loader = function () {
    "use strict";
    function t() {
        var t = this;
        this.obj = null,
        this.isVisilbe = !1,
        this.nobg = !1,
        t.obj = $(".js-loader")
    }
    return t.prototype.show = function () {
        return this.isVisilbe || (this.nobg && this.obj.addClass("_nobg"), this.obj.fadeIn(300, function () {}), this.isVisilbe = !0),
        this
    },
    t.prototype.hide = function (t) {
        var e = this;
        e.isVisilbe && (e.obj.stop().fadeOut(1e3).removeClass("_nobg"), e.nobg = !1, e.isVisilbe = !1)
    },
    new t
}
(), app.ProductZoomManager = Class.extend(function () {
        this.$container = null;
        var t = this;
        this.constructor = function (e) {
            return t.$container = e,
            !!t.$container.length && (t.$container.on("mousemove", "[data-product-parallax]", function (t) {
                    var e = $(this),
                    a = this.getBoundingClientRect(),
                    n = (a.right - a.left) / 2,
                    i = (a.bottom - a.top) / 2,
                    o = t.clientY - a.top - i,
                    s = (t.clientX - a.left - n) / n * 1.5 * 3,
                    r = o / i * 1.5 * 3;
                    e.find("[data-product-image-parallax]").css({
                        transform: "scale(1.5) translate3d(" + -s + "rem, " + -r + "rem, 0)"
                    })
                }).on("mouseleave", "[data-product-parallax]", function () {
                    $(this).find("[data-product-image-parallax]").css({
                        transform: "scale(1) translate3d(0, 0, 0)"
                    })
                }), console.log("Init app.ProductZoomManager"), !0)
        }
    }), app.Search = Class.extend(function () {
        this.$container = $("[data-header-search]"),
        this.$form = null,
        this.$formBtn = null,
        this.$formWrap = null,
        this.$input = null,
        this.$results = null,
        this.$tplResult = null,
        this.$tplNoResult = null;
        var t = this;
        function e() {
            return t.$resultContainer.hide(),
            $.get(t.$form.attr("action"), t.$form.serialize(), a, "JSON"),
            !1
        }
        function a(e) {
            t.$results.html("");
            var a = $.map(e, function (t, e) {
                    return [t]
                });
            a && a.length ? a.map(function (e) {
                t.$results.append(function (e) {
                    return t.$tplResult.clone().attr("href", e.link).find("[data-image]").css({
                        "background-image": "url('" + e.image + "')"
                    }).end().find("[data-title]").text(e.name).end().find("[data-price]").text(e.price).end().find("[data-more-field]").text("ID: " + e.id).end().each(function () {
                        var t = $(this);
                        t.hover(function () {
                            t.find("[data-more-field]").text("Перейти »")
                        }, function () {
                            t.find("[data-more-field]").text("ID: " + e.id)
                        })
                    })
                }
                    (e))
            }) : t.$results.append(t.$tplNoResult.clone()),
            t.$resultContainer.show()
        }
        this.constructor = function () {
            return !!t.$container.length && (t.$form = t.$container.find("[data-header-search-form]"), t.$formBtn = t.$container.find("[data-header-search-btn]"), t.$formWrap = t.$container.find("[data-header-search-form-wrap]"), t.$input = t.$container.find("[data-header-search-form-field]"), t.$results = t.$container.find("[data-header-search-form-items-container]"), t.$resultContainer = t.$container.find("[data-header-search-result-container]"), t.$tplResult = t.$container.find("[data-tpl-result]"), t.$tplNoResult = t.$container.find("[data-tpl-no-result]"), t.$formBtn.click(function () {
                    t.$formBtn.hide(),
                    t.$formWrap.show(),
                    t.$input.focus()
                }), $("html").click(function (e) {
                    $(e.target).closest(t.$container).length || (t.$formBtn.show(), t.$formWrap.hide())
                }), t.$input.keyup($.debounce(500, e)), t.$form.submit(function () {
                    return !1
                }), console.log("Init app.Search"), !0)
        }
    }), app.Size = function () {
    var t = 300;
    function e() {
        var e,
        a,
        n = this,
        i = /iPod|iPad|iPhone/g.test(navigator.userAgent) ? "orientationchange load" : "resize load";
        n.width = null,
        n.height = null,
        n.orientationChange = (e = n.orientationChange, a = n, function () {
            return e.apply(a, arguments)
        }),
        /android/gi.test(navigator.userAgent) ? app.dom.$window.on("load", function () {
            return setTimeout(n.orientationChange, t)
        }) : app.dom.$window.on(i, n.orientationChange),
        n.orientationChange()
    }
    return e.prototype = {
        orientationChange: function () {
            var t = this.height,
            e = this.width;
            this.height = Modernizr.touch ? window.innerHeight : app.dom.$window.height(),
            this.width = app.dom.$window.width(),
            this.width = Math.max(320, this.width),
            this.height = Math.max(212, this.height),
            this.width === e && this.height === t || app.trigger("resize", this.getSize())
        },
        getSize: function () {
            return {
                width: this.width,
                height: this.height
            }
        }
    },
    new e
}
(), function () {
    "use strict";
    app.utils.getData = null,
    app.utils.getScrollPosition = function () {
        return void 0 !== window.scrollY ? window.scrollY : document.documentElement && document.documentElement.scrollTop ? document.documentElement.scrollTop : 0
    },
    app.utils.okonchanie = function (t, e, a, n) {
        var i = parseInt(t) !== parseFloat(t);
        return (t += "").length > 1 && "1" == +t.substr(t.length - 2, 1) || +t.substr(t.length - 1, 1) > 4 && +t.substr(t.length - 1, 1) < 10 && !i ? n : "1" != t.substr(t.length - 1, 1) || i ? a : e
    },
    app.utils.isIPhone = function () {
        return /iPhone|iPod/i.test(navigator.userAgent)
    },
    app.utils.parseUrlQuery = function (t) {
        var e,
        a,
        n,
        i = t && t.indexOf("?"),
        o = {};
        if (t = t ? -1 !== i ? t.substr(i + 1) : null : location.search && location.search.substr(1))
            for (n = t.split("&"), e = 0; e < n.length; e++)
                o[(a = n[e].split("="))[0]] = a[1];
        return o
    },
    app.utils.insertParam = function (t, e) {
        t = encodeURI(t),
        e = encodeURI(e);
        for (var a, n = document.location.search.substr(1).split("&"), i = n.length; i--; )
            if ((a = n[i].split("="))[0] == t) {
                a[1] = e,
                n[i] = a.join("=");
                break
            }
        i < 0 && (n[n.length] = [t, e].join("="));
        var o = [];
        return _.each(n, function (t, e) {
            "" != t && o.push(t)
        }),
        "?" + o.join("&")
    },
    app.utils.insertParam2 = function (t, e, a) {
        return console.log(t),
        e = encodeURI(e),
        a = encodeURI(a),
        -1 !== t.indexOf("?") ? t += "&" + [e, a].join("=") : t += "?" + [e, a].join("="),
        t
    },
    app.utils.scrollWidth = function () {
        var t = document.createElement("div");
        t.style.overflowY = "scroll",
        t.style.width = "50px",
        t.style.height = "50px",
        t.style.visibility = "hidden",
        document.body.appendChild(t);
        var e = t.offsetWidth - t.clientWidth;
        return document.body.removeChild(t),
        e
    },
    app.utils.doubleNumber = function (t) {
        return 1 === (t = t.toString()).length ? "0" + t : t
    },
    app.utils.getDirection = {
        direction: 1,
        lastScrollTop: 0,
        init: function () {
            var t = this;
            $(window).scroll(function () {
                var e = $(window).scrollTop();
                t.lastScrollTop <= e ? t.direction = 1 : t.direction = -1,
                t.lastScrollTop = e
            })
        }
    },
    app.utils.heightLikeWindow = function (t, e) {
        function a() {
            t.css({
                height: app.Size.height
            })
        }
        a(),
        app.on("resize", a, e)
    },
    app.utils.sizeLikeWindow = function (t, e) {
        function a(e) {
            t.css(e)
        }
        a(app.Size.getSize()),
        app.on("resize", a, e)
    },
    app.utils.getBackgroundImageUrl = function (t) {
        return (t[0].currentStyle || window.getComputedStyle(t[0], !1)).backgroundImage.slice(4, -1).replace(/"/g, "")
    },
    app.utils.isMobile = $("body").hasClass("mobile-v"),
    app.utils.implode = function (t, e) {
        return e instanceof Array ? e.join(t) : e
    }
}
(), app.views.Default = Backbone.View.extend({
        loader: null,
        popup: null,
        html: null,
        needGoIn: !1,
        className: null,
        pageHolder: null,
        subView: {},
        $bigGallery: null,
        defLoadAllImages: null,
        defGoIn: null,
        defLoaderHide: null,
        defaultLoaderHide: !0,
        initialize: function () {
            this.loader = app.components.loader
        },
        setProps: function (t, e) {
            this.html = t,
            this.className = e
        },
        render: function () {
            this.loader.hide(),
            this.html ? (app.GlobalView.$el.append(this.html), this.setElement(app.GlobalView.$el.find('[data-view="' + this.className + '"]')), app.trigger("dom.append"), this.needGoIn && this.goIn()) : this.goIn(),
            new app.FormThrottleManager
        },
        afterRender: function () {
            this.$("input[type=checkbox], input[type=radio]").not(".no-ideal").idealRadioCheck(),
            this.$("[data-mask-phone]").inputmask("+7 (999) 999-99-99", {
                clearMaskOnLostFocus: !1,
                clearIncomplete: !0
            }),
            this.fixedFooter(),
            this.checkStyle(),
            this.detailView(),
            this.fullScreenGall(),
            this.initFancy(),
            this.initChosen(),
            this.minHeght(),
            this.checkToggle(),
            this.radioStyle(),
            this.toggleContent(),
            this.initNav(),
            this.modal(),
            this.lazy(),
            this.rating(),
            this.tabs(),
            this.initReviewsPopup(),
            app.utils.isMobile && (this.initCitySelect(), this.mobHelpPopups())
        },
        checkGetParams: function () {
            if (app.utils.getData || (app.utils.getData = app.utils.parseUrlQuery(window.location.search)), app.utils.getData.goto) {
                var t = $(app.utils.getData.goto);
                t.length && (app.Router._pageCounter ? e() : $(window).load(e))
            } else
                t = $("body"), e();
            function e() {
                var e = -1,
                a = window.location.pathname.split("/")[1];
                "guarantee" == app.utils.getData.goto ? e = 5 : "information" == a && (e = 4),
                e > -1 && app.GlobalView.selectCurrentMenu(e),
                setTimeout(function () {
                    $("html, body").stop(!0, !0).animate({
                        scrollTop: t.offset().top
                    }, 500)
                }, 310)
            }
        },
        goOutDefault: function () {
            var t = this;
            app.trigger("View.goOutDefaultStart"),
            setTimeout(function () {
                t.remove(),
                app.trigger("View.goOutDefaultEnd")
            }, 300)
        },
        goIn: function () {
            app.trigger("View.goIn")
        },
        remove: function () {
            var t = this;
            t.trigger("remove"),
            t.off(),
            app.off(null, null, t),
            _.each(t.subView, function (e, a) {
                app.off(null, null, e),
                e.remove(),
                delete t.subView[a]
            }),
            t.subView = null,
            app.views.Default.__super__.remove.apply(t, arguments)
        },
        initGoto: function () {
            this.$el.on("click", "[data-goto]", function (t) {
                t.preventDefault(),
                $("html, body").animate({
                    scrollTop: $($(this).data("goto")).offset().top - app.Header.$el.find("[data-head-top]").height()
                }, 500)
            })
        },
        initChosen: function () {
            this.$("[data-chosen]").chosen({
                disable_search_threshold: 1e3,
                width: "100%"
            })
        },
        fixedFooter: function () {
            var t = $(".grid");
            function e() {
                t.css({
                    "min-height": app.dom.$window.height() - app.Footer.$el.outerHeight(!0) - app.Header.$el.outerHeight() + "px"
                })
            }
            setTimeout(function () {
                e()
            }, 100),
            app.dom.$window.on("resize", e)
        },
        mobHelpPopups: function () {
            var t = this.$("[data-help-popup]"),
            e = this.$("[data-help-popup-show]");
            e.on("click", function () {
                t.filter('[data-help-popup="' + $(this).data("helpPopupShow") + '"]').toggle()
            }),
            this.$el.off("click.HidePopups"),
            this.$el.on("click.HidePopups", function (a) {
                $(a.target).closest(t).length || $(a.target).closest(e).length || t.hide()
            })
        },
        initNav: function () {
            $("html").off("click.nav"),
            $("html").on("click.nav", "[data-nav-btn]", function () {
                $(this).toggleClass("_active").closest("[data-nav-block]").find("[data-nav-content]").slideToggle(500)
            })
        },
        initCitySelect: function () {
            $("[data-select-region]").change(function () {
                window.location = $(this).val()
            })
        },
        initReviewsGalls: function (t) {
            t.each(function () {
                var t = $(this);
                new Swiper(t[0], {
                    loop: !0,
                    lazy: !0,
                    freeMode: !1,
                    slidesPerView: 1,
                    simulateTouch: !1,
                    spaceBetween: 30,
                    navigation: {
                        nextEl: t.find("[data-reviews-gall-next]"),
                        prevEl: t.find("[data-reviews-gall-prev]")
                    }
                })
            })
        },
        productSize: function (t) {
            var e = t || this.$("[data-product-size]"),
            a = e.find("[data-product-size-option]"),
            n = e.find("[data-product-size-item]");
            a.on("change", function () {
                var t = $(this).data("productSizeOption");
                n.each(function () {
                    var e = $(this);
                    e.text(e.data("productSizeItem")[t])
                })
            })
        },
        lazy: function () {
            $("img.lazy").lazyload({
                effect: "fadeIn",
                threshold: 10
            })
        },
        rating: function () {
            app.dom.$body.on("click", "[data-like-btn]", function () {
                var t = $(this),
                e = t.data("likeBtn"),
                a = {
                    type: t.data("type")
                };
                return $.post(e, a, function (e) {
                    var a = t.closest("[data-product-detail]");
                    a.find("[data-like-btn]").hide(),
                    a.find("[data-rating-counts]").replaceWith(e.content)
                }),
                !1
            }),
            $(document).click(function (t) {
                var e = $(t.target).closest("[data-product-detail]").find("[data-rating-info]");
                null == $(t.target).data("ratingLink") ? null == $(t.target).data("ratingInfo") && 0 == $(t.target).parents("[data-rating-info]").length && e.addClass("hide") : e.toggleClass("hide")
            })
        },
        detailView: function () {
            var t = this,
            e = null;
            function a(e) {
                $.get(e, {}, function (e) {
                    var a = e.content;
                    $.fancybox({
                        wrapCSS: "fc-base _popups _detail-product",
                        content: a,
                        openEffect: "none",
                        closeEffect: "none",
                        padding: 0,
                        margin: [50, 20, 20, 20],
                        tpl: {
                            wrap: '<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><a  class="products-nav-btn _next" data-next-product-show href="javascript:;"></a><a  class="products-nav-btn _prev" data-prev-product-show href="javascript:;"></a><div class="fancybox-inner"></div></div></div></div>'
                        },
                        helpers: {
                            overlay: {
                                css: {
                                    background: "rgba(0, 0, 0, 0.7)"
                                }
                            }
                        },
                        afterShow: function () {
                            new app.ManagerChoosenSizes,
                            new app.ManagerPolicy,
                            new app.ManagerChoosenVariant,
                            new app.ManagerChoosenColors,
                            t.productGall(this.wrap.find("[data-product-detail]"))
                        },
                        beforeShow: function () {
                            this.wrap.find("input[type=checkbox], input[type=radio]").not(".no-ideal").idealRadioCheck(),
                            t.initFilterList(this.wrap),
                            t.checkStyle(this.wrap),
                            this.wrap.find("[data-product-size]").length && t.productSize(this.wrap),
                            this.wrap.find("[data-structure-counter]").length && t.structureCounter(this.wrap.find("[data-structure-counter]"))
                        }
                    })
                }, "json")
            }
            app.dom.$body.on("click.productShow", "[data-product-show]", function () {
                var t = $(this);
                a(t.data("ajaxUrl")),
                e = $("[data-product-show]").index(t)
            }),
            app.dom.$body.on("click", "[data-prev-product-show]", function () {
                e -= 1;
                var t = $("[data-product-show]");
                e < 0 && (e = t.length - 1),
                a(t.eq(e).data("ajaxUrl"))
            }),
            app.dom.$body.on("click", "[data-next-product-show]", function () {
                e += 1;
                var t = $("[data-product-show]");
                e > t.length - 1 && (e = 0),
                a(t.eq(e).data("ajaxUrl"))
            })
        },
        initFilterList: function (t) {
            var e = t || $(this),
            a = e.find("[data-filter-inp]"),
            n = e.find("[data-filter-list]"),
            i = e.find("[ data-filter-wrap]");
            jQuery.expr[":"].Contains = function (t, e, a) {
                return (t.textContent || t.innerText || "").toUpperCase().indexOf(a[3].toUpperCase()) >= 0
            },
            function (t, e) {
                var a,
                n = t,
                o = e.find("[data-filter-list-item]");
                n.focus(function () {
                    e.show()
                }),
                $("html").on("click.Filter", function (t) {
                    $(t.target).closest(i).length || e.hide()
                }),
                o.on("click", function () {
                    t.val($(this).data("filterListItem")).change(),
                    e.hide()
                }),
                n.blur(function () {}),
                n.change(function () {
                    var t = $(this).val();
                    return t ? (a = e.find("[data-filter-list-item]:Contains(" + t + ")"), o.not(a).slideUp(), a.slideDown()) : o.slideDown(),
                    !1
                }).keyup(function () {
                    $(this).change()
                })
            }
            (a, n)
        },
        checkStyle: function (t) {
            var e = (t || this.$el).find("[data-check-style]"),
            a = null;
            e.on("change", function () {
                app.log("2) Default. checkStyle(). change");
                var t = $(this);
                "radio" == t.data("action-type") && e.each(function () {
                    t.data("id") != $(this).data("id") && ($(this).parents("LABEL").removeClass("_active"), $(this).prop("checked", !1).attr("checked", !1).get(0).checked = !1, $(this).next(".ideal-radio").removeClass("checked"), $(this).next(".ideal-check").removeClass("checked"))
                }),
                a = t.closest("label"),
                t.is(":checked") ? a.addClass("_active") : a.removeClass("_active");
                var n = $("[is-default-grade-need-uncheck=1]");
                if (n.length > 0) {
                    n.attr("is-default-grade-need-uncheck", 0),
                    n.parents("LABEL").removeClass("_active"),
                    n.prop("checked", !1).attr("checked", !1).get(0).checked = !1,
                    n.next(".ideal-radio").removeClass("checked"),
                    n.next(".ideal-check").removeClass("checked");
                    var i = $("[data-source=color]"),
                    o = i.data("value"),
                    s = {},
                    r = n.attr("data-id");
                    $.each(o, function (t, e) {
                        t != r && (s[t] = e)
                    }),
                    i.data("value", s).attr("data-value", JSON.stringify(s))
                }
                var c = $("[is-default-grade=1]");
                c.length > 0 && (c.attr("is-default-grade", 0), c.attr("is-default-grade-need-uncheck", 1))
            }),
            e.each(function () {
                var t = $(this);
                1 == t.attr("is-default-grade") && (t.click(), window.scrollTo(0, 0))
            })
        },
        radioStyle: function () {
            this.$("[data-radio-style]").each(function () {
                var t = $(this),
                e = t.find("[data-radio-style-item]");
                t.find("[data-radio-style-inp]").on("change", function () {
                    var t = $(this);
                    e.removeClass("_active"),
                    t.closest(e).addClass("_active")
                })
            })
        },
        checkToggle: function () {
            this.$("[data-ckeck-toggle]").each(function () {
                var t = $(this),
                e = t.find("[data-ckeck-toggle-field]"),
                a = t.find("[data-ckeck-toggle-content]");
                e.on("change", function () {
                    a.slideToggle(300, function () {
                        app.dom.$window.resize()
                    })
                })
            })
        },
        productGall: function (t) {
            var e = t || this.$el,
            a = e.find("[data-product-gall]"),
            n = e.find("[data-product-gall-pag-item]"),
            i = a.find("[data-product-gall-prev]"),
            o = a.find("[data-product-gall-next]"),
            s = e.find("[data-product-gall-slide]"),
            r = new Swiper(a[0], {
                    freeMode: !1,
                    slidesPerView: 1,
                    spaceBetween: 0,
                    loop: !0,
                    watchSlidesVisibility: !0,
                    lazy: !0,
                    navigation: {
                        nextEl: o,
                        prevEl: i
                    },
                    on: {
                        init: function () {
                            s.length > 1 && (i.show(), o.show())
                        },
                        slideChange: function () {
                            var t = $(this.slides[this.activeIndex]).data("productGallSlide");
                            e.find("[data-product-gall-pag-item]").removeClass("_active").filter('[data-product-gall-pag-item="' + t + '"]').addClass("_active")
                        }
                    }
                });
            $(window).on("Change.ProductCardGalleryPhotos", function (t, a, n) {
                n && (a = a[n]),
                r.removeAllSlides();
                var i = e.find("[data-product-gall-pag]");
                i.find("[data-product-gall-pag-item]").remove(),
                a.forEach(function (t, e, a) {
                    r.appendSlide('<div class="swiper-slide detail__photo-gall-item swiper-slide-active" data-product-gall-slide="' + (e + 1) + '"><img src="' + t.gallery + '"></div>'),
                    i.append('<div class="detail__photo-gall-pag-item _active" data-product-gall-pag-item="' + (e + 1) + '"><img src="' + t.navigation + '" alt=""></div>')
                }),
                e.find("[data-product-gall-pag-item]").removeClass("_active").filter('[data-product-gall-pag-item="1"]').addClass("_active"),
                e.find("[data-product-gall-pag-item]").on("click", function () {
                    r.slideTo($(this).data("productGallPagItem"))
                }),
                r.slideTo(1, 1)
            }),
            n.on("click", function () {
                r.slideTo($(this).data("productGallPagItem"))
            }),
            this.productGallReplacement()
        },
        productGallMob: function (t) {
            var e = t || this.$el,
            a = e.find("[data-product-gall]"),
            n = a.find("[data-product-gall-prev]"),
            i = a.find("[data-product-gall-next]"),
            o = a.find("[data-product-gall-pag]"),
            s = e.find(".detail__photo-gall-item"),
            r = new Swiper(a[0], {
                    loop: !0,
                    freeMode: !1,
                    slidesPerView: 1,
                    spaceBetween: 0,
                    navigation: {
                        nextEl: i,
                        prevEl: n
                    },
                    pagination: {
                        el: o,
                        clickable: !0,
                        runCallbacksOnInit: !0
                    },
                    on: {
                        init: function () {
                            s.length > 1 && (n.show(), i.show())
                        }
                    }
                });
            $(window).on("Change.ProductCardGalleryPhotosMob", function (t, e, a) {
                if (a)
                    var n = e[a];
                else
                    n = e;
                r.removeAllSlides(),
                n.forEach(function (t, e, a) {
                    r.appendSlide('<div class="swiper-slide detail__photo-gall-item swiper-slide-active" data-product-gall-slide="' + (e + 1) + '"><img src="' + t.gallery + '"></div>')
                }),
                r.slideTo(1, 1)
            }),
            this.productGallReplacement()
        },
        productGallReplacement: function () {
            var t = $("[data-replace-media-input]"),
            e = $("[data-replace-media]"),
            a = ["min", "normal", "max"];
            e && t.change(function () {
                var t = e.data("originalImages"),
                n = $("[data-sizes]").find("[data-price-btn]:checked").data("source");
                ($(this).prop("checked") && (t = e.data("replaceImages")), n) && ($("[data-image-links]").data("imageLinks", t), t = t[a[n.charAt(5)]]);
                0 != t.length && (app.utils.isMobile ? $(window).trigger("Change.ProductCardGalleryPhotosMob", [t]) : $(window).trigger("Change.ProductCardGalleryPhotos", [t]))
            })
        },
        structureCounter: function (t) {},
        structureCounterMob: function (t) {
            var e = t || this.$("[data-structure-counter]"),
            a = e.find("[data-structure-counter-field]"),
            n = e.find("[data-radio-style-item][data-container-item] [data-radio-style-inp]");
            if (!e.length)
                return !1;
            n.on("change", function () {
                0 == $(this).data("no-clean") ? a.val("") : $(this).data("no-clean", !1)
            }),
            a.on("change", function () {
                if ($(this).val) {
                    var t = n.filter(":checked");
                    t.length && t.prop("checked", !1).change().closest("label").removeClass("_active")
                }
            })
        },
        complexSort: function () {
            var t = this.$("[data-complex-sort]"),
            e = t.find("[data-complex-sort-item]"),
            a = e.find("input"),
            n = t.find("[data-complex-sort-hidden-inp]");
            a.on("click", function () {
                var t = $(this).closest(e);
                t.hasClass("_active") ? (t.toggleClass("_reverse"), "0" == n.val() ? n.val("1") : n.val("0")) : (n.val("0"), e.removeClass("_active _reverse"), t.addClass("_active"))
            })
        },
        giftsGall: function () {
            this.$("[data-gifts-gall-wrap]").each(function () {
                var t = $(this),
                e = t.find("[data-gifts-gall]"),
                a = t.find("[data-gifts-gall-item]"),
                n = t.find("[data-gifts-gall-prev]"),
                i = t.find("[data-gifts-gall-next]"),
                o = t.find("[data-gifts-gall-pag]"),
                s = t.find("[data-gifts-gall-tab]"),
                r = app.utils.isMobile ? 2 : 4,
                c = app.utils.isMobile ? 2 : 4,
                d = new Swiper(e[0], {
                        freeMode: !1,
                        slidesPerView: r,
                        slidesPerGroup: c,
                        spaceBetween: 20,
                        watchSlidesVisibility: !0,
                        lazy: !0,
                        navigation: {
                            nextEl: i,
                            prevEl: n
                        },
                        pagination: {
                            el: o,
                            type: "custom",
                            clickable: !0,
                            renderCustom: function (t, a, n) {
                                var i = e.data("maxPages"),
                                o = "",
                                s = 1,
                                r = n > i,
                                c = i;
                                i > n && (c = n),
                                r && (a < n - 3 && (c -= 2), a > i - 3 && (c -= 2));
                                var d = c;
                                r && a > i - 3 && (a < n - 3 ? (s = (d = a + 3 - 1) - c, d -= 1) : (s = n - c + 1, d = n)),
                                s < 1 && (s = 1);
                                var l = "swiper-pagination-bullet",
                                u = l + " swiper-pagination-bullet-clickable";
                                r && a > i - 3 && (o += "<span class='" + u + "' data-swiper-page='1'>1</span>", o += "<span class='" + l + "'>...</span>");
                                for (var p = s; p <= d; p++) {
                                    var h = u;
                                    a == p && (h += " swiper-pagination-bullet-active"),
                                    o += "<span class='" + h + "' data-swiper-page='" + p + "'>" + p + "</span>"
                                }
                                return r && a < n - 3 && (o += "<span class='" + l + "'>...</span>", o += "<span class='" + u + "' data-swiper-page='" + n + "'>" + n + "</span>"),
                                o
                            }
                        }
                    });
                e.on("click", "[data-swiper-page]", function () {
                    var t = $(this).data("swiperPage"),
                    a = e.data("itemsOnPage");
                    d.slideTo((t - 1) * a)
                }),
                s.on("click", function () {
                    var t = $(this),
                    e = t.data("giftsGallTab");
                    if (t.hasClass("_active"))
                        return !1;
                    s.removeClass("_active"),
                    t.addClass("_active"),
                    "all" == e ? a.show() : a.hide().filter('[data-gifts-gall-item="' + e + '"]').show(),
                    d.update(!0),
                    d.slideNext(!1, 1e5),
                    setTimeout(function () {
                        d.slideTo(0, 0)
                    }, 50)
                })
            })
        },
        similarGall: function () {
            var t = $("[data-catalog-product-bouquets-gall]");
            t.length && $.ajax({
                type: "GET",
                url: t.data("action"),
                dateType: "JSON",
                data: {
                    type: t.data("type")
                },
                success: function (e) {
                    t.html(e.content),
                    app.FavoritesManager(t.find("[data-gifts-gall-wrap]")),
                    t.find("[data-gifts-gall-wrap]").each(function () {
                        var t = $(this),
                        e = t.find("[data-gifts-gall]"),
                        a = t.find("[data-gifts-gall-item]"),
                        n = t.find("[data-gifts-gall-prev]"),
                        i = t.find("[data-gifts-gall-next]"),
                        o = t.find("[data-gifts-gall-pag]"),
                        s = t.find("[data-gifts-gall-tab]"),
                        r = app.utils.isMobile ? 2 : 4,
                        c = app.utils.isMobile ? 2 : 4,
                        d = new Swiper(e[0], {
                                freeMode: !1,
                                slidesPerView: r,
                                slidesPerGroup: c,
                                spaceBetween: 20,
                                watchSlidesVisibility: !0,
                                lazy: !0,
                                navigation: {
                                    nextEl: i,
                                    prevEl: n
                                },
                                pagination: {
                                    el: o,
                                    type: "custom",
                                    clickable: !0,
                                    renderCustom: function (t, a, n) {
                                        var i = e.data("maxPages"),
                                        o = "",
                                        s = 1,
                                        r = n > i,
                                        c = i;
                                        i > n && (c = n),
                                        r && (a < n - 3 && (c -= 2), a > i - 3 && (c -= 2));
                                        var d = c;
                                        r && a > i - 3 && (a < n - 3 ? (s = (d = a + 3 - 1) - c, d -= 1) : (s = n - c + 1, d = n)),
                                        s < 1 && (s = 1);
                                        var l = "swiper-pagination-bullet",
                                        u = l + " swiper-pagination-bullet-clickable";
                                        r && a > i - 3 && (o += "<span class='" + u + "' data-swiper-page='1'>1</span>", o += "<span class='" + l + "'>...</span>");
                                        for (var p = s; p <= d; p++) {
                                            var h = u;
                                            a == p && (h += " swiper-pagination-bullet-active"),
                                            o += "<span class='" + h + "' data-swiper-page='" + p + "'>" + p + "</span>"
                                        }
                                        return r && a < n - 3 && (o += "<span class='" + l + "'>...</span>", o += "<span class='" + u + "' data-swiper-page='" + n + "'>" + n + "</span>"),
                                        o
                                    }
                                }
                            });
                        e.on("click", "[data-swiper-page]", function () {
                            var t = $(this).data("swiperPage"),
                            a = e.data("itemsOnPage");
                            d.slideTo((t - 1) * a)
                        }),
                        s.on("click", function () {
                            var t = $(this),
                            e = t.data("giftsGallTab");
                            if (t.hasClass("_active"))
                                return !1;
                            s.removeClass("_active"),
                            t.addClass("_active"),
                            "all" == e ? a.show() : a.hide().filter('[data-gifts-gall-item="' + e + '"]').show(),
                            d.update(!0),
                            d.slideNext(!1, 1e5),
                            setTimeout(function () {
                                d.slideTo(0, 0)
                            }, 50)
                        })
                    })
                },
                error: function (t) {
                    app.messages.add("Что-то случилось. Расскажите нам."),
                    app.log(t)
                }
            })
        },
        fullScreenGall: function () {
            var t = this,
            e = app.utils.isMobile ? "rgba(0, 0, 0,0.8)" : "rgba(0, 0, 0,0.7)";
            app.dom.$body.off("click.fullScreen"),
            app.dom.$body.on("click.fullScreen", "[data-full-screen-btn]", function () {
                var a = $(this),
                n = null;
                $.get(a.data("ajaxUrl"), {}, function (a) {
                    n = a.content,
                    $.fancybox({
                        wrapCSS: "fc-base _photo-gall",
                        content: n,
                        fitToView: !1,
                        padding: 0,
                        margin: 0,
                        helpers: {
                            overlay: {
                                css: {
                                    background: e
                                },
                                closeClick: !0
                            }
                        },
                        afterShow: function () {
                            var e = this;
                            function a() {
                                e.wrap.find("[data-product-gall]").height(.8 * app.dom.$window.height()),
                                e.wrap.find("[data-product-gall]").width(.9 * app.dom.$window.width())
                            }
                            app.utils.isMobile ? t.productGallMob(e.wrap) : (a(), app.dom.$window.on("resize.fullScreen", a), t.productGall(e.wrap))
                        }
                    })
                }, "json")
            })
        },
        toggleContent: function () {
            var t = this.$("[data-more]"),
            e = t.find("[data-more-link]"),
            a = t.find("[data-more-hidden]");
            e.on("click", function () {
                var e = $(this);
                e.toggleClass("_active"),
                e.hasClass("_active") ? e.text("Скрыть") : e.text("Показать полностью"),
                e.closest(t).toggleClass("_show").find(a).slideToggle()
            })
        },
        initFancy: function () {
            this.$("[data-fancy]").fancybox({
                wrapCSS: "fc-base",
                fitToView: !1
            })
        },
        initReviewsPopup: function () {
            var t = $("[data-reviews-popup]");
            this.$("[data-reviews-popup-show]").on("click", function () {
                $.fancybox({
                    wrapCSS: "fc-base _popups _reviews",
                    content: t,
                    openEffect: "none",
                    closeEffect: "none",
                    padding: 0,
                    margin: [50, 20, 20, 20],
                    helpers: {
                        overlay: {
                            css: {
                                background: "rgba(0, 0, 0, 0.7)"
                            }
                        }
                    }
                })
            })
        },
        minHeght: function () {
            this.$("[data-minheight]").each(function () {
                var t = $(this);
                !function (t, e) {
                    e.css("min-height", t.outerHeight()),
                    app.dom.$window.on("resize.MinHeight", function () {
                        e.css("min-height", t.outerHeight())
                    })
                }
                (t.find("[data-minheight-block]"), t.find("[data-minheight-subblock]"))
            })
        },
        tabs: function () {
            var t = this.$("[data-tabs]"),
            e = t.find("[data-tabs-tab]"),
            a = t.find("[data-tabs-content]"),
            n = null;
            e.on("click", function () {
                var t = $(this);
                t.hasClass("_active") || (n = t.data("tabsTab"), e.removeClass("_active"), t.addClass("_active"), a.hide().filter("[data-tabs-content=" + n + "]").show())
            })
        },
        modal: function () {
            app.dom.$body.on("click", "[data-modal-close]", function () {
                $(this).parent("[data-modal-window]").addClass("hide")
            })
        }
    }), app.views.Bonuses = app.views.Default.extend({
        events: {},
        initialize: function () {
            app.views.Bonuses.__super__.initialize.apply(this, arguments)
        },
        remove: function () {
            app.views.Bonuses.__super__.remove.apply(this, arguments)
        },
        render: function () {
            app.views.Bonuses.__super__.render.apply(this, arguments);
            this.gall(),
            $("body").hasClass("mobile-v") || this.bonuses(),
            this.questions(),
            app.views.Bonuses.__super__.afterRender.apply(this, arguments)
        },
        gall: function () {
            var t = this.$("[data-bonuses-gall]");
            new Swiper(t[0], {
                loop: !0,
                freeMode: !1,
                slidesPerView: 1,
                simulateTouch: !0,
                spaceBetween: 0,
                effect: "fade",
                navigation: {
                    nextEl: t.find("[data-bonuses-gall-next]"),
                    prevEl: t.find("[data-bonuses-gall-prev]")
                },
                pagination: {
                    el: t.find("[data-bonuses-gall-pag]"),
                    clickable: !0
                }
            })
        },
        bonuses: function () {
            var t = this.$("[data-bonuses]"),
            e = t.find("[data-bonuses-inner]");
            function a() {
                t.width(app.dom.$window.width()),
                t.css("margin-left", (app.dom.$window.width() - e.width()) / -2 + "px")
            }
            a(),
            app.dom.$window.on("resize.bonuses", a)
        },
        questions: function () {
            var t = this.$("[data-question]");
            if (!t.length)
                return !1;
            var e = t.find("[data-question-title]"),
            a = t.find("[data-question-answer]");
            e.on("click", function () {
                var e = $(this).closest(t);
                e.hasClass("_active") ? e.removeClass("_active").find(a).slideUp() : e.addClass("_active").find(a).slideDown()
            })
        }
    }), app.views.Contacts = app.views.Default.extend({
        events: {},
        initialize: function () {
            app.views.Contacts.__super__.initialize.apply(this, arguments)
        },
        remove: function () {
            app.views.Contacts.__super__.remove.apply(this, arguments)
        },
        render: function () {
            app.views.Contacts.__super__.render.apply(this, arguments);
            var t = this;
            if (app.GlobalView.mapLoaded)
                t.initMap();
            else {
                var e = document.createElement("script");
                e.type = "text/javascript",
                e.src = "https://api-maps.yandex.ru/2.1/?lang=ru_RU&onload=initialize",
                document.body.appendChild(e),
                window.initialize = function () {
                    app.GlobalView.mapLoaded = !0,
                    t.initMap()
                }
            }
            app.views.Contacts.__super__.afterRender.apply(this, arguments)
        },
        initMap: function () {
            var t = this.$("[data-contacts-map]"),
            e = this.$("[data-coord]"),
            a = null;
            a = new ymaps.Map(t[0], {
                    center: e.data("coord").mapCenter,
                    zoom: (app.utils.isMobile, 16),
                    controls: [new ymaps.control.ZoomControl]
                });
            var n = new ymaps.Placemark(e.data("coord").point);
            a.geoObjects.add(n),
            a.behaviors.disable("scrollZoom")
        }
    }), app.views.Delivery = app.views.Default.extend({
        events: {},
        initialize: function () {
            app.views.Delivery.__super__.initialize.apply(this, arguments)
        },
        remove: function () {
            app.views.Delivery.__super__.remove.apply(this, arguments)
        },
        render: function () {
            app.views.Delivery.__super__.render.apply(this, arguments);
            this.calendar(),
            app.views.Delivery.__super__.afterRender.apply(this, arguments)
        },
        calendar: function () {
            this.$("[data-datepicker]").datepicker({
                showOn: "button",
                buttonText: "",
                regional: "ru",
                minDate: new Date
            })
        }
    }), app.views.Detail = app.views.Default.extend({
        events: {},
        initialize: function () {
            app.views.Detail.__super__.initialize.apply(this, arguments)
        },
        remove: function () {
            app.views.Detail.__super__.remove.apply(this, arguments)
        },
        render: function () {
            app.views.Detail.__super__.render.apply(this, arguments);
            app.utils.isMobile ? (this.productGallMob(), this.structureCounterMob()) : (this.productGall(), this.structureCounter()),
            this.productSize(),
            this.giftsGall(),
            this.similarGall(),
            this.about(),
            this.initFilterList(this.$("[data-choice-region]")),
            this.timeBanner(),
            new app.ManagerChoosenColors,
            app.views.Detail.__super__.afterRender.apply(this, arguments)
        },
        about: function () {
            var t = this.$("[data-detail-about]"),
            e = t.find("[data-detail-about-inner]");
            function a() {
                t.width(app.dom.$window.width()),
                t.css("margin-left", (app.dom.$window.width() - e.innerWidth()) / -2 + "px")
            }
            a(),
            app.dom.$window.on("resize.about", a)
        },
        timeBanner: function () {
            var t = this.$("[data-time-banner]");
            if (!t.length)
                return !1;
            setTimeout(function () {
                t.fadeIn(500)
            }, 1e3),
            setTimeout(function () {
                t.fadeOut(500)
            }, 3500)
        }
    }), app.views.Footer = Backbone.View.extend({
        el: ".footer",
        render: function () {
            app.views.Footer.__super__.render.apply(this, arguments);
            return console.log("Footer render"),
            this
        }
    }), app.views.Gifts = app.views.Default.extend({
        events: {},
        initialize: function () {
            app.views.Gifts.__super__.initialize.apply(this, arguments)
        },
        remove: function () {
            app.views.Gifts.__super__.remove.apply(this, arguments)
        },
        render: function () {
            app.views.Gifts.__super__.render.apply(this, arguments);
            this.initReviewsGalls(this.$("[data-reviews-gall]"));
            new app.FilterManager($("[data-view]")),
            new app.ProductZoomManager($("[data-view]"));
            app.views.Gifts.__super__.afterRender.apply(this, arguments)
        },
        initMenu: function () {
            var t = this.$("[data-gifts-menu]"),
            e = t.find("[data-gifts-menu-item]"),
            a = t.find("[data-gifts-submenu]"),
            n = t.find("[data-gifts-menu-item-btn]"),
            i = null;
            n.on("click", function () {
                var t = $(this);
                (i = t.closest(e)).hasClass("_active") || (e.removeClass("_active"), i.addClass("_active"));
                var n = i.find(a);
                n.length && n.slideToggle()
            })
        },
        initFilter: function () {
            var t = this.$("[data-filter]"),
            e = t.find("[data-filter-block]"),
            a = t.find("[data-filter-block-title]"),
            n = t.find("[data-filter-block-options]"),
            i = t.find("[data-filter-check]");
            a.on("click", function () {
                $(this).toggleClass("_active").closest(e).find(n).slideToggle()
            }),
            i.on("change", function () {
                var t = $(this).closest(e);
                t.find(i).filter(":checked").length ? t.find(a).addClass("_selected") : t.find(a).removeClass("_selected")
            })
        }
    }), app.views.GlobalView = Backbone.View.extend({
        oldViews: [],
        currentView: null,
        loader: null,
        menuItems: null,
        mapLoaded: !1,
        initialize: function () {
            this.loader = app.components.loader,
            this.menuItems = $("[data-head-menu-item]"),
            this.initFluid()
        },
        selectCurrentMenu: function (t) {
            void 0 === t && (t = 0),
            this.menuItems.removeClass("_active").filter('[data-head-menu-item="' + t + '"]').addClass("_active")
        },
        show: function (t) {
            t.render(),
            this.currentView = t
        },
        hide: function () {
            var t = this;
            app.once("View.goOutDefaultStart", function () {
                t.loader.show()
            }),
            t.currentView.goOutDefault()
        },
        setTitle: function (t) {
            $("title").html(t)
        },
        initFluid: function () {
            var t = $("body").hasClass("mobile-v"),
            e = t ? 320 : 1300,
            a = t ? 10 : 9;
            function n() {
                var n = t ? app.dom.$window.width() / e * a : Math.min(app.dom.$window.width(), e) / e * a;
                $("html").css({
                    "font-size": n + "px"
                })
            }
            n(),
            app.on("resize", n)
        }
    }), app.AdditionalPageDataManager = Class.extend(function () {
        this.deliveryCityManagerName = "delivery-city-manager",
        this.$container = $("[" + this.deliveryCityManagerName + "]");
        var t = this,
        e = $("[ajax-seo-data]"),
        a = [];
        e.each(function (t, e) {
            a.push($(e).attr("ajax-seo-data"))
        }),
        this.constructor = function () {
            if (!t.$container.length && !app.utils.isMobile)
                return !1;
            $.get("cache/view.json", {
                data: a
            }, t.onAjaxSuccess, "json"),
            app.log("Init app.AdditionalPageDataManager")
        },
        this.onAjaxSuccess = function (t) {
            try {
                var e = window.Laravel.city.name
            } catch (t) {
                e = "Москва и МО"
            }
            if (!app.utils.isMobile) {
                var a = "[" + this.deliveryCityManagerName + '="header"]';
                "Москва и МО" == e ? $(a).html(t.header.spanMenu) : $(a).html(t.header.hrefMenu),
                $(a).find("[data-city-select]").attr("data-placeholder", e),
                app.Header.render(),
                $("[data-footer-contacts]").append(t.socialsLinks)
            }
            for (var a in t)
                "page" != a && "header" != a && $('[ajax-seo-data="' + a + '"]').html(t[a])
        }
    }), app.views.Header = Backbone.View.extend({
        el: ".header",
        $choiceRegion: null,
        subView: {},
        initialize: function () {
            this.getAdditionalPageData()
        },
        render: function () {
            app.views.Header.__super__.render.apply(this, arguments);
            var t = this;
            t.$choiceRegion = t.$("[data-choice-region]"),
            t.$choiceRegionShow = t.$("[data-choice-region-show]"),
            t.$("[data-mask-phone]").inputmask("+7 (999) 999-99-99", {
                clearMaskOnLostFocus: !1,
                clearIncomplete: !0
            }),
            $(document).on("click", function (e) {
                var a = $(e.target);
                a.closest(t.$choiceRegion).length || a.closest(t.$choiceRegionShow).length || !t.$choiceRegion.hasClass("_show") || t.choiceRegionHide()
            }),
            t.regionGall(),
            t.initFilterList(),
            t.topFilter(),
            t.fixedHeaderAndMenu(),
            t.orderStatus(),
            t.phoneGall(),
            t.popups(),
            t.menu(),
            t.cityChange(),
            t.youWatched(),
            t.toggleLogin(),
            t.telegramLink(),
            new app.ChosenCityManager(t.$("[data-city-select]")),
            app.utils.isMobile ? (t.mobMenu(), t.mobHeader(), t.mobFilter()) : new app.Search,
            console.log("Header render")
        },
        getAdditionalPageData: function () {
            new app.AdditionalPageDataManager
        },
        popups: function () {
            var t = $("[data-popup]"),
            e = this.$("[data-popup-show]"),
            a = null;
            e.on("click.popups", function () {
                var e = $(this);
                a = t.filter('[data-popup="' + e.data("popupShow") + '"]'),
                $.fancybox({
                    wrapCSS: "fc-base _popups _close-inside",
                    content: a,
                    fitToView: !1,
                    openEffect: "none",
                    closeEffect: "none",
                    padding: 0,
                    helpers: {
                        overlay: {
                            css: {
                                background: "rgba(0, 0, 0, 0.7)"
                            },
                            locked: !1
                        }
                    }
                })
            })
        },
        fixedHeaderAndMenu: function () {
            var t = this.$("[data-header-bottom]"),
            e = this.$("[data-scrolled-menu-item]");
            function a() {
                app.dom.$window.scrollTop() > 0 ? (app.Header.$el.addClass("_fixed"), e.show()) : (app.Header.$el.removeClass("_fixed"), e.hide()),
                t.length && (app.dom.$window.scrollTop() >= t.offset().top ? app.Header.$el.addClass("_fixed-menu") : app.Header.$el.removeClass("_fixed-menu"))
            }
            a(),
            app.dom.$window.on("scroll", a)
        },
        choiceRegion: function () {
            var t = this,
            e = t.$("[data-choice-region-show]"),
            a = t.$("[data-choice-region-close]");
            e.on("click", function () {
                t.choiceRegionShow()
            }),
            a.on("click", function () {
                t.choiceRegionHide()
            })
        },
        choiceRegionShow: function () {
            this.$choiceRegion.addClass("_show"),
            this.$choiceRegionShow.addClass("_active"),
            app.dom.$body.addClass("_open-choice-region")
        },
        choiceRegionHide: function () {
            this.$choiceRegion.removeClass("_show"),
            this.$choiceRegionShow.removeClass("_active"),
            app.dom.$body.removeClass("_open-choice-region")
        },
        regionGall: function () {
            var t = this,
            e = t.$("[data-region-gall]"),
            a = e.find("[data-region-gall-slide]"),
            n = e.find("[data-region-gall-prev]"),
            i = e.find("[data-region-gall-next]"),
            o = e.find("[data-region-gall-pag]");
            new Swiper(e[0], {
                slidesPerView: "auto",
                paginationClickable: !0,
                spaceBetween: 30,
                freeMode: !0,
                grabCursor: !0,
                navigation: {
                    nextEl: i,
                    prevEl: n
                },
                pagination: {
                    el: o,
                    clickable: !0,
                    renderBullet: function (t, e) {
                        return '<span class="b-pagination__link ' + e + '">' + a.eq(t).data("regionGallSlide") + "</span>"
                    }
                },
                on: {
                    init: function () {
                        t.choiceRegion()
                    }
                }
            })
        },
        cityChange: function () {
            $(document).on("click", "[data-city-change-link]", function () {
                var t = $(this);
                return $.post($(this).data("cityChangeLink"), function (e) {
                    e.popup ? ($("[data-choice-region-close]").trigger("click"), $.fancybox({
                            wrapCSS: "fc-base _popups _close-inside",
                            content: $(e.popup),
                            fitToView: !1,
                            openEffect: "none",
                            closeEffect: "none",
                            padding: 0,
                            helpers: {
                                overlay: {
                                    css: {
                                        background: "rgba(0, 0, 0, 0.7)"
                                    },
                                    locked: !1
                                }
                            }
                        })) : document.location.href = t.attr("data-location-link")
                }, "json"),
                !1
            })
        },
        phoneGall: function () {
            var t = this.$("[data-header-phone-gall]");
            if (!t.length)
                return !1;
            new Swiper(t[0], {
                slidesPerView: 1,
                effect: "fade",
                autoplay: {
                    delay: 7e3
                }
            })
        },
        youWatched: function () {
            var t = this.$("[data-you-watched]");
            if (!t.length)
                return !1;
            var e = this.$("[data-you-watched-gall]"),
            a = new Swiper(e[0], {
                    slidesPerView: 2,
                    direction: "vertical",
                    slidesPerGroup: 2,
                    navigation: {
                        nextEl: t.find("[data-you-watched-gall-next]"),
                        prevEl: t.find("[data-you-watched-gall-prev]")
                    }
                });
            t.hover(function () {
                setTimeout(function () {
                    a.update()
                }, 400)
            }, function () {
                a.slideTo(0, 10)
            })
        },
        initFilterList: function () {
            var t,
            e,
            a,
            n,
            i;
            jQuery.expr[":"].Contains = function (t, e, a) {
                return (t.textContent || t.innerText || "").toUpperCase().indexOf(a[3].toUpperCase()) >= 0
            },
            t = this.$("[ data-filter-inp]"),
            e = this.$("[data-filter-list]"),
            n = t,
            i = e.find("[data-filter-list-item]"),
            n.focus(function () {
                e.show()
            }),
            $("html").on("click.Filter", function (t) {
                $(t.target).closest(".choice-region__search-block").length || e.hide()
            }),
            i.on("click", function () {
                t.val($(this).data("filterListItem")).change(),
                e.hide()
            }),
            n.blur(function () {}),
            n.change(function () {
                var t = $(this).val();
                return t ? (a = e.find("[data-filter-list-item]:Contains(" + t + ")"), i.not(a).slideUp(), a.slideDown()) : i.slideDown(),
                !1
            }).keyup(function () {
                $(this).change()
            })
        },
        topFilter: function () {
            var t = this,
            e = t.$("[data-top-filter]"),
            a = t.$("[data-top-filter-toggle]"),
            n = e.find("[data-top-filter-block]"),
            i = e.find("[data-top-filter-option]");
            i.on("click", function () {
                var a = $(this);
                a.hasClass("_active") ? a.removeClass("_active") : (a.closest(n).find(i).removeClass("_active"), a.addClass("_active")),
                t.filterCatalog(i, e.data("prefix"))
            }),
            a.on("click", function () {
                $(this).toggleClass("_active"),
                e.slideToggle()
            })
        },
        filterCatalog: function (t, e) {
            var a = "",
            n = t.filter("._active");
            n.length && (n.each(function (t) {
                    a += "filter[]=" + $(this).data("param") + "&"
                }), a = a.slice(0, a.length - 1)),
            $(window).trigger("AjaxLoaderCatalog.sendRequest", [e, "", a])
        },
        orderStatus: function () {
            var t = this.$("[data-order-status]"),
            e = this.$("[data-order-status-toggle]"),
            a = t.find("[data-order-status-close]"),
            n = t.find("[data-order-status-form]"),
            i = n.find("form"),
            o = t.find("[data-order-status-answer]"),
            s = !1;
            function r() {
                s = !1,
                t.hide(),
                n.show(),
                o.hide()
            }
            $("html").off("click.status").on("click.status", function (a) {
                $(a.target).closest(t).length || $(a.target).closest(e).length || r()
            }),
            e.on("click", function () {
                s ? r() : (s = !0, t.show())
            }),
            a.on("click", r),
            i.on("submit", function (t) {
                return $.get(i.attr("action"), i.serialize(), function (t) {
                    n.hide(),
                    o.html(t.content),
                    o.show()
                }, "json"),
                !1
            })
        },
        mobHeader: function () {
            var t = this.$("[data-basket-btn]"),
            e = this.$("[data-basket-block]");
            t.on("click", function () {
                $(this).toggleClass("_active"),
                e.toggle()
            })
        },
        menu: function () {
            var t = this.$(".header__menu-item"),
            e = this.$("[data-header-submenu-blocks]"),
            a = null;
            e.each(function () {
                var t = $(this),
                e = t.find("[data-header-submenu-block]"),
                a = t.find("[data-header-submenu-block-btn]");
                a.on("click", function () {
                    var n = $(this);
                    n.hasClass("_active") ? (t.removeClass("_open-all"), n.removeClass("_active").closest(e).removeClass("_active")) : (a.removeClass("_active"), t.addClass("_open-all"), e.removeClass("_active"), n.addClass("_active").closest(e).addClass("_active"))
                })
            }),
            t.hover(function () {
                var t = $(this);
                a = setTimeout(function () {
                        t.addClass("_active")
                    }, 300)
            }, function () {
                clearTimeout(a),
                $(this).removeClass("_active")
            })
        },
        mobFilter: function () {
            var t = this,
            e = t.$("[data-mob-filter]"),
            a = t.$("[data-mob-filter-tab]"),
            n = e.find("[data-mob-filter-block]"),
            i = e.find("[data-mob-filter-option]");
            i.on("click", function () {
                var a = $(this);
                a.hasClass("_active") ? a.removeClass("_active") : (a.closest(n).find(i).removeClass("_active"), a.addClass("_active")),
                t.filterCatalog(i, e.data("prefix"))
            }),
            a.on("click", function () {
                var t = $(this);
                t.hasClass("_active") ? (t.removeClass("_active"), n.hide()) : (a.removeClass("_active"), t.addClass("_active"), n.hide().filter('[data-mob-filter-block="' + t.data("mobFilterTab") + '"]').show())
            })
        },
        mobMenu: function () {
            var t = this.$("[data-mob-menu]"),
            e = this.$("[data-header-main]"),
            a = this.$("[data-mob-menu-toggle]"),
            n = this.$("[data-mob-menu-close]"),
            i = this.$("[data-mob-menu-section]"),
            o = i.find("[data-mob-menu-section-items]"),
            s = i.find("[data-mob-menu-section-sub]"),
            r = i.find("[data-mob-menu-section-items-hidden]"),
            c = i.find("[data-mob-menu-section-items-all]"),
            d = i.find("[data-mob-menu-section-items-all-text]"),
            l = i.find("[data-mob-menu-section-title]"),
            u = t.find("[data-submenu]"),
            p = i.find("[data-submenu-items]"),
            h = i.find("[data-submenu-btn]"),
            f = $("body").find(".grid"),
            g = 0;
            function m() {
                $("body, html").removeClass("overflow-hidden"),
                f.css({
                    y: 0
                }),
                e.length && e.css({
                    y: 0
                }),
                $("html, body").scrollTop(g),
                setTimeout(function () {
                    i.removeClass("_active"),
                    o.slideUp()
                }, 500),
                setTimeout(function () {
                    a.removeClass("_active"),
                    app.Header.$el.removeClass("is-menu-visible")
                }, 100)
            }
            c.on("click", function () {
                var t = $(this);
                t.closest(s).find(r).slideToggle(),
                t.find(d).toggle()
            }),
            a.on("click", function () {
                $(this).hasClass("_active") ? m() : function () {
                    g = app.dom.$window.scrollTop(),
                    f.css({
                        y: -g
                    }),
                    e.length && e.css({
                        y: -g
                    });
                    $("body, html").addClass("overflow-hidden"),
                    setTimeout(function () {
                        a.addClass("_active"),
                        app.Header.$el.addClass("is-menu-visible")
                    }, 100),
                    $("[data-container-popup-basket]").hide()
                }
                ()
            }),
            n.on("click", function () {
                m()
            }),
            l.on("click", function () {
                $(this).closest(i).toggleClass("_active").find(o).slideToggle()
            }),
            h.on("click", function () {
                $(this).toggleClass("_active").closest(u).toggleClass("_active").find(p).slideToggle()
            })
        },
        toggleLogin: function () {
            var t = this.$("[data-header-login]");
            this.$("[data-header-login-btn]").on("click", function () {
                t.toggleClass("_active")
            }),
            app.dom.$document.off("click.toggleLogin"),
            app.dom.$document.on("click.toggleLogin", function (e) {
                $(e.target).closest(t).length || t.removeClass("_active")
            })
        },
        telegramLink: function () {
            $(document).on("click", "[data-telegram-location]", function () {
                window.open($(this).attr("data-telegram-location"))
            })
        }
    }), app.views.Home = app.views.Default.extend({
        events: {},
        initialize: function () {
            app.views.Home.__super__.initialize.apply(this, arguments)
        },
        remove: function () {
            app.views.Home.__super__.remove.apply(this, arguments)
        },
        render: function () {
            app.views.Home.__super__.render.apply(this, arguments);
            this.initReviewsGalls(this.$("[data-reviews-gall]")),
            this.bestProductGallery(),
            this.initFilterList(),
            this.initCityDelivery(),
            this.genderFilter(),
            new app.ChosenCityManager(this.$("[data-city-select]")),
            new app.ProductZoomManager($("[data-view]")),
            app.views.Home.__super__.afterRender.apply(this, arguments)
        },
        bestProductGallery: function () {
            this.$("[data-best-product-gallery]").each(function () {
                var t = $(this).closest("[data-best-product-gallery-container]").find("[data-best-link]"),
                e = new Swiper(this, {
                        speed: 1e3,
                        loop: !0,
                        spaceBetween: 100,
                        autoplay: {
                            delay: 100,
                            autoplayDisableOnInteraction: !1
                        }
                    });
                e.autoplay.stop(),
                t.hover(function () {
                    e.autoplay.start()
                }, function () {
                    e.autoplay.stop()
                })
            })
        },
        genderFilter: function () {
            var t = this.$("[data-gender-filter]"),
            e = t.find("[data-gender-filter-inner]"),
            a = t.find("[data-gender-filter-tabs]"),
            n = t.find("[data-gender-filter-tab]"),
            i = t.find("[data-gender-filter-content]");
            function o() {
                t.width(app.dom.$window.width()),
                t.css("margin-left", (app.dom.$window.width() - e.innerWidth()) / -2 + "px")
            }
            o(),
            app.dom.$window.on("resize.filter", o),
            n.on("click", function () {
                a.hide(),
                i.hide().filter('[data-gender-filter-content="' + $(this).data("genderFilterTab") + '"]').show()
            })
        },
        initCityDelivery: function () {
            var t = this.$("[data-delivery-city-inp]"),
            e = this.$("[data-delivery-city-btn]");
            function a() {
                "" != t.val() ? e.addClass("_active") : e.removeClass("_active")
            }
            a(),
            t.on("change", a)
        },
        initFilterList: function () {
            var t,
            e,
            a,
            n,
            i;
            jQuery.expr[":"].Contains = function (t, e, a) {
                return (t.textContent || t.innerText || "").toUpperCase().indexOf(a[3].toUpperCase()) >= 0
            },
            t = this.$("[data-filter-inp]"),
            e = this.$("[data-filter-list]"),
            n = t,
            i = e.find("[data-filter-list-item]"),
            n.focus(function () {
                e.show()
            }),
            $("html").on("click.Filter", function (t) {
                $(t.target).closest(".choice-region__search-block").length || e.hide()
            }),
            i.on("click", function () {
                t.val($(this).data("filterListItem")).change(),
                e.hide()
            }),
            n.blur(function () {}),
            n.change(function () {
                var t = $(this).val();
                return t ? (a = e.find("[data-filter-list-item]:Contains(" + t + ")"), i.not(a).slideUp(), a.slideDown()) : i.slideDown(),
                !1
            }).keyup(function () {
                $(this).change()
            })
        },
        productCardVotes: function () {
            this.$("[data-product-item]").each(function () {
                var t = $(this),
                e = t.find("[data-product-title]"),
                a = t.find("[data-rating]"),
                n = t.find("[data-rating-title]"),
                i = device.mobile() ? 26 : 20;
                e.height() > i && (n.hide(), a.addClass("_high"))
            })
        }
    }), app.views.Lc = app.views.Default.extend({
        events: {},
        initialize: function () {
            app.views.Lc.__super__.initialize.apply(this, arguments)
        },
        remove: function () {
            app.views.Lc.__super__.remove.apply(this, arguments)
        },
        render: function () {
            app.views.Lc.__super__.render.apply(this, arguments);
            this.initConditions(),
            this.initOrder(),
            this.initBonusHistory(),
            this.initVerification(),
            app.views.Lc.__super__.afterRender.apply(this, arguments)
        },
        initConditions: function () {
            $("html").off("click.Сonditions"),
            $("html").on("click.Сonditions", "[data-conditions-item-title]", function () {
                $(this).toggleClass("_active").closest("[data-conditions-item]").find("[data-conditions-item-content]").slideToggle(500)
            })
        },
        initVerification: function () {
            var t = this.$("[data-verification]");
            t.find("[data-verification-close]").on("click", function () {
                t.hide()
            })
        },
        initBonusHistory: function () {
            var t = this.$("[data-bonus-history]"),
            e = t.find("[data-bonus-history-tab]"),
            a = t.find("[data-bonus-history-content]"),
            n = t.find("[data-bonus-history-hidden]"),
            i = t.find("[data-bonus-history-more]");
            e.on("click", function () {
                var t = $(this);
                t.hasClass("_active") || (e.removeClass("_active"), t.addClass("_active"), a.hide().filter('[data-bonus-history-content="' + t.data("bonusHistoryTab") + '"]').show())
            }),
            i.on("click", function () {
                var t = $(this);
                t.hasClass("_active") ? t.text("Показать еще") : t.text("Скрыть"),
                t.toggleClass("_active").closest(a).find(n).slideToggle()
            })
        },
        initOrder: function () {
            var t = this.$("[data-orders]"),
            e = t.find("[data-orders-block]"),
            a = t.find("[data-orders-hidden]"),
            n = t.find("[data-orders-more]"),
            i = n.find("[data-orders-more-btn]"),
            o = t.find("[data-order]"),
            s = t.find("[data-order-cancel-btn]"),
            r = t.find("[data-order-cancel-content]");
            if (t.on("click", "[data-delete-link=1]", function (t) {
                    t.preventDefault();
                    var e = $(this);
                    confirm("Вы действительно хотите удалить заказ?") && $.post(e.data("deleteAction"), [], function () {
                        e.parents("[data-order]").fadeOut()
                    })
                }), !t.length)
                return !1;
            s.on("click", function () {
                $(this).toggleClass("_cancel-active").closest(o).find(r).slideToggle()
            }),
            a.find("[data-order]").length || n.hide(),
            i.on("click", function () {
                a.find("[data-order]").slice(0, 2).appendTo(e),
                a.find("[data-order]").length || n.hide()
            })
        }
    }), app.views.NotFound = app.views.Default.extend({
        remove: function () {
            app.views.NotFound.__super__.remove.apply(this, arguments)
        },
        render: function () {
            app.views.NotFound.__super__.render.apply(this, arguments)
        }
    }), app.views.Ordering = app.views.Default.extend({
        events: {},
        initialize: function () {
            app.views.Ordering.__super__.initialize.apply(this, arguments)
        },
        remove: function () {
            app.views.Ordering.__super__.remove.apply(this, arguments)
        },
        render: function () {
            app.views.Ordering.__super__.render.apply(this, arguments);
            this.disabledDate = $("[data-disabled-date]").attr("data-disabled-date"),
            this.initCounters(),
            this.calendar(),
            this.payment(),
            this.receiver(),
            this.initClientForm(),
            this.initProgress(),
            this.giftsGall(),
            app.views.Ordering.__super__.afterRender.apply(this, arguments)
        },
        receiver: function () {
            self.$("[data-self-delivery]").on("change", function () {
                var t = $(this);
                t.closest("[data-ordering-step]").find("[data-required]").attr("data-required", t.prop("checked") ? 0 : 1)
            })
        },
        payment: function () {
            var t = this.$("[data-payment-type]"),
            e = this.$("[data-payment-type-inp]"),
            a = this.$("[data-payment-type-content]");
            if ($("[data-test-input]").length)
                var n = document.querySelector("[data-test-input]"), i = n.getAttribute("data-test-input");
            else
                i = 0;
            e.on("change", function () {
                var e = $(this).closest(t);
                if (t.removeClass("_active"), e.addClass("_active"), a.hide().filter('[data-payment-type-content="' + e.data("paymentType") + '"]').slideDown(300), 1 == i) {
                    var o = document.querySelector("[data-total-price]").innerHTML;
                    8 == e.data("paymentType") ? n.innerHTML = "Коммиссия платежной системы: " + (.019 * o).toFixed(0) + " руб." : 6 == e.data("paymentType") ? n.innerHTML = "Коммиссия платежной системы: " + (.049 * o).toFixed(0) + " руб." : n.innerHTML = "Коммиссия платежной системы: 0 руб."
                }
            })
        },
        calendar: function () {
            var t = this.$("[data-datepicker]"),
            e = new Date,
            a = $("[data-now]").data("now"),
            n = moment.unix(a);
            if (n.date() > e.getDate() && (e = new Date(n.year(), n.month(), n.date(), 0, 0)), this.disabledDate)
                var i = $.parseJSON(this.disabledDate);
            else
                i = [];
            t.datepicker({
                showOn: "button",
                buttonText: "",
                regional: "ru",
                minDate: e,
                beforeShowDay: function (t) {
                    if (!(i.length > 0))
                        return [!0];
                    for (var e = $.datepicker.formatDate("dd.mm.yy", t), a = 0; a < i.length; a++)
                        return -1 != $.inArray(e, i) ? [!1] : [!0]
                }
            })
        },
        initCounters: function () {
            this.$("[data-counter]").each(function () {
                var t = $(this),
                e = t.find("[data-counter-input]"),
                a = t.find("[data-counter-up]"),
                n = t.find("[data-counter-down]"),
                i = null;
                a.on("click", function () {
                    e.val(parseInt(e.val()) + 1).trigger("change")
                }),
                n.on("click", function () {
                    e.val(Math.max(parseInt(e.val()) - 1, 0)).trigger("change")
                }),
                e.on("change", function () {
                    (!(i = parseInt($(this).val())) || i < 0) && (i = 0),
                    $(this).val(i)
                })
            })
        },
        initProgress: function () {
            var t = this,
            e = t.$("[data-ordering-progress]").find("[data-ordering-progress-tab]");
            t.$("[data-ordering-step]");
            t.$("[data-ordering-step-goto]").on("click", function () {
                var e = $(this),
                a = e.data("orderingStepGoto");
                if (t.validate(a - 1))
                    return e.data("saveClientBtn") ? t.saveClient(a) : t.setStep(a), !1
            }),
            e.on("click", function () {
                var e = $(this);
                e.hasClass("_past") && 1 != e.data("orderingProgressTab") && t.setStep(e.data("orderingProgressTab"))
            })
        },
        setStep: function (t) {
            var e = this.$("[data-ordering-progress]"),
            a = e.find("[data-ordering-progress-tab]"),
            n = this.$("[data-ordering-step]");
            e.removeClass("_step1 _step2 _step3 _step4").addClass("_step" + t),
            a.removeClass("_active _past").eq(t - 1).addClass("_active"),
            a.slice(0, t - 1).addClass("_past"),
            n.hide().filter('[data-ordering-step="' + t + '"]').slideDown(),
            app.utils.isMobile && $("html, body").animate({
                scrollTop: 0
            }, 200)
        },
        validate: function (t) {
            var e = self.$("[data-ordering-step=" + t + "]"),
            a = e.find("input[data-required=1]");
            a.removeClass("_error"),
            e.find("[data-input-validation-error]").hide();
            var n = a.filter(function () {
                    return !this.value
                });
            return !n.length || (n.addClass("_error").next("[data-input-validation-error]").show(), self.$("html, body").animate({
                    scrollTop: n.first().offset().top - 140
                }, 500), n.first().focus(), !1)
        },
        initClientForm: function () {
            var t = this,
            e = t.$("[data-mask-phone]"),
            a = t.$("[user-contact]");
            e.data("placeholder", e.attr("placeholder")),
            t.$("[data-mask-toggle]").change(function () {
                var e = $(this),
                n = $("[data-client-contact-name]"),
                i = $("[user-contact]"),
                o = $("[data-client-code]");
                e.prop("checked") ? (n.text(n.data("contactOtherName")), o.text(o.data("codeEmail")), i.attr("type", "email")) : (n.text(n.data("contactPhoneName")), o.text(o.data("codeSms")), i.attr("type", "tel")),
                a.val(""),
                t.togglePhoneMask()
            })
        },
        saveClient: function (t) {
            var e = this,
            a = e.$("[data-save-client-form]");
            $.ajax({
                url: a.attr("action"),
                type: a.attr("method"),
                data: a.serialize(),
                success: function (a) {
                    a.success && (e.$("[data-client-info-name]").val(a.client.name), e.$("[data-client-info-phone]").val(a.client.phone), e.setStep(t), ga("send", "event", "basketOneClick", "send"))
                }
            })
        },
        togglePhoneMask: function () {
            var t = this.$("[data-mask-phone]");
            this.$("[data-mask-toggle]").is(":checked") ? (t.inputmask("remove").val(""), t.attr("placeholder", "Введите e-mail")) : (t.inputmask("+7 (999) 999-99-99", {
                    clearMaskOnLostFocus: !1,
                    clearIncomplete: !0
                }), t.attr("placeholder", t.data("placeholder")))
        }
    }), app.views.TextPage = app.views.Default.extend({
        events: {},
        initialize: function () {
            app.views.TextPage.__super__.initialize.apply(this, arguments)
        },
        remove: function () {
            app.views.TextPage.__super__.remove.apply(this, arguments)
        },
        render: function () {
            app.views.TextPage.__super__.render.apply(this, arguments);
            this.initReviewsGalls($("[data-reviews-gall]")),
            this.questions(),
            new app.ProductZoomManager($("[data-view]")),
            app.views.TextPage.__super__.afterRender.apply(this, arguments)
        },
        questions: function () {
            var t = this.$("[data-question]");
            if (!t.length)
                return !1;
            var e = t.find("[data-question-title]"),
            a = t.find("[data-question-answer]");
            e.on("click", function () {
                var e = $(this).closest(t);
                e.hasClass("_active") ? e.removeClass("_active").find(a).slideUp() : e.addClass("_active").find(a).slideDown()
            })
        }
    }), app.modules.Router = Backbone.Router.extend({
        _pageCounter: 0,
        routes: {
            "*href": "baseRout"
        },
        baseRout: function () {
            Backbone.history.fragment;
            var t,
            e = "NotFound";
            if (!this._pageCounter) {
                var a = $("[data-view]");
                a.length ? "" != $.trim(a.data("view")) ? (e = app.views[a.data("view")], t = new e({
                            el: a
                        }), app.GlobalView.show(t), console.log(a.data("view"))) : console.log("[data-view] не заполнено") : console.log("[data-view] не найдено"),
                this._pageCounter++
            }
        }
    }), function () {
    var t,
    e;
    jQuery.uaMatch = function (t) {
        t = t.toLowerCase();
        var e = /(chrome)[ \/]([\w.]+)/.exec(t) || /(webkit)[ \/]([\w.]+)/.exec(t) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(t) || /(msie) ([\w.]+)/.exec(t) || t.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(t) || [];
        return {
            browser: e[1] || "",
            version: e[2] || "0"
        }
    },
    e = {},
    (t = jQuery.uaMatch(navigator.userAgent)).browser && (e[t.browser] = !0, e.version = t.version),
    e.chrome ? e.webkit = !0 : e.webkit && (e.safari = !0),
    jQuery.browser = e
}
(), String.prototype.trim || (String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g, "")
}), app.fontsLazyLoad = function () {
    var t = document.createElement("link");
    t.setAttribute("rel", "stylesheet"),
    t.setAttribute("href", "https://fonts.googleapis.com/css?family=Open+Sans"),
    t.setAttribute("type", "text/css"),
    document.getElementsByTagName("head")[0].appendChild(t)
}, app.fontsLazyLoad2 = function () {
    function t() {
        var t = document.createElement("style");
        t.rel = "stylesheet",
        document.head.appendChild(t),
        t.textContent = localStorage.sourceSansPro
    }
    try {
        if (localStorage.sourceSansPro)
            t();
        else {
            var e = new XMLHttpRequest;
            e.open("GET", "https://fonts.googleapis.com/css?family=Open+Sans", !0),
            e.onload = function () {
                e.status >= 200 && e.status < 400 && (localStorage.sourceSansPro = e.responseText, t())
            },
            e.send()
        }
    } catch (t) {
        app.fontsLazyLoad()
    }
}, $(function () {
    app.initialize(),
    app.debug = !0,
    new app.FlorBasketManager,
    new app.BaseIntervalManager($("[data-interval-data=delivery]")),
    new app.BasketMapManager,
    new app.PromoCodeFormManager,
    new app.OrderBonusManager,
    new app.OrderAddressManager,
    new app.OrderPostcardManager,
    new app.ManagerChoosenSizes,
    new app.ManagerPolicy,
    new app.ManagerChoosenVariant,
    new app.AjaxLoaderCatalog($("[data-catalog-data]")),
    new app.AjaxCatalogPageManager($("[data-catalog-container]")),
    new app.SendManagerReview,
    new app.SendManagerAsk,
    new app.ManagerPopupsInit,
    new app.ManagerPostcard,
    new app.BottomManager,
    new app.Register,
    new app.ResetPasswordManager,
    new app.ConfirmCityManager,
    new app.SeoHrefReplace,
    new app.FavoritesManager,
    new app.SubscriptionManager,
    new app.ProductFlowersRelativesManager,
    new app.ProductGiftsRelativesManager,
    new app.AutoOrdersManager,
    new app.BoquetPackManager;
    new Swiper(".slider-rose", {
        slidesPerView: 4.5,
        scrollbar: {
            el: ".scroll-rose",
            draggable: !0
        }
    });
    var t = $(".order-mob");
    if (t.length) {
        var e = t[0].getBoundingClientRect().top >= $(window).innerHeight(),
        a = t[0].getBoundingClientRect().top <= 0 - (t.innerHeight() - 98);
        (e || a) && $(".step1-basketmob").addClass("show-btn"),
        $(window).scroll(function () {
            var e = t[0].getBoundingClientRect().top,
            a = $(window).innerHeight(),
            n = t.innerHeight();
            e >= a || e <= 0 - (n - 98) ? $(".step1-basketmob").addClass("show-btn") : $(".step1-basketmob").removeClass("show-btn")
        }),
        app.log("orderMobObj init")
    }
    console.log("Application ready")
}), app.BasePolicyManager = Class.extend(function () {
        var t = this;
        this.fill = function (e, a) {
            var n,
            i,
            o = a.actual ? a.actual.quantity : 1,
            s = a.actual ? a.actual.price : a.price,
            r = a.actual && 1 == a.actual.sell,
            c = a.name ? a.name : a.viewName;
            if (e.data("policy", a.policy).attr("data-policy", a.policy).data("policyName", a.policyName).attr("data-name", a.policyName).find("[data-id]").val(a.id).end().find("[data-product-id]").val(a.product_id).attr("data-product-id", a.product_id).data("productId", a.product_id).end().find("[data-product-weight]").val(a.weight).end().find("[data-product-id-view]").text(a.product_id).end().find("[data-name]").text(c).end().find("[data-item-price]").val(s).end().find("[data-price]").text(s * o).end().find("[data-count]").val(o).end().find("[data-link]").attr("href", a.link).end().find("[data-sell]").attr("checked", r).end(), a.grades.length) {
                for (n in e.find("[data-grades]").removeClass("hide"), a.grades)
                    a.grades.hasOwnProperty(n) && e.find('[data-grade="' + a.grades[n] + '"]').removeClass("hide").find("[data-check]").prop("checked", t.checkGradeCheck(a, n));
                t.initGrades(e.find("[data-ideal]:visible"))
            }
            for (i in a.options)
                a.options.hasOwnProperty(i) && t.fillOption(e, i, t.getOptionValue(a, i), t.checkOptionCheck(a, i));
            return t.fillParameters(e, a),
            e.find("[data-product-parameter-price]").change(function () {
                var e = $(this).closest("[data-container-item]").find("[data-count]");
                t.viewNewOfferPrice(e)
            }),
            e
        },
        this.output = function (e, a) {
            var n = {
                id: e.find("[data-id]").val(),
                product_id: e.find("[data-product-id]").val(),
                name: e.find("[data-name]").text(),
                price: e.find("[data-item-price]").val(),
                policy: e.data("policyName"),
                quantity: e.find("[data-count]").val(),
                options: {},
                parameters: {},
                grades: [],
                sell: e.find("[data-sell]").is(":checked") ? 1 : 0
            };
            return e.find("[data-option]").each(function () {
                var t = $(this);
                n.options[t.data("option")] = {
                    active: t.find("[data-check]").is(":checked") ? 1 : 0,
                    value: t.find("[data-value]").text()
                }
            }),
            e.find("[data-grades] [data-check]").each(function () {
                var t = $(this);
                t.is(":checked") && n.grades.push(t.closest("[data-grade]").data("grade"))
            }),
            e.find("[data-parameter]").each(function () {
                var e = $(this),
                a = e.data("parameter") + "GetOutput";
                a = t[a] ? a : "defaultGetOutput",
                n.parameters[e.closest("[data-parameter-tpl]").data("parameterTpl")] = t[a](e)
            }),
            n
        },
        this.defaultGetOutput = function (t) {
            return t.val()
        },
        this.checkboxGetOutput = function (t) {
            return t.is(":checked") ? 1 : 0
        },
        this.flaskGetOutput = function (t) {
            return t.is(":checked") ? 1 : 0
        },
        this.boxGetOutput = function (t) {
            return t.is(":checked") ? 1 : 0
        },
        this.topperGetOutput = function (t) {
            return t.is(":checked") ? 1 : 0
        },
        this.vazeGetOutput = function (e) {
            return t.checkboxGetOutput(e)
        },
        this.initGrades = function (t) {
            app.isCrm && new app.IdealManager(t),
            t.each(function () {
                var t = $(this);
                t.prop("checked") && t.next().next().addClass("_checked")
            }),
            t.change(function () {
                var e = $(this),
                a = e.next().next();
                "radio" == e.attr("type") ? (t.each(function () {
                        $(this).next().next().removeClass("_checked"),
                        $(this).attr("checked", !1).prop("checked", !1)
                    }), e.attr("checked", !0).prop("checked", !0), a.addClass("_checked")) : e.prop("checked") ? a.addClass("_checked") : a.removeClass("_checked")
            })
        },
        this.fillOption = function (t, e, a, n) {
            a && t.find('[data-option="' + e + '"]').removeClass("hide").find("[data-value]").text(a).end().find("[data-check]").prop("checked", n)
        },
        this.checkOptionCheck = function (t, e) {
            return !!(t.actual && t.actual.options && t.actual.options[e]) && t.actual.options[e].active
        },
        this.getOptionValue = function (t, e) {
            return t.actual && t.actual.options && t.actual.options[e] ? t.actual.options[e].value : t.options[e]
        },
        this.checkGradeCheck = function (t, e) {
            return !!t.actual && $.inArray(t.grades[e], t.actual.grades) > -1
        },
        this.calculatePriceForTrine = function (t) {
            if (t.count == t.minCount)
                return t.minPrice;
            if (t.count == t.maxCount)
                return t.maxPrice;
            var e = t.count - t.minCount,
            a = Math.ceil((t.maxPrice - t.minPrice) / (t.maxCount - t.minCount));
            return +t.minPrice + e * a
        },
        this.setBonusDiscountValue = function (t, e) {
            var a = parseInt(10 * e / 100);
            t.closest("[data-container-item]").find("[data-bonus-discount]").text(a)
        },
        this.getParametersPrice = function (t) {
            var e = 0,
            a = t.find('[data-parameter="checkbox"]:checked, [data-parameter="box"]:checked, [data-parameter="topper"]:checked, [data-parameter="product-pack-items-price"], [data-parameter="product-pack-items-price-radio"]:checked, [data-parameter="flask"]:checked');
            return app.groupLog("Sum params"),
            a.each(function (t, a) {
                var n = $(a).attr("data-parameter"),
                i = $(a).val();
                "product-pack-items-price-radio" == n && (i = $(a).attr("data-price-value")),
                e += +i;
                var o = n + " = " + i + ";";
                app.log(o)
            }),
            app.log(e),
            app.groupClose(),
            e
        },
        this.viewNewOfferPrice = function (t) {
            return !1
        },
        this.fillParameters = function (e, a) {
            var n = a.parameters;
            for (key in n)
                if (n.hasOwnProperty(key)) {
                    var i = $("[data-order-product-parameter-tpls] [data-parameter-tpl=" + key + "]").clone();
                    if (i.length) {
                        var o = a.actual ? a.actual.parameters[key] : n[key],
                        s = i.find("[data-parameter]").data("parameter") + "Do";
                        t[s] && t[s](i, o),
                        i.find("[data-input]").val(o).filter("[data-checked-input]").val(n[key]).prop("checked", a.actual && a.actual.parameters && a.actual.parameters[key]).end().end().find("[data-text]").text(n[key]).end().appendTo(e.find("[data-order-product-parameter-container]"))
                    }
                }
        },
        this.vazeDo = function (t, e) {
            !1 === e && t.addClass("hide")
        }
    }), app.CalculatorPolicyManager = app.BasePolicyManager.extend(function () {
        var t = this;
        this.fill = function (e, a) {
            e = t.sup.fill(e, a);
            var n = t.getOptionValue(a, "vVariants"),
            i = n[0].count,
            o = n[n.length - 1].count;
            return e.find("[data-count-in]").data("value", a).attr("data-value", JSON.stringify(a)).val(t.getOptionValue(a, "vCount")).attr("min", i).attr("max", o).end().find("[data-count-in-btn=min]").text(i).end().find("[data-count-in-btn=max]").text(o).end(),
            e.find("[data-count-in]").change(function () {
                var e,
                a,
                n,
                i,
                o,
                s,
                r;
                e = $(this),
                a = t.calculatePriceForTrine((n = e.data("value"), i = e.val(), o = t.getOptionValue(n, "vVariants"), s = o[0], r = o[o.length - 1], i = (i = i < s.count ? s.count : i) > r.count ? s.count : i, $.each(o, function (t, e) {
                                t - 1 >= 0 && i <= e.count && i >= o[t - 1].count && (s = o[t - 1], r = e)
                            }), {
                            minCount: s.count,
                            maxCount: r.count,
                            minPrice: s.price,
                            maxPrice: r.price,
                            count: i
                        })),
                e.closest("[data-container-item]").find("[data-price]").text(a),
                t.setBonusDiscountValue(e, a)
            }),
            e.find("[data-count-in-btn]").click(function () {
                var t = $(this);
                t.closest("[data-container-item]").find("[data-count-in]").val(t.text()).change().blur()
            }),
            e
        },
        this.output = function (e, a) {
            var n = t.sup.output(e, a),
            i = e.find("[data-count-in]"),
            o = i.data("value");
            return n.options.vCount = {
                active: 0,
                value: i.val()
            },
            $.each({
                vVariants: !0
            }, function (e, a) {
                n.options[e] = {
                    active: 0,
                    value: t.getOptionValue(o, e)
                }
            }),
            n
        }
    }), app.CompositPolicyManager = app.BasePolicyManager.extend(function () {
        var t = this;
        this.fill = function (e, a) {
            e = t.sup.fill(e, a);
            var n = t.getOptionValue(a, "vPrices"),
            i = a.actual ? a.actual.price : a.price,
            o = n[0] == i ? "[data-price-btn=min]" : n[2] == i ? "[data-price-btn=max]" : "[data-price-btn=normal]";
            return e.find("[data-price-btn=min]").data("value", a).attr("data-value", JSON.stringify(a)).val(n[0]).end().find("[data-price-btn=normal]").val(n[1]).end().find("[data-price-btn=max]").val(n[2]).end().find("[data-price-btn]").closest("label").removeClass("active").end().filter(o).prop("checked", !0).closest("label").addClass("active"),
            e.find("[data-price-btn]").change(function () {
                t.viewNewOfferPrice($(this))
            }),
            e.find("[data-count]").change(function () {
                t.viewNewOfferPrice(e.find(".active [data-price-btn]"))
            }),
            t.viewNewOfferPrice(e.find("[data-price-btn]:checked")),
            e
        },
        this.output = function (e, a) {
            var n = t.sup.output(e, a),
            i = e.find("[data-price-btn=min]").data("value");
            return $.each({
                vPrices: !0,
                vPercents: !0
            }, function (e, a) {
                n.options[e] = {
                    active: 0,
                    value: t.getOptionValue(i, e)
                }
            }),
            n
        },
        this.viewNewOfferPrice = function (e) {
            var a = e.closest("[data-container-item]"),
            n = +a.find("[data-price-btn]:checked").val();
            a.find("[data-item-price]").val(n);
            var i = a.find("[data-count]").val();
            i = i || 1;
            var o = (n + t.getParametersPrice(a)) * i;
            a.find("[data-price]").text(o),
            t.setBonusDiscountValue(e, o)
        }
    }), app.ExistPolicyManager = app.BasePolicyManager.extend(function () {
        var t = this;
        this.output = function (t, e) {
            return e
        },
        this.fill = function (e, a) {
            (e = t.sup.fill(e, a)).attr("data-policy", "existpolicy").data("policy", "existpolicy").attr("data-name", "Exist").data("name", "Exist").find("[data-item-price]").val(a.price).end().find("[data-price]").text(a.price * a.quantity).end().find("[data-count]").val(a.quantity).end(),
            a.sell && e.find("[data-sell-icon]").removeClass("hide"),
            a.vendor_accepted && e.find("[data-vendor-confirmed]").removeClass("hide"),
            a.vendor_to_store && e.find("[data-vendor-ready]").removeClass("hide"),
            a.vendor_delivered && e.find("[data-vendor-deliveried]").removeClass("hide")
        },
        this.fillParameters = function (t, e) {
            var a = [];
            try {
                a = "string" == typeof e.parameters ? $.parseJSON(e.parameters) : e.parameters
            } catch (t) {}
            for (key in a)
                if (a.hasOwnProperty(key)) {
                    var n = $("[data-exist-parameter-tpl]").clone();
                    n.length && n.removeAttr("data-exist-parameter-tpl").find("[data-text]").text(a[key].text).end().appendTo(t.find("[data-order-product-parameter-container]"))
                }
        }
    }), app.LinePolicyManager = app.BasePolicyManager.extend(function () {
        var t = this;
        this.fill = function (e, a) {
            var n = e.find("[data-height]");
            e = t.sup.fill(e, a);
            var i = a.actual ? a.actual.height : a.height;
            return n.html(""),
            t.getOptionValue(a, "vVariants").forEach(function (t) {
                $("<option>").attr("value", t.height).text(t.height).appendTo(n)
            }),
            n.data("value", a).attr("data-value", JSON.stringify(a)).val(i).change(function () {
                var n = $(this);
                t.setItemPrice(n.closest("[data-container-item]")),
                a.actual ? a.actual.height = n.val() : a.height = n.val(),
                t.output(e, a),
                t.viewNewOfferPrice(n.closest("[data-container-item]").find("[data-count]"))
            }),
            e.find("[data-count]").change(function () {
                t.viewNewOfferPrice($(this))
            }),
            e
        },
        this.output = function (e, a) {
            var n = t.sup.output(e, a);
            return n.height = e.find("[data-height]").val(),
            n.options.vVariants = {
                active: 0,
                value: e.find("[data-height]").data("value").options.vVariants
            },
            n
        },
        this.viewNewOfferPrice = function (e) {
            var a = e.closest("[data-container-item]"),
            n = +a.find("[data-item-price]").val() + t.getParametersPrice(a),
            i = a.find("[data-count]").val(),
            o = n * (i = i || 1);
            a.find("[data-price]").text(o),
            t.setBonusDiscountValue(e, o)
        },
        this.setItemPrice = function (t, e) {
            var a = +t.find("[data-height]").val(),
            n = +t.find("[data-height]").data("value").options.vVariants.find(function (t) {
                    return +t.height == +a
                }).price;
            t.find("[data-item-price]").val(n)
        }
    }), app.MonoPolicyManager = app.BasePolicyManager.extend(function () {
        this.defaultCount = null;
        var t = this;
        this.fill = function (e, a) {
            (e = t.sup.fill(e, a)).find("[data-height]").html(""),
            t.defaultCount = a.options.vCount;
            var n = a.actual ? a.actual.height : a.height,
            i = t.getOptionValue(a, "vVariants"),
            o = Object.keys(i);
            return $.each(o, function (t, a) {
                $("<option>").attr("value", a).text(a).appendTo(e.find("[data-height]"))
            }),
            t.setCounters(e, a),
            e.find("[data-height]").val(n),
            e.find("[data-count-in]").change(function () {
                var e = $(this),
                a = e.val();
                a || e.val(e.prop("min")),
                $("[data-count-text]").text(a),
                $countTextReplace = $("[data-count-text-replace]"),
                a != t.defaultCount && $countTextReplace.text($countTextReplace.data("countTextReplace")),
                t.viewNewOfferPrice($(this))
            }),
            e.find("[data-count]").change(function () {
                t.viewNewOfferPrice(e.find("[data-count-in]"))
            }),
            e.find("[data-height]").change(function () {
                var n = $(this);
                a.actual ? a.actual.height = n.val() : a.height = n.val(),
                $("[data-height-text]").text(n.val()),
                t.setCounters(e, a),
                t.output(e, a),
                t.viewNewOfferPrice(e.find("[data-count-in]"))
            }),
            e.find("[data-count-in-btn]").click(function () {
                var t = $(this);
                t.closest("[data-container-item]").find("[data-count-in]").val(t.text()).change().blur()
            }),
            e
        },
        this.setCounters = function (e, a) {
            var n = a.actual ? a.actual.height : a.height,
            i = t.getOptionValue(a, "vVariants")[n],
            o = parseInt(i[0].count),
            s = parseInt(i[i.length - 1].count),
            r = parseInt(t.getOptionValue(a, "vCount"));
            r = (r = r < o ? o : r) > s ? s : r,
            e.find("[data-count-in]").data("value", a).attr("data-value", JSON.stringify(a)).val(r).attr("min", o).attr("max", s).end().find("[data-count-in-btn=min]").text(o).end().find("[data-count-in-btn=max]").text(s)
        },
        this.output = function (e, a) {
            var n = t.sup.output(e, a);
            n.height = e.find("[data-height]").val();
            var i = e.find("[data-count-in]"),
            o = i.data("value");
            return n.options.vCount = {
                active: 0,
                value: i.val()
            },
            $.each({
                vVariants: !0
            }, function (e, a) {
                n.options[e] = {
                    active: 0,
                    value: t.getOptionValue(o, e)
                }
            }),
            n
        },
        this.viewNewOfferPrice = function (e) {
            app.log("Пересчет ценника");
            var a = e.closest("[data-container-item]"),
            n = a.find("[data-count]").val();
            n = n || 1;
            var i = a.find("[data-count-in]"),
            o = function (e, a) {
                a = parseInt(a);
                var n = e.actual ? e.actual.height : e.height,
                i = t.getOptionValue(e, "vVariants")[n],
                o = i[0],
                s = i[i.length - 1];
                return a = (a = a < o.count ? o.count : a) > s.count ? o.count : a,
                $.each(i, function (t, e) {
                    t - 1 >= 0 && a <= e.count && a >= i[t - 1].count && (o = i[t - 1], s = e)
                }), {
                    minCount: o.count,
                    maxCount: s.count,
                    minPrice: o.price,
                    maxPrice: s.price,
                    count: a
                }
            }
            (i.data("value"), i.val()),
            s = n * (t.calculatePriceForTrine(o) + t.getParametersPrice(a));
            a.find("[data-price]").text(s),
            t.setBonusDiscountValue(e, s),
            app.changeProductPossible()
        }
    }), app.changeProductPossible = function () {
    var t = $("[data-height-variant]:checked").val();
    if (50 != t && 70 != t)
        return app.setPossibleProductText("no");
    var e = $("[data-count-in]").val();
    return 21 != e && 41 != e && 71 != e && 101 != e && 201 != e ? app.setPossibleProductText("no") : 50 == t && 201 == e ? app.setPossibleProductText("no") : app.setPossibleProductText("yes")
}, app.setPossibleProductText = function (t) {
    t = t || "no",
    $("[data-product-status]").addClass("hide").filter("[data-product-status=" + t + "]").removeClass("hide")
}, app.NullPolicyManager = app.BasePolicyManager.extend(function () {
        this.fill = function (t) {
            app.log("This policy has not been declared.")
        },
        this.output = function () {
            app.log("This policy has not been declared.")
        }
    }), app.PlusMinusPolicyManager = app.BasePolicyManager.extend(function () {
        var t = this;
        this.fill = function (e, a) {
            e = t.sup.fill(e, a);
            var n = t.getOptionValue(a, "vMinCount"),
            i = t.getOptionValue(a, "vMaxCount");
            return e.find("[data-count-in]").data("value", a).attr("data-value", JSON.stringify(a)).val(t.getOptionValue(a, "vCount")).attr("min", n).attr("max", i).end().find("[data-count-in-btn=min]").text(n).end().find("[data-count-in-btn=max]").text(i).end(),
            e.find("[data-count-in]").change(function () {
                var e,
                a,
                n,
                i,
                o,
                s,
                r,
                c,
                d,
                l;
                e = $(this),
                a = t.calculatePriceForTrine((n = e.data("value"), i = e.val(), o = t.getOptionValue(n, "vDefCount"), s = t.getOptionValue(n, "vMinCount"), r = t.getOptionValue(n, "vMaxCount"), c = t.getOptionValue(n, "vDefPrice"), d = t.getOptionValue(n, "vMinPrice"), l = t.getOptionValue(n, "vMaxPrice"), {
                            minCount: (i = (i = i > r ? r : i) < s ? s : i) < o ? s : o,
                            maxCount: i > o ? r : o,
                            minPrice: i < o ? d : c,
                            maxPrice: i > o ? l : c,
                            count: i
                        })),
                e.closest("[data-container-item]").find("[data-price]").text(a),
                t.setBonusDiscountValue(e, a)
            }),
            e.find("[data-count-in-btn]").click(function () {
                var t = $(this);
                t.closest("[data-container-item]").find("[data-count-in]").val(t.text()).change().blur()
            }),
            e
        },
        this.output = function (e, a) {
            var n = t.sup.output(e, a),
            i = e.find("[data-count-in]"),
            o = i.data("value");
            return n.options.vCount = {
                active: 0,
                value: i.val()
            },
            $.each({
                vDefCount: !0,
                vMinCount: !0,
                vMaxCount: !0,
                vDefPrice: !0,
                vMinPrice: !0,
                vMaxPrice: !0
            }, function (e, a) {
                n.options[e] = {
                    active: 0,
                    value: t.getOptionValue(o, e)
                }
            }),
            n
        }
    }), app.RosesInFlaskPolicyManager = app.BasePolicyManager.extend(function () {
        var t = this;
        this.fill = function (e, a) {
            var n = e.closest("[data-container-item]"),
            i = n.find("[data-item-flask]");
            if (0 == i.filter(":checked").length) {
                var o = i.filter(":eq(0)");
                o.parents("LABEL").addClass("_active"),
                o.prop("checked", !0).attr("checked", !0),
                o.next(".ideal-check").addClass("checked")
            }
            i.on("change", function () {
                var t = $(this);
                0 == $(this).is(":checked") ? ($(this).parents("LABEL").addClass("_active"), $(this).prop("checked", !0).attr("checked", !0), $(this).next(".ideal-check").addClass("checked")) : i.each(function () {
                    t.data("source") != $(this).data("source") && ($(this).parents("LABEL").removeClass("_active"), $(this).prop("checked", !1).attr("checked", !1), $(this).next(".ideal-check").removeClass("checked"))
                })
            });
            var s = n.find("[data-item-box]");
            s.on("change", function () {
                var t = $(this);
                s.each(function () {
                    t.data("source") != $(this).data("source") && ($(this).parents("LABEL").removeClass("_active"), $(this).prop("checked", !1).attr("checked", !1), $(this).next(".ideal-check").removeClass("checked"))
                })
            }),
            (e = t.sup.fill(e, a)).find("[data-count]").change(function () {
                t.viewNewOfferPrice($(this))
            }),
            t.viewNewOfferPrice(e.find("[data-count]"))
        },
        this.viewNewOfferPrice = function (e) {
            var a = e.closest("[data-container-item]"),
            n = +a.find("[data-item-price]").val() + t.getParametersPrice(a),
            i = a.find("[data-count]").val(),
            o = n * (i = i || 1);
            a.find("[data-price]").text(o),
            t.setBonusDiscountValue(e, o)
        }
    }), app.SimplePolicyManager = app.BasePolicyManager.extend(function () {
        var t = this;
        this.fill = function (e, a) {
            e = t.sup.fill(e, a),
            t.viewNewOfferPrice(e.find("[data-count]")),
            e.find("[data-count]").change(function () {
                t.viewNewOfferPrice($(this))
            })
        },
        this.viewNewOfferPrice = function (e) {
            var a = e.closest("[data-container-item]"),
            n = +a.find("[data-item-price]").val() + t.getParametersPrice(a),
            i = a.find("[data-count]").val(),
            o = n * (i = i || 1);
            a.find("[data-price]").text(o),
            t.setBonusDiscountValue(e, o)
        }
    }), app.BaseFillManager = Class.extend(function () {
        this.fill = function (t) {
            if (!t.length)
                return {};
            var e = {};
            return e.id = t.data("id"),
            t.find("[data-source]").each(function () {
                var t = $(this),
                a = t.data("type"),
                n = "";
                if ("value" === a)
                    n = t.val();
                else if ("text" === a)
                    n = t.text();
                else if ("checkbox" === a)
                    t.is(":checked") && (n = 1);
                else if ("data" === a)
                    n = t.data("value");
                else if ("onlyCheck" === a) {
                    if (!t.is(":checked"))
                        return;
                    n = 1
                } else if ("radioGroup" === a) {
                    if (!t.is(":checked"))
                        return;
                    n = t.val()
                } else
                    n = 0;
                void 0 === n && (n = 0),
                e[t.data("source")] = n
            }),
            app.log("Exec app.BaseFillManager"),
            e
        }
    }), app.BaseFormManager = Class.extend(function () {
        this.$form = null;
        var t = this;
        this.constructor = function () {
            return !!t.$form.length && (t.$form.submit(function () {
                    var e = $(this);
                    return t.sendAjaxRequest(e.attr("action"), e.serialize()),
                    !1
                }), app.log("Init app.BaseFormManager"), !0)
        },
        this.sendAjaxRequest = function (e, a, n, i) {
            $.ajax({
                type: "POST",
                url: e,
                data: a,
                dateType: "JSON",
                success: function (e) {
                    t.onAjaxSuccess(e, a.id),
                    "function" == typeof n && n(e)
                },
                error: function (e) {
                    t.onAjaxError(e, a.id),
                    "function" == typeof i && i(e)
                }
            })
        },
        this.sendGetAjaxRequest = function (e, a) {
            $.ajax({
                type: "GET",
                url: e,
                data: a,
                dateType: "JSON",
                success: function (e) {
                    t.onAjaxSuccess(e, a.id)
                },
                error: function (e) {
                    t.onAjaxError(e, a.id)
                }
            })
        },
        this.onAjaxSuccess = function (t, e) {
            "error" === t.status ? app.PopupManager("Ошибка", t.message) : app.PopupManager("Неизвестный статус", t)
        },
        this.onAjaxError = function (t, e) {
            app.messages.add("Что-то случилось. Расскажите нам."),
            app.log(t)
        }
    }), app.BaseIntervalManager = Class.extend(function () {
        this.$container = null,
        this.$only = null,
        this.$date = null,
        this.$times = null,
        this.$intervals = null,
        this.$kads = null,
        this.$kadKm = null,
        this.$changeCostCollection = null,
        this.discountPercent = 0,
        this.discountValue = 0,
        this.$deliveryInfoMessage = null,
        this.$addressComponents = null,
        this.$clarify = null,
        this.$total = null,
        this.$delivery = null,
        this.timestamp = null;
        var t = this;
        this.constructor = function (e) {
            return !!e.length && (t.$container = e, t.initVariables(), t.initEvents(), t.changeInterface(), t.unsetAutoInterval(), t.setActiveIntervals(), t.setCourierActiveIntervals(), app.log("Init app.BaseIntervalManager"), !0)
        },
        this.initVariables = function () {
            t.timestamp = t.$container.data("now"),
            t.$total = $("[data-total]"),
            t.$delivery = $("[data-delivery-price]"),
            t.$only = t.$container.find("[data-only]"),
            t.$date = t.$container.find("[data-date-input]"),
            t.$times = t.$container.find("[data-time-input]"),
            t.$courierDate = $("[data-courier-date]"),
            t.$courierIntervals = $("[data-courier-interval-input]"),
            t.$intervals = t.$container.find("[data-interval-input]"),
            t.$kads = $("[data-kad-minimal=" + t.$container.data("intervalData") + "]"),
            t.$kadKm = $("[data-kad-km=" + t.$container.data("intervalData") + "]"),
            t.$changeCostCollection = t.$container.find("[data-change-cost]"),
            t.$deliveryInfoMessage = $("[data-delivery-info-message]"),
            t.$addressComponents = $("[data-address-component]"),
            t.$clarify = $("[data-clarify-address]")
        },
        this.initEvents = function () {
            $(window).on("ManagerDeliveries.updateTotalPrice", function (e, a) {
                a && t.$total.data("total", a).attr("data-total", a),
                t.setSumTotal()
            }),
            $(window).on("BaseIntervalManager.setDiscountPercent", function (e, a) {
                t.discountPercent = a
            }),
            $(window).on("BaseIntervalManager.setDiscountValue", function (e, a) {
                t.discountValue = a
            }),
            t.$kadKm.change(t.setPriceForOverKm),
            t.$kadKm.change(t.changeInterface),
            t.$date.change(function () {
                t.setActiveIntervals(),
                t.changeInterface()
            }),
            t.$kads.change(t.setMinimalKadKm),
            t.$kads.change(t.changeInterface),
            t.$only.change(t.onlyOneChecked),
            t.$only.change(t.changeInterface),
            t.$clarify.change(t.toggleClarifyInputs),
            t.$intervals.change(t.setSumTotal),
            t.$addressComponents.on("input", function () {
                t.$deliveryInfoMessage.hide()
            }),
            t.$courierDate.change(function () {
                t.setCourierActiveIntervals()
            }),
            setInterval(function () {
                t.timestamp += 1
            }, 1e3),
            setInterval(function () {
                t.changeInterface(),
                t.unsetAutoInterval()
            }, 6e5),
            t.$date.click(function () {
                t.$date.datepicker("show")
            })
        },
        this.unsetAutoInterval = function () {
            t.$intervals.prop("checked", !1)
        },
        this.toggleClarifyInputs = function () {
            $clarifyInputs = $("[data-hide-on-clarify]"),
            $clarifyMessage = $("[data-clarify-message]"),
            $clarifyMap = $("[data-basket-map]"),
            t.$clarify.prop("checked") ? ($clarifyInputs.hide(), $clarifyMap.hide(), $clarifyMessage.removeClass("hide")) : ($clarifyInputs.show(), $clarifyMap.show(), $clarifyMessage.addClass("hide"))
        },
        this.onlyOneChecked = function (e) {
            var a = t.getCheckedItem();
            a.length > 1 && a.filter("[data-only!=" + $(e.target).data("only") + "]").prop("checked", !1).change()
        },
        this.setMinimalKadKm = function () {
            0 == t.$kadKm.val() && (t.$kads.filter(":checked").val() > 8 ? t.$kadKm.val(9) : t.$kadKm.val(0), t.$kadKm.trigger("change"))
        },
        this.changeInterface = function () {
            t.setExpressPrice();
            var e = t.getCheckedItem().data("only");
            if ("exactly" === e)
                t.$times.prop("disabled", !1).change(), t.$intervals.prop("disabled", !0).closest("label").addClass("_disabled"), app.log("disabled by exactly"), t.setActiveTimes();
            else if ("express" === e) {
                if (!t.isNowDate())
                    return $("#datepicker").datepicker("setDate", moment.unix(t.timestamp).format("DD.MM.YYYY")), void t.$date.val(moment.unix(t.timestamp).format("DD.MM.YYYY")).change();
                t.$intervals.prop("disabled", !0).change().closest("label").removeClass("_active").addClass("_disabled"),
                app.log("disabled by express"),
                t.$times.prop("disabled", !0).change()
            } else
                t.setActiveIntervals(), t.$times.prop("disabled", !0).change();
            t.setSumTotal()
        },
        this.setActiveTimes = function () {
            var e = moment.unix(t.timestamp),
            a = e.clone().add(t.getMinimalHours(), "hour").add(15, "minute"),
            n = moment(t.$date.val(), "DD.MM.YYYY"),
            i = t.$times.find("option");
            n.isSame(e, "day") ? i.each(function () {
                var t = $(this),
                e = t.val().split(":"),
                i = n.clone().hour(e[0]).minute(e[1]);
                t.prop("disabled", i.isBefore(a, "minute"))
            }) : i.prop("disabled", n.isBefore(e, "day")),
            t.$times.val(i.filter(":not(:disabled)").first().val()).trigger("chosen:updated")
        },
        this.setActiveIntervals = function () {
            var e = moment.unix(t.timestamp),
            a = moment(t.$date.val(), "DD.MM.YYYY"),
            n = t.$intervals,
            i = n.filter(":checked").val();
            if (a.isSame(e, "day")) {
                var o = a.clone().format("YYYY-MM-DD");
                ["2019-03-04", "2019-03-05", "2019-03-06", "2019-03-07", "2019-03-08", "2019-03-09"].join(",").indexOf(o) >= 0 ? n.each(function (t, n) {
                    var i = $(this),
                    o = i.data("from"),
                    s = a.clone().hour(o),
                    r = e.clone().format("HH"),
                    c = s.isBefore(e, "minute");
                    i.prop("disabled", c),
                    c && (i.closest("label").addClass("_disabled"), app.log("disabled by isPast")),
                    r >= 7 && r < 10 && o >= 7 && o < 10 && (i.prop("disabled", !0), i.closest("label").addClass("_disabled"), app.log("disabled by 7:00 - 10:00")),
                    r >= 10 && r < 15 && o >= 10 && o < 15 && (i.prop("disabled", !0), i.closest("label").addClass("_disabled"), app.log("disabled by 10:00 - 15:00")),
                    r >= 15 && r < 19 && o >= 15 && o < 19 && (i.prop("disabled", !0), i.closest("label").addClass("_disabled"), app.log("disabled by 15:00 - 19:00")),
                    r >= 19 && r < 22 && o >= 19 && o < 22 && (i.prop("disabled", !0), i.closest("label").addClass("_disabled"), app.log("disabled by 19:00 - 22:00"))
                }) : n.each(function () {
                    var t = $(this),
                    n = a.clone().hour(t.data("from")).isBefore(e, "minute");
                    t.prop("disabled", n),
                    n && (app.log("setActiveIntervals, disabled isPast: " + t.val()), t.closest("label").addClass("_disabled"))
                })
            } else
                n.prop("disabled", a.isBefore(e, "day"));
            t.$intervals.filter(":not(:disabled)").closest("label").removeClass("_hidden _disabled");
            var s = a.isSame(e, "day") ? t.$intervals.filter(":not(:disabled)").first() : t.$intervals.eq(6);
            (s = t.$intervals.filter("[value=" + i + "]").filter(":not(:disabled)").length ? t.$intervals.filter("[value=" + i + "]") : s).prop("checked", !0).change()
        },
        this.setCourierActiveIntervals = function () {
            var e = moment.unix(t.timestamp),
            a = moment(t.$courierDate.val(), "DD.MM.YYYY"),
            n = t.$courierIntervals;
            a.isSame(e, "day") ? n.each(function (t) {
                var n = $(this),
                i = a.clone().hour(n.data("from")).isBefore(e, "minute");
                n.prop("disabled", i).trigger("chosen:updated")
            }) : n.prop("disabled", a.isBefore(e, "day"));
            var i = a.isSame(e, "day") ? t.$courierIntervals.filter(":not(:disabled)").first() : t.$courierIntervals.eq(8);
            $("[data-courier-interval]").val(i.val()).trigger("chosen:updated")
        },
        this.getMinimalHours = function () {
            return t.$kads.filter(":checked").val() > 0 ? 3 : 2
        },
        this.isNowDate = function () {
            return moment(t.$date.val(), "DD.MM.YYYY").isSame(moment.unix(t.timestamp), "day")
        },
        this.setSumTotal = function () {
            $(window).trigger("OrderBonusManager.setBonus", [t.getSumTotal()]),
            t.$total.text(t.getSumTotal());
            var e = t.getSumDelivery();
            t.$delivery.text(e);
            var a = t.$delivery.closest("[data-delivery-sum-container]");
            e > 0 ? a.removeClass("_no_sum") : a.addClass("_no_sum")
        },
        this.getSumTotal = function () {
            var e = t.$total.data("total") + t.getSumDelivery();
            return e - Math.ceil(e * t.discountPercent / 100) - t.discountValue
        },
        this.getSumDelivery = function () {
            return t.getSumKad() + t.getSumInterval() + t.getSumExactly() + t.getSumExpress() + t.getSumAddon()
        },
        this.getSumKad = function () {
            return t.$kads.filter(":checked").data("price")
        },
        this.getSumInterval = function () {
            var e = t.$intervals.filter(":not(:disabled):checked");
            return e.length ? e.data("price") : 0
        },
        this.getSumExactly = function () {
            var e = t.getCheckedItem();
            return "exactly" == e.data("only") ? e.data("price") : 0
        },
        this.getSumExpress = function () {
            var e = t.getCheckedItem();
            return "express" == e.data("only") ? e.data("price") : 0
        },
        this.getSumAddon = function () {
            var e = 0;
            return t.$container.find("[data-addon]").each(function () {
                e += $(this).data("price")
            }),
            e
        },
        this.getCheckedItem = function () {
            return t.$only.filter(":checked")
        },
        this.setPriceForOverKm = function (e) {
            var a = $(e.target),
            n = a.val();
            a.val(a.val() > 8 ? n : 9);
            var i = 35 * a.val();
            t.$kads.filter("[data-source=yes]").data("price", i).attr("data-price", i).prop("checked", !0).change()
        },
        this.setExpressPrice = function () {
            var e = t.getNowInterval().data("expressPrice");
            t.$only.filter("[data-only=express]").data("price", e).attr("price", e).closest("label").find("[data-change-cost]").data("changeCost", e).attr("data-change-cost", e)
        },
        this.getNowInterval = function () {
            var e = t.$intervals.last(),
            a = moment.unix(t.timestamp).hour();
            return t.$intervals.each(function () {
                var t = $(this);
                t.data("from") <= a && a < t.data("to") && (e = t)
            }),
            e
        }
    }), app.OrderAddressManager = Class.extend(function () {
        this.$container = $("[data-basket-page]"),
        this.$addresses = null;
        var t = this;
        this.constructor = function () {
            return !!t.$container.length && (t.$addresses = t.$container.find("[data-client-addresses]"), t.$addresses.change(function () {
                    $(this).val().length ? t.$container.find("[data-address-components]").hide() : t.$container.find("[data-address-components]").show()
                }), app.log("Exec app.OrderAddressManager"), !0)
        }
    }), app.OrderPostcardManager = Class.extend(function () {
        this.$postcardForm = $("[data-postcard-form]"),
        this.$toggler = $("[data-postcard-toggler]");
        var t = this;
        this.constructor = function () {
            t.$postcardForm.length && t.$toggler.length && (t.$postcardForm.keyup(function (e) {
                    t.$toggler.prop("checked") || $("[data-form-postcard]").val().length >= 1 && t.$toggler.prop("checked", !0).change()
                }), app.log("Init app.OrderPostcardManager"))
        }
    }), app.ResetPasswordManager = Class.extend(function () {
        this.$container = $("[data-reset-password-code]"),
        this.seconds = 0,
        this.$message = null,
        this.urlSendSmsUrl = null,
        this.$loginInput = null,
        this.$codeInput = null,
        this.$buttonSendInput = null,
        this.$passwordInput = null,
        this.$passwordConfirmationInput = null;
        var t = this;
        this.constructor = function () {
            return !!t.$container.length && (t.seconds = 1 * t.$container.data("reset-password-code-second"), t.urlSendSmsUrl = t.$container.data("reset-password-code-second-send-sms-url"), t.urlCheckCodeUrl = t.$container.data("reset-password-code-second-check-code-url"), t.$message = t.$container.find("[data-reset-password-code-message]"), t.$loginInput = t.$container.find("[data-reset-password-code-login]"), t.$codeInput = t.$container.find("[data-reset-password-code-value]"), t.$passwordInput = t.$container.find("[data-reset-password-code-password]"), t.$passwordConfirmationInput = t.$container.find("[data-reset-password-code-password-confirmation]"), t.$buttonSendInput = t.$container.find("[data-reset-password-code-button-send]"), t.isAction(t.seconds) ? t.startCounter(t.seconds) : t.showButtonSendSms(), t.$codeInput.on("keyup", function () {
                    t.$codeInput.val().length >= 4 && t.onSend(function (e) {
                        e ? t.isValid() && t.$container.find("FORM").get(0).submit() : t.$codeInput.parent().parent().next().text("Извините, но введенный вами код не совпадает с тем, который был выслан вам на телефон.").css("display", "block")
                    })
                }), app.log("Init app.ResetPasswordManager"), !0)
        },
        this.isValid = function () {
            return t.$loginInput.val() ? (t.$loginInput.parent().next().text("").css("display", "none"), t.$codeInput.val() ? (t.$codeInput.parent().parent().next().text("").css("display", "none"), t.$passwordInput.val() ? (t.$passwordInput.parent().next().text("").css("display", "none"), t.$passwordInput.val().length < 6 ? (t.$passwordInput.parent().next().text("Длина нового пароля должна составлять не менее 6 символов!").css("display", "block"), t.$passwordInput.focus(), !1) : (t.$passwordInput.parent().next().text("").css("display", "none"), !t.$passwordInput.val() == t.$passwordConfirmationInput.val() ? (t.$passwordConfirmationInput.parent().next().text("Введенные пароли должны совпадать!").css("display", "block"), t.$passwordConfirmationInput.focus(), !1) : (t.$passwordConfirmationInput.parent().next().text("").css("display", "none"), !0))) : (t.$passwordInput.parent().next().text("Вам нужно ввести новый пароль!").css("display", "block"), t.$passwordInput.focus(), !1)) : (t.$codeInput.parent().parent().next().text("Вам нужно ввести код, который вам пришел на СМС!").css("display", "block"), t.$codeInput.focus(), !1)) : (t.$loginInput.parent().next().text("Вам нужно ввести номер вашего телефона!").css("display", "block"), t.$loginInput.focus(), !1)
        },
        this.onSend = function (e) {
            return t.$loginInput.val() ? (t.$loginInput.parent().next().text("").css("display", "none"), t.$codeInput.val() ? (t.$codeInput.parent().parent().next().text("").css("display", "none"), void $.ajax({
                        type: "POST",
                        url: t.urlCheckCodeUrl,
                        data: {
                            login: t.$loginInput.val(),
                            code: t.$codeInput.val()
                        },
                        dateType: "JSON",
                        success: function (a) {
                            a.success ? e.call(t, a.result) : t.$codeInput.parent().parent().next().text("Произошла ошибка проверки введенного кода.").css("display", "block")
                        },
                        error: function (e) {
                            t.$codeInput.parent().parent().next().text("Произошла ошибка проверки введенного кода.").css("display", "block")
                        }
                    })) : (t.$codeInput.parent().parent().next().text("Вам нужно ввести код, который вам пришел на СМС!").css("display", "block"), void t.$codeInput.get(0).focus())) : (t.$loginInput.parent().next().text("Вам нужно ввести номер вашего телефона!").css("display", "block"), void t.$loginInput.get(0).focus())
        },
        this.isAction = function (t) {
            return !!t
        },
        this.showMessage = function (e) {
            var a,
            n,
            i = Math.floor(e / 60);
            a = 1 == i ? "минута" : i >= 2 && i <= 4 ? "минуты" : "минут",
            n = 1 == (e -= 60 * i) ? "секунду" : e >= 2 && e <= 4 ? "секунды" : "секунд";
            var o = "Отправить еще раз через";
            i && (o += " " + i + " " + a),
            e && (o += " " + e + " " + n),
            o += ".",
            t.$message.text(o)
        },
        this.showButtonSendSms = function () {
            t.$message.html(""),
            $("<a href='#send' class='b-form__field-button'>Отправить еще раз</a>").appendTo(t.$message).on("click", function () {
                return t.sendSms(function (e) {
                    t.startCounter(e)
                }),
                !1
            })
        },
        this.startCounter = function (e) {
            var a = window.setInterval(function () {
                    e--,
                    t.isAction(e) ? t.showMessage(e) : (window.clearInterval(a), t.showButtonSendSms())
                }, 1e3)
        },
        this.sendSms = function (e) {
            t.$loginInput.val() ? $.ajax({
                type: "POST",
                url: t.urlSendSmsUrl,
                data: {
                    login: t.$loginInput.val()
                },
                dateType: "JSON",
                success: function (a) {
                    a.success ? e.call(t, a.seconds) : t.$codeInput.parent().parent().next().text("Произошла ошибка отправки нового СМС с кодом.").css("display", "block")
                },
                error: function (e) {
                    t.$codeInput.parent().parent().next().text("Произошла ошибка отправки нового СМС с кодом.").css("display", "block")
                }
            }) : (t.$loginInput.parent().next().text("Вам нужно ввести номер вашего телефона!").css("display", "block"), t.$loginInput.get(0).focus())
        }
    }), app.ConfirmCityManager = Class.extend(function () {
        var t = this;
        this.$container = $("[data-confirm-city]"),
        this.constructor = function () {
            return !!t.$container.length && (t.$container.find("[data-city-popup-clear]").click(function (e) {
                    t.$container.hide()
                }), t.$container.find("[data-city-popup-ok]").click(function (t) {
                    $.ajax({
                        type: "POST",
                        url: $(this).data("city-popup-ok-url"),
                        dateType: "JSON",
                        success: function (t) {
                            "ok" == t.result || app.messages.add(t.message)
                        },
                        error: function (t) {
                            app.messages.add("Ошибка обработки.")
                        }
                    })
                }), app.log("Exec app.ConfirmCityManager"), !0)
        }
    }), app.FormThrottleManager = Class.extend(function () {
        this.$containers = $("[data-form-throttle]");
        var t = this;
        this.constructor = function () {
            return !!t.$containers.length && (t.$containers.submit(function () {
                    var t = $(this);
                    if (t.data("blocked"))
                        return console.log("Submit blocked"), !1;
                    t.data("blocked", 1).attr("data-blocked", 1),
                    setTimeout(function () {
                        t.data("blocked", 0).attr("data-blocked", 0),
                        console.log("Unblock Submit")
                    }, t.data("formThrottle")),
                    console.log("Submit complete")
                }), app.log("Init app.ThrottleManager"), !0)
        }
    }), app.PromoCodeFormManager = app.BaseFormManager.extend(function () {
        this.$container = $("[data-promo-code]"),
        this.$codeInput = null,
        this.$resultInfo = null,
        this.$bonusInput = null,
        this.fillManager = new app.BaseFillManager;
        var t = this;
        this.constructor = function () {
            if (!t.$container.length)
                return !1;
            if (t.$codeInput = t.$container.find("[data-code-input]"), t.$bonusInput = t.$container.find("[data-bonus-input]"), t.$resultInfo = t.$container.find("[data-promo-code-result]"), t.$codeInput.on("input", $.debounce(250, function () {
                        var e = t.fillManager.fill(t.$container);
                        e.phone = $('[data-client-input="client.phone"]').val(),
                        e.orderId = $("[name=id]").val(),
                        $(this).val().length ? (t.$bonusInput.prop("disabled", !0), t.$container.find("[data-bonus-item]").addClass("_disabled"), t.sendAjaxRequest(t.$container.data("action"), e)) : (t.$bonusInput.prop("disabled", !1), t.$resultInfo.removeClass("success _error").text("").hide(), t.$container.find("[data-bonus-item]").removeClass("_disabled"), t.$container.removeClass("has-error"), t.updateDiscounts(0, 0))
                    })), t.$bonusInput.on("input", $.debounce(250, function () {
                        var e = $(this),
                        a = parseInt($(this).val());
                        isNaN(a) && (a = 0),
                        a > e.prop("max") && (a = parseInt(e.prop("max")), e.val(a)),
                        a ? t.$container.find("[data-promo-item]").addClass("_disabled") : t.$container.find("[data-promo-item]").removeClass("_disabled");
                        var n = a > 0;
                        t.$codeInput.prop("disabled", n),
                        t.updateDiscounts(0, a)
                    })), t.$codeInput.val()) {
                var e = t.fillManager.fill(t.$container);
                e.phone = $('[data-client-input="client.phone"]').val(),
                e.orderId = $("[name=id]").val(),
                t.sendAjaxRequest(t.$container.data("action"), e)
            }
            return app.log("Init app.PromoCodeFormManager"),
            !0
        },
        this.onAjaxSuccess = function (e, a) {
            var n = "success" !== e.status ? "_error" : "success";
            t.toggleDiscountInfo(e.is_phone_code),
            t.$resultInfo.removeClass("success _error");
            var i = e.discount_percent ? e.discount_percent : 0,
            o = e.discount_value ? e.discount_value : 0;
            this.updateDiscounts(i, o),
            "success" !== e.status ? t.$container.addClass("has-error") : t.$container.removeClass("has-error"),
            t.$resultInfo.addClass(n).html(e.message).show()
        },
        this.updateDiscounts = function (t, e) {
            $(window).trigger("BaseIntervalManager.setDiscountPercent", [t]),
            $(window).trigger("BaseIntervalManager.setDiscountValue", [e]),
            $(window).trigger("ManagerDeliveries.updateTotalPrice")
        },
        this.toggleDiscountInfo = function (e) {
            var a = t.$container.parents("[data-basket-page]");
            if (e)
                return a.find("[data-discount-info]").addClass("hide"), void a.find("[data-email-notify-info]").removeClass("hide");
            a.find("[data-discount-info]").removeClass("hide"),
            a.find("[data-email-notify-info]").addClass("hide")
        }
    }), app.OrderBonusManager = app.BaseFormManager.extend(function () {
        this.$container = $("[data-basket-page]"),
        this.$bonus = null;
        var t = this;
        this.constructor = function () {
            return !!t.$container.length && (t.$bonus = t.$container.find("[data-bonus-from-order]"), $(window).on("OrderBonusManager.setBonus", function (e, a) {
                    t.setBonus(a)
                }), app.log("Init app.OrderBonusManager"), !0)
        },
        this.setBonus = function (e) {
            var a = t.$bonus.data("bonusPercent"),
            n = parseInt(e * a / 100);
            t.$bonus.text(n)
        }
    }), app.AutoOrdersManager = Class.extend(function () {
        var t = this;
        this.timerStart = !1,
        this.phoneTwostep = !1,
        this.container = $("[autoorders-container]"),
        this.alreadySentCode = "9999999999",
        this.btnSubmit = this.container.find("[btn-submit]"),
        this.btnOldWay = this.container.find("[force-old-way]"),
        this.orderDataPlace = this.container.find("[order-data-place]"),
        this.msgPlace = this.container.find("[autoorder-msg-place]"),
        this.codeTimerTimeout = this.container.find("[code-timer-timeout]"),
        this.errorCodePlace = this.container.find("[error-code]"),
        this.userContact = this.container.find("[user-contact]"),
        this.btnSendCode = this.container.find("[btn-send-sms-code]"),
        this.btnSendCode2 = this.container.find("[btn-send-sms-code2]"),
        this.inputCode = this.container.find("[user-code]"),
        this.btnCheckCode = this.container.find("[btn-check-code]"),
        this.checkBoxContact = this.container.find("[data-mask-toggle]"),
        this.firstStepBlockCol2 = this.container.find("[first-step-block-col2]"),
        this.secondStepBlockCol2 = this.container.find("[second-step-block-col2]"),
        this.codeTimer = this.container.find("[code-timer]"),
        this.btnChangeNumber = this.container.find("[btn-change-number]"),
        this.changeTypeContact = this.container.find("[change-type-contact]"),
        this.autoOrdersStatuses = $("[auto-orders-statuses]"),
        this.constructor = function () {
            return this.autoOrdersStatuses.length && t.runCheckStatuses(),
            !!this.container.length && (t.initSubmitBtn(), t.initSendCode(), t.initCheckCode(), t.initChangeContact(), app.log("Init app.AutoOrdersManager"), !0)
        },
        this.initSubmitBtn = function () {
            this.btnSubmit.on("click", function () {
                $("#BasketForm").submit()
            }),
            this.btnOldWay.on("click", function () {
                $('[name="force_old_way"]').val(1),
                $("#BasketForm").submit()
            })
        },
        this.initChangeContact = function () {
            t.btnChangeNumber.on("click", function () {
                t.goFirstStep()
            })
        },
        this.initSendCode = function () {
            1 == t.userContact.data("set-disabled") && (t.userContact.prop("disabled", !0), t.changeTypeContact.prop("disabled", !0)),
            t.userContact.keyup(function (e) {
                t.getUserContact().length > 1 && t.allMessagesClear()
            }),
            t.btnSendCode2.on("click", function () {
                t.btnSendCode.click()
            }),
            t.btnSendCode.on("click", function () {
                var e = t.getUserContact();
                if (e.length < 7)
                    t.contactEmptyErrorShow();
                else {
                    t.contactEmptyErrorHide();
                    var a = {
                        userContact: e
                    };
                    t.allMessagesClear(),
                    t.inputCode.val(""),
                    $.ajax({
                        url: t.btnSendCode.attr("btn-send-sms-code"),
                        data: a,
                        type: "post",
                        dataType: "json",
                        success: function (e) {
                            if ("old_way" != e.status) {
                                if ("code_sent" != e.status)
                                    return "fail" == e.status ? (t.autoOrderShowMessage(e.message), void t.userContactEnable()) : void 0;
                                t.goSecondStep()
                            } else
                                t.goOldWay()
                        },
                        error: function (e) {
                            var a = t.parserErrorResponse(e);
                            a && a.forEach(function (e) {
                                t.autoOrderShowMessage(e)
                            })
                        }
                    })
                }
            })
        },
        this.goFirstStep = function () {
            t.userContactEnable(),
            t.setBtnStepFirst(),
            t.insertCodeHide()
        },
        this.goSecondStep = function () {
            t.setBtnStepSecond(),
            t.insertCodeShow(),
            t.btnSendCode2.hide()
        },
        this.initCheckCode = function () {
            t.inputCode.keyup(function (e) {
                var a = $(this).val(),
                n = 4 == a.length,
                i = a != t.alreadySentCode;
                n && i && t.btnCheckCode.click(),
                t.allMessagesClear()
            }),
            t.btnCheckCode.on("click", function () {
                var e = {
                    userContact: t.getUserContact(),
                    userCode: t.inputCode.val()
                },
                a = e.userContact.length < 7,
                n = e.userCode.length < 4;
                a || n ? alert("Не верный контакт или код") : (t.alreadySentCode = e.userCode, t.allMessagesClear(), $.ajax({
                        url: t.btnCheckCode.attr("btn-check-code"),
                        data: e,
                        type: "post",
                        dataType: "json",
                        success: function (e) {
                            t.btnCheckCodeResult(e)
                        },
                        error: function (e) {
                            t.alreadySentCode = "9999999999";
                            var a = t.parserErrorResponse(e);
                            a && a.forEach(function (e) {
                                t.autoOrderShowMessage(e)
                            })
                        }
                    }))
            })
        },
        this.parserErrorResponse = function (t) {
            var e = null;
            return t.responseJSON && (e = $.map(t.responseJSON, function (t, e) {
                        return t
                    })),
            e
        },
        this.btnCheckCodeResult = function (e) {
            if ("fail" != e.status) {
                if ("ok" != e.status)
                    return "old_way" == e.status ? (t.errorCodeShowMessage(e.message), void t.goOldWay()) : void 0;
                t.goCreateOrder()
            } else
                t.errorCodeShowMessage(e.message)
        },
        this.goOldWay = function () {
            this.btnSubmit.click()
        },
        this.goOldWayPost = function () {
            var e = {
                phone: t.getUserContact(),
                name: "noname"
            };
            $.ajax({
                url: "/auto-order/create-fast-order/",
                data: e,
                type: "post",
                dataType: "json",
                success: function (e) {
                    "ok" !== e.status || t.orderDataPlace.html(e.html)
                },
                error: function (e) {
                    var a = t.parserErrorResponse(e);
                    a && a.forEach(function (e) {
                        t.autoOrderShowMessage(e)
                    })
                }
            })
        },
        this.goCreateOrder = function () {
            t.btnSubmit.click()
        },
        this.setBtnStepSecond = function () {
            this.btnSendCode.hide()
        },
        this.setBtnStepFirst = function () {
            this.btnCheckCode.hide(),
            this.btnSubmit.hide(),
            this.btnSendCode.show()
        },
        this.userContactDisable = function () {
            t.userContact.prop("disabled", !0).css("background-color", "#f4f0e9"),
            t.changeTypeContact.prop("disabled", !0),
            t.btnChangeNumber.show()
        },
        this.userContactEnable = function () {
            t.userContact.prop("disabled", !1),
            t.userContact.parent("div").removeClass("true-field"),
            t.changeTypeContact.prop("disabled", !1),
            t.btnChangeNumber.hide()
        },
        this.insertCodeShow = function () {
            t.secondStepBlockCol2.show(),
            t.firstStepBlockCol2.addClass("hide-blk"),
            t.showCodeTimer(),
            t.phoneTwostep = !0
        },
        this.insertCodeHide = function () {
            t.secondStepBlockCol2.hide(),
            t.firstStepBlockCol2.removeClass("hide-blk"),
            t.hideCodeTimer(),
            t.phoneTwostep = !0
        },
        this.showCodeTimer = function () {
            if (t.codeTimer.show().addClass("mob-timer"), t.inputCode.focus(), !t.timerStart) {
                t.timerStart = !0;
                var e,
                a = t.codeTimerTimeout.attr("code-timer-timeout");
                e = setInterval(function () {
                        a > 0 ? (a--, t.codeTimerTimeout.text(a)) : (t.codeTimerTimeout.text(t.codeTimerTimeout.attr("code-timer-timeout")), t.codeTimer.hide().removeClass("mob-timer"), $(".phone-step2 .again-code").show(), t.btnSendCode2.show(), t.timerStart = !1, clearInterval(e))
                    }, 1e3)
            }
        },
        this.hideCodeTimer = function () {
            t.codeTimer.hide().removeClass("mob-timer"),
            t.timerStart = !1,
            $(".seconds-phone").text("")
        },
        this.autoOrderShowMessage = function (e) {
            e = "<li>" + e + "</li>",
            t.msgPlace.append(e)
        },
        this.autoOrderShowMessageClear = function () {
            t.msgPlace.text("")
        },
        this.errorCodeShowMessage = function (e) {
            t.errorCodePlace.text(e).show()
        },
        this.errorCodeShowMessageClear = function () {
            t.errorCodePlace.text("").hide()
        },
        this.allMessagesClear = function () {
            t.autoOrderShowMessageClear(),
            t.errorCodeShowMessageClear(),
            t.contactEmptyErrorHide()
        },
        this.filterInt = function (t) {
            var e = t.replace(/[^0-9]/gi, "");
            return parseInt(e, 10)
        },
        this.contactEmptyErrorShow = function () {
            t.container.find("[autoorder-msg-place]").html("<li>Заполните Имя и Телефон</li>")
        },
        this.contactEmptyErrorHide = function () {
            t.container.find("[autoorder-msg-place]").html("")
        },
        this.getUserContact = function () {
            var e = t.userContact.val(),
            a = e,
            n = !t.checkBoxContact.is(":checked"),
            i = e.length > 0;
            return n && i && (a = t.filterInt(e).toString()),
            a
        },
        this.runCheckStatuses = function () {
            setInterval(function () {
                t.checkStatuses()
            }, 3e4)
        },
        this.checkStatuses = function () {
            var e = t.autoOrdersStatuses.attr("auto-orders-statuses");
            $.ajax({
                url: e,
                type: "GET",
                dataType: "json",
                success: function (e) {
                    "ok" != e.status || t.autoOrdersStatuses.html(e.html)
                },
                error: function (t) {
                    app.log(t)
                }
            })
        }
    }), app.BoquetPackManager = Class.extend(function () {
        var t = $("[product-pack-items]"),
        e = t.find("[data-id]"),
        a = this;
        this.constructor = function () {
            return !!t.length && (e.change(a.onClickHandler), this.checkDefaultItem(), app.log("Init app.BoquetPackManager"), !0)
        },
        this.checkDefaultItem = function () {
            var e = t.find("[data-productPackItem-is_default=1]");
            e.length > 0 && (e.click(), window.scrollTo(0, 0))
        },
        this.onClickHandler = function (a) {
            var n = {},
            i = $(a.currentTarget),
            o = i.attr("data-productPackItem-price"),
            s = t.attr("data-only-one"),
            r = t.find("[data-parameter=product-pack-items-price]");
            if (r.val(0), 1 == s) {
                e.each(function () {
                    if (i.data("id") != $(this).data("id")) {
                        var t = $(this).parent("label");
                        t.removeClass("_active"),
                        t.find(".ideal-check").removeClass("checked focus")
                    }
                });
                var c = i.parent("label");
                c.addClass("_active"),
                c.find(".ideal-check").addClass("checked focus"),
                n[i.data("id")] = 1,
                r.val(o)
            } else
                e.filter(":checked").each(function () {
                    n[$(this).data("id")] = 1
                });
            if (t.data("value", n).attr("data-value", JSON.stringify(n)), r.change(), 1 == s)
                return a.stopImmediatePropagation(), !1
        }
    }), app.ProductFlowersRelativesManager = Class.extend(function () {
        this.$content = $("[data-catalog-product-flowers-relatives]");
        var t = this;
        this.constructor = function () {
            return !!t.$content.length && (t.sendAjaxRequest(t.$content.data("action")), app.log("Init app.ProductFlowersRelativesManager"), !0)
        },
        this.sendAjaxRequest = function (e) {
            $.ajax({
                type: "GET",
                url: e,
                dateType: "JSON",
                success: function (e) {
                    t.onAjaxSuccess(e)
                },
                error: function (e) {
                    t.onAjaxError(e)
                }
            })
        },
        this.onAjaxSuccess = function (e) {
            "ok" === e.status ? t.$content.html(e.content) : (app.PopupManager("Что-то случилось. Расскажите нам."), app.log(e))
        },
        this.onAjaxError = function (t, e) {
            app.messages.add("Что-то случилось. Расскажите нам."),
            app.log(t)
        }
    }), app.ProductGiftsRelativesManager = Class.extend(function () {
        this.$content = $("[data-catalog-product-gifts-relatives]");
        var t = this;
        this.constructor = function () {
            return !!t.$content.length && (t.sendAjaxRequest(t.$content.data("action")), app.log("Init app.ProductGiftsRelativesManager"), !0)
        },
        this.sendAjaxRequest = function (e) {
            $.ajax({
                type: "GET",
                url: e,
                dateType: "JSON",
                success: function (e) {
                    t.onAjaxSuccess(e)
                },
                error: function (e) {
                    t.onAjaxError(e)
                }
            })
        },
        this.onAjaxSuccess = function (e) {
            "ok" === e.status ? t.$content.html(e.content) : (app.PopupManager("Что-то случилось. Расскажите нам."), app.log(e))
        },
        this.onAjaxError = function (t, e) {
            app.messages.add("Что-то случилось. Расскажите нам."),
            app.log(t)
        }
    }), app.BaseBasketManager = app.BaseFormManager.extend(function () {
        this.$container = $("[data-basket-container]"),
        this.fillManager = null,
        this.data = {};
        var t = this;
        this.constructor = function () {
            return !!t.$container.length && (t.fillManager = new app.BaseFillManager, t.setData(t.$container.data("basketContainer")), t.updateViews(), $(document).on("click", "[data-to-basket], [data-basket-control]", function () {
                    var e = $(this).closest("[data-product-item]"),
                    a = t.fillManager.fill(e);
                    t.changeProduct(a)
                }), $(document).on("click", "[data-to-basket-additional]", function () {
                    $("[data-product-detail] [data-to-basket]").trigger("click")
                }), $(document).on("change", "[data-basket-control]", function () {
                    var e = $(this).closest("[data-product-item]"),
                    a = t.fillManager.fill(e);
                    t.changeProduct(a)
                }), $(document).on("change", "[data-basket-control]", function () {
                    var t = $(this),
                    e = t.parent(".basket__item-addition").parent().find("[data-type-flask]");
                    "radio" === t.attr("type") && e.each(function () {
                        t.data("type-flask") != $(this).data("type-flask") && ($(this).parents("LABEL").removeClass("_active"), $(this).prop("checked", !1).attr("checked", !1), $(this).next(".ideal-radio").removeClass("checked"))
                    })
                }), $(document).on("click", "[data-basket-remove]", function () {
                    var e = $(this),
                    a = e.data("no-actions");
                    t.removeProduct({
                        id: e.data("id"),
                        noActions: a ? 1 : 0
                    })
                }), $("[data-modifies-order]").on("change", function () {
                    var e = parseInt($(this).data("order-product-id"), 10);
                    if (e) {
                        var a = parseInt($(this).data("order-product-quantity"), 10) || 1;
                        a <= 0 || ($(this).is(":checked") ? t.changeProduct({
                                id: e,
                                q: a,
                                noActions: 1
                            }) : t.removeProduct({
                                id: e,
                                noActions: 1
                            }))
                    }
                }), t.registerEvents(), t.initBasketSliders(), this.initSimilarProductsContainerScroll(), t.initSimilarProductsActions(), t.initBasketFloatingButton(), app.log("Init app.BaseBasketManager"), !0)
        },
        this.registerEvents = function () {
            $(window).on("BaseBasketManager.setOrderDiscount", function (e, a) {
                t.setOrderDiscount(a)
            }),
            $(window).on("BaseBasketManager.setClientDiscount", function (e, a) {
                t.setClientDiscount(a)
            }),
            $(window).on("BaseBasketManager.updateTotalCounters", t.updateTotalCounters)
        },
        this.changeProduct = function (e, a, n) {
            t.sendAjaxRequest(t.$container.data("basketChangeAction"), e, a, n)
        },
        this.removeProduct = function (e, a, n) {
            t.sendAjaxRequest(t.$container.data("basketRemoveAction"), e, a, n)
        },
        this.onAjaxSuccess = function (e) {
            return "error" == e.status || ("ok" == e.status ? (e.checkMinimalPrice ? t.enableOrder() : t.disableOrder(), t.setData(JSON.parse(e.data.basket)), t.updateViews(), t.checkAction(e.data.action), $(window).trigger("PopUpBasketDiscount2.calcDiscount"), !0) : void t.sup.onAjaxSuccess(e))
        },
        this.setData = function (e) {
            t.data = e
        },
        this.getEndSum = function () {
            var e = t.getFullSum(),
            a = e - t.getDiscountAll(e);
            return a + t.getAdditionalFeeSum(a)
        },
        this.getFullSum = function () {
            var e = 0;
            for (var a in t.data.prices)
                t.data.prices.hasOwnProperty(a) && t.data.prices[a] && (e += parseInt(t.data.prices[a]));
            return e
        },
        this.getProductsCount = function () {
            if (!t.data || !t.data.offers)
                return 0;
            var e = 0;
            for (var a in t.data.offers)
                t.data.offers.hasOwnProperty(a) && t.data.offers[a] && t.data.offers[a].parameters && t.data.offers[a].parameters.quantity && (e += parseInt(t.data.offers[a].parameters.quantity, 10));
            return e
        },
        this.getAdditionalFeeSum = function (e) {
            var a = t.$container.find("[data-additional_fee-price]"),
            n = a.attr("data-additional_fee-price"),
            i = a.attr("data-additional_fee-limit");
            return n = parseInt(n),
            i = parseInt(i),
            n > 0 && e < i ? (a.show(), n) : (a.hide(), 0)
        },
        this.getOffersNum = function () {
            return void 0 === t.data.offers ? 0 : t.getFullSum()
        },
        this.updateBasketRow = function (e, a) {
            var n = $(a),
            i = n.find("[data-source=id]").val();
            t.data.offers.hasOwnProperty(i) ? n.find("[data-cost-num]").text(t.data.offers[i].totalSum) : n.remove()
        },
        this.updateTotalCounters = function () {
            var e = t.getEndSum();
            t.$container.find("[data-total-price]").text(t.getEndSum()).data("price", e).data("total", e);
            var a = t.getProductsCount();
            $("[data-total-basket-products-count]").text(a),
            a > 0 ? $("[data-total-basket-products-count-wrapper]").show() : $("[data-total-basket-products-count-wrapper]").hide(),
            $(window).trigger("ManagerDeliveries.updateTotalPrice")
        },
        this.checkAction = function (e) {
            var a = window.location.pathname;
            "/" != a.slice(-1) && (a += ""),
            "redirect" == e.type && a != t.$container.data("orderAction") && a != t.$container.data("basketAction") && window.location.replace(t.$container.data("basketAction"))
        },
        this.updateVendorDelivery = function (e) {
            t.$container.find("[data-vendor-delivery]").find("[data-vendor-delivery-price]").text(e),
            0 == e ? t.$container.find("[data-vendor-delivery]").addClass("hide") : t.$container.find("[data-vendor-delivery]").removeClass("hide")
        },
        this.updateBasketView = function () {
            t.updateVendorDelivery(t.data.prices.vendor_delivery),
            t.getOffersNum() ? (t.$container.find("[data-basket-empty]").addClass("hide"), t.$container.find("[data-basket-row]").each(t.updateBasketRow)) : (t.$container.find("[data-basket-empty]").removeClass("hide"), t.$container.find("[data-basket-total], [data-save-client-form]").addClass("hide"), t.$container.find("[data-basket-row]").remove())
        },
        this.disableOrder = function () {
            t.$container.find("[data-basket-next]").prop("disabled", !0).end().find("[data-basket-min-total-error]").removeClass("hide")
        },
        this.enableOrder = function () {
            t.$container.find("[data-basket-next]").prop("disabled", !1).end().find("[data-basket-min-total-error]").addClass("hide")
        },
        this.updateViews = function () {
            t.updateTotalCounters(),
            t.updateBasketView()
        },
        this.getDiscountAll = function (e) {
            void 0 === e && (e = t.getFullSum());
            var a = e - t.data.discounts.discount_order;
            return t.data.discounts.discount_order + Math.ceil(a * t.data.discounts.discount_client / 100)
        },
        this.setOrderDiscount = function (e) {
            t.data.discounts.discount_order = e
        },
        this.setClientDiscount = function (e) {
            t.data.discounts.discount_client = e
        },
        this.initBasketSliders = function () {
            var t = $("[data-similar-products-main-slider]"),
            e = $("[data-similar-products-thumbs-slider]");
            if (t.length && e.length) {
                var a = new Swiper(e, {
                        slidesPerView: 4.5,
                        freeMode: !0,
                        watchSlidesVisibility: !0,
                        watchSlidesProgress: !0
                    });
                new Swiper(t, {
                    slidesPerView: 1,
                    navigation: {
                        nextEl: ".more-button-next",
                        prevEl: ".more-button-prev"
                    },
                    thumbs: {
                        swiper: a
                    }
                })
            }
        },
        this.initSimilarProductsContainerScroll = function () {
            var t = $("[data-similar-products-list-container]"),
            e = $("[data-similar-products-container-scroll-button]");
            if (t.length && e.length) {
                var a = t.get(0);
                new PerfectScrollbar(a, {
                    wheelPropagation: !1
                });
                e.on("click", function () {
                    var e = a.scrollTop,
                    n = t.innerHeight();
                    $(a).animate({
                        scrollTop: e + n
                    }, 350)
                })
            }
        },
        this.initSimilarProductsActions = function () {
            var e = $("[data-similar-product-basket-button]");
            e.length && e.on("click", function () {
                var e = $(this);
                if (1 !== parseInt(e.data("loading"), 10)) {
                    var a = parseInt(e.data("product-id"), 10);
                    if (a) {
                        e.data("loading", "1");
                        var n = {
                            id: a,
                            q: 1,
                            noActions: 1
                        };
                        t.changeProduct(n, function () {
                            location.reload()
                        }, function (t) {
                            console.error("[BaseBasketManager@initSimilarProductsActions] Got error while trying to add similar product to the basket.", {
                                productId: a,
                                response: t
                            }),
                            alert("Не удалось добавить товар в корзину. Повторите попытку.")
                        })
                    }
                }
            })
        },
        this.initBasketFloatingButton = function () {
            var t = $("[data-mobile-order-form]"),
            e = $("[data-mobile-order-floating-button]");
            if (t.length && e.length) {
                var a = $(window),
                n = $(".step1-basketmob"),
                i = function (e) {
                    var i = t[0].getBoundingClientRect();
                    i.top >= a.innerHeight() || i.top <= 0 - (t.innerHeight() - 98) ? n.addClass("show-btn") : !0 === e && n.removeClass("show-btn")
                };
                i(!1),
                a.scroll(function () {
                    i(!0)
                });
                var o = $("html, body"),
                s = $(".m-header__top").innerHeight() || 58;
                e.on("click", function () {
                    o.animate({
                        scrollTop: t.offset().top - s
                    })
                })
            }
        };
        var e = !1;
        $(".valid-basket-btn").click(function (t) {
            var a = $(".mail-blk-inp input").val();
            $(".phone-blk-inp input").val(),
            $(".mobile-v .phone-blk-inp input").val(),
            $(".mobile-v .mail-blk-inp input").val();
            e && 0 == $(".mail-step2 .code-inp").val().length && $(".mail-step2 .err-small").addClass("err-show"),
            $(".basket__form-contacts input").prop("checked") && (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(a).toLowerCase()) ? ($(".basket-col2-cont").addClass("hide-blk"), $(".mail-step2").show(), e = !0) : $(".err-great").addClass("err-show"))
        }),
        $(".none-code").click(function (t) {
            $(".none-code").hide(),
            $(".mail-step2 .again-code").show()
        }),
        $(".img-err").click(function (t) {
            $(this).parent().removeClass("err-show")
        }),
        $("input").focus(function (t) {
            $(".err").removeClass("err-show")
        }),
        $(".step5").length && $(".grid__content").addClass("step5-blk"),
        t.$container.on("click", "[data-panel-order-delete]", function (t) {
            $("[data-panel-order-delete-modal]").show();
            var e = window.scrollX,
            a = window.scrollY;
            window.onscroll = function () {
                window.scrollTo(e, a)
            }
        }),
        t.$container.on("click", "._active[data-panel-order-call]", function (t) {
            var e = $(this);
            return $.post(e.data("panelOrderCallAction"), {
                hash: e.data("panel-order-call-hash")
            }, function (t) {
                t.success && e.removeClass("_active").find("SPAN").text(t.message)
            }, "json"),
            !1
        }),
        $(".close-cancel-poup, #no-notorder").click(function (t) {
            $("[data-panel-order-delete-modal], #edit-order-basket").hide(),
            window.onscroll = function () {}
        }),
        $(document).mouseup(function (t) {
            var e = $(".cancel-order-popup, .edit-order-popup");
            e.is(t.target) || 0 !== e.has(t.target).length || e.parent().hide()
        }),
        $(".edit-inp-select").click(function (t) {
            $(this).next(".edit-selected").is(":hidden") ? $(this).next(".edit-selected").slideDown() : $(this).next(".edit-selected").slideUp()
        }),
        $(".edit-selected-txt").click(function (t) {
            var e = $(this).text();
            $(this).parent().parent().parent().find(".edit-input").text(e),
            $(this).parent().parent().slideUp()
        }),
        $(document).mouseup(function (t) {
            var e = $(".edit-selected");
            e.is(t.target) || 0 !== e.has(t.target).length || e.slideUp()
        }),
        $(".step5-btn-edit, .mob-edit-btn").click(function (t) {
            $("#edit-order-basket").show(),
            $(".edit-order-popup").innerHeight() > $(window).innerHeight() && $("#edit-order-basket").addClass("scroll-popup");
            var e = window.scrollX,
            a = window.scrollY;
            window.onscroll = function () {
                window.scrollTo(e, a)
            }
        }),
        $(".mob-detail").click(function (t) {
            $(this).toggleClass("detail-btn-rotate"),
            $(".detail-sect, .detai-small-sect").slideToggle()
        }),
        $(".edit-calendar").datepicker({
            OnClose: function (t, e) {},
            onSelect: function (t, e) {
                $(".edit-calendar").removeClass("basket-calendar-show"),
                $(this).find(".edit-input").val(t)
            }
        }),
        $(".edit-calendar").click(function (t) {
            $(this).toggleClass("basket-calendar-show")
        })
    }), app.FlorBasketManager = app.BaseBasketManager.extend(function () {
        var t = this;
        this.constructor = function () {
            return !!t.sup() && (t.orderingProgressTabBehavior(), app.log("Init app.FlorBasketManager"), !0)
        },
        this.slowScroll = function (t) {
            return !!$(t).length && ($("html, body").animate({
                    scrollTop: $(t).offset().top - 0
                }, 1e3), !1)
        },
        this.orderingProgressTabBehavior = function () {
            t.$container.find("[data-ordering-progress-tab]").click(function (e) {
                t.slowScroll("#BasketForm");
                var a = t.$container.find("[autoorder-msg-place]");
                a.length && a.html("<li>Заполните Имя и Телефон</li>")
            })
        },
        this.updateTotalCounters = function () {
            t.sup.updateTotalCounters(),
            t.$container.find("[data-cnt]").text(t.getOffersNum()).data("cnt", t.getOffersNum())
        },
        this.checkAction = function (e) {
            var a = window.location.pathname,
            n = (a += "/" !== a.slice(-1) ? "/" : "") !== t.$container.data("orderAction"),
            i = a !== t.$container.data("basketAction"),
            o = n && i;
            if ("reload" === e.type && window.location.reload(), "redirect" === e.type && o && window.location.replace(t.$container.data("basketAction")), "popup" === e.type && o) {
                var s = new app.PopUpBase(!1, "_no-close");
                $("#popup [data-popup-title]").html(e.popup),
                s.show(),
                e.autoClose && setTimeout(function () {
                    $.fancybox.close()
                }, 1e3 * e.autoClose)
            }
        }
    }), app.$window = $(window), app.$document = $(document), app.log = function (t) {
    !0 === app.debug && console.log(t)
}, app.groupLog = function (t) {
    !0 === app.debug && console.groupCollapsed(t)
}, app.groupClose = function () {
    !0 === app.debug && console.groupEnd()
}, $.ajaxSetup({
    beforeSend: function (t, e) {
        var a = e.url;
        /^(http:\/\/|https:\/\/)/i.test(a) && 1 != a.indexOf(document.domain) || /^(GET|HEAD|OPTIONS|TRACE)$/i.test(e.type) || t.setRequestHeader("X-CSRF-TOKEN", $("meta[name=_token]").attr("content"))
    }
}), app.ManagerBase = Class.extend(function () {
        this.constructor = function () {
            app.log("Create base manager.")
        }
    }), app.ManagerChoosenSizes = app.ManagerBase.extend(function () {
        this.$container = $("[data-sizes]"),
        this.$ingredients = $("[data-ingredient-value]"),
        this.defaultPrice = null;
        var t = this;
        this.constructor = function () {
            this.$container.length && (t.defaultPrice = t.$container.data("defaultPrice"), t.$container.on("click", "[data-price-btn]", function () {
                    var e = $(this).val(),
                    a = ["min", "normal", "max"][$(this).data("source").charAt(5)],
                    n = $("[data-image-links]").data("imageLinks");
                    $("body").hasClass("mobile-v") ? $(window).trigger("Change.ProductCardGalleryPhotosMob", [n, a]) : $(window).trigger("Change.ProductCardGalleryPhotos", [n, a]),
                    t.$ingredients.each(function (a, n) {
                        var i = $(n),
                        o = i.data("ingredientValue");
                        e < t.defaultPrice ? o = i.data("ingredientMin") : e > t.defaultPrice && (o = i.data("ingredientMax")),
                        i.html(o)
                    }),
                    app.setPossibleProductText("normal" == a ? "yes" : "no")
                }), app.log("Init app.ManagerChoosenSizes"))
        }
    }), app.ManagerPolicy = app.ManagerBase.extend(function () {
        this.$container = $("[data-product-detail]"),
        this.policy = null,
        this.policies = null;
        var t = this;
        this.constructor = function () {
            if (!t.$container.length)
                return !1;
            t.initPolicies();
            var e = t.$container.data("productItem");
            (t.policies[e.policy] ? t.policies[e.policy] : t.policies.nullpolicy).fill(t.$container, e),
            app.log("Init app.ManagerPolicy")
        },
        this.initPolicies = function () {
            t.policies = {
                simplepolicy: new app.SimplePolicyManager,
                plusminuspolicy: new app.PlusMinusPolicyManager,
                monopolicy: new app.MonoPolicyManager,
                compositpolicy: new app.CompositPolicyManager,
                calculatorpolicy: new app.CalculatorPolicyManager,
                rosesinflaskpolicy: new app.RosesInFlaskPolicyManager,
                nullpolicy: new app.NullPolicyManager
            }
        }
    }), app.ManagerChoosenVariant = app.ManagerBase.extend(function () {
        this.$heightSlider = $("[data-height-slider]"),
        this.$variantsSlider = $("[data-variants-slider]"),
        this.$heightContainer = $("[data-height-container]"),
        this.$heightButton = $("[data-height-variant]"),
        this.$counter = $("[data-count-in]"),
        this.$specs = $("[data-specs]"),
        this.$countRadios = $("[data-count-change]"),
        this.defaultHeight = null,
        this.defaultCount = null,
        this.nowCount = null,
        this.selectedHeight = null,
        this.heights = [];
        var t = this;
        this.constructor = function () {
            this.$heightSlider.length && (t.initDefaultVariantParams(), t.heights = t.$heightSlider.data("heightValues"), t.selectedHeight = t.heights[0], 1 == t.heights.length && t.$heightSlider.closest("[data-height-variants]").hide(), $("[combobox-custom-count]").on("change", function () {
                    var e = $(this).find("option:selected");
                    if (e.length) {
                        var a = e.data("customCount");
                        t.setCounterValue(a);
                        var n = $("[combobox-custom-count]");
                        n.find("option").removeAttr("selected"),
                        n.find("[data-custom-count=" + a + "]").attr("selected", "selected")
                    }
                }), $("[data-custom-count]").on("change", function () {
                    var e = $(this).data("customCount");
                    t.setCounterValue(e)
                }), $("[data-custom-user-count]").on("input", function () {
                    var e = $(this),
                    a = e.val(),
                    n = e.closest("[data-variants-for-height]");
                    a ? (t.setCounterValue(t.nowCount), n.find("[data-custom-count]").closest("label").removeClass("_active"), t.setCounterValue(a)) : (n.find("[data-custom-count=" + t.nowCount + "]").closest("label").addClass("_active"), t.setCounterValue(t.nowCount))
                }), t.$counter.on("change", function () {
                    var e = $(this),
                    a = parseInt(e.val()),
                    n = parseInt(e.prop("min")),
                    i = parseInt(e.prop("max"));
                    (a < n || isNaN(a)) && e.val(n),
                    a > i && e.val(i),
                    t.$variantsSlider.slider("value", e.val())
                }), t.initSliders(), t.setHeight(parseInt(t.defaultHeight)), t.$heightButton.change(function () {
                    t.setHeight($(this).val())
                }), $("[data-variants] [data-slider-step]").on("click", t.changeVariant), t.$countRadios.change(function () {
                    t.$counter.val($(this).val()).change()
                }), app.log("Init app.ManagerChoosenVariant"))
        },
        this.initDefaultVariantParams = function () {
            var e = $("[data-product-detail]").data("productItem");
            t.defaultHeight = e.height,
            t.defaultCount = e.options.vCount,
            t.nowCount = t.defaultCount
        },
        this.initSliders = function () {
            t.$variantsSlider.slider({
                slide: function (e, a) {
                    t.setCounterValue(a.value)
                }
            }),
            t.$heightSlider.slider({
                max: t.heights.length - 1,
                change: function (e, a) {
                    null != e.originalEvent && t.setHeight(t.heights[a.value])
                }
            }),
            t.$heightSlider.closest("[data-height-variants]").find("[data-slider-step]").on("click", function (e) {
                e.preventDefault();
                var a = $(e.target).data("sliderStep");
                t.setHeight(a)
            })
        },
        this.setHeight = function (e) {
            e = parseInt(e),
            t.nowCount = t.$counter.val(),
            t.selectedHeight = e,
            t.$heightContainer.find("[data-height]").val(e).change(),
            t.$specs.find("[data-specs-height-val]").text(e + "см."),
            t.$heightSlider.slider("value", t.heights.indexOf(t.selectedHeight)).change(),
            t.initVariantsSlider(e)
        },
        this.initVariantsSlider = function (e) {
            var a = $('[data-variants-for-height]:not(".hide")'),
            n = a.find("[data-container-item]._active"),
            i = a.find("[data-custom-user-count]"),
            o = i.val();
            $("[data-variants-for-height]").addClass("hide");
            var s,
            r = $("[data-variants-for-height=" + t.selectedHeight + "]");
            (r.removeClass("hide"), n.length) && r.find("[data-radio-style-inp][data-custom-count='" + n.find("[data-radio-style-inp]").data("custom-count") + "']").parent().addClass("_active").find("[data-radio-style-inp]").data("no-clean", !0).attr("checked", !0).prop("checked", !0);
            i.length && r.find("[data-custom-user-count]").val(o),
            a.data("variants-for-height") != r.data("variants-for-height") && a.find("[data-container-item]").removeClass("_active").data("no-clean", !0).attr("checked", !1).prop("checked", !1),
            a.find("[data-radio-style-inp]").val("");
            var c = r.data("minVariant"),
            d = r.data("maxVariant");
            t.$variantsSlider.slider("option", "min", c),
            t.$variantsSlider.slider("option", "max", d),
            s = t.nowCount ? t.nowCount : t.defaultCount,
            t.$counter.attr("min", c).attr("max", d),
            t.setCounterValue(s)
        },
        this.changeVariant = function (e) {
            e.preventDefault();
            var a = $(e.target).data("sliderStep");
            t.$variantsSlider.slider("value", a),
            t.setCounterValue(a)
        },
        this.setCounterValue = function (e) {
            t.toggleSpecs(e),
            t.$counter.val(e).change(),
            t.nowCount = e
        },
        this.toggleSpecs = function (e) {
            e == t.defaultCount && t.defaultHeight == t.selectedHeight ? t.$specs.find("[data-specs-diameter], [data-specs-weight]").show() : t.$specs.find("[data-specs-diameter], [data-specs-weight]").hide()
        }
    }), app.AjaxLoaderBase = Class.extend(function () {
        this.$container = null,
        this.prefix = "ajax",
        this.back = !1;
        var t = this;
        this.navigationDirection = function (e) {
            t.back ? t.back = !1 : history.pushState(null, null, e)
        },
        this.constructor = function (e) {
            t.$container = e,
            window.addEventListener && window.addEventListener("popstate", function (e) {
                t.back = !0;
                var a = location.pathname.split("/");
                void 0 !== a[1] && a[1],
                void 0 !== a[2] && a[2]
            }, !1)
        },
        this.sendRequest = function (e, a, n) {
            n = n ? "?" + n : "";
            var i = "/" + e + "/" + a + (a.length ? "/" : "") + n;
            t.navigationDirection(i),
            $.post("/" + t.prefix + "/" + e + "/" + a + n, {}, t.onAjaxSuccess, "HTML")
        },
        this.onAjaxSuccess = function (e) {
            t.$container.html(e),
            t.$container.find("img.lazy").lazyload({
                threshold: 10
            })
        }
    }), app.AjaxLoaderCatalog = app.AjaxLoaderBase.extend(function () {
        var t = this;
        this.constructor = function (e) {
            t.sup(e),
            $(window).on("AjaxLoaderCatalog.sendRequest", function (e, a, n, i) {
                t.sendRequest(a, n, i)
            }),
            app.log("Init app.AjaxLoaderCatalog")
        }
    }), app.SendManagerBase = Class.extend(function () {
        this.$form = $("[data-form-selector]");
        var t = this;
        this.constructor = function () {
            t.$form.submit(function () {
                return $.post(t.$form.attr("action"), t.$form.serialize(), t.onAjaxSuccess, "JSON"),
                !1
            })
        },
        this.onAjaxSuccess = function (t) {
            app.log("base onAjaxSuccess", t)
        }
    }), app.SendManagerReview = app.SendManagerBase.extend(function () {
        this.$form = $("[data-form-review]");
        var t = this,
        e = this.$form.find("[data-error]"),
        a = this.$form.find("[data-captcha-code]"),
        n = this.$form.find("[data-captcha-input]"),
        i = this.$form.find("[data-captcha-img]"),
        o = $("[data-form-review-result]"),
        s = o.find("[data-add-one]");
        this.constructor = function () {
            this.$form.length && (this.sup(), s.click(function (a) {
                    a.preventDefault(),
                    t.$form.trigger("reset"),
                    e.addClass("hide"),
                    t.$form.fadeIn(300),
                    o.fadeOut(300, function () {
                        o.addClass("hide")
                    })
                }), app.log("Init app.SendManagerReview"))
        },
        this.onAjaxSuccess = function (s) {
            "ok" == s.result ? (t.$form.fadeOut(300), o.fadeIn(300, function () {
                    o.removeClass("hide")
                })) : "error" == s.result && e.removeClass("hide").find("[data-error-text]").text(s.error),
            a.val(s.code),
            i.attr("src", i.data("captchaImg") + s.code),
            n.val("")
        }
    }), app.SendManagerAsk = app.SendManagerBase.extend(function () {
        this.$form = $("[data-form-question]");
        this.constructor = function () {
            this.$form.length && (this.sup(), app.log("Init app.SendManagerAsk"))
        };
        var t = this.$form.find("input, textarea"),
        e = this.$form.find("[data-form-base-fields]"),
        a = this.$form.find("[data-form-base-success]");
        this.onAjaxSuccess = function (n) {
            n.errors ? (t.removeClass("_error"), $.each(n.errors, function (e, a) {
                    t.filter('[name="' + e + '"]').addClass("_error")
                })) : (e.fadeOut(300), a.fadeIn(300, function () {
                    a.removeClass("hide")
                }))
        }
    }), app.PopUpBase = Class.extend(function () {
        this.id = "PopUp",
        this.$content = $("#popup"),
        this.wrapCSS = "popup ";
        var t = this;
        this.constructor = function (e, a) {
            e && t.setContent(e),
            a && (t.wrapCSS += a)
        },
        this.show = function () {
            if (t.$content.length && (null === $.cookies.get(t.id) || $.cookies.get(t.id))) {
                var e = this;
                $.fancybox({
                    fitToView: !1,
                    autoSize: !0,
                    closeClick: !1,
                    openEffect: "none",
                    closeEffect: "none",
                    type: "html",
                    content: t.$content,
                    wrapCSS: t.wrapCSS,
                    padding: 0,
                    tpl: {
                        closeBtn: t.close
                    },
                    afterShow: function () {
                        e.$content.find('[data-cmd="fb-close"]').click(function () {
                            $.fancybox.close()
                        }).end().find('[data-cmd="dont-show"]').change(function () {
                            e.toggle()
                        }),
                        $.isFunction(e.afterShow) && e.afterShow()
                    },
                    afterClose: function () {
                        $.isFunction(e.afterClose) && e.afterClose()
                    }
                })
            }
        },
        this.setContent = function (e) {
            t.$content.html(e)
        }
    }), app.PopUpToBasket = app.PopUpBase.extend(function () {
        this.cookie = "test",
        this.id = "popup-chocolate",
        this.isEnable = !1,
        this.isOpen = !1,
        this.wasShow = !1;
        var t = this;
        this.constructor = function (e) {
            10 == e.data("containerPopupBasket") && (t.close = '<a class="fancybox-item fancybox-close btn-close" href="javascript:;"></a>'),
            $("html").hasClass("mobile") && (t.close = ""),
            t.cookie = e.data("cookie"),
            t.$content = e,
            t.wrapCSS = e.attr("class")
        },
        this.show = function () {
            if (!t.wasShow && (t.wasShow = !0, t.$content.length && (!1 !== $.cookies.get(t.cookie) && t.enable(), 1 == t.$content.data("auto") && t.$content.find("[data-to-basket]").click(), null === $.cookies.get(t.cookie) || $.cookies.get(t.cookie)))) {
                var e = this;
                if (app.utils.isMobile) {
                    var a = $("[data-mini-popup]"),
                    n = $("[data-mini-popup-in]"),
                    i = $("[data-mini-popup-close]");
                    n.html(t.$content.clone()),
                    a.show(),
                    $.isFunction(e.afterShow) && e.afterShow(),
                    $(window).on("scroll.popupClose", function (t) {
                        i.click()
                    }),
                    i.on("click", function () {
                        $(window).off("scroll.popupClose"),
                        a.hide(),
                        $.isFunction(e.afterClose) && e.afterClose()
                    })
                } else {
                    var o = {
                        fitToView: app.utils.isMobile,
                        autoSize: !0,
                        closeClick: !1,
                        openEffect: "none",
                        closeEffect: "none",
                        type: "html",
                        content: t.$content,
                        wrapCSS: app.utils.isMobile ? "popup" : t.wrapCSS,
                        padding: 0,
                        tpl: {
                            closeBtn: t.close
                        },
                        afterShow: function () {
                            e.$content.find('[data-cmd="fb-close"]').click(function () {
                                $.fancybox.close()
                            }).end().find('[data-cmd="dont-show"]').change(function () {
                                e.toggle()
                            }),
                            $.isFunction(e.afterShow) && e.afterShow()
                        },
                        afterClose: function () {
                            $.isFunction(e.afterClose) && e.afterClose()
                        }
                    };
                    app.utils.isMobile && (o.margin = 0),
                    $.fancybox(o)
                }
            }
        },
        this.disable = function () {
            t.isEnable = !1,
            $.cookies.set(t.cookie, !1, {
                domain: $("meta[name=cookieDomain]").attr("content")
            })
        },
        this.enable = function () {
            t.isEnable = !0,
            $.cookies.set(t.cookie, !0, {
                domain: $("meta[name=cookieDomain]").attr("content")
            })
        },
        this.toggle = function () {
            t.isEnable ? t.disable() : t.enable()
        },
        this.afterShow = function () {
            t.isOpen = !0,
            t.disable()
        },
        this.afterClose = function () {
            t.isOpen = !1
        }
    }), app.PopUpBasketDiscount = app.PopUpBase.extend(function () {
        this.id = "popup-basket-discount",
        this.cookie = "popupBasketDiscount",
        this.isEnable = !1,
        this.isOpen = !1,
        this.wasShow = !1;
        var t = this;
        this.constructor = function (e) {
            10 == e.data("containerPopupBasket") && (t.close = '<a class="fancybox-item fancybox-close btn-close" href="javascript:;"></a>'),
            $("html").hasClass("mobile") && (t.close = ""),
            t.cookie = e.data("cookie"),
            t.$content = e,
            t.wrapCSS = e.attr("class"),
            t.checkCookies() && t.setLinks()
        },
        this.checkCookies = function () {
            return null === $.cookies.get(t.cookie) || $.cookies.get(t.cookie)
        },
        this.setLinks = function () {
            var e = $("[link-return-back]"),
            a = e.attr("onclick");
            e.attr("onclick_old", a).attr("onclick", "return false;"),
            $("a").click(function () {
                return t.show(),
                !1
            })
        },
        this.getLinksBack = function () {
            $("a").click(function (t) {
                return window.location = $(this).attr("href"),
                !0
            });
            var t = $("[link-return-back]"),
            e = t.attr("onclick_old");
            return t.attr("onclick", e),
            !0
        },
        this.afterClose = function () {
            t.getLinksBack(),
            t.isOpen = !1
        },
        this.show = function () {
            if (!t.wasShow && (t.wasShow = !0, t.$content.length && (!1 !== $.cookies.get(t.cookie) && t.enable(), t.checkCookies()))) {
                var e = this;
                if (app.utils.isMobile) {
                    var a = $("[data-mini-popup]"),
                    n = $("[data-mini-popup-in]"),
                    i = $("[data-mini-popup-close]");
                    n.html(t.$content.clone()),
                    a.show(),
                    $.isFunction(e.afterShow) && e.afterShow(),
                    $(window).on("scroll.popupClose", function (t) {
                        i.click()
                    }),
                    i.on("click", function () {
                        $(window).off("scroll.popupClose"),
                        a.hide(),
                        $.isFunction(e.afterClose) && e.afterClose()
                    })
                } else {
                    var o = {
                        fitToView: app.utils.isMobile,
                        autoSize: !0,
                        closeClick: !1,
                        openEffect: "none",
                        closeEffect: "none",
                        type: "html",
                        content: t.$content,
                        wrapCSS: app.utils.isMobile ? "popup" : t.wrapCSS,
                        padding: 0,
                        tpl: {
                            closeBtn: t.close
                        },
                        afterShow: function () {
                            e.$content.find('[data-cmd="fb-close"]').click(function () {
                                $.fancybox.close()
                            }).end().find('[data-cmd="dont-show"]').change(function () {
                                e.toggle()
                            }),
                            $.isFunction(e.afterShow) && e.afterShow()
                        },
                        afterClose: function () {
                            $.isFunction(e.afterClose) && e.afterClose()
                        }
                    };
                    app.utils.isMobile && (o.margin = 0),
                    $.fancybox(o)
                }
            }
        },
        this.disable = function () {
            t.isEnable = !1;
            $.cookies.set(t.cookie, !1, {
                domain: $("meta[name=cookieDomain]").attr("content"),
                expires: .5
            })
        },
        this.enable = function () {
            t.isEnable = !0,
            $.cookies.set(t.cookie, !0, {
                domain: $("meta[name=cookieDomain]").attr("content"),
                expires: 1
            })
        },
        this.toggle = function () {
            t.isEnable ? t.disable() : t.enable()
        },
        this.afterShow = function () {
            t.isOpen = !0,
            t.disable()
        }
    }), app.PopUpBasketDiscount2 = Class.extend(function () {
        this.cookie = "basket-discount",
        this.cookieApply = "basket-discount-apply",
        this.promocode = "подарок",
        this.isEnable = !1,
        this.isOpen = !1,
        this.wasShow = !1,
        this.btnInsert = null,
        this.btnApply = null;
        var t = this;
        this.constructor = function (e) {
            t.$content = e,
            t.registerEvents(),
            t.initBtnInsert(),
            t.initBtnApply(),
            t.initBtnClose(),
            t.needSetLinks() && t.setLinks()
        },
        this.initBtnInsert = function () {
            t.btnInsert = $("[btn-basket-discount-insert]"),
            t.btnInsert.click(function () {
                $("[input-basket-discount]").val(t.promocode),
                t.applyPromocode(),
                t.calcDiscount(),
                t.hidePopup()
            })
        },
        this.initBtnClose = function () {
            t.btnClose = $("[btn-basket-discount-close]"),
            t.btnClose.click(function () {
                t.hidePopup()
            })
        },
        this.registerEvents = function () {
            $(window).on("PopUpBasketDiscount2.calcDiscount", t.calcDiscount)
        },
        this.calcDiscount = function () {
            if ($("[input-basket-discount]").val() == t.promocode) {
                var e = $("[data-total-price]").html(),
                a = Math.round(e - .1 * e);
                $("[basket-discount-total-price]").html(a),
                $("[block-basket-discount-price]").show()
            } else
                $("[block-basket-discount-price]").hide()
        },
        this.initBtnApply = function () {
            t.btnApply = $("[btn-basket-discount-apply]"),
            t.btnApply.click(function () {
                $("[input-basket-discount]").val() == t.promocode ? (t.applyPromocode(), t.calcDiscount()) : t.delPromocode()
            }),
            t.isApplyPromocode() && ($("[block-basket-discount]").show(), t.applyPromocode())
        },
        this.applyPromocode = function () {
            $("[input-basket-discount-hidden]").val(t.promocode),
            $("[input-basket-discount]").val(t.promocode),
            $.cookies.set(t.cookieApply, !0, {
                domain: $("meta[name=cookieDomain]").attr("content")
            })
        },
        this.delPromocode = function () {
            $("[block-basket-discount-price]").hide(),
            $("[input-basket-discount-hidden]").val(""),
            $.cookies.set(t.cookieApply, !1, {
                domain: $("meta[name=cookieDomain]").attr("content")
            })
        },
        this.isApplyPromocode = function () {
            return !0 === $.cookies.get(t.cookieApply)
        },
        this.getTimeOutDone = function (t) {
            return !((new Date - t) / 1e3 < 43200)
        },
        this.needShow = function () {
            var e = $.cookies.get(t.cookie);
            return null !== e && !1 !== e && !t.getTimeOutDone(e)
        },
        this.needSetLinks = function () {
            var e = $.cookies.get(t.cookie);
            return null === e || !1 !== e && t.getTimeOutDone(e)
        },
        this.setLinks = function () {
            var e = $("[link-return-back]"),
            a = e.attr("onclick");
            e.attr("onclick_old", a).attr("onclick", "return false;"),
            $("a").each(function (e, a) {
                $(a).hasClass("product__order") || $(a).hasClass("basket__item-del") || $(a).hasClass("gifts-gall__tab") || $(a).hasClass("product__title") || $(a).hasClass("basket__item-del") || $(a).hasClass("product__img") || $(a).hasClass("b-counter__btn") || $(a).attr("data-ajax-url") || $(a).click(function () {
                    return t.showPopup(),
                    !1
                })
            })
        },
        this.showPopup = function () {
            if (t.wasShow)
                return !1;
            t.show(),
            t.getLinksBack(),
            t.disable()
        },
        this.getLinksBack = function () {
            $("a").click(function (t) {
                return window.location = $(this).attr("href"),
                !0
            });
            var t = $("[link-return-back]");
            return t.attr("onclick", "window.history.back();"),
            t.click(function () {
                window.history.back()
            }),
            !0
        },
        this.show = function () {
            $("[data-container-basket-discount]").show(),
            $("[block-basket-discount]").show()
        },
        this.hidePopup = function () {
            $("[data-container-basket-discount]").hide(),
            t.wasShow = !0,
            t.disable()
        },
        this.disable = function () {
            t.isEnable = !1,
            $.cookies.set(t.cookie, !1, {
                domain: $("meta[name=cookieDomain]").attr("content")
            })
        },
        this.enable = function () {
            var e = new Date;
            t.isEnable = !0,
            $.cookies.set(t.cookie, e.getTime(), {
                domain: $("meta[name=cookieDomain]").attr("content")
            })
        }
    }), app.PopUp14Error = app.PopUpBase.extend(function () {
        this.id = "14Feb",
        this.$content = $("#14-feb"),
        this.wrapCSS = "popup__postcard-day _14-error";
        var t = this;
        new app.PopUpRegionalPertner;
        this.constructor = function (e) {
            t.setContent(e)
        }
    }), app.PopUpRegionalPertner = app.PopUpBase.extend(function () {
        this.id = "PopupRegionalPartner",
        this.$content = $("#popup-regional-partner"),
        this.wrapCSS = "popup popup__change-city";
        var t = this;
        this.constructor = function (e) {
            t.setContent(e)
        }
    }), app.ManagerPopupsInit = app.ManagerBase.extend(function () {
        var t = this,
        e = !1;
        this.percentDiscount = function () {
            e || (e = !0, $.post("/personal/basket/percent-discount/", {}, "JSON"))
        },
        this.constructor = function () {
            this.checkDeliveryDateOld = function () {},
            this.checkDeliveryDate = function () {
                var e = $("#ofTime").val();
                t.hideSpecialDelivery(e);
                var a = $('input[name="delivery[order_interval_id]"]'),
                n = [];
                a.each(function () {
                    n[n.length] = {
                        from: e + " " + $(this).attr("data-from") + ":00:00",
                        to: e + " " + $(this).attr("data-to") + ":00:00",
                        id: $(this).val()
                    }
                });
                var i = {
                    intervals: n
                },
                o = JSON.stringify(i);
                o != t.checkDeliveryRequestData && (t.checkDeliveryRequestData = o, $.get("/basket/check-delivery-date/", i, t.onAjaxSuccessCheckDeliveryDate, "json"))
            },
            this.hideSpecialDelivery = function (t) {
                ["04.03.2019", "05.03.2019", "06.03.2019", "07.03.2019", "08.03.2019", "09.03.2019"].join(", ").indexOf(t) >= 0 ? ($(".delivery__time-additions").hide(), $("[delivery-distance-item]").each(function (t) {
                        var e = $(this);
                        e.attr("delivery-distance-item") > 1 ? e.hide() : e.click()
                    }), $("[holiday-delivery-alert]").show()) : ($(".delivery__time-additions").show(), $("[delivery-distance-item]").show(), $("[holiday-delivery-alert]").hide())
            },
            this.onAjaxSuccessCheckDeliveryDate = function (t) {
                if ("fail" == t.status ? $("[data-order-delivery-warning]").html(t.message) : $("[data-order-delivery-warning]").text(""), t.block_create_order ? ($("[data-save-order-btn]").hide(), $("[data-save-order-msg]").show()) : ($("[data-save-order-btn]").show(), $("[data-save-order-msg]").hide()), t.intervals) {
                    for (var e = 0; e < t.intervals.length; e++) {
                        var a = $('input[name="delivery[order_interval_id]"][value=' + t.intervals[e].id + "]");
                        1 == t.intervals[e].disabled ? a.attr("disabled", !0).data("disabled-by-load", 1).parent("LABEL").addClass("_disabled") : 0 == t.intervals[e].disabled && 1 == a.data("disabled-by-load") && a.attr("disabled", !1).data("disabled-by-load", 0).parent("LABEL").removeClass("_disabled")
                    }
                    if ($('input[name="delivery[order_interval_id]"]:disabled:checked').length)
                        $('input[name="delivery[order_interval_id]"]:not(:disabled):not(:checked):eq(0)').trigger("click")
                }
            },
            "/personal/order/make/" != window.location.pathname && "personal/order/make" != window.location.pathname || this.checkDeliveryDate(),
            $("#ofTime").change(function () {
                t.checkDeliveryDate()
            }),
            $("[data-postcard-disabled]").length || ($("[data-container-popup=woman]").each(function () {
                    var e = $(this);
                    if (!1 !== $.cookies.get(e.data("cookie"))) {
                        var a = new app.PopUpToBasket(e);
                        $(window).mouseout(function (e) {
                            e.pageY < 100 && (a.show(), t.percentDiscount())
                        })
                    }
                }), $("[data-container-popup-basket]").each(function () {
                    var t = $(this);
                    if (null === $.cookies.get(t.data("cookie"))) {
                        var e = new app.PopUpToBasket(t);
                        setTimeout(function () {
                            e.show()
                        }, 1e3 * t.data("timer"))
                    }
                }), $(document).on("click", "[data-container-popup-basket], [data-container-popup=woman]", function () {
                    $.fancybox.close()
                })),
            $(document).on("click", "[data-select-city]", function () {
                (new app.PopUpChangeCity).show()
            }),
            $(document).on("click", "[data-fast-order]", function () {
                var t = $(this);
                return $.post(window.site_dir + "ajax/fast-order/", t.data("fastOrder"), function (t) {
                    new app.PopUpFastOrder(t.popup).show()
                }, "json"),
                !1
            }),
            app.log("Init ManagerPopupsInit")
        }
    }), app.ManagerSeoBlocksInit = app.ManagerBase.extend(function () {
        this.constructor = function () {
            app.log("Init ManagerSeoBlocksInit")
        }
    }), $("[data-form-tinkoff]").submit(function () {
    var t = $(this),
    e = $('input[name="tinkoff-json"]').val();
    return e ? $.ajax({
        url: t.attr("action"),
        type: "POST",
        data: e,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (t) {
            t.Success ? document.location.href = t.PaymentURL : app.log(t)
        }
    }) : $.post(t.attr("action"), t.serialize(), function (t) {
        t.Success ? document.location.href = t.PaymentURL : app.log(t)
    }, "JSON"),
    !1
}), $("[data-self-delivery]").change(function () {
    $(this).is(":checked") ? ($("[data-fill]").each(function () {
            $(this).val($('[name="' + $(this).data("fill") + '"]').val())
        }), $("input[id=ofPay1]").prop("disabled", !1)) : ($("[data-fill]").val(""), $("input[id=ofPay1]").prop("disabled", !0), $("input[id=ofPay1]").prop("checked", !1), $("label[data-payment-type=1]").removeClass("_active"), $("label[data-payment-type=1]").find(".ideal-radio").removeClass("checked"), $("input[id=ofPay8]").prop("checked", !0), $("label[data-payment-type=8]").addClass("_active"), $("label[data-payment-type=8]").find(".ideal-radio").addClass("checked"))
}), app.ManagerPostcard = app.ManagerBase.extend(function () {
        var t = $("[data-parent-postcard]"),
        e = t.find("[data-small-form-postcard]"),
        a = t.find("[data-small-form-postcard-container]"),
        n = t.find("[data-form-postcard]"),
        i = t.find("[data-label-postcard]"),
        o = t.find("[data-checkbox-add-postcard]"),
        s = t.find("[data-checkbox-add-postcard-parent]"),
        r = t.find("[data-length]"),
        c = t.find("[data-length-block]"),
        d = t.find("[data-maxlength]"),
        l = 0,
        u = e.attr("maxlength"),
        p = t.find("[data-basket-remove]"),
        h = t.find("[data-to-basket]");
        function f() {
            o.prop("checked") ? (a.addClass("hide"), n.removeClass("hide"), c.addClass("hide"), i.html("Открытка"), h.trigger("click")) : (a.removeClass("hide"), n.addClass("hide"), i.html("Подпись к букету"), c.addClass("hide"), r.html(l), d.html(u), c.removeClass("hide"), e.off("keyup").on("keyup", function (t) {
                    n.text(e.val());
                    var a = e.val().length;
                    r.html(a)
                }), p.trigger("click"))
        }
        d.html(u),
        0 == e.is("[data-small-form-postcard]") ? (s.click(), s.addClass("hide"), c.addClass("hide"), i.html("Открытка")) : 1 == e.is("[data-small-form-postcard]") && (f(), o.click(function () {
                f()
            }))
    }), $("[data-form-auto-submit]").each(function () {
    var t = $(this);
    setTimeout(function () {
        t.submit()
    }, 8e3)
}), app.BottomManager = Class.extend(function () {
        this.$container = $("[data-bottom-our]");
        var t = this;
        this.constructor = function () {
            if (!t.$container.length)
                return !1;
            var e = $.cookies.get("bottom");
            return null !== e && !1 !== e || (null === e && 1 == t.$container.data("auto") && t.$container.find("[data-to-basket]").click(), $.cookies.set("bottom", !1, {
                    domain: $("meta[name=cookieDomain]").attr("content"),
                    expires: 1
                }), t.$container.removeClass("hide")),
            t.$container.find("[data-btn-close]").click(function () {
                t.$container.addClass("hide"),
                $.cookies.set("bottom", !0, {
                    domain: $("meta[name=cookieDomain]").attr("content"),
                    expires: 1
                })
            }),
            !0
        }
    }), app.FavoritesManager = Class.extend(function () {
        var t = this;
        this.constructor = function (e) {
            return this.$container = e ? e.find("[data-favorites]") : $("[data-favorites]"),
            !!t.$container.length && (t.$container.each(function () {
                    var t = this;
                    function e(t, e, a) {
                        $.ajax({
                            type: "POST",
                            url: "ajax/favorites/" + t + "/" + e,
                            dateType: "JSON",
                            success: function (t) {
                                1 == t.success ? a && a.call() : alert("Извините, но произошла ошибка обработки.")
                            },
                            error: function (t) {
                                alert("Извините, но произошла ошибка обработки.")
                            }
                        })
                    }
                    $(t).click(function () {
                        $(t).hasClass("added") ? e("forget", $(t).data("id"), function () {
                            $(t).removeClass("added")
                        }) : e("put", $(t).data("id"), function () {
                            $(t).addClass("added")
                        })
                    })
                }), app.log("Init app.FavoritesManager"), !0)
        }
    }), app.SubscriptionManager = Class.extend(function () {
        var t = this;
        this.$container = $("[data-subscription-item]"),
        this.constructor = function () {
            if (!t.$container.length)
                return !1;
            var e = !1,
            a = this.$container.find("[data-subscription-item-form]"),
            n = this.$container.find("[data-subscription-item-button]"),
            i = this.$container.find("[data-subscription-item-block]"),
            o = i.find("[data-subscription-item-block-email]"),
            s = this.$container.find("[data-subscription-item-message]"),
            r = s.find("[data-subscription-item-message-title]"),
            c = s.find("[data-subscription-item-message-info]"),
            d = s.find("[data-subscription-item-message-back]");
            return n.click(function () {
                if (0 == e) {
                    e = !0;
                    var t = $("meta[name=_token]").attr("content");
                    $.ajax({
                        type: "POST",
                        url: a.data("action"),
                        dateType: "JSON",
                        data: {
                            email: o.val(),
                            _token: t
                        },
                        success: function (t) {
                            1 == t.success ? (i.css("display", "none"), r.html("Спасибо за подписку!"), c.html("Проверьте вашу почту - там купон на скидку."), s.css("display", "block")) : (i.css("display", "none"), r.html("Произошла ошибка!"), c.html(t.message ? t.message : "Произошла ошибка обработки."), s.css("display", "block")),
                            e = !1
                        },
                        error: function (t) {
                            t = t.responseJSON,
                            i.css("display", "none"),
                            t && t.email ? (r.html("Ошибка во время подписки!"), c.html(t.email[0])) : (r.html("Произошла ошибка!"), c.html("Произошла ошибка обработки.")),
                            s.css("display", "block"),
                            e = !1
                        }
                    })
                }
                return !1
            }),
            d.click(function () {
                return o.val(""),
                s.css("display", "none"),
                i.css("display", "block"),
                r.html(""),
                c.html(""),
                !1
            }),
            o.keyup(function () {
                var e = o.val();
                e.length > 4 && (t.isEmail(e) ? o.css("color", "#33403a") : o.css("color", "#ff0000"))
            }),
            app.log("Init app.SubscriptionManager"),
            !0
        },
        this.isEmail = function (t) {
            return new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i).test(t)
        }
    }), app.ManagerChoosenColors = app.ManagerBase.extend(function () {
        var t = $("[data-source=color]"),
        e = t.find("[data-id]"),
        a = this;
        this.constructor = function () {
            t.length && e.change(a.onClickHandler)
        },
        this.onClickHandler = function (a) {
            app.log("1) main.js. ManagerChoosenColors. onClickHandler");
            var n = $(a.target),
            i = {};
            if ("radio" == n.data("action-type"))
                i[n.data("id")] = 1;
            else {
                var o = $("[data-only-one]").attr("data-only-one");
                if (1 == o) {
                    var s = $(a.currentTarget);
                    e.each(function () {
                        if (s.data("id") != $(this).data("id")) {
                            var t = $(this).parent("label");
                            t.removeClass("_active"),
                            t.find(".ideal-check").removeClass("checked focus")
                        }
                    });
                    var r = s.parent("label");
                    r.addClass("_active"),
                    r.find(".ideal-check").addClass("checked focus"),
                    i[s.data("id")] = 1
                } else
                    e.filter(":checked").each(function () {
                        i[$(this).data("id")] = 1
                    })
            }
            if (t.data("value", i).attr("data-value", JSON.stringify(i)), 1 == o)
                return a.stopImmediatePropagation(), !1
        }
    }), app.SeoBlockMoverManager = app.ManagerBase.extend(function () {
        this.$containerSource = $("[seo-move-block-source]"),
        this.$containerTarger = $("[seo-move-block-target]");
        var t = this;
        this.constructor = function () {
            if (!t.$containerSource.length)
                return !1;
            if (!t.$containerTarger.length)
                return !1;
            var e = "";
            return $.each(t.$containerSource, function (t, a) {
                e = $(a).attr("seo-move-block-source"),
                $(a).replaceAll('[seo-move-block-target="' + e + '"]').show()
            }),
            app.log("Init app.SeoBlockMoverManager"),
            !0
        }
    }), app.SeoHrefReplace = app.ManagerBase.extend(function () {
        this.$seoHref = $("[data-seo-href]");
        var t = this;
        this.constructor = function () {
            return !!t.$seoHref.length && (t.$seoHref.each(function (t, e) {
                    var a = $(e).data("seoHref");
                    $(e).attr("href", a).removeAttr("data-seo-href")
                }), app.log("Init app.SeoHrefReplace"), !0)
        }
    }), app.BasketMapManager = Class.extend(function () {
        this.$container = $("[data-ordering-step]"),
        this.$map = null,
        this.map = null,
        this.point = null,
        this.$address = null,
        this.$street = null,
        this.address = "",
        this.collection = null,
        this.collectionPoint = null,
        this.$inputMkad = null,
        this.$inputMkadKm = null,
        this.$inputPrice = null,
        this.costKm = 0,
        this.route = null;
        var self = this;
        self.constructor = function () {
            return !!self.$container.length && (self.$map = self.$container.find("[data-basket-map]"), self.$map.get(0) && (self.$address = self.$container.find("[data-address-component]"), self.$inputMkad = self.$container.find("#ofDeliveryMKAD1[data-change-price-item]"), self.$inputMkadKm = self.$container.find("[data-kad-km]"), self.$inputPrice = self.$container.find("[data-delivery-price]"), self.$street = self.$container.find("[name='deliveryAddress[street][1]'][data-address-component]"), self.costKm = parseFloat(self.$map.data("cost-km")), ymaps.ready(function () {
                        self.init(self.$map.get(0), self.$map.data("basket-map-latitude"), self.$map.data("basket-map-longitude"), self.$map.data("basket-map-zoom")),
                        self.addRegions(self.$map.data("basket-map-city")),
                        self.setSuggestions(),
                        self.$address.change(function () {
                            self.onAddressChange(self.$map.data("basket-map-city-name"))
                        })
                    }), app.log("Init app.BasketMapManager")), !0)
        },
        this.init = function (t, e, a, n) {
            n = 0 == n ? 9 : n,
            self.map = new ymaps.Map(t, {
                    center: [e, a],
                    zoom: n,
                    controls: ["fullscreenControl", "geolocationControl", "routeEditor", "rulerControl", "trafficControl", "typeSelector", "zoomControl"]
                }),
            self.collection = new ymaps.GeoObjectCollection(null, {}),
            self.map.geoObjects.add(self.collection)
        },
        this.setSuggestions = function () {
            self.$street.keydown(function (t) {
                if (13 == t.which)
                    return !1
            }),
            self.$street.suggestions({
                serviceUrl: "https://suggestions.dadata.ru/suggestions/api/4_1/rs",
                token: "0ff28b3457888fb541883b9fb4bf1badd4df6fc0",
                type: "ADDRESS",
                count: 5,
                scrollOnFocus: !1,
                onSelect: function (t) {
                    self.onAddressChange([t.data.geo_lat, t.data.geo_lon])
                }
            })
        },
        this.addRegions = function (t) {
            self.loadRegions(t, function (t) {
                for (var e = 0; e < t.length; e++)
                    self.addRegion(t[e])
            })
        },
        this.addRegion = function (t) {
            t = $.extend({
                    coordinates: [],
                    name: "Регион " + (self.collection.getLength() + 1),
                    fill_color: "#ed4543",
                    stroke_color: "#ed4543",
                    stroke_width: 4,
                    fill_opacity: 30,
                    stroke_opacity: 1,
                    type_count: "fix",
                    price_km: 0,
                    price_fix: 300,
                    city_region_id: null,
                    center: !1,
                    general: !1
                }, t);
            var e = new ymaps.Polygon(t.coordinates, {
                    hintContent: t.name
                });
            return self.setSettings(e, t),
            self.collection.add(e),
            e
        },
        this.setSettings = function (t, e) {
            for (var a in e = self.convertSettingsFor(e, "polygon"))
                "fillOpacity" == a && (e[a] /= 100), t.options.set(a, e[a])
        },
        this.getSetting = function (t, e) {
            return t.options.get(e)
        },
        this.convertSettingsFor = function (t, e) {
            var a = {
                polygon: {
                    fill_color: "fillColor",
                    stroke_color: "strokeColor",
                    stroke_width: "strokeWidth",
                    fill_opacity: "fillOpacity"
                },
                form: {
                    fillColor: "fill_color",
                    strokeColor: "stroke_color",
                    strokeWidth: "stroke_width",
                    fillOpacity: "fill_opacity"
                }
            },
            n = {};
            for (var i in t)
                a[e][i] ? n[a[e][i]] = t[i] : n[i] = t[i];
            return n
        },
        this.onAddressChange = function (t) {
            self.setPoint(t);
            var e = self.getRegion(t);
            self.getPrice(e, t, function (t, e, a) {
                self.$inputMkad.data("price", t),
                self.$inputMkad.val(a),
                self.$inputMkadKm.val(a),
                self.$inputPrice.val(t),
                self.$inputMkad.trigger("change")
            })
        },
        this.getPrice = function (t, e, a) {
            if (0 == t)
                self.getDistanceFromGeneralRegion(e, !0, !0, function (t) {
                    a.call(self, self.costKm * t, 0, t)
                }, !0);
            else if ("fix" == self.getSetting(t, "type_count")) {
                var n = parseFloat(self.getSetting(t, "price_fix"));
                1 == self.isGeneralRegion(t) ? a.call(self, n, 0, 0) : self.getDistanceFromGeneralRegion(e, !1, !0, function (t) {
                    a.call(self, n, 0, t)
                })
            } else if ("distance" == self.getSetting(t, "type_count")) {
                var i = parseFloat(self.getSetting(t, "price_km")),
                o = self.getSetting(t, "city_region_id"),
                s = self.getSetting(t, "center");
                if (o = o || self.getSetting(t, "name"), o = self.getRegionByName(o)) {
                    var r;
                    if (0 == s)
                        r = (r = o.geometry.getClosest(e)).position;
                    else {
                        var c = o.geometry.getPixelGeometry().getBounds(),
                        d = [c[0][0] + (c[1][0] - c[0][0]) / 2, (c[1][1] - c[0][1]) / 2 + c[0][1]];
                        r = self.map.options.get("projection").fromGlobalPixels(d, self.map.getZoom())
                    }
                    self.getDistanceFromCoordinate(r, e, !0, !0, function (n) {
                        var o = n * i;
                        1 == self.isGeneralRegion(t) ? a.call(self, o, n, 0) : self.getDistanceFromGeneralRegion(e, !1, !1, function (t) {
                            a.call(self, o, n, t)
                        })
                    })
                }
            }
        },
        this.getAddress = function (t) {
            var e = t;
            return self.$address.filter("[name='deliveryAddress[street][1]']").val() && (e += ", " + self.$address.filter("[name='deliveryAddress[street][1]']").val()),
            self.$address.filter("[name='deliveryAddress[house][1]']").val() && (e += ", дом " + self.$address.filter("[name='deliveryAddress[house][1]']").val()),
            self.$address.filter("[name='deliveryAddress[structure][1]']").val() && (e += ", корпус " + self.$address.filter("[name='deliveryAddress[structure][1]']").val()),
            self.$address.filter("[name='deliveryAddress[building][1]']").val() && (e += ", строение " + self.$address.filter("[name='deliveryAddress[building][1]']").val()),
            e
        },
        this.getCoordinates = function (t, e) {
            new ymaps.geocode(t).then(function (t) {
                var a = t.geoObjects.get(0);
                a && e.call(self, a.geometry.getCoordinates())
            })
        },
        this.getRegion = function (t) {
            var e = !1;
            return self.collection.each(function (a) {
                a.geometry.contains(t) && (e = a)
            }),
            e
        },
        this.getRegionByName = function (t) {
            var e = !1;
            return self.collection.each(function (a) {
                self.getSetting(a, "name") == t && (e = a)
            }),
            e
        },
        this.getGeneralRegion = function () {
            var t = !1;
            return self.collection.each(function (e) {
                1 == self.getSetting(e, "general") && (t = e)
            }),
            t
        },
        this.isGeneralRegion = function (t) {
            var e = self.getGeneralRegion();
            return self.getSetting(t, "name") == self.getSetting(e, "name")
        },
        this.getDistanceFromCoordinate = function (t, e, a, n, i) {
            ymaps.route([t, e], {
                boundsAutoApply: a
            }).then(function (t) {
                var e = Math.round(t.getLength() / 1e3);
                self.route && n && self.map.geoObjects.remove(self.route),
                a && (self.route = t, self.map.geoObjects.add(t)),
                i.call(self, e)
            })
        },
        this.getDistanceFromRegion = function (t, e, a, n, i) {
            var o = t.geometry.getClosest(e);
            o = o.position,
            self.getDistanceFromCoordinate(o, e, a, n, i)
        },
        this.getDistanceFromGeneralRegion = function (t, e, a, n) {
            self.getDistanceFromRegion(self.getGeneralRegion(), t, e, a, n)
        },
        this.loadRegions = function (city, callback) {
            $.ajax({
                type: "GET",
                url: self.$map.data("container-city-region-map-url-list"),
                success: function (response) {
                    if ("ok" == response.status) {
                        for (var data = [], i = 0; i < response.data.regions.length; i++)
                            data[i] = self.convertSettingsFor(response.data.regions[i], "polygon"), data[i].coordinates = eval(response.data.regions[i].coordinates);
                        callback.call(self, data)
                    }
                },
                error: function () {}
            })
        },
        this.setPoint = function (t) {
            self.point ? self.point.geometry.setCoordinates(t) : (self.point = new ymaps.GeoObject({
                        geometry: {
                            type: "Point",
                            coordinates: t
                        }
                    }), self.collectionPoint = new ymaps.GeoObjectCollection({}, {
                        preset: "islands#blueHomeIcon"
                    }), self.collectionPoint.add(self.point), self.map.geoObjects.add(self.collectionPoint)),
            self.map.setBounds(self.collectionPoint.getBounds(), {
                checkZoomRange: !0
            })
        }
    }), app.Register = Class.extend(function () {
        this.$content = $("[data-auth-register]");
        var t = this;
        this.constructor = function (e) {
            t.$content.find("[data-register-phone]").inputmask("+7 (999) 999-99-99", {
                clearMaskOnLostFocus: !1,
                clearIncomplete: !0
            })
        }
    }), app.SendManagerAsk = app.SendManagerBase.extend(function () {
        this.$form = $("[data-form-base]");
        var t = this,
        e = this.$form.find("input, textarea"),
        a = this.$form.find("[data-form-base-fields]"),
        n = this.$form.find("[data-form-base-success]");
        this.onAjaxSuccess = function (i) {
            i.errors ? (e.removeClass("_error"), $.each(i.errors, function (t, a) {
                    e.filter('[name="' + t + '"]').addClass("_error")
                })) : (a.fadeOut(), n.fadeIn(), t.$form.get(0).reset())
        }
    });
