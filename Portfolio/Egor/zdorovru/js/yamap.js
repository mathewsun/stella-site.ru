// Как только будет загружен API и готов DOM, выполняем инициализацию

var isMapInited = false;

try {
    ymaps.ready(init);
    isMapInited = true;
}
catch (ex)
{
    var isMapInited = false;
    initWOMap();
}

function initWOMap() {

    $(".private-map").show();

    function setMapCenterByCity(id) {

        var city = _cities.filter(function (c) {
            return c.CityID == id;
        }).pop();
    }

    $(".chooseStock").on('click', function () {
        var id = $(".selStockTitle").attr('id');
        if (id != 0) {
            for (var v in coords) {
                if (coords[v].id == id) {
                    result.innerText = v;
                    $(".confirmChooseStock_visibility").hide();
                    break;
                }
            }
        }
        else {
            result.innerText = "ничего не выбрано";
        }

        cityID = getCityID();

        var elems = $('.gotoLi');
        for (i = 0; i < elems.length; i++) {
            if ($(elems[i]).attr('data').split('-')[1] == cityID) {
                $(elems[i]).show();
            }
            else {
                $(elems[i]).hide();
            }
        }

        var elems = $('.citylink');
        for (i = 0; i < elems.length; i++) {
            if ($(elems[i]).attr('data')/*.split('-')[1]*/ != cityID) {
                $(elems[i]).show();
            }
            else {
                $(elems[i]).hide();
                var text = $(elems[i]).text();
                $('.dropbtn').text(text);
                $('.dropbtn').attr('data', cityID);
            }
        }
        slider('aptslider', 0);
    }).fancybox({
        minWidth: "1000",
        minHeight: "650",
        fitToView: false,
        autoSize: false,
        closeClick: false,
        openEffect: 'none',
        closeEffect: 'none',
        scrolling: 'auto',
        padding: '0'
    });

    id = getCityID();
    city = _cities.filter(function (c) {
        return c.CityID == id;
    }).pop();

    var arrayLength = _stocks.length;
    var apt = [];
    for (var i = 0; i < arrayLength; i++) {
        apt.push(_stocks[i].SiteStockFullTitle);
    }

    function changeConfimBtnVisibility(stockid, isOpened) {
        if (isOpened == '0') {
            $(".confirmChooseStock_visibility").hide();
        }
        else {
            $(".confirmChooseStock_visibility").css('display', 'inline').hide().fadeIn();

            /* показывать "Подтвердить выбор" даже если повторно выбрана та же аптека  */
            $(".confirmChooseStock_visibility").fadeIn();
        }

    }

    function clickGoto() {

        var pos = this.firstElementChild.firstElementChild.innerText;
        var headerText = pos;
        if (coords[pos].isOpened == '0') {
            headerText += ' (скоро открытие)';
        }

        result.innerText = headerText;

        changeConfimBtnVisibility(coords[pos].id, coords[pos].isOpened);
        return false;
    }

    function myPanTo(coord, isredraw, key) {
        if (!(coord instanceof Array))
            throw new Error('ожидается массив в myPanTo');
    }



    function clickAllMap() {
        return false;
    }

    // навешиваем обработчики
    var col = document.querySelectorAll("li.gotoLi");
    for (var i = 0, n = col.length; i < n; ++i) {
        col[i].onclick = clickGoto;
    }

    var col = document.querySelectorAll("a.showAllMap");
    for (var i = 0, n = col.length; i < n; ++i) {
        col[i].onclick = clickAllMap;
    }

    function openBalloon(key) {
        if (typeof placemarks[key] == "object") {

        }
    }

    function funcChangeCity(id) {
        var elems = $('.gotoLi');
        for (i = 0; i < elems.length; i++) {
            if ($(elems[i]).attr('data').split('-')[1] == id) {
                $(elems[i]).toggle();
            }
            else {
                $(elems[i]).hide();
            }
        }

        var text = $(".citylink[data='" + id + "']").text();
        $('.dropbtn').text(text);

        var elems = $('.citylink');
        for (i = 0; i < elems.length; i++) {
            if ($(elems[i]).attr('data')/*.split('-')[1]*/ != id) {
                $(elems[i]).toggle();
            }
            else {
                $(elems[i]).hide();
            }
        }

        city = _cities.filter(function (c) {
            return c.CityID == id;
        }).pop();

    }


    var col = document.querySelectorAll("a.citylink");
    for (var i = 0, n = col.length; i < n; ++i) {
        id = col[i].getAttribute("data");
        col[i].onclick = (function () {
            {
                id = $(this).attr('data');

                var elems = $('.gotoLi');
                for (i = 0; i < elems.length; i++) {
                    if ($(elems[i]).attr('data').split('-')[1] == id) {
                        $(elems[i]).toggle();
                    }
                    else {
                        $(elems[i]).hide();
                    }
                }

                var text = $(this).text();
                $('.dropbtn').text(text);
                $('.dropbtn').attr('data', id);


                if ($('.selectedStockLabel > #result').attr('data-city') != id) {
                    if (!$('.confirmChooseStock_visibility').is(":visible")) {
                        prevStockTitle = $('.selectedStockLabel > #result').text();
                    }
                    else {
                        $('.confirmChooseStock_visibility').hide();
                        prevStockTitle = null;
                    }

                    $('.selectedStockLabel > #result').text('ничего не выбрано');

                }
                else {
                    if ($('.chooseStock').text() != 'ничего не выбрано') {
                        $('.selectedStockLabel > #result').text($('.chooseStock').text());
                        $('.confirmChooseStock_visibility').hide();
                    }
                }

                var elems = $('.citylink');
                for (i = 0; i < elems.length; i++) {
                    if ($(elems[i]).attr('data')/*.split('-')[1]*/ != id) {
                        $(elems[i]).toggle();
                    }
                    else {
                        $(elems[i]).hide();
                    }
                }
            }
        });
    }
}

