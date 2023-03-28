var scrollTop,			
	 gnbTop,				// GNB Top
	 lnbTop,				// LNB Top

	 win_w,				
	 win_h,			

	 lyNums = 0,			
	 lyOne = 0;	

$(document).ready(function () {

	//탭 메뉴
	$("#fixMenu a").on('click', function () {
		var idx = $("#fixMenu a").index($(this));
		$("#fixMenu a").each(function(index){
			if(idx == index){
				$(this).addClass("on");
				$(this).find("span").addClass("rubberBand")
			}else{
				$(this).removeClass("on");
				$(this).find("span").removeClass("rubberBand")
			}
		});
	});

	//페이지이동시 메뉴
	/*$("#fixMenu a").each(function(index){
		var idx = $("#fixMenu a").index($(this));
		if(idx == index){
			if($(this).hasClass("on")){
				$(this).find("span").addClass("rubberBand")
			}else{
				$(this).find("span").removeClass("rubberBand")
			}

		}else{

		}
	});*/

	//설정버튼
	$(".set_btn").on('click', function(){
		if(!$(this).hasClass("on")){
			$(this).addClass("on");
			$(".setting_wp").slideDown();
		}else{
			$(this).removeClass("on");
			$(".setting_wp").slideUp();
		}
	});

	$("#container, #fixMenu").on('click', function(){
		$(".set_btn").removeClass("on");
		$(".setting_wp").slideUp();
	});
	
	//테마변경
	var darkMode;
	if (localStorage.getItem('dark-mode')) {  
	  // if dark mode is in storage, set variable with that value
	  darkMode = localStorage.getItem('dark-mode');  
	} else {  
	  // if dark mode is not in storage, set variable to 'light'
	  darkMode = 'light';  
	}

	// set new localStorage value
	localStorage.setItem('dark-mode', darkMode);


	if (localStorage.getItem('dark-mode') == 'dark') {
	  // if the above is 'dark' then apply .dark to the body
	  $('html').addClass('dark_theme');  
	  $("html").removeClass("light_theme");
	  $(".dark_effect").fadeOut(0);
	  $(".light_effect").fadeIn(1500);
	  $(".btg_btn a").addClass("on").prev().addClass("on")
	}

	// Toggle dark UI
	$(".btg_btn a").on('click', function () {
		if(!$(this).hasClass("on")){
			$(this).addClass("on").prev().addClass("on");
			$("html").addClass("dark_theme");
			$("html").removeClass("light_theme");
			$(".dark_effect").fadeOut(1500);
			$(".light_effect").fadeIn(1500);
			localStorage.setItem('dark-mode', 'dark');
		}else{
			$(this).removeClass("on").prev().removeClass("on");;
			$("html").removeClass("dark_theme");
			$("html").addClass("light_theme");
			$(".dark_effect").fadeIn(1500);
			$(".light_effect").fadeOut(1500);
			localStorage.setItem('dark-mode', 'light');
		}
	});
	

	//설정버튼
	$(".aset_btn a").on('click', function () {
		if(!$(this).hasClass("on")){
			$(this).addClass("on").prev().addClass("on");
		}else{
			$(this).removeClass("on").prev().removeClass("on");;
		}
	});

	//이슈펼침
	$(".main_issue .open_btn").on('click', function(){
		$(this).toggleClass("on");
		$(".issue_list").slideToggle();
		$(".issue_slide").toggle();
	});

	//HOT10
	$('.hot_slide').slick({
		autoplay: true,
		dots: false,
		arrows: false,
		infinite: true,
		slidesToShow: 4,
		slidesToScroll: 1,
		speed: 500,
		autoplaySpeed: 4500,
		//cssEase: 'cubic-bezier(0.645, 0.045, 0.355, 1.000)',
		edgeFriction: 0,
		swipeToSlide: true,
		touchThreshold: 2000
	});

	//종목리스트
	onTabSlider();
	function onTabSlider() {
		var $mslickElement = $('.tab_slide');
		$mslickElement.on('afterChange', function (event, slick, currentSlide, nextSlide) {
			
		});

		$mslickElement.on('beforeChange', function(event, slick, currentSlide, nextSlide){
		  setCurrentSlideNumber(nextSlide);
		});

		function setCurrentSlideNumber(currentSlide) {
			var i = (currentSlide + 1)
			$('.list_tab li a').removeClass('on');
			$('.list_tab li a[data-id=' + (currentSlide + 1) + ']').addClass('on');
			$(".tp_area").hide();
			$('.tp_area[data-id=' + (currentSlide + 1) + ']').show();
		}
		$('.main_contents .tab_slide').on('init', function(event, slick){
		}).slick({
			autoplay: false,
			dots: false,
			arrows: false,
			infinite: false,
			speed: 500,
			edgeFriction: 0,
			adaptiveHeight: true,
			touchThreshold: 10
		});

		$('.sub_contents .tab_slide').on('init', function(event, slick){
		}).slick({
			autoplay: false,
			dots: false,
			arrows: false,
			infinite: false,
			speed: 500,
			edgeFriction: 0,
			adaptiveHeight: true,
			touchThreshold: 10,
			initialSlide: 3
		});
	};

	//종목리스트 TAB버튼
	$('.list_tab li').click(function() {
		var slideNo = $(this).index();
			$('.tab_slide').slick('slickGoTo', slideNo);
	});
	
	//태그스크롤
	var imgWd = $(".tag_scr .cont a").length * 19;
	$(".tag_scr .cont").css('width', imgWd +'vw');
	$(".tag_scr .cont a").on('click', function () {
		$(this).toggleClass("on");
	});


	//즐겨찾기
	$(".stk_tb_list .fa-star, .stock_con .fa-star").on('click', function () {
		if(!$(this).hasClass("on")){
			$(this).addClass("on");
		}else{
			$(this).removeClass("on");
		}
	});

	//도움말tip
	$('.tip_btn').on("click",function() {
	  $(this).parents('.tip_wp').find('.tip').toggleClass('active');
  	});

	//링크스크롤
	$('a[href*="#"]')
		// Remove links that don't actually link to anything
		.not('[href="#"]')
		.not('[href="#0"]')
		.click(function(event) {
		// On-page links
		if (
		  location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
		  && 
		  location.hostname == this.hostname
		) {
		  // Figure out element to scroll to
		  var target = $(this.hash);
		  target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
		  // Does a scroll target exist?
		  if (target.length) {
			// Only prevent default if animation is actually gonna happen
			event.preventDefault();
			$('html, body').animate({
			  scrollTop: target.offset().top
			}, 500, function() {
			  // Callback after animation
			  // Must change focus!
			  var $target = $(target);
			  $target.focus();
			  if ($target.is(":focus")) { // Checking if the target was focused
				return false;
			  } else {
				$target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
				$target.focus(); // Set focus again
			  };
			});
		  }
		}
	});

	//검색값 지우기
	$('.ers_btn').on("click",function() {
	  $(".search_wp input[type=text]").val('');
  	});

	$('.sns_share i').on("click",function() {
	  $(".sns_list").slideToggle(100);
  	});
	

});

$(window).load(function() {
	$('#loading').fadeOut(1000); //loading
});

//LayerPopup
function popupOpen(name) {
	$(name).parents('html').addClass('no_scroll');
	$(name).parents('.layer_wrap').addClass('active').fadeIn(150);
	$(name).parents('.layer_wrap').find('.ly_dim').fadeIn(150);
	$(name).css('display','table');
}
function popupClose(name) {
	$(name).parents('html').removeClass('no_scroll');
	$(name).parents('.layer_wrap').removeClass('active').fadeOut();
	$(name).css('display','none');
}
//NoDimPopup
function alertOpen(name) {
	$(name).parents('html').addClass('no_scroll');
	$(name).parents('.layer_wrap').addClass('active').fadeIn(150);
	$(name).parents('.layer_wrap').find('.ly_dim').hide();
	$(name).css('display','table');
}
function alertClose(name) {
	$(name).parents('html').removeClass('no_scroll');
	$(name).parents('.layer_wrap').removeClass('active').fadeOut();
	$(name).css('display','none');
}

