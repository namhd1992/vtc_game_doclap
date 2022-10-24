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
// download sticky
// -------------------------

/* global ready */
ready(() => {
  'use strict';

  const downloadToggle = document.getElementById('download-toggle');
  const downloadClose = document.getElementById('download-close');

  downloadToggle.addEventListener('click', (e) => {
    e.preventDefault();
    downloadToggle.parentNode.classList.toggle('active');
  });

  downloadClose.addEventListener('click', (e) => {
    e.preventDefault();
    downloadClose.parentNode.classList.toggle('hide');
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
  let defaults = {};
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
    }).from('#header', {y: '-2rem'})
      .from('#download-sticky', {
        duration: .1,
        onStart: () => {
          document.getElementById('download-sticky').classList.add('active');
        }
      }, '-=0.2').delay(.6);
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


    // section 1
    gsap.timeline({
      defaults: {autoAlpha: 0},
      scrollTrigger: {trigger: '#section-1'}
    }).from('#section-1 .section-btns', {y: '6rem'})
      .from('#section-1 .section-text', {y: '6rem'}, tlPosition)
      .from('#section-1 .treasure-item-img', {y: '6rem'}, tlPosition)
      .addLabel('label1')
      // .from('#section-1 .treasure-item-btns', {y: '6rem'}, tlPosition)
      .from('#section-1 .treasure-item:nth-child(1) .btn-bg', {y: '6rem', stagger: .1}, 'label1')
      .from('#section-1 .treasure-item:nth-child(2) .btn-bg', {y: '6rem', stagger: .1}, 'label1');
    // .from('#section-1 .ban-buttons-left > *', {x: '-6rem', stagger: '0.1'}, tlPosition)
    // .from('#section-1 .ban-buttons-right > *', {x: '6rem', stagger: '0.1'}, '<');

    // section 2-1
    gsap.timeline({
      defaults: {autoAlpha: 0},
      scrollTrigger: {trigger: '#section-2-1'}
    }).from('#section-2 .section-text-1', {y: '6rem'})
      .from('#section-2 .timeline', {y: '6rem'}, tlPosition)
      // .from('#section-2 .timeline-item', {y: '6rem', stagger: '0.1'}, tlPosition)
      .from('#section-2 .dq-group', {y: '6rem'}, tlPosition)
      .from('#section-2 .section-text-2', {y: '6rem'}, tlPosition);

    // section 2-2
    gsap.timeline({
      defaults: {autoAlpha: 0},
      scrollTrigger: {trigger: '#section-2-2'}
    })
      .from('.nlr', {y: '6rem'}, tlPosition)
      .from('.nlr-title', {y: '6rem'}, tlPosition)
      .from('.nlr-body', {y: '6rem'}, tlPosition)
      .from('.nlr-text', {y: '6rem'}, tlPosition);

    // section 2-3
    gsap.timeline({
      defaults: {autoAlpha: 0},
      scrollTrigger: {trigger: '#section-2-3'}
    })
      .from('.ren-body', {y: '6rem'}, tlPosition)
      .from('.ren-body > *', {scale: .5, ease: 'back.out(3)'})
      .from('.ren-btns-left > *', {x: '-6rem', stagger: .1}, tlPosition)
      .from('.ren-btns-right > *', {x: '6rem', stagger: .1}, '<')
      .from('.ren .btn-lich-su-circle', {y: '6rem'}, '<');

    // section 3
    gsap.timeline({
      defaults: {autoAlpha: 0},
      scrollTrigger: {trigger: '#section-3'}
    }).from('#section-3 .section-title', {y: '6rem'})
      .from('#section-3 .btn-bxh', {y: '3rem'}, tlPosition)
      .from('#section-3 .boxtop-1', {y: '3rem'}, tlPosition)
      .from('#section-3 .boxtop-2', {y: '3rem'}, tlPosition)
      .from('#section-3 .boxtop-3', {y: '3rem'}, '<');
  }
});
