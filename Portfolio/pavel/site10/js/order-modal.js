(function ($) {
    $(document).ready(function () {
        $('#phone_input').mask('+7(999) 999-99-99');
        $('#time_input').mask('99:99');
        $('#date_input').mask('99.99.' + (new Date()).getFullYear());

        $('a.poplight[data-service]').click(function () {
            var popID = 'popup_order';
            var popURL = $(this).attr('href');

            var query = popURL.split('?');
            var dim = query[1].split('&');
            var popWidth = dim[0].split('=')[1];

            $('#' + popID)
                .fadeIn()
                .css({'width': Number(popWidth)})
                .prepend('<a href="#" title="Закрыть" class="close"></a>')
                .find('[name="service"]').val($(this).data('service'))
            ;

            var popMargTop = ($('#' + popID).height() + 80) / 2;
            var popMargLeft = ($('#' + popID).width() + 80) / 2;

            $('#' + popID).css({
                'margin-top': -popMargTop,
                'margin-left': -popMargLeft
            });

            $('body').append('<div id="fade"></div>');
            $('#fade').css({'filter': 'alpha(opacity=80)'}).fadeIn();

            return false;
        });

        $('#popup_order').on('submit', function () {
            $.post('order_mail.php', $(this).serializeArray(), function() {
                // alert('Ваш запрос успешно отправлен');
                // $('#popup_order')[0].reset();
                location.href = '/success.php';
            });
        });

        $(document).on('click', 'a.close, #fade', closePopup);

        function closePopup() {
            $('#fade , .popup_block').fadeOut(function () {
                $('#fade, a.close').remove();
            });
            return false;
        }
    });
})(jQuery);
