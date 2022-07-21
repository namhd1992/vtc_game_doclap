$(document).ready(function() {

    AOS.init();
    checkScreen();
    $(window).resize(function() {
        checkScreen();
    });
    // $('.stageC').click(function() {
    //     var $popF = $(this).attr('data-pop');
    //     $('.modal[data-pop=' + $popF + ']').modal();
    // })
    $('.btnNum').click(function() {
        var $popF2 = $(this).attr('data-pop2');
        $('.modal[data-pop2=' + $popF2 + ']').modal();
    })

    $('.itemAward,.awardRight').click(function() {
        $('#pop__stage').modal();
    });
    $('.btnGroup--addTurn').click(function() {
        $('#pop__mission').modal();
    });
    $('.btnGroup--rules').click(function() {
        $('#pop__rules').modal();
    });
    $('.btnGroup--abum').click(function() {
        $('#pop__abum').modal();
    });
    $('.btnVipG--right').click(function() {
        $('#pop__welfare').modal();
    });
    $('.btnAward').click(function() {
        $('#pop__notifyGC').modal();
    });

    // $('.btnRegister2,.btnVipG--Register').click(function() {
    //     $('#cms').modal();
    // });
    if ($(window).width() <= 960) {
        $(".animation,.popFix").remove();
    }
    var classs = ['abum--1', 'abum--2', 'abum--3', 'abum--4', 'abum--5'];
    $('.play').click(function() {
        // setTimeout(function() {
        //     $('.abum').addClass(classs[Math.floor(Math.random() * classs.length)]);
        // }, 1000);
        setTimeout(function() {
            $('#pop__notifyAward').modal('show');
        }, 3000);
    });
    $('.play').click(function() {
        $(this).addClass('activev');
        $('.abum').addClass('activeRorate');
        setTimeout(function() {
            $('.boxAfter').addClass('activeBall');
        }, 2500);
    });
    $('.btn__close, .modal').click(function() {
        $('.play').removeClass('disable activev');
        $('.abum').removeClass('abum--1 abum--2 abum--3 abum--4 abum--5 activeRorate');
    })
    $('.audio').click(function() {
        $('.videox').remove();
        $(this).addClass('active');
    });
    $('.btnVideo').click(function() {
        revealVideo('video', 'E5CDNrNzhnk');
    });
    $('.btnG').click(function() {
        $('a').removeClass('currents');
        $(this).addClass('currents');
        var $linkto = $(this).attr('data-tab');
        $('.character').removeClass('active');
        $('.character[data-tab=' + $linkto + ']').addClass('active');
        let dataArt2 = $(this).attr('data-art');
        $('.art').attr('class', 'art').addClass(dataArt2);
        setTimeout(function() {
            $('.art').addClass('activea');
        }, 100);
    })
    $('.characterItem').click(function() {
        $('a').removeClass('current');
        $(this).addClass('current');
        let dataArt = $(this).attr('data-art');
        $('.art').attr('class', 'art').addClass(dataArt);
        setTimeout(function() {
            $('.art').addClass('activea');
        }, 100);
    })
    $('.characterItem,.btnG').click(function() {
        $('a').removeClass('current');
        $(this).addClass('current');
        $('#video_he video').remove();
        $('.videoFullscreen1').remove();
        let id = $(this).data('video');
        $('#video_he').append('<video src="https://cdn.smobgame.com/template/au/images/landing/phai' + id + '.mp4" class="videoFullscreen" muted="" autoplay="" loop=""></video>');

    });
    $(".toggle").click(function() {
        if ($(".toggle").hasClass("open")) {
            $(".popFix").animate({ "right": "-8vw" }, 100);
            $(".toggle").removeClass("open");
            $(".toggle").addClass("active");
        } else {
            $(".popFix").stop().animate({ "right": "0" }, 100);
            $(".toggle").addClass("open");
            $(".toggle").removeClass("active");
        }

        $('.popFix').toggleClass('closed');
    });
    $('.btnG').click(function() {
        var $color = $(this).attr('data-ac');
        $('.characterItem').removeClass('current');
        $('.characterItem[data-ac=' + $color + ']').addClass('current');
    })
});

let dateStart = new Date(2022, 5, 20, 10, 0, 0).getTime(),
    dateEnd = new Date(2022, 6, 20, 10, 0, 0).getTime();
setInterval(function() {
    let now = new Date().getTime(),
        tile = (now - dateStart) / (dateEnd - dateStart);
    tile = parseInt(tile * 25000);
    tile = addCommas(tile);
    $('.numR').html(tile);
}, 1000);

