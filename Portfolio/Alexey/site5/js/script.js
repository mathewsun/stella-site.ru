$(function() {
  $('.iconMenu').click(function() {
    if($('.itemsMenu').is(':visible')) {
      $('.itemsMenu').removeClass('showitems'); 
    }
    else {
      $('.itemsMenu').addClass('showitems'); 
    }   
 }); 
});

$(document).ready(function() {
    if (YMaps.location) // Проверяем, доступна ли геопозиция
    { 
        console.log("Longitude: " + YMaps.location.longitude); // Выведем долготу
        console.log("Latitude: " + YMaps.location.latitude);   // Выведем широту
        $(".country").val(YMaps.location.country); // Достанем в input страну
        $(".region").val(YMaps.location.region);   // Достанем в input регион (область)
        $(".city").val(YMaps.location.city)        // Достанем в input город
    } 
});