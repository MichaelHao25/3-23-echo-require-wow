require.config({　　　　
	paths: {
		"jquery": "./jquery-1.12.4.min",
		"swiper": "./swiper.min",
		"animation": "./wow",
		"swiper-animation": "./swiper.animate1.0.2.min"
	},
	shim: {
		animation: {
			deps: [],
			exports: 'WOW'
		}
	}

});

require(['jquery', 'swiper', 'animation', 'swiper-animation'], function($, swiper, animation, swiper_animation) {
	console.log('load finish!' + new Date());


	var abc = new animation;
	abc.init();

	function fix_screen(hide) {
		var top = document.documentElement.scrollTop || document.body.scrollTop;
		if (hide) {
			document.documentElement.style.overflow = 'hidden';
			$('body').addClass('active').css('top', '-' + top + 'px');
		} else {
			$('body').removeClass('active');
			document.documentElement.style.overflow = 'auto';
			document.documentElement.scrollTop = -parseInt($('body').css('top'));
			document.body.scrollTop = -parseInt($('body').css('top'));
		}
	}

	var width = window.innerWidth;
	var flag = 1;
	$(window).on('resize date-abc', function() {
		width = window.innerWidth;
		if (width >= 768 && flag == 1) {;
			initSwiper();
			flag = 0;
		}
	});
	$(window).trigger('date-abc');

	function initSwiper() {
		var mySwiper = new swiper('.swiper-scroll .swiper-container', {
			slidesPerView: 6,
			prevButton: '.swiper-scroll .left-control',
			nextButton: '.swiper-scroll .right-control',
			breakpoints: {
				//当宽度小于等于320
				1200: {
					slidesPerView: 4,
				},
				992: {
					slidesPerView: 2,
				}
			},
			onAfterResize: function(swiper) {
				var width = window.innerWidth
				if (width <= 768) {
					swiper.destroy(true, true)
					flag = 1;
				}
			}
		})
	}
	var banner = new swiper('.wrap-banner .swiper-container', {
		onInit: function(swiper) {
			swiperAnimateCache(swiper);
			swiperAnimate(swiper);
		},
		onSlideChangeEnd: function(swiper) {
			swiperAnimate(swiper);
		},
		pagination: '.swiper-pagination'
	})
	$('.header .nav .toggle-menu').on('click', function() {
		event.preventDefault();
		$(this).addClass('active')
		$(this).next().addClass('active')
		fix_screen('d')
	});
	$('.header .nav .layout').on('click', function() {
		if ($(this).hasClass('active')) {
			$(this).removeClass('active').prev().removeClass('active');
			fix_screen()
		}
	});
	$(window).on('scroll', function(e) {
		if ($('body').hasClass('active')) {
			return 0;
		}
		if ($(window).scrollTop() >= 200) {
			$('.header').addClass('active')
		} else {
			$('.header').removeClass('active')
		}
		if ($(window).scrollTop() >= 400) {
			$('.header').addClass('show')
		} else {
			$('.header').removeClass('show')
		}
	})
	$('.link-group .target').on('click', function() {
		var id = $(this).attr('data-id');
		$.each($('*[data-target]'), function(index, val) {
			if (id == $(val).attr('data-target')) {
				$('html,body').animate({
						scrollTop: $(val).offset().top - 100
					},
					600,
					function() {
						console.log('scroll finish.')
					});
			}
		});
		$('.header .nav .layout').trigger('click');
	});
})
