$(function() {

	/**
	 * Variables
	 */

	var headerBottomText = $('.header-bottom__text-wrap p').text();
	var sliderSpeed = 300;
	var section4SliderSpeed = 80;
	var headerSliderAniSpeed = 200;

	/**
	 * Верхнее Меню
	 */

	$('.header-top__menu-btn').click(function(e) {
		$(this).toggleClass('active');
		$('.header-top__menu').toggleClass('active');
	});
	$('.header-top__menu a').click(function(e) {
		if ( $('.header-top__menu').hasClass('active') ) {
			$('.header-top__menu-btn').removeClass('active');
			$('.header-top__menu').removeClass('active');
		}
	});
	$(window).click(function(e) {
		if( !$(e.target).closest('.header-top__menu-btn').length && !$(e.target).closest('.header-top__menu').length ) {
			if ( $('.header-top__menu').hasClass('active') ) {
				$('.header-top__menu-btn').removeClass('active');
				$('.header-top__menu').removeClass('active');
			}
		}
	});

	/**
	 * Выбор города
	 */

	$('.modal-cities-list li').click(function() {
		$('#cities-link').text( $(this).text() );
		$.magnificPopup.close();
		$('.modal-cities-list li').removeClass('active');
		$(this).addClass('active');
	});

	/**
	 * Переключение слайдов в хедере
	 */

	$('.header-bottom__controls button:eq(0)').click(function(e) {
		// e.stopPropagation();
		e.preventDefault();

		$('.header').removeClass('header--dark');
		$('.header').removeClass('header--slide-2');
		$('.header').removeClass('header--dark');
		$('.header').removeClass('header--slide-3');
		$('.header-bottom__text-wrap').removeClass('header-bottom__text-wrap--slide-2');
		$('.header-bottom__text-wrap').removeClass('header-bottom__text-wrap--slide-3');

		$('.header-bottom__controls button').removeClass('active');
		$(this).addClass('active');

		$('.header-bottom__text-wrap p').text(headerBottomText);

		$('.header-bottom__text-btns .popup-player').attr('href', $(this).data('video-link'));

		if (window.matchMedia("(max-width: 440px)").matches) {
			var el = document.querySelector('.header-bottom__controls');

			$(el).animate({
				scrollLeft: 0
			}, headerSliderAniSpeed);
		}
	});
	$('.header-bottom__controls button:eq(1)').click(function(e) {
		// e.stopPropagation();
		e.preventDefault();

		$('.header').removeClass('header--dark');
		$('.header').removeClass('header--slide-3');
		$('.header-bottom__text-wrap').removeClass('header-bottom__text-wrap--slide-3');

		$('.header').addClass('header--dark');
		$('.header').addClass('header--slide-2');
		$('.header-bottom__text-wrap').addClass('header-bottom__text-wrap--slide-2');

		$('.header-bottom__controls button').removeClass('active');
		$(this).addClass('active');

		$('.header-bottom__text-wrap p').text('Вы отправитесь на Дикий запад в поисках золота. Погрузитесь во времена американских переселенцев и ковбоев. Лишь самые смелые пройдут испытания и получат свое золото.');

		$('.header-bottom__text-btns .popup-player').attr('href', $(this).data('video-link'));

		if (window.matchMedia("(max-width: 440px)").matches) {
			/**
			 * References
			 * https://codeburst.io/how-to-create-horizontal-scrolling-containers-d8069651e9c6
			 * https://plainjs.com/javascript/styles/get-and-set-scroll-position-of-an-element-26/
			 * https://www.tutorialspoint.com/How-to-animate-scrollLeft-using-jQuery
			 * https://stackoverflow.com/questions/14275304/how-to-get-margin-value-of-a-div-in-plain-javascript
			 */
			var el = document.querySelector('.header-bottom__controls');
			var elStyle = window.getComputedStyle(el);
			var elPadingRight = parseInt(elStyle.paddingRight);
			// var style = window.getComputedStyle(this);
			// var marginRight = parseInt(style.marginRight);

			$(el).animate({
				scrollLeft: el.scrollWidth/2 - this.offsetWidth/2 - elPadingRight + 4 - 3
			}, headerSliderAniSpeed);
			// console.log(el.scrollWidth);
			// console.log(el.scrollWidth/2);
			// console.log(this.getBoundingClientRect().left);
			// console.log(elPadingRight+4);
		}
	});
	$('.header-bottom__controls button:eq(2)').click(function(e) {
		// e.stopPropagation();
		e.preventDefault();

		$('.header').removeClass('header--dark');
		$('.header').removeClass('header--slide-2');
		$('.header-bottom__text-wrap').removeClass('header-bottom__text-wrap--slide-2');

		$('.header').addClass('header--dark');
		$('.header').addClass('header--slide-3');
		$('.header-bottom__text-wrap').addClass('header-bottom__text-wrap--slide-3');

		$('.header-bottom__controls button').removeClass('active');
		$(this).addClass('active');

		$('.header-bottom__text-wrap p').text('Таинственные джунгли, загадочные животные и нечто сверхъестественное повстречается вам на пути. Проявите свою смекалку и сможете разгадать великую тайну.');

		$('.header-bottom__text-btns .popup-player').attr('href', $(this).data('video-link'));

		if (window.matchMedia("(max-width: 440px)").matches) {
			var el = document.querySelector('.header-bottom__controls');

			$(el).animate({
				scrollLeft: el.scrollWidth
			}, headerSliderAniSpeed);
		}
	});


  /**
   * Magnific Popups
   */

  $('.popup-player').magnificPopup({
    // disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,
  });

  $('.popup-with-form').magnificPopup({
    type: 'inline',
    preloader: false,
    fixedContentPos: true,
    // focus: '#name',

    // When elemened is focused, some mobile browsers in some cases zoom in
    // It looks not nice, so we disable it:
    callbacks: {
      beforeOpen: function() {
        // Нужно для календарика
        this.wrap.removeAttr('tabindex');
        // if($(window).width() < 700) {
        //  this.st.focus = false;
        // } else {
        //  this.st.focus = '#name';
        // }
      }
    }
  });

  $('.popup-with-terms').magnificPopup({
      type: 'inline',
      preloader: false,
      fixedContentPos: true,
  });
  

	/**
	 * Section 3 sliders
	 */

	$('.sliderbox-slider').slick({
		arrows: true,
		infinite: true,
		speed: sliderSpeed,
		slidesToShow: 1,
		slidesToScroll: 1,
	});

	/**
	 * Section 4 sliders
	 */
    $('.review-slider-for').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        fade: true,
        infinite: false,
        dots: true,
        centerMode: true,
        speed: section4SliderSpeed
    });
    $('.slidervideoreview-slider-for').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows: true,
        infinite: false,
        speed: section4SliderSpeed,
        focusOnSelect: false,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 997,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    arrows: false,
                }
            }
        ]
    });

    $('.lines-slider').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows: true,
        infinite: false,
        speed: section4SliderSpeed,
        focusOnSelect: false,
        responsive: [
            {
                breakpoint: 997,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    arrows: false,
                    slidesToScroll: 1,
                }
            }
        ]
    });

    $('.openslider-for').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        fade: true,
        infinite: false,
        speed: section4SliderSpeed,
        // asNavFor: '.openslider-nav'
    });
    $('.openslider-nav')
        .on('init', function(event, slick) {
        $('.openslider-nav .slick-slide.slick-current').addClass('is-active');
    })
    .slick({
        slidesToShow: 8,
        slidesToScroll: 1,
        arrows: false,
        infinite: false,
        speed: section4SliderSpeed,
        // asNavFor: '.section-4-slider-for',
        // dots: true,
        focusOnSelect: false,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 7,
                    slidesToScroll: 7
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 5
                }
            },
            {
                breakpoint: 700,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 5,
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 5,
                    // centerMode: true,
                }
            },
            {
                breakpoint: 360,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                }
            }
        ]
    });
    $('.openslider-for').on('afterChange', function(event, slick, currentSlide) {
        $('.openslider-nav').slick('slickGoTo', currentSlide);
        var currrentNavSlideElem = '.openslider-nav .slick-slide[data-slick-index="' + currentSlide + '"]';
        $('.openslider-nav .slick-slide.is-active').removeClass('is-active');
        $(currrentNavSlideElem).addClass('is-active');
    });

    $('.openslider-nav').on('click', '.slick-slide', function(event) {
        event.preventDefault();
        var goToSingleSlide = $(this).data('slick-index');

        $('.openslider-for').slick('slickGoTo', goToSingleSlide);
    });



    $('.timeline-slider-for').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        fade: true,
        infinite: false,
        speed: section4SliderSpeed,
    });
    $('.timeline-slider-nav')
        .on('init', function(event, slick) {
        $('.timeline-slider-nav .slick-slide.slick-current').addClass('is-active');
    })
        .slick({
        slidesToShow: 8,
        slidesToScroll: 1,
        arrows: false,
        infinite: false,
        speed: section4SliderSpeed,
        // asNavFor: '.section-4-slider-for',
        // dots: true,
        focusOnSelect: false,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 7,
                    slidesToScroll: 7
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 5
                }
            },
            {
                breakpoint: 700,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 5,
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 5,
                    // centerMode: true,
                }
            },
            {
                breakpoint: 360,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                }
            }
        ]
    });
    $('.timeline-slider-for').on('afterChange', function(event, slick, currentSlide) {
        $('.timeline-slider-nav').slick('slickGoTo', currentSlide);
        var currrentNavSlideElem = '.timeline-slider-nav .slick-slide[data-slick-index="' + currentSlide + '"]';
        $('.timeline-slider-nav .slick-slide.is-active').removeClass('is-active');
        $(currrentNavSlideElem).addClass('is-active');
    });

    $('.timeline-slider-nav').on('click', '.slick-slide', function(event) {
        event.preventDefault();
        var goToSingleSlide = $(this).data('slick-index');

        $('.timeline-slider-for').slick('slickGoTo', goToSingleSlide);
    });




    $('.slider-for').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        fade: true,
        infinite: false,
        adaptiveHeight: true,
        // centerMode: true,
        // speed: section4SliderSpeed,
    });


	$('.section-4-slider-for').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		fade: true,
		infinite: false,
		speed: section4SliderSpeed,
		// asNavFor: '.section-4-slider-nav'
	});
	$('.section-4-slider-nav')
	.on('init', function(event, slick) {
		$('.section-4-slider-nav .slick-slide.slick-current').addClass('is-active');
	})
	.slick({
		slidesToShow: 8,
		slidesToScroll: 1,
		arrows: false,
		infinite: false,
		speed: section4SliderSpeed,
		// asNavFor: '.section-4-slider-for',
		// dots: true,
		focusOnSelect: false,
		responsive: [
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 7,
					slidesToScroll: 7
				}
			},
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 5,
					slidesToScroll: 5
				}
			},
			{
				breakpoint: 700,
				settings: {
					slidesToShow: 5,
					slidesToScroll: 5,
				}
			},
			{
				breakpoint: 576,
				settings: {
					slidesToShow: 5,
					slidesToScroll: 5,
					// centerMode: true,
				}
			},
			{
				breakpoint: 360,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 4,
				}
			}
		]
	});
	$('.section-4-slider-for').on('afterChange', function(event, slick, currentSlide) {
		$('.section-4-slider-nav').slick('slickGoTo', currentSlide);
		var currrentNavSlideElem = '.section-4-slider-nav .slick-slide[data-slick-index="' + currentSlide + '"]';
		$('.section-4-slider-nav .slick-slide.is-active').removeClass('is-active');
		$(currrentNavSlideElem).addClass('is-active');
	});

	$('.section-4-slider-nav').on('click', '.slick-slide', function(event) {
		event.preventDefault();
		var goToSingleSlide = $(this).data('slick-index');

		$('.section-4-slider-for').slick('slickGoTo', goToSingleSlide);
	});

	/**
	 * Section 8 slider
	 */

	function activateSection8Slider() {

		$('.section-8-items').slick({
			arrows: false,
			infinite: true,
			speed: sliderSpeed,
			slidesToShow: 1,
			slidesToScroll: 1,
			centerMode: true,
			centerPadding: '20px',
			responsive: [
				{
					breakpoint: 768,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2,
						centerPadding: '20px',
					}
				},
				{
					breakpoint: 620,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
						centerPadding: '95px',
					}
				},
				{
					breakpoint: 480,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
						centerPadding: '40px',
					}
				},
				{
					breakpoint: 400,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
						centerPadding: '20px',
					}
				},
				{
					breakpoint: 360,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
						centerPadding: '10px',
					}
				},
			]
		});

	}

	/**
	 * News slider
	 */

	function activateNewsSlider() {

		$('.news-block').slick({
			arrows: false,
			infinite: true,
			speed: sliderSpeed,
			slidesToShow: 1,
			slidesToScroll: 1,
			centerMode: true,
			centerPadding: '20px',
			responsive: [
				{
					breakpoint: 768,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2,
						centerPadding: '20px',
					}
				},
				{
					breakpoint: 620,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
						centerPadding: '95px',
					}
				},
				{
					breakpoint: 480,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
						centerPadding: '40px',
					}
				},
				{
					breakpoint: 400,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
						centerPadding: '14px',
					}
				},
				{
					breakpoint: 360,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
						centerPadding: '10px',
					}
				},
			]
		});

	}

	/**
	 * JQuery Selectric
	 * http://selectric.js.org/
	 */

	// $(function() {
	// 	$('.phone-input select').selectric();
	// });

	/**
	 * JQuery Mask Plugin
	 * https://igorescobar.github.io/jQuery-Mask-Plugin/
	 */

	// $('.phone-input input').mask('(000) 000-00-00');



	/**
	 * Проверка на время в модалке
	 * Нажитие на кнопки "Позвонить сейчас" и "по времени" в модалке "Заказать звонок"
	 */

	var d = new Date();
	var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
	var nd = new Date(utc + (3600000*+3));
	var timeNow = nd.getHours()*60 + nd.getMinutes();
	var dayOfWeek = nd.getDay();
	// console.log(nd.getDay());
	// console.log(nd.getHours()*60 + nd.getMinutes());

	// Если время по Москве больше 10 часов (600 минут) и меньше 20 (1200 минут) и дунь недели не суббота или воскресенье
	if (timeNow >= 600 && timeNow <= 1200 && dayOfWeek != 6 && dayOfWeek != 7) {
		$('.js-call-me-input').parent().hide();
	} else {
		$('label[for="call-me-now"]').hide();
		$('.js-call-me').prop('checked', true);
		$('.js-call-me-input').prop('required', true).prop('disabled', false);
	}

	$('.modal-callback__when label').click(function(e) {
		if( $(this).prev().hasClass('js-call-me') ) {
			$('.js-call-me-input').parent().show();
			$('.js-call-me-input').prop('required', true).prop('disabled', false);
			// $('.js-call-me-input[type="datetime-local"]').trigger('click');
		} else {
			$('.js-call-me-input').parent().hide();
			$('.js-call-me-input').prop('required', false).prop('disabled', true);
		}
	});


	/**
	 * Таймер для опроса
	 * https://stackoverflow.com/questions/20618355/the-simplest-possible-javascript-countdown-timer


	function CountDownTimer(duration, granularity) {
		this.duration = duration;
		this.granularity = granularity || 1000;
		this.tickFtns = [];
		this.running = false;
	}
	CountDownTimer.prototype.start = function() {
		if (this.running) {
			return;
		}
		this.running = true;
		var start = Date.now(),
				that = this,
				diff, obj;
		(function timer() {
			diff = that.duration - (((Date.now() - start) / 1000) | 0);
			if (diff > 0) {
				setTimeout(timer, that.granularity);
			} else {
				diff = 0;
				that.running = false;
			}
			obj = CountDownTimer.parse(diff);
			that.tickFtns.forEach(function(ftn) {
				ftn.call(this, obj.minutes, obj.seconds);
			}, that);
		}());
	};
	CountDownTimer.prototype.onTick = function(ftn) {
		if (typeof ftn === 'function') {
			this.tickFtns.push(ftn);
		}
		return this;
	};
	CountDownTimer.prototype.expired = function() {
		return !this.running;
	};
	CountDownTimer.parse = function(seconds) {
		return {
			'minutes': (seconds / 60) | 0,
			'seconds': (seconds % 60) | 0
		};
	};

	// Первый таймер
	var display = document.querySelector('#timer span'),
			sec = 180, // Время таймера в секундах
			timer = new CountDownTimer(sec),
			timeObj = CountDownTimer.parse(sec);

	format(timeObj.minutes, timeObj.seconds);

	timer.onTick(format);

	function format(minutes, seconds) {
		// minutes = minutes < 10 ? "0" + minutes : minutes;
		seconds = seconds < 10 ? "0" + seconds : seconds;
		display.textContent = minutes + ':' + seconds;
	}

	// Второй таймер
	var display2 = document.querySelector('#timer-2 span'),
			sec2 = 180, // Время таймера в секундах
			timer2 = new CountDownTimer(sec),
			timeObj2 = CountDownTimer.parse(sec);

	format2(timeObj2.minutes, timeObj2.seconds);

	timer2.onTick(format2);

	function format2(minutes, seconds) {
		// minutes = minutes < 10 ? "0" + minutes : minutes;
		seconds = seconds < 10 ? "0" + seconds : seconds;
		display2.textContent = minutes + ':' + seconds;
	}
	// Старт таймера
	// $('').click(function() {
		// timer.start();
	// });*/

	/**
	 * Опрос верхний
	 */

	/*var timerOn = false;*/

	$('.quiz--top .quiz__tab label').click(function(e) {
		var currentTab = $(this).parent().index();
		// console.log(currentTab);

	/*	if ( !timerOn ) {
			timer.start();
			timerOn = true;
		}
*/
		if ( currentTab < 2 ) {
			var nextTab = ++currentTab;
			$('.quiz--top .quiz__tab').removeClass('active');
			$('.quiz--top .quiz__tab:eq(' + nextTab + ')').addClass('active');
			$('.quiz--top .quiz__title').removeClass('active');
			$('.quiz--top .quiz__title:eq(' + nextTab + ')').addClass('active');
			$('.quiz--top .quiz__description').removeClass('active');
			$('.quiz--top .quiz__description:eq(' + nextTab + ')').addClass('active');
			$('.quiz--top .quiz__indicator').removeClass('fill-0').removeClass('fill-1').removeClass('fill-2').removeClass('fill-3');
			$('.quiz--top .quiz__indicator').addClass('fill-' + nextTab);
			$('.quiz--top .quiz__indicator span span').text(nextTab + 1);
		} else {
			$('.quiz--top .quiz__bottom').hide();
			$('.quiz--top .quiz-final').show();
		}

		if ( currentTab > 0 && currentTab < 3 ) {
			$('.quiz--top .quiz__prev').addClass('active');
		} else {
			$('.quiz--top .quiz__prev').removeClass('active');
		}
	});

	$('.quiz--top .quiz__prev').click(function(e) {
		var currentTab = $('.quiz--top .quiz__tab.active').index();
		// console.log(currentTab);

		var prevTab = --currentTab;
		$('.quiz--top .quiz__tab').removeClass('active');
		$('.quiz--top .quiz__tab:eq(' + prevTab + ')').addClass('active');
		$('.quiz--top .quiz__title').removeClass('active');
		$('.quiz--top .quiz__title:eq(' + prevTab + ')').addClass('active');
		$('.quiz--top .quiz__description').removeClass('active');
		$('.quiz--top .quiz__description:eq(' + prevTab + ')').addClass('active');
		$('.quiz--top .quiz__indicator').removeClass('fill-0').removeClass('fill-1').removeClass('fill-2').removeClass('fill-3');
		$('.quiz--top .quiz__indicator').addClass('fill-' + prevTab);
		$('.quiz--top .quiz__indicator span span').text(prevTab + 1);

		if ( currentTab > 0 && currentTab < 3 ) {
			$('.quiz--top .quiz__prev').addClass('active');
		} else {
			$('.quiz--top .quiz__prev').removeClass('active');
		}
	});

	$('.quiz--top .quiz-change-answers').click(function(e) {
		$('.quiz--top .quiz__bottom').show();
		$('.quiz--top .quiz-final').hide();
	});

	/**
	 * Опрос нижний
	 */

	var timerOn2 = false;

	$('.quiz--bottom .quiz__tab label').click(function(e) {
		var currentTab = $(this).parent().index();
		// console.log(currentTab);

		if ( !timerOn2 ) {
			timer2.start();
			timerOn2 = true;
		}

		if ( currentTab < 3 ) {
			var nextTab = ++currentTab;
			$('.quiz--bottom .quiz__tab').removeClass('active');
			$('.quiz--bottom .quiz__tab:eq(' + nextTab + ')').addClass('active');
			$('.quiz--bottom .quiz__title').removeClass('active');
			$('.quiz--bottom .quiz__title:eq(' + nextTab + ')').addClass('active');
			$('.quiz--bottom .quiz__description').removeClass('active');
			$('.quiz--bottom .quiz__description:eq(' + nextTab + ')').addClass('active');
			$('.quiz--bottom .quiz__indicator').removeClass('fill-0').removeClass('fill-1').removeClass('fill-2').removeClass('fill-3');
			$('.quiz--bottom .quiz__indicator').addClass('fill-' + nextTab);
			$('.quiz--bottom .quiz__indicator span span').text(nextTab + 1);
		} else {
			$('.quiz--bottom .quiz__bottom').hide();
			$('.quiz--bottom .quiz-final').show();
			$('.quiz--bottom').addClass('quiz--final-stage'); // отличие от верхнего
		}

		if ( currentTab > 0 && currentTab < 4 ) {
			$('.quiz--bottom .quiz__prev').addClass('active');
		} else {
			$('.quiz--bottom .quiz__prev').removeClass('active');
		}
	});

	$('.quiz--bottom .quiz__prev').click(function(e) {
		var currentTab = $('.quiz--bottom .quiz__tab.active').index();
		// console.log(currentTab);

		var prevTab = --currentTab;
		$('.quiz--bottom .quiz__tab').removeClass('active');
		$('.quiz--bottom .quiz__tab:eq(' + prevTab + ')').addClass('active');
		$('.quiz--bottom .quiz__title').removeClass('active');
		$('.quiz--bottom .quiz__title:eq(' + prevTab + ')').addClass('active');
		$('.quiz--bottom .quiz__description').removeClass('active');
		$('.quiz--bottom .quiz__description:eq(' + prevTab + ')').addClass('active');
		$('.quiz--bottom .quiz__indicator').removeClass('fill-0').removeClass('fill-1').removeClass('fill-2').removeClass('fill-3');
		$('.quiz--bottom .quiz__indicator').addClass('fill-' + prevTab);
		$('.quiz--bottom .quiz__indicator span span').text(prevTab + 1);

		if ( currentTab > 0 && currentTab < 4 ) {
			$('.quiz--bottom .quiz__prev').addClass('active');
		} else {
			$('.quiz--bottom .quiz__prev').removeClass('active');
		}
	});

	$('.quiz--bottom .quiz-change-answers').click(function(e) {
		$('.quiz--bottom .quiz__bottom').show();
		$('.quiz--bottom .quiz-final').hide();
		$('.quiz--bottom').removeClass('quiz--final-stage'); // отличие от верхнего
	});

	/**
	 * Smooth scroll
	 */

	$('.earnings__btn a[href*="#"]:not([href="#"]), .header-top__menu a[href*="#"]:not([href="#"]), .header-content .btn, .sliderbox-item .btn').click(function() {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');

			if (target.length) {
				$('html, body').animate({
					scrollTop: target.offset().top
				}, 600);
				return false;
			}
		}
	});

	/**
	 * On resize
	 */

	$(window).resize(function(){

		if (window.matchMedia("(min-width: 768px)").matches) {
			// deactivate slider, refresh element with some delay
			setTimeout(function(){
				$(".section-8-items").load(location.href+" .section-8-items>*", "");
			}, 100);
			setTimeout(function(){
				$(".news-block").load(location.href+" .news-block>*", "");
			}, 100);
		} else {
			if ( !$('.section-8-items').hasClass('slick-initialized') ) {
				activateSection8Slider();
			}
			if ( !$('.news-block').hasClass('slick-initialized') ) {
				activateNewsSlider();
			}
		}

	});

	/**
	 * On Start
	 */

	if (window.matchMedia("(max-width: 767px").matches) {
		activateSection8Slider();
		activateNewsSlider();
	}

    $('a.close').click(function() {
        $('.sliceblock').hide();
    });
    $('.tab_1').click(function() {
        $('.tabcontent_1').toggleClass('show_tab_content');
        $('.tabcontent_2').removeClass('show_tab_content');
        $('.tabcontent_3').removeClass('show_tab_content');
        $('.tabcontent_4').removeClass('show_tab_content');
        $('.tabcontent_5').removeClass('show_tab_content');
        $('.tabcontent_6').removeClass('show_tab_content');
        $('.tab_1').toggleClass('activetab');
        $('.tab_2').removeClass('activetab');
        $('.tab_3').removeClass('activetab');
        $('.tab_4').removeClass('activetab');
        $('.tab_5').removeClass('activetab');
        $('.tab_6').removeClass('activetab');
    });
    $('.tab_2').click(function() {
        $('.tabcontent_1').removeClass('show_tab_content');
        $('.tabcontent_2').toggleClass('show_tab_content');
        $('.tabcontent_3').removeClass('show_tab_content');
        $('.tabcontent_4').removeClass('show_tab_content');
        $('.tabcontent_5').removeClass('show_tab_content');
        $('.tabcontent_6').removeClass('show_tab_content');
        $('.tab_1').removeClass('activetab');
        $('.tab_2').toggleClass('activetab');
        $('.tab_3').removeClass('activetab');
        $('.tab_4').removeClass('activetab');
        $('.tab_5').removeClass('activetab');
        $('.tab_6').removeClass('activetab');
    });
    $('.tab_3').click(function() {
        $('.tabcontent_1').removeClass('show_tab_content');
        $('.tabcontent_2').removeClass('show_tab_content');
        $('.tabcontent_3').toggleClass('show_tab_content');
        $('.tabcontent_4').removeClass('show_tab_content');
        $('.tabcontent_5').removeClass('show_tab_content');
        $('.tabcontent_6').removeClass('show_tab_content');
        $('.tab_1').removeClass('activetab');
        $('.tab_2').removeClass('activetab');
        $('.tab_3').toggleClass('activetab');
        $('.tab_4').removeClass('activetab');
        $('.tab_5').removeClass('activetab');
        $('.tab_6').removeClass('activetab');
    });
    $('.tab_4').click(function() {
        $('.tabcontent_1').removeClass('show_tab_content');
        $('.tabcontent_2').removeClass('show_tab_content');
        $('.tabcontent_3').removeClass('show_tab_content');
        $('.tabcontent_4').toggleClass('show_tab_content');
        $('.tabcontent_5').removeClass('show_tab_content');
        $('.tabcontent_6').removeClass('show_tab_content');
        $('.tab_1').removeClass('activetab');
        $('.tab_2').removeClass('activetab');
        $('.tab_3').removeClass('activetab');
        $('.tab_4').toggleClass('activetab');
        $('.tab_5').removeClass('activetab');
        $('.tab_6').removeClass('activetab');
    });
    $('.tab_5').click(function() {
        $('.tabcontent_1').removeClass('show_tab_content');
        $('.tabcontent_2').removeClass('show_tab_content');
        $('.tabcontent_3').removeClass('show_tab_content');
        $('.tabcontent_4').removeClass('show_tab_content');
        $('.tabcontent_5').toggleClass('show_tab_content');
        $('.tabcontent_6').removeClass('show_tab_content');
        $('.tab_1').removeClass('activetab');
        $('.tab_2').removeClass('activetab');
        $('.tab_3').removeClass('activetab');
        $('.tab_4').removeClass('activetab');
        $('.tab_5').toggleClass('activetab');
        $('.tab_6').removeClass('activetab');
    });
    $('.tab_6').click(function() {
        $('.tabcontent_1').removeClass('show_tab_content');
        $('.tabcontent_2').removeClass('show_tab_content');
        $('.tabcontent_3').removeClass('show_tab_content');
        $('.tabcontent_4').removeClass('show_tab_content');
        $('.tabcontent_5').removeClass('show_tab_content');
        $('.tabcontent_6').toggleClass('show_tab_content');
        $('.tab_1').removeClass('activetab');
        $('.tab_2').removeClass('activetab');
        $('.tab_3').removeClass('activetab');
        $('.tab_4').removeClass('activetab');
        $('.tab_5').removeClass('activetab');
        $('.tab_6').toggleClass('activetab');
    });
    $('.xr_show').click(function() {
        $('.xr').css('display', 'block');
        $('.xr_show').hide();
    });
    $('.xr_show2').click(function() {
        $('.xr2').css('display', 'block');
        $('.xr_show2').hide();
    });

    /**
     * @Vue
     * */
    let options = {
        data: {
            code: '',
            country: [
                {
                    name: 'США',
                    prefix: 'us',
                    code: '1'
                },
                {
                    name: 'Мексика',
                    prefix: 'mx',
                    code: '52'
                },
                {
                    name: 'Бразилия',
                    prefix: 'br',
                    code: '55'
                },
                {
                    name: 'Азербайджан',
                    prefix: 'az',
                    code: '994'
                },
                {
                    name: 'Армения',
                    prefix: 'am',
                    code: '374'
                },
                {
                    name: 'Гонконг',
                    prefix: 'hk',
                    code: '852'
                },
                {
                    name: 'Грузия',
                    prefix: 'ge',
                    code: '995'
                },
                {
                    name: 'Израиль',
                    prefix: 'il',
                    code: '972'
                },
                {
                    name: 'Киргизия',
                    prefix: 'kg',
                    code: '996'
                },
                {
                    name: 'Китай',
                    prefix: 'cn',
                    code: '86'
                },
                {
                    name: 'Таджикистан',
                    prefix: 'tj',
                    code: '992'
                },
                {
                    name: 'Узбекистан',
                    prefix: 'uz',
                    code: '998'
                },
                {
                    name: 'Япония',
                    prefix: 'jp',
                    code: '81'
                },
                {
                    name: 'Австрия',
                    prefix: 'at',
                    code: '43'
                },
                {
                    name: 'Албания',
                    prefix: 'al',
                    code: '355'
                },
                {
                    name: 'Андорра',
                    prefix: 'ad',
                    code: '376'
                },
                {
                    name: 'Беларусь',
                    prefix: 'by',
                    code: '375'
                },
                {
                    name: 'Бельгия',
                    prefix: 'be',
                    code: '32'
                },
                {
                    name: 'Болгария',
                    prefix: 'bg',
                    code: '359'
                },
                {
                    name: 'Босния и Герцеговина',
                    prefix: 'ba',
                    code: '387'
                },
                {
                    name: 'Ватикан',
                    prefix: 'va',
                    code: '379'
                },
                {
                    name: 'Великобритания',
                    prefix: 'gb',
                    code: '44'
                },
                {
                    name: 'Венгрия',
                    prefix: 'hu',
                    code: '36'
                },
                {
                    name: 'Германия',
                    prefix: 'de',
                    code: '49'
                },
                {
                    name: 'Гернси',
                    prefix: 'gg',
                    code: '44'
                },
                {
                    name: 'Греция',
                    prefix: 'gr',
                    code: '30'
                },
                {
                    name: 'Гибралтар',
                    prefix: 'gi',
                    code: '350'
                },
                {
                    name: 'Дания',
                    prefix: 'dk',
                    code: '45'
                },
                {
                    name: 'Джерси',
                    prefix: 'je',
                    code: '44'
                },
                {
                    name: 'Ирландия',
                    prefix: 'ie',
                    code: '353'
                },
                {
                    name: 'Исландия',
                    prefix: 'is',
                    code: '354'
                },
                {
                    name: 'Испания',
                    prefix: 'es',
                    code: '34'
                },
                {
                    name: 'Италия',
                    prefix: 'it',
                    code: '39'
                },
                {
                    name: 'Латвия',
                    prefix: 'lv',
                    code: '371'
                },
                {
                    name: 'Литва',
                    prefix: 'lt',
                    code: '370'
                },
                {
                    name: 'Лихтенштейн',
                    prefix: 'li',
                    code: '423'
                },
                {
                    name: 'Люксембург',
                    prefix: 'lu',
                    code: '352'
                },
                {
                    name: 'Македония',
                    prefix: 'mk',
                    code: '389'
                },
                {
                    name: 'Мальта',
                    prefix: 'mt',
                    code: '356'
                },
                {
                    name: 'Молдова',
                    prefix: 'md',
                    code: '373'
                },
                {
                    name: 'Монако',
                    prefix: 'mc',
                    code: '377'
                },
                {
                    name: 'Нидерланды',
                    prefix: 'nl',
                    code: '31'
                },
                {
                    name: 'Норвегия',
                    prefix: 'no',
                    code: '47'
                },
                {
                    name: 'Остров Мэн',
                    prefix: 'im',
                    code: '44'
                },
                {
                    name: 'Польша',
                    prefix: 'pl',
                    code: '48'
                },
                {
                    name: 'Португалия',
                    prefix: 'pt',
                    code: '351'
                },
                {
                    name: 'Россия',
                    prefix: 'ru',
                    code: '7'
                },
                {
                    name: 'Румыния',
                    prefix: 'ro',
                    code: '40'
                },
                {
                    name: 'Сан-Марино',
                    prefix: 'sm',
                    code: '378'
                },
                {
                    name: 'Сербия',
                    prefix: 'rs',
                    code: '381'
                },
                {
                    name: 'Словакия',
                    prefix: 'sk',
                    code: '421'
                },
                {
                    name: 'Словения',
                    prefix: 'si',
                    code: '386'
                },
                {
                    name: 'Украина',
                    prefix: 'ua',
                    code: '380'
                },
                {
                    name: 'Фарерские острова',
                    prefix: 'fo',
                    code: '298'
                },
                {
                    name: 'Финляндия',
                    prefix: 'fi',
                    code: '358'
                },
                {
                    name: 'Франция',
                    prefix: 'fr',
                    code: '33'
                },
                {
                    name: 'Хорватия',
                    prefix: 'hr',
                    code: '385'
                },
                {
                    name: 'Черногория',
                    prefix: 'me',
                    code: '382'
                },
                {
                    name: 'Чехия',
                    prefix: 'cz',
                    code: '420'
                },
                {
                    name: 'Швейцария',
                    prefix: 'ch',
                    code: '41'
                },
                {
                    name: 'Швеция',
                    prefix: 'se',
                    code: '46'
                },
                {
                    name: 'Эстония',
                    prefix: 'ee',
                    code: '372'
                }
            ],
            countryTarget: {
                alt: '',
                prefix: ''
            }
        },
        computed: {
            codeCountry(){
                return this.code ? `+${this.code}` : '';
            }
        },
        methods: {
            codePress(e){
                e.preventDefault();
                let codeReg = /^\d+$/;
                let codeValue = e.key;

                switch (true) {
                    case(codeValue == 'Backspace' && this.code.length > 0):
                        this.code = this.code.slice(0, -1);
                        break;

                    case(codeReg.test(codeValue) && this.code.length < 4):
                        this.code += codeValue;
                        break;
                }

                let countryTarget;
                let countryFlag = false;
                this.country.forEach(x => {
                    if(x['code'] == this.code){
                        countryFlag = true;
                        countryTarget = {
                            alt: x['name'],
                            prefix: x['prefix']
                        };
                    }
                });

                if(countryFlag){
                    this.countryTarget = countryTarget;
                } else {
                    this.countryTarget = {
                        alt: '',
                        prefix: ''
                    }
                }
            },
            codeFocus(e){
                e.target.closest('.phone-input').querySelector('.custom-phone__select-num').focus();
            }
        }
    };


    /**
     * DateTime picker
     * https://flatpickr.js.org
     */

    // $("#datetimepicker").flatpickr({
    //   enableTime: true,
    //   altInput: true,
    //   altFormat: "j F в H:i",
    //   dateFormat: "Y-m-d H:i",
    //   time_24hr: true,
    //   minDate: "today",
    //   shorthandCurrentMonth: true,
    //   "locale": "ru"  // locale for this instance only
    // });



    
});
