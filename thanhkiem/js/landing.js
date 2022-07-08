$(document).ready(function () {
    AOS.init({
        duration: 800,
        offset: 0,
        easing: 'ease-in-sine',
        once: true,
    });
    $('.typeItem').click(function () {
        $('a').removeClass('current');
        $(this).addClass('current');
        let dataArt = $(this).attr('data-art');
        $('.artGroup').attr('class', 'artGroup').addClass(dataArt); 
		$('.artGroup').toggleClass('activess');
    });
    listSwiper();
	$(window).resize(function () {
		listSwiper();
	});
	$(".toggle").click(function () {
		if ($(".toggle").hasClass("open")) {
			$(".popFix").animate({"right": "-12vw"}, 100);
			$(".toggle").removeClass("open");
			$(".toggle").addClass("active");
		} else {
			$(".popFix").stop().animate({"right": "0"}, 100);
			$(".toggle").addClass("open");
			$(".toggle").removeClass("active");
		}

		$('.popFix').toggleClass('closed');
	});
	$('.playNow').click(function () {
		$(".wheelSpin").addClass("activeGame");
		setTimeout(function () {
			$('#pop__notify').modal('show');
		}, 1500);
	});
	$('.btn__close,.modal').click(function () {
		$(".wheelSpin").removeClass("activeGame");
	});
	
	$('.boxFix').click(function () {
		$("#pop__lucky").modal("show");
	});
    $('.buttonItem--rules').click(function () {
		$("#pop__rules").modal("show");
	});
    $('.buttonItem--addTurn').click(function () {
		// $("#pop__mission").modal("show");
	});
	$('.pointStages').click(function () {
		$("#pop__notifyBox").modal("show");
	});
    $('.buttonItem--award').click(function () {
		$("#pop__award").modal("show");
	});
    $('.buttonItem--rank').click(function () {
		$("#pop__rank").modal("show");
	});
    $('.linkItem--home,.btnItem--home,.btnGroup--home,.logo').click(function () {
		$("#cms").modal("show");
	});
});
//thay mã video trailer ở dưới
function revealVideo(div) {
    $('#f-video').append('<iframe width="800" height="450"  src="https://www.youtube.com/embed/rUCcr6SfKfs?rel=0&amp&autoplay=1;showinfo=0" frameborder="0" allowfullscreen allow="autoplay"></iframe>')
    document.getElementById(div).style.display = 'block';
    $('#video_iframe iframe').remove();
}
function hideVideo(div) {
    $('#f-video  iframe').remove();
    document.getElementById(div).style.display = 'none';
}


var swiper1;
function listSwiper() {
		swiper1 = new Swiper(".swiper-tab", {
			slidesPerGroup: 1,
			navigation: {
				nextEl: ".swiper-button-next",
				prevEl: ".swiper-button-prev",
			},
			spaceBetween: 0,
			parallax: true,
			allowTouchMove: false,
			loop: false,
			speed: 500,
			mousewheel: {
				releaseOnEdges: true,
			},
			nextButton: '#js-prev1',
			prevButton: '#js-next1',
			pagination: {
				el: ".swiper-pagination",
				clickable: true
			},
			keyboard: {
				enabled: true,
				onlyInViewport: false,
			},
		});
}