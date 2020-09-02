$(document).ready(function() {

	$.fn.slider = function(SlideSpeed, TimeOut, NeedLinks){
		return this.each(function(){
			var _this = $(this);
			var hwSlideSpeed = SlideSpeed;
			var hwTimeOut = TimeOut;
			var hwNeedLinks = NeedLinks;
			_this.find('.slide_item').css({"position" : "absolute", "top":'0', "left": '0'}).hide().eq(0).show();
			var slideNum = 0;
			var slideTime;
			slideCount = _this.find(".sl_slider .slide_item").size();
			var animSlide = function(arrow){
				_this.find('.slider-wrap').addClass('running');
				clearTimeout(slideTime);
				_this.find('.slide_item').eq(slideNum).fadeOut(hwSlideSpeed, function() {_this.find('.slider-wrap').removeClass('running')});
				if(arrow == "next"){
					if(slideNum == (slideCount-1)){slideNum=0;}
					else{slideNum++}
				} else if(arrow == "prev") {
					if(slideNum == 0){slideNum=slideCount-1;}
					else{slideNum-=1}
				} else {
					slideNum = arrow;
				}
				_this.find('.slide_item').eq(slideNum).fadeIn(hwSlideSpeed, rotator);
				_this.find(".control-slide.active").removeClass("active");
				_this.find('.control-slide').eq(slideNum).addClass('active');
			}
			
			if(hwNeedLinks){
				var $linkArrow = $('<a class="sl_prevbutton sl_arrow" href="#">&lt;</a><a class="sl_nextbutton sl_arrow" href="#">&gt;</a>')
				.prependTo(_this.find('.sl_slider'));
				_this.find('.sl_nextbutton').click(function(){
					if(_this.find('.slider-wrap').is('.running')) return false; 
					animSlide("next");
					return false;
					})
				_this.find('.sl_prevbutton').click(function(){
					if(_this.find('.slider-wrap').is('.running')) return false; 
					animSlide("prev");
					return false;
				})
			}
			
			var $adderSpan = '';
			_this.find('.slide_item').each(function(index) {
				$adderSpan += '<span class = "control-slide">' + (index+1) + '</span>';
			});
			$('<div class="bullets">' + $adderSpan +'</div>').appendTo(_this.find('.slider-wrap')); 
			_this.find(".control-slide:first").addClass("active");
			_this.find('.control-slide').click(function(){
				if($(this).is('.active')) {return false;}
				var goToNum = parseFloat($(this).text())-1;
				animSlide(goToNum);
			});
			var pause = false;
			var rotator = function(){
				if(!pause){slideTime = setTimeout(function(){animSlide('next')}, hwTimeOut);}
			}
			
			_this.find('.slider-wrap').hover(	
				function(){clearTimeout(slideTime); pause = true;},
				function(){if(slideCount>1) {pause = false; rotator();}}
			);
			
			if(slideCount>1) {
				pause = false; rotator();
				_this.find('.sl_nextbutton').show();
			} else {
				pause = true; rotator();
				_this.find('.sl_nextbutton').hide();
				_this.find('.sl_prevbutton').hide();
				_this.find('.bullets').hide();
			}
			
		});
	};
})