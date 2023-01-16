// JavaScript Document
let frame = document.getElementById('wrapper'),
        wrapper = document.getElementById('frame'),
        maxWidth  = frame.clientWidth,
        maxHeight = frame.clientHeight;
window.addEventListener("resize", resize);
resize();
function resize(){let scale,
    width = window.innerWidth,
  height = window.innerHeight,
  isMax = width >= maxWidth && height >= maxHeight;
    //scale = Math.min(width/maxWidth, height/maxHeight);
	scale = Math.min(width/maxWidth);
    frame.style.transform = isMax?'':'scale(' + scale + ')';
    wrapper.style.width = isMax?'':maxWidth * scale;
    wrapper.style.height = isMax?'':maxHeight * scale;

}
var swiper = new Swiper(".mySwiper", {
		spaceBetween: 30,
        centeredSlides: true,
		loop: true,
        autoplay: {
          delay: 500000,
          disableOnInteraction: false,
        },
		pagination: {
		el: ".swiper-pagination",
		clickable: true,
	  	},
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });