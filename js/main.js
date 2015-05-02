$(document).ready(function() {

	$("nav a").click(function(event) {
		event.preventDefault();

		var destination = $(this).attr("href");

		$.scrollTo(destination, 1000);
	});

	var navWrapper = $(".nav-wrapper");
	var offset = $("section").eq(1).offset().top-5;

	$(window).scroll(function() {
		if ($(window).scrollTop() > offset) {
			if(navWrapper.css("position") != "fixed") {
				navWrapper.hide(function() {
					navWrapper.css("position", "fixed");
					navWrapper.fadeIn("1000");
				});
			}
		} else {
			navWrapper.css("position", "initial");
		}
	});
});

$(".nav-wrapper").stellar();


$(document).ready(function() {
		var slideIndex = 0;
		var sliderImages = $("#competitor_slider img");

		sliderImages.not(":first").hide();

	$("#forward").on("click", function() {
		sliderImages.eq(slideIndex).fadeOut();
		
		slideIndex++;

		if(slideIndex >= sliderImages.length) {
			slideIndex = 0;
		}
		sliderImages.eq(slideIndex).fadeIn();
	});
});


