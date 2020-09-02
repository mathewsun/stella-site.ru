var $ = jQuery.noConflict();

$("#basketAllLink").fancybox({
    minWidth: 850,
    minHeight: 680,
    fitToView: false,
    autoSize: false,
    closeClick: false,
    openEffect: 'none',
    closeEffect: 'none',
    scrolling: 'auto'
});

$(".showCartBtn").fancybox({
    minWidth: 850,
    minHeight: 680,
    fitToView: false,
    autoSize: false,
    closeClick: false,
    openEffect: 'none',
    closeEffect: 'none',
    scrolling: 'auto'
});


$(document).ready(function () {

    $("input.cartGoodsQuantityClass").numeric({ decimal: false, negative: false }, function () { alert("Только положительные значения!"); this.value = ""; this.focus(); });
    
    $("td.top_phone > a.chooseCity").on('click', function () {
        $('.chooseStock').click();
    });
    
    var classArray = $("[class^='CartGoodTotalPrice']");

    for (var i = 0, l = classArray.length; i < l; ++i) {
        className = $(classArray[i]).attr("class");
        goodsId = /\d+/.exec(className);

        changeBookToCartBtn(goodsId);
    }

    var cityId = getCityID();

    var city = _cities.filter(function (c) {
        return c.CityID == cityId;
    }).pop();

    $("p.top_phone").text(city.CityPhone);
    $(".footer .phone").text(city.CityPhone);

    $("td.top_phone > a.chooseCity").text(city.CityTitle);

    //var inputmask_2 = { "autoUnmask": false, "mask": "7(999)999-99-99" };
    //$("#ContactForm_phone2").inputmask(inputmask_2);

    //goodsIdsInCart = /\[0-9]+/.exec(string);

    //for(var i in classes) {
    //alert(classes[i]);
    //}

    //for ( var i = 0, l = classes.length; i<l; ++i ) {
    //    alert( classes[i] );
    //}
});

function cartShow() {
    $("#basketAllLink").on("click", function () { $("div.cart").show(); $("div.order").hide(); });
}


function doChangeCart(key, q, obj) {
    var isNeedFancyClose = false;
    jQuery.ajax(
            {
                'data': { 'goodsID': key, 'quantity': q },
                'beforeSend': function () {
                },
                'complete': function () {

                },
                'url': '/catalog/changeCartQuantity',
                'cache': false,
                'success': function (html) {
                    jQuery("#basketOutput").html(html); //копируем результат в фрэйм с фэнсибоксом
                    //var b = $(".basketAll").html();
                    //$(".fancybox-inner").html(b);


                    var goodquantity = $(html).find(".CartQuantity" + key).text();
                    var sumprice = $(html).find(".CartGoodTotalPrice" + key).text();
                    var carttotal = $(html).find(".CartTotal_n").text();
                    $(".fancybox-inner * .CartGoodTotalPrice" + key).html(sumprice);
                    $(".fancybox-inner * .CartQuantity" + key).html(goodquantity);
                    $(".fancybox-inner * .CartTotal_n").html(carttotal);

                    if (obj == null) {
                        $(".fancybox-inner * .CartQuantityInput" + key + " > input").val(goodquantity);
                    }


                    if (!carttotal)
                        $('.fancybox-close')[0].click();

                    if (!goodquantity)
                    {
                        $(".CartQuantity" + key).last().parent().remove();
                        changeCartToBookBtn(key);
                    }
                        

                    //if (!goodquantity || goodquantity == 0) {
                    //    changeCartToBookBtn(key);
                    //}
                    /*
                    $("input.cartGoodsQuantityClass").numeric(
                        { decimal: false, negative: false },
                        function () {
                            alert("Только положительные значения!");
                            this.value = "";
                            this.focus();
                        }
                    );
                    */
                }
            });
    return false;
}

function changeCartQuantityByOne(key, q)
{
    //var quantity = parseInt(q);
    var currentq = parseInt($(".CartQuantity" + key).last().html());
    if (q) {
        quantity = currentq + 1;
    }
    else {
        quantity = currentq - 1;
    }

    if (quantity == 0) {
        
        changeCartDeleteGood(key);
    }
    else {
        changeCartQuantityPreChange(key, quantity);
    }
}

function changeCartToBookBtn(goodsID)
{
    $("#showCartBtn_" + goodsID).parent().addClass("none");
    $("#addtoCartBtn_" + goodsID).parent().removeClass("none");
}

function changeBookToCartBtn(goodsID) {
    $("#addtoCartBtn_" + goodsID).parent().addClass("none");
    $("#showCartBtn_" + goodsID).parent().removeClass("none");
}

function changeAllCartToBookBtn() {
    var idArray1 = $("[id^='addtoCartBtn_']");
    var idArray2 = $("[id^='showCartBtn_']");

    for (var i = 0, l = idArray1.length; i < l; ++i) {
        id = $(idArray1[i]).attr("id");
        goodsId = /\d+/.exec(id);

        changeCartToBookBtn(goodsId);
    }

    for (var i = 0, l = idArray2.length; i < l; ++i) {
        id = $(idArray2[i]).attr("id");
        goodsId = /\d+/.exec(id);

        changeCartToBookBtn(goodsId);
    }
}

function changeCartDeleteGood(key) {
    if (true
        //confirm('Вы хотите удалить этот товар из вашего бронирования?')
        ) {
        if ($(".CartQuantityInput" + key + "> input").last().hasClass("redInput")) {
            $(".CartQuantityInput" + key + "> input").last().removeClass("redInput");
            $("div.cartErrors").last().hide();
            $("div.cartErrors .cartErrors").last().remove();
        }
        doChangeCart(key, 0);
        //$(".CartQuantity" + key).last().parent().remove();
    } else {

    }
}