var prevStockTitle = null;

function stockSearch() {
    var input, filter, ul, li, a, i;
    input = $("#stockSearchInput");
    filter = input.val().toUpperCase();
    li = $("#aptlistSearch li");
    selectedCityID = getSelectedCityID();
    for (i = 0; i < li.length; i++) {
        if ($(li[i]).attr('data').split('-')[1] == selectedCityID) {
            a = li[i].getElementsByTagName("div")[0].getElementsByTagName("a")[0];
            if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = "";
            } else {
                li[i].style.display = "none";

            }
        }
    }
}


// Преобразовываем данные по складам в удобный формат для координат
var arrayLength = _stocks.length;
var coords = {};
var coord = [];
for (var i = 0; i < arrayLength; i++) {
    coord = [];
    coord = _stocks[i].SiteStockCoordinates.split(",");
    for (var y = 0; y < coord.length; y++) {
        coord[y] = parseFloat(coord[y]);
    }
    coords[_stocks[i].SiteStockFullTitle] = { id: parseFloat(_stocks[i].StockID), coord: coord, address: _stocks[i].SiteStockAddress, isroundtheclock: _stocks[i].IsRoundTheClock, optimeto: _stocks[i].OpTimeTo, optimefrom: _stocks[i].OpTimeFrom, stockid: _stocks[i].StockID, isOpened: _stocks[i].IsOpened };
}


function getStockID() {
	return coords[$("#result").html()].id; 
}

function getCityID() {
    var value = $(".chooseStock").attr("data-city");
    if (value == 0)
        return $(".dropbtn").attr('data');
    else
        return value;
}

function getSelectedCityID() {
    return $(".dropbtn").attr("data");
}

function setMapCenterByCity(id) {

    var city = _cities.filter(function (c) {
        return c.CityID == id;
    }).pop();
    myMap.balloon.close();
    myMap.setCenter(city.CityCoords.split(','), city.CityMapZoom);
}




