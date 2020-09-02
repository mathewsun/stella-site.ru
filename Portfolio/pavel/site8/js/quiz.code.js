$(document).ready(function() { 

		$('#steps-wrap').show();
		$('#steps-wrap').addClass('animated fadeIn');
		$('.error-txt').text('Выберите хотя бы один вариант');	
		
		
		//Кнопка Далее - Проверка отметки чекбокса и отмена действий, если ни один не отмечен
		$('.step1 .btn-next').click(function(){
			if ( $('.step1 :checkbox:checked').length <= 0 ){
				$('.step1 .error-txt').fadeIn('fast');
				$('.step1 .btn-next').addClass('disabled');
				return false;
			}
			else {
				$('.step1').hide();
				$('.step2').fadeIn('fast');
			}
		});
		
		$('.step2 .btn-next').click(function(){
			if ( $('.step2 :checkbox:checked').length <= 0 ){
				$('.step2 .error-txt').fadeIn('fast');
				$('.step2 .btn-next').addClass('disabled');
				return false;
			}
			else {
				$('.step2').hide();
				$('.step3').fadeIn('fast');
			}
		});

		$('.step3 .btn-next').click(function(){
			if ( $('.step3 :checkbox:checked').length <= 0 ){
				$('.step3 .error-txt').fadeIn('fast');
				$('.step3 .btn-next').addClass('disabled');
				return false;
			}
			else {
				$('.step3').hide();
				$('.step4').fadeIn('fast');
				setTimeout(function(){
					$('.step4').hide();
					$('.final').fadeIn('fast');
				}, 5000);
				moveProgressBar();
				numAnimate();
			}
		});
			
		
		//Кнопка Пропустить
		$('.step1 .btn-prev').click(function(){
			$('#skip1').prop('checked', true);
			$('.step1').hide();
			$('.step2').fadeIn('fast');
		});
		$('.step2 .btn-prev').click(function(){
			$('#skip2').prop('checked', true);
			$('.step2').hide();
			$('.step3').fadeIn('fast');
		});
		$('.step3 .btn-prev').click(function(){
			$('#skip3').prop('checked', true);
			$('.step3').hide();
			$('.step4').fadeIn('fast');
			setTimeout(function(){
				$('.step4').hide();
				$('.final').fadeIn('fast');
			}, 5000);
			moveProgressBar();
			numAnimate();
		});

		
		//Действия при изменении чекбокса
		$('.step1 :checkbox').bind('change click', function () {
			$('.step1 .error-txt').hide(); //скрываем сообщение об ошибке
			$('.step1 .btn-next').removeClass('disabled'); // делаем визуально активной кнопку
		});
		$('.step2 :checkbox').bind('change click', function () {
			$('.step2 .error-txt').hide();
			$('.step2 .btn-next, .step2 .btn-prev').removeClass('disabled');
		});		
		$('.step3 :checkbox').bind('change click', function () {
			$('.step3 .error-txt').hide();
			$('.step3 .btn-next, .step3 .btn-prev').removeClass('disabled');
		});
		
		
		// progress
		// SIGNATURE PROGRESS
		function moveProgressBar() {
			var getPercent = ($('.progress-wrap').data('progress-percent') / 100);
			var getProgressWrapWidth = $('.progress-wrap').width();
			var progressTotal = getPercent * getProgressWrapWidth;
			var animationLength = 4000;

			// on page load, animate percentage bar to data percentage length
			// .stop() used to prevent animation queueing
			$('.progress-bar').stop().animate({
				left: progressTotal
			}, animationLength);
		}
		function numAnimate () {
			var number = 1;
			setInterval(function () {
			number++;
			if (number<=100) { $('.numbers').text(number); };
			}, 40);
		};
		

});