function changeCartQuantityPreChange(key, quantity, obj) {
    if (isNaN(quantity) || quantity < 1) {
        $(".CartQuantityInput" + key + "> input").last().addClass("redInput");
        $("div.cartErrors").last().show();
        $("div.cartErrors .cartErrors").last().html("Не забудьте указать количество!");
    }
    if (!isNaN(quantity) && quantity >= 1) {
        $(".CartQuantityInput" + key + "> input").last().removeClass("redInput");
        $("div.cartErrors").last().hide();
        $("div.cartErrors .cartErrors").last().html("");
        doChangeCart(key, quantity, obj);
    }
}

function changeCartQuantity(key, obj) {

    var objQ = obj.value;

    var quantity = parseInt(objQ);
    changeCartQuantityPreChange(key, quantity, obj);


    //$(".fancybox-inner > #" + obj.id).focus();
    
    
}

function addToCart(goodsId, goodswebdataId, owner) {

    //

    jQuery.ajax(
    {
        'data': { 'goodsID': goodsId, 'goodswebdataID': goodswebdataId },
        'beforeSend': function () {
            var button = owner;
            $(button).parent().addClass("none");
            $(button).parent().next().removeClass("none");
            //button.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;В корзине&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
            //button.setAttribute("onclick", "showCartFromBooking();");
            
        },
        'complete': function () {
            $("#basketOutput").animate({opacity: 1.0}, 100).fadeOut("fast");
            $("#basketOutput").animate({ opacity: 1.0 }, 100).fadeIn("fast");
            owner.preventDefault();
        },
        'url': '/catalog/addToBasket',
        'cache': false,
        'success': function (html) {
            jQuery("#basketOutput").html(html); //копируем результат в фрэйм с фэнсибоксом
            //var b = $(".basketAll").html();
            //$(".fancybox-inner").html(b);
            /*
            $("input.cartGoodsQuantityClass").numeric(
                { decimal: false, negative: false },
                function () {
                    alert("Только положительные значения!");
                    this.value = "";
                    this.focus();
                }
            );
            */
        }
    });

    owner.preventDefault();
    return false;
}

function doClearCart() {
    jQuery.ajax(
    {
        'complete': function () {
            $("#basketOutput").animate({ opacity: 1.0 }, 100).fadeOut("fast");
            $("#basketOutput").animate({ opacity: 1.0 }, 100).fadeIn("fast");
        },
        'url': '/catalog/clearBasket',
        'cache': false,
        'success': function (html) {
            jQuery("#basketOutput").html(html); //копируем результат в фрэйм с фэнсибоксом
            changeAllCartToBookBtn();
            return false;
        }
    });
}

function clearCart(isNeedConfirm) {
    if (isNeedConfirm) {
        if (true
            //confirm("Вы уверены, что хотите удалить все позиции из корзины?")
            ) {
            doClearCart();
            $('.fancybox-close')[0].click();
        }
    }
    else {
        doClearCart();
    }

    return false;
}

function showFinishOrder() {
    $(".fancybox-inner * div.cart").hide();
    $(".fancybox-inner * div.order").show();
}

function showCart() {
    $(".fancybox-inner * div.cart").show();
    $(".fancybox-inner * div.order").hide();
}

function createOrder() {
    var phoneN = $(".fancybox-inner * #ContactForm_phone").val().replace(/\D/g, '');
    //phoneN = '7' + phoneN;
    if (!$('input[id="confirmRadioOperator"]').last()[0].checked && !$('input[id="confirmRadioSMS"]').last()[0].checked)
    {
        $(".fancybox-inner * #bookingErrors").html("Укажите способ подтверждения (SMS или звонок оператора)!")
        //alert("Укажите способ подтверждения (SMS или звонок оператора)!");
        return;
    }
    var isNeedOperatorCall = $('input[id="confirmRadioOperator"]').last()[0].checked;
    if (phoneN == null || phoneN.length != 11) {
        $(".fancybox-inner * #bookingErrors").html("Введите 10 цифр номера телефона без пробелов, скобок или тире!")
        return;
    }
    else {
        //if (confirm("Заказ на бронирование будет отправлен, а корзина очищена, продолжить?"))
        if (true)
        {
            var opCallValue = 0;
            if (isNeedOperatorCall)
                opCallValue = 1;
            jQuery.ajax(
            {
                'data': { 'phone': phoneN, 'isNeedOperatorCall': opCallValue },
                'complete': function () {
                    
                },
                'beforeSend': function() {
                    $(".fancybox-inner * .btnCreateOrder").hide();
                    $(".fancybox-inner * .orderSentInfo").show();
                },
                'url': '/catalog/createOrder',
                'cache': false,
                'success': function (orderNo) {
                    $(".fancybox-inner * .order_stage1").hide();
                    $(".fancybox-inner * .order_stage2").show();
                    if (orderNo === "Ошибка") {
                        $(".fancybox-inner * .order_stage2").html("<p style='padding-top:20px;font-size:21px;color:red;'>Произошла ошибка, попробуйте еще раз или позвоните нам!<p>");
                    }
                    else {
                        $(".fancybox-inner * .order_stage2").html("<p style='padding-bottom: 6px;'>Ваша заявка отправлена!</p><p style='font-size:21px;font-weight:bold;padding-bottom: 12px;'>Запишите номер вашего заказа:</p><p style='font-size:58px;font-weight:bold;'>"+orderNo+"</p>");
                        clearCart(false);
                    }
                    return false;
                }
            });
        }
    }
    return false;
}




    /*
    $('input[class=cartGoodsQuantityClass]').bind('keyup blur', function () {
        var myValue = $(this).val();
        $(this).val(myValue.replace(/[^0-9]/g, ''));
    });
    */