function init() {
    
    isMapInited = true;

    function setMapCenterByCity(id) {

        var city = _cities.filter(function (c) {
            return c.CityID == id;
        }).pop();
        myMap.balloon.close();
        myMap.setCenter(city.CityCoords.split(','), city.CityMapZoom);
    }

    $(".private-map").hide();

    $(".chooseStock").on('click', function () {
        
        var id = $(".selStockTitle").attr('id');
        if (id != 0) {
            for (var v in coords) {
                if (coords[v].id == id) {
                    result.innerText = v;
                    $(".confirmChooseStock_visibility").hide();
                    setMapCenterByCity(getCityID());
                    //myPanTo(coords[v].coord, true);
                    break;
                }
            }
        }
        else {
            result.innerText = "ничего не выбрано";
        }

        cityID = getCityID();

        setMapCenterByCity(cityID);

        var elems = $('.gotoLi');
        for (i = 0; i < elems.length; i++) {
            if ($(elems[i]).attr('data').split('-')[1] == cityID) {
                $(elems[i]).show();
            }
            else {
                $(elems[i]).hide();
            }
        }

        var elems = $('.citylink');
        for (i = 0; i < elems.length; i++) {
            if ($(elems[i]).attr('data')/*.split('-')[1]*/ != cityID) {
                $(elems[i]).show();
            }
            else {
                $(elems[i]).hide();
                var text = $(elems[i]).text();
                $('.dropbtn').text(text);
                $('.dropbtn').attr('data', cityID);
            }
        }
        slider('aptslider', 0);
    }).fancybox({
        minWidth: "1000",
        minHeight: "650",
        fitToView: false,
        autoSize: false,
        closeClick: false,
        //type        : 'iframe',
        openEffect: 'none',
        closeEffect: 'none',
        scrolling: 'auto',
        padding: '0'
    });

    id = getCityID();
    city = _cities.filter(function (c) {
        return c.CityID == id;
    }).pop();

    var myMap = new ymaps.Map("map", {
        center: city.CityCoords.split(','),
        zoom: city.CityMapZoom
    });

    var arrayLength = _stocks.length;
    var apt = [];
    for (var i = 0; i < arrayLength; i++) {
        apt.push(_stocks[i].SiteStockFullTitle);
    }

    var gCollection = new ymaps.GeoObjectCollection({}, {

    });

    var placemarks = [];
    for (var v in coords) {
        (function () {
            var vTemp = v;
            var workTime;
            var balloonContentBodyText;
            var mapLogoPlacemark;
            if (coords[v].isOpened == '1') {
                mapLogoPlacemark = '//zdorov.ru/img/map_logo.png';
                if (coords[v].isroundtheclock == 0) {
                    var timeFrom = coords[v].optimefrom.substring(0, 5);
                    var timeTo = coords[v].optimeto.substring(0, 5);
                    workTime = '<p>Часы работы: с ' + timeFrom + ' по ' + timeTo + '</p>';
                }
                else {
                    workTime = '<p>Часы работы: <b>круглосуточно</b></p>';
                }

                balloonContentBodyText = '<div style="padding:6px;"><p>' + coords[v].address + '</p>' + workTime + '<br><a id="yt1" class="btnColorGreen button" href="#">Выбрать</a></div>';
            }
            else {
                mapLogoPlacemark = '//zdorov.ru/img/map_logo_notopened.png';
                workTime = '<p class="newapt">Скоро открытие!</p>';

                balloonContentBodyText = '<div style="padding:6px;"><p>' + coords[v].address + '</p>' + workTime + '<br></div>';
            }

            var placemark;
            placemark = new ymaps.Placemark(coords[v].coord, {
                hintContent: v,
                balloonContentHeader: '<p class="yamap_balloon_label">' + v + '</p>',
                balloonContentBody: balloonContentBodyText,
            }, {
                iconLayout: 'default#image',
                iconImageHref: mapLogoPlacemark,
                iconImageSize: [25, 23],
                iconImageOffset: [-13, -14],
                balloonCloseButton: true,
                hideIconOnBalloonOpen: false
            });
            placemark.events.add('click', function () {
                if (coords[vTemp].isOpened == '1') {
                    $("#result").html(vTemp);

                    if (vTemp.id != $(".selStockTitle").attr('id')) {
                        $(".confirmChooseStock_visibility").hide();
                    }
                    changeConfimBtnVisibility(vTemp.id, 1);
                }
            });

            placemarks[coords[v].stockid] = placemark;
        })()
    }

    for (var i in placemarks) {
        gCollection.add(placemarks[i]);
    }


    // Добавляем метку на карту
    myMap.geoObjects.add(gCollection);

    function changeConfimBtnVisibility(stockid, isOpened) {
        if (isOpened == '0') {
            $(".confirmChooseStock_visibility").hide();
        }
        else {
            $(".confirmChooseStock_visibility").css('display', 'inline').hide().fadeIn();

            /* показывать "Подтвердить выбор" даже если повторно выбрана та же аптека  */
            $(".confirmChooseStock_visibility").fadeIn();
        }

    }

    // куда скакать
    function clickGoto() {

        var pos = this.firstElementChild.firstElementChild.innerText;
        var headerText = pos;
        if (coords[pos].isOpened == '0') {
            headerText += ' (скоро открытие)';
        }

        result.innerText = headerText;

        // переходим по координатам
        myPanTo(coords[pos].coord, false, $(this).attr('data').split('-')[0].replace(/#/, ''));

        changeConfimBtnVisibility(coords[pos].id, coords[pos].isOpened);
        return false;
    }

    function myPanTo(coord, isredraw, key) {
        if (!(coord instanceof Array))
            throw new Error('ожидается массив в myPanTo');
    
        myMap.setCenter(coord, 16);
    }



    function clickAllMap() {
        
        setMapCenterByCity(getSelectedCityID());
        return false;
    }

    // навешиваем обработчики
    var col = document.querySelectorAll("li.gotoLi");
    for (var i = 0, n = col.length; i < n; ++i) {
        col[i].onclick = clickGoto;
    }

    var col = document.querySelectorAll("a.showAllMap");
    for (var i = 0, n = col.length; i < n; ++i) {
        col[i].onclick = clickAllMap;
    }

    function openBalloon(key) {
        if (typeof placemarks[key] == "object") {
            placemarks[key].balloon.open();
        }
    }

    function funcChangeCity(id) {
        /*
        $.ajax({
            'type': 'post',
            //'complete': $.fancybox.close(),
            'success': (function (results) {
                var myData = JSON.parse(results);

            }),
            'data': { 'selectedCity': id },
            'url': '/catalog/ChangeCity',
            'cache': false
        });
        */

        var elems = $('.gotoLi');
        for (i = 0; i < elems.length; i++) {
            if ($(elems[i]).attr('data').split('-')[1] == id) {
                $(elems[i]).toggle();
            }
            else {
                $(elems[i]).hide();
            }
        }

        var text = $(".citylink[data='" + id + "']").text();
        $('.dropbtn').text(text);

        var elems = $('.citylink');
        for (i = 0; i < elems.length; i++) {
            if ($(elems[i]).attr('data')/*.split('-')[1]*/ != id) {
                $(elems[i]).toggle();
            }
            else {
                $(elems[i]).hide();
            }
        }

        city = _cities.filter(function (c) {
            return c.CityID == id;
        }).pop();

        myMap.setCenter(city.CityCoords.split(','), city.CityMapZoom);
    }


    var col = document.querySelectorAll("a.citylink");
    for (var i = 0, n = col.length; i < n; ++i) {
        id = col[i].getAttribute("data");
        col[i].onclick = (function () {
            {
                id = $(this).attr('data');
                /*
                $.ajax({
                    'type': 'post',
                    //'complete': $.fancybox.close(),
                    'success': (function (results) {
                        var myData = JSON.parse(results);

                    }),
                    'data': { 'selectedCity': id },
                    'url': '/catalog/ChangeCity',
                    'cache': false
                });
                */

                var elems = $('.gotoLi');
                for (i = 0; i < elems.length; i++) {
                    if ($(elems[i]).attr('data').split('-')[1] == id) {
                        $(elems[i]).toggle();
                    }
                    else {
                        $(elems[i]).hide();
                    }
                }

                var text = $(this).text();
                $('.dropbtn').text(text);
                $('.dropbtn').attr('data', id);

                
                if ($('.selectedStockLabel > #result').attr('data-city') != id)
                {
                    if (!$('.confirmChooseStock_visibility').is(":visible")) {
                        prevStockTitle = $('.selectedStockLabel > #result').text();
                    }
                    else {
                        $('.confirmChooseStock_visibility').hide();
                        prevStockTitle = null;
                    }

                    $('.selectedStockLabel > #result').text('ничего не выбрано');
                    
                }
                else {
                    if ($('.chooseStock').text() != 'ничего не выбрано') {
                        $('.selectedStockLabel > #result').text($('.chooseStock').text());
                        $('.confirmChooseStock_visibility').hide();
                    }
                }
                
                var elems = $('.citylink');
                for (i = 0; i < elems.length; i++) {
                    if ($(elems[i]).attr('data')/*.split('-')[1]*/ != id) {
                        $(elems[i]).toggle();
                    }
                    else {
                        $(elems[i]).hide();
                    }
                }
                setMapCenterByCity(id);
            }
        });
    }
}

/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function funcCitiesDropDown() {
    document.getElementById("citiesDropDown").classList.toggle("show");
}



// Close the dropdown menu if the user clicks outside of it
window.onclick = function (event) {
    matches = event.target.matches ? event.target.matches('.dropbtn') : event.target.msMatchesSelector('.dropbtn');
    if (!matches) {

        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}