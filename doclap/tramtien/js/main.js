'use strict';

/* exported extend, ready, getScrollbarWidth */
let extend = function(out) {
  out = out || {};

  for (let i = 1; i < arguments.length; i++) {
    if (!arguments[i]) {
      continue;
    }

    for (let key in arguments[i]) {
      if (Object.prototype.hasOwnProperty.call(arguments[i], key)) {
        out[key] = arguments[i][key];
      }
    }
  }

  return out;
};

function ready(fn) {
  if (document.readyState !== 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}


// detect Mac OS X
if (navigator.platform.toUpperCase().indexOf('MAC') >= 0) {
  document.getElementsByTagName('html')[0].classList.add('mac');
}

// get scrollbar width
function getScrollbarWidth() {
  // Creating invisible container
  const outer = document.createElement('div');
  outer.style.visibility = 'hidden';
  outer.style.overflow = 'scroll'; // forcing scrollbar to appear
  outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps
  document.body.appendChild(outer);

  // Creating inner element and placing it in the container
  const inner = document.createElement('div');
  outer.appendChild(inner);

  // Calculating difference between container's full width and the child width
  const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);

  // Removing temporary elements from the DOM
  outer.parentNode.removeChild(outer);

  return scrollbarWidth;
}

ready(() => {
  const modals = document.querySelectorAll('.modal');
  const downloadSticky = document.querySelector('#download-sticky');
  const header = document.querySelector('#header');
  const scrollbarWidth = getScrollbarWidth();

  header.style.right = scrollbarWidth + 'px';
  document.querySelector('.page-loading').style.paddingRight = scrollbarWidth + 'px';

  Array.from(modals).forEach((el) => {
    el.addEventListener('show.bs.modal', function () {
      header.style.right = `${scrollbarWidth}px`;
      downloadSticky.style.right = window.innerWidth > 1920 ? `${scrollbarWidth/2}px` : `${scrollbarWidth}px`;
    });

    el.addEventListener('hidden.bs.modal', function () {
      header.style.right = 0;
      downloadSticky.style.right = 0;
    });
  });
});


// -------------------------
// copy to clipboard
// -------------------------

/* global ready, extend, bootstrap, ClipboardJS */
ready(() => {
  'use strict';

  const btnCopy = document.getElementById('btn-copy');
  const tooltip = new bootstrap.Tooltip(btnCopy, {
    trigger: 'manual'
  });

  const elClipboard = document.querySelectorAll('[data-plugin="clipboard"]');
  Array.prototype.forEach.call(elClipboard, (el) => {
    let defaults = {};
    let options = extend({}, defaults, JSON.parse(el.getAttribute('data-options')));

    const clipboard = new ClipboardJS(el, options);

    clipboard.on('success', function() {
      tooltip.show();

      setTimeout(() => {
        tooltip.hide();
      }, 1000);
    });
  });
});


// -------------------------
// download sticky
// -------------------------

/* global ready */
ready(() => {
  'use strict';

  const downloadToggle = document.getElementById('download-toggle');

  downloadToggle.addEventListener('click', (e) => {
    e.preventDefault();
    downloadToggle.parentNode.classList.toggle('active');
  });
});


// --------------------------
// swiper
// --------------------------

/* global ready, extend, Swiper */
ready(() => {
  'use strict';

  const elSwiper = document.querySelectorAll('[data-plugin="swiper"]');
  Array.prototype.forEach.call(elSwiper, (el) => {
    let defaults = {
      navigation: {
        nextEl: el.querySelector('.swiper-button-next'),
        prevEl: el.querySelector('.swiper-button-prev')
      },
      pagination: {
        el: el.querySelector('.swiper-pagination'),
        clickable: true
      }
    };
    let options = extend({}, defaults, JSON.parse(el.getAttribute('data-options')));

    new Swiper(el, options);
  });
});


// --------------------------
// perfect scrollbar
// --------------------------

/* global ready, extend, PerfectScrollbar */
ready(() => {
  'use strict';

  if (window.innerWidth >= 992) {
    const elPerfectScrollbar = document.querySelectorAll('[data-plugin="perfect-scrollbar"]');
    Array.prototype.forEach.call(elPerfectScrollbar, (el) => {
      let defaults = {};
      let options = extend({}, defaults, JSON.parse(el.getAttribute('data-options')));

      new PerfectScrollbar(el, options);
    });
  }
});


// --------------------------
// headroom
// --------------------------

/* global ready, extend, Headroom */
ready(() => {
  'use strict';

  const elHeaderHeadroom = document.getElementById('header');
  let defaults = {
    offset: 150
  };
  let options = extend({}, defaults, JSON.parse(elHeaderHeadroom.getAttribute('data-options')));

  const headroom = new Headroom(elHeaderHeadroom, options);
  headroom.init();
});


// --------------------------
// gsap
// --------------------------

