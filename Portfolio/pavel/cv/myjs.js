$(document).ready(function () {
    $('.description').hide();
    $('.img_row').hide();
    $('#b1').on('click', function () {
        $('.one').slideToggle('fast');
    });
    $('#b2').on('click', function () {
        $('.two').slideToggle('fast');
    });
    $('#b3').on('click', function () {
        $('.three').slideToggle('fast');
    });
    $('#b4').on('click', function () {
        $('.four').slideToggle('fast');
    });
});

//для адаптации под вертикальный экран //

$(document).ready(function () {
    
    var aspectRatio = $(this).data('aspectRatio');
    if (aspectRatio == undefined) {
        aspectRatio = $(window).width() / $(window).height();
        $(this).data('aspectRatio', aspectRatio);
    }

    if (aspectRatio < 1) {
        $(".container").addClass("container_vertical").removeClass("container");
    } else {
        $(".container").addClass("container").removeClass("container_vertical");
    }
});
