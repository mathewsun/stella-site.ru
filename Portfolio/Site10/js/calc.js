$(document).ready(function() {
	
    $('#sumRange').on('change', function(){
        calc();
    });

    $('#percentRange').on('change', function(){
        calc();
    });

    $('#monthRange').on('change', function(){
        calc();
    });

    function calc(){
        var S = $('#sumRange').val() - 0;
        var p = $('#percentRange').val() - 0;
        var n = $('#monthRange').val() - 0;
		
		p = p+4;

        if(
            typeof S != "number" ||
            typeof p != "number" ||
            typeof n != "number"
        ) return false;

        p = p / 1200;
        n = n * 12;

        var a = Math.round(S * p / (1 - Math.pow(1 + p, -n))).toFixed(2);
        var res = a.split( /(?=(?:\d{3})+(?!\d))/ );
        document.getElementById("credit_res").innerHTML = res;
    }

    // Modal
    $('#free_registration_mortgage_btn').click(function () {
        $('#free_registration_mortgage_modal').css('display','block');
    });


    $('.close').click(function () {
        $('.modal_m').css('display','none');
    });

    var free_registration_mortgage_modal = document.getElementById('free_registration_mortgage_modal');

    window.onclick = function(event) {
        if (event.target == free_registration_mortgage_modal) {
            free_registration_mortgage_modal.style.display = "none";
        }
    }
});


var sumRange = document.getElementById("sumRange");
var sumRangeTxt = document.getElementById("sumRangeTxt");
sumRangeTxt.innerHTML = sumRange.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
sumRange.oninput = function() {
    var a = this.value;
    var result= a.split( /(?=(?:\d{3})+(?!\d))/ );

    sumRangeTxt.innerHTML = result + ' руб.';
}

var percentRange = document.getElementById("percentRange");
var percentRangeTxt = document.getElementById("percentRangeTxt");
var pVal = percentRange.value;
pVal = Number(pVal) + 4;
percentRangeTxt.innerHTML = pVal + '%'; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
percentRange.oninput = function() {
    var p = $('#percentRange').val() - 0;

    p = p+4;

    percentRangeTxt.innerHTML = p + '%';
}

var monthRange = document.getElementById("monthRange");
var monthRangeTxt = document.getElementById("monthRangeTxt");
monthRangeTxt.innerHTML = monthRange.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
monthRange.oninput = function() {
    monthRangeTxt.innerHTML = this.value + ' лет';
}