function addCommas(nStr) {
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    let rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}

function checkScreen() {
    if ($(window).innerWidth() >= 1025) {
        $('#fullpage').fullpage({
            scrollingSpeed: 500,
            autoScrolling: true,
            fitToSection: true,
            fitToSectionDelay: 2000,
            verticalCentered: false,
            responsiveWidth: 900,
            normalScrollElements: '.modal, .rank__inner',
            navigation: true,
            slidesNavigation: true,
            controlArrows: false,
            anchors: ['page--1', 'page--2', 'page--3', 'page--4', 'page--5'],
            menu: '#menu-nav',

            onLeave: function() {
                jQuery('.section [data-aos]').removeClass("aos-animate");
            },
            onSlideLeave: function() {
                jQuery('.slide [data-aos]').removeClass("aos-animate");

            },
            afterSlideLoad: function() {
                jQuery('.slide.active [data-aos]').addClass("aos-animate");
            },
            afterLoad: function() {
                jQuery('.section.active [data-aos]').addClass("aos-animate");
                $('.popFix, .page__fullpage').addClass('aos-animate');
                $('.videoFullscreen')[0].play();
                // $('.autoplay')[0].play();
            }
        });
    } else {
        fullPageCreated = false;
    }
    var pageWidth, pageHeight;
    var basePage = {
        width: 1920,
        height: 950,
        scale: 1,
        scaleX: 1,
        scaleY: 1
    };
    var $page = $('.section_wrap');
    if (($(window).innerWidth() > 960)) {
        getPageSize();
        scalePages($page, pageWidth, pageHeight);
    } else {

    }
    $(window).resize(function() {
        if (($(window).innerWidth() > 960)) {
            getPageSize();
            scalePages($page, pageWidth, pageHeight);
        }
    })

    function getPageSize() {
        pageHeight = $('.main').height();
        pageWidth = $('.main').width();
    }

    function scalePages(page, maxWidth, maxHeight) {
        var scaleY = 1;
        scaleY = maxHeight / basePage.height;
        basePage.scaleY = scaleY;
        basePage.scale = scaleY;

        var scale_1 = basePage.scale - 0.1;
        if (scale_1 < 1) {
            $('.section_wrap').attr('style', '-webkit-transform:scale(' + scale_1 + '); transform-origin: top;');
            page.attr('style', '-webkit-transform:scale(' + basePage.scale + '); transform-origin: top;');
        }
    }
}

function revealVideo(div, id) {
    $('#f-video').append('<iframe width="800" height="450"  src="https://www.youtube.com/embed/' + id + '?rel=0&amp&autoplay=1;showinfo=0" frameborder="0" allowfullscreen allow="autoplay"></iframe>')
    document.getElementById(div).style.display = 'block';
    $('#video_iframe iframe').remove();
}

function hideVideo(div) {
    $('#f-video  iframe').remove();
    document.getElementById(div).style.display = 'none';
}


var track = document.getElementById("track");

var controlBtn = document.getElementById("play-pause");

function playPause() {
    if (track.paused) {
        track.play();
        controlBtn.className = "spr icon_audio";
    } else {
        track.pause();
        controlBtn.className = "spr stop";
    }
}

controlBtn.addEventListener("click", playPause);
track.addEventListener("ended", function() {
    controlBtn.className = "spr stop";
});
jQuery(document).ready(function($) {

    var slideCount = $('#slider ul li').length;
    var slideWidth = $('#slider ul li').width();
    var slideHeight = $('#slider ul li').height();
    var sliderUlWidth = slideCount * slideWidth;

    $('#slider').css({ width: slideWidth, height: slideHeight });

    $('#slider ul').css({ width: sliderUlWidth, marginLeft: -slideWidth });

    $('#slider ul li:last-child').prependTo('#slider ul');

    function moveLeft() {
        $('#slider ul').animate({
            left: +slideWidth
        }, 200, function() {
            $('#slider ul li:last-child').prependTo('#slider ul');
            $('#slider ul').css('left', '');
        });
    };

    function moveRight() {
        $('#slider ul').animate({
            left: -slideWidth
        }, 200, function() {
            $('#slider ul li:first-child').appendTo('#slider ul');
            $('#slider ul').css('left', '');
        });
    };

    $('a.control_prev').click(function() {
        moveLeft();
    });

    $('a.control_next').click(function() {
        moveRight();
    });

});