/* global ready, gsap, ScrollTrigger, imagesLoaded */
ready(() => {
  'use strict';

  gsap.registerPlugin(ScrollTrigger);

  const loaderText = document.getElementById('loader-text');
  const updateProgress = (instance) => {
    loaderText.innerHTML = `${Math.round(instance.progressedCount * 100 / instance.images.length)}%`;
  };

  const showApp = () => {
    // console.log(instance.images.length);
    // instance.images.forEach((el) => {
    //   console.log(el.img.currentSrc);
    // });

    setTimeout(() => {
      window.scrollTo(0,0);
      gsap.to('#loader', {
        autoAlpha: 0,
        onComplete: () => {
          document.getElementById('loader').style.display = 'none';
          gsap.to('#header', {right: 0, duration: 0});
          gsap.to('.page-loading', {paddingRight: 0, duration: 0});
          document.querySelector('body').classList.remove('page-loading');
        }
      });
    }, 300);

    gsap.timeline({
      defaults: {
        autoAlpha: 0,
        duration: '.4'
      },
    }).from('#header .nav-link', {y: '-2rem', stagger: .1})
      .from('#section-1 .section-title', {y: '-2rem'}, '-=0.2')
      .from('#download-sticky', {
        duration: .1,
        onStart: () => {
          document.getElementById('download-sticky').classList.add('active');
        }
      }).delay(.6)
      .to('#section-1 .section-title', {autoAlpha: 1, scale: 1.05, yoyoEase: true, repeat: -1, duration: 0.8}, '+=0.4');
  };

  imagesLoaded('body', {background: '.page'}).on('progress', updateProgress).on('always', showApp);

  if (window.innerWidth > 1024) {
    ScrollTrigger.defaults({
      // toggleActions: 'play complete none reverse',
      start: 'top bottom',
      end: '100% bottom',
      scrub: 1,
      // markers: true
    });

    const tlPosition = '-=0.4';


    // nav 1
    gsap.timeline({
      defaults: {autoAlpha: 0},
      scrollTrigger: {trigger: '.nav-1'}
    }).from('.nav-1', {y: '6rem'});

    // section 2-1
    gsap.timeline({
      defaults: {autoAlpha: 0},
      scrollTrigger: {trigger: '.section-2-1'}
    }).from('.vq-body', {y: '6rem'})
      .from('.vq-btns', {scale: '.5'}, tlPosition)
      .from('.vq-btns-bottom', {y: '6rem'});

    // section 2-2
    gsap.timeline({
      defaults: {autoAlpha: 0},
      scrollTrigger: {trigger: '.section-2-2'}
    }).from('.section-2-2 .section-text', {y: '6rem'})
      .from('.timeline-wrapper', {y: '6rem'}, tlPosition)
      .from('.timeline-item', {scale: '.5', stagger: .1, ease: 'back.out(3)'}, tlPosition);

    // section 2-3
    gsap.timeline({
      defaults: {autoAlpha: 0},
      scrollTrigger: {trigger: '.section-2-3'}
    }).from('.bb-wrapper', {x: '-6rem'})
      .from('.kvmm', {x: '6rem'}, '<');

    // section 2-4
    gsap.timeline({
      defaults: {autoAlpha: 0},
      scrollTrigger: {trigger: '.section-2-4'}
    }).from('.flipbox', {y: '6rem'})
      .from('.section-2-4 .section-btns', {y: '6rem'}, tlPosition);

    // section 2-5
    gsap.timeline({
      defaults: {autoAlpha: 0},
      scrollTrigger: {trigger: '.section-2-5'}
    }).from('.section-2-5 .section-title', {y: '6rem'})
      .from('.section-2-5 .section-text', {y: '6rem'}, tlPosition)
      .from('.section-2-5 .swiper ', {y: '6rem'}, tlPosition);

    // section 2-6
    gsap.timeline({
      defaults: {autoAlpha: 0},
      scrollTrigger: {trigger: '.section-2-6'}
    }).from('.section-2-6 .section-title', {y: '6rem'})
      .from('.section-2-6 .section-text', {y: '6rem'}, tlPosition)
      .from('.section-2-6 .swiper ', {y: '6rem'}, tlPosition);

    // section 2-7
    gsap.timeline({
      defaults: {autoAlpha: 0},
      scrollTrigger: {trigger: '.section-2-7'}
    }).from('.section-2-7 .section-title', {y: '6rem'})
      .from('.section-2-7 .rv-img', {y: '6rem'}, tlPosition)
      .from('.section-2-7 .rv-body ', {y: '6rem'}, tlPosition);

    // section 2-8
    gsap.timeline({
      defaults: {autoAlpha: 0},
      scrollTrigger: {trigger: '.section-2-8'}
    }).from('.section-2-8 .section-title', {y: '6rem'})
      .from('.section-2-8 .boxtop-1', {y: '6rem'}, tlPosition)
      .from('.section-2-8 .boxtop-2', {y: '6rem'}, tlPosition)
      .from('.section-2-8 .boxtop-3', {y: '6rem'}, '<');


    const tabEl = document.querySelectorAll('button[data-bs-toggle="tab"]');
    Array.from(tabEl).forEach((el) => {
      el.addEventListener('shown.bs.tab', function () {
        ScrollTrigger.refresh();
      });
    });
  }
});
