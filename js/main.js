(function () {
  'use strict';

  gsap.registerPlugin(ScrollTrigger);

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------- preloader ---------------- */
  function runPreloader() {
    var pre = document.getElementById('preloader');
    var fill = document.getElementById('preloaderFill');
    var letters = pre.querySelectorAll('.preloader-word span');
    var heroLine = document.querySelectorAll('.hero-title .line span');
    var heroBadge = document.querySelector('.hero-badge');
    var heroSub = document.querySelector('.hero-foot');

    document.body.classList.add('no-scroll');

    var tl = gsap.timeline({
      defaults: { ease: 'power4.out' },
      onComplete: function () {
        document.body.classList.remove('no-scroll');
        pre.style.display = 'none';
      }
    });

    tl.to(letters, { y: '0%', duration: 0.7, stagger: 0.03 })
      .to(fill, { width: '100%', duration: 0.6, ease: 'power2.inOut' }, '-=0.3')
      .to(letters, { y: '-110%', duration: 0.5, stagger: 0.02 }, '+=0.25')
      .to(pre, { autoAlpha: 0, duration: 0.6 }, '-=0.15')
      .set(heroBadge, { opacity: 0, y: 16 }, '<')
      .set(heroLine, { y: '0%' }, '<')
      .fromTo(heroBadge, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.3')
      .fromTo(heroLine, { y: '110%' }, { y: '0%', duration: 0.9, stagger: 0.12 }, '-=0.4')
      .fromTo(heroSub, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.5');
  }

  if (reduceMotion) {
    document.getElementById('preloader').style.display = 'none';
    gsap.set('.hero-title .line span', { y: '0%' });
  } else {
    window.addEventListener('load', runPreloader);
    setTimeout(runPreloader, 2500); // fallback in case load fires late
  }

  /* ---------------- header on scroll ---------------- */
  var header = document.getElementById('siteHeader');
  ScrollTrigger.create({
    start: 'top -80',
    onUpdate: function (self) {
      header.classList.toggle('is-scrolled', self.scroll() > 80);
    }
  });

  /* ---------------- mobile menu ---------------- */
  (function mobileMenu() {
    var burger = document.getElementById('burgerBtn');
    var menu = document.getElementById('mobileMenu');
    var links = menu.querySelectorAll('nav a');
    var btn = menu.querySelector('.btn');
    var open = false;

    function toggle() {
      open = !open;
      burger.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', open);
      menu.classList.toggle('is-open', open);
      document.body.classList.toggle('no-scroll', open);

      if (open) {
        gsap.fromTo(links, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.06, ease: 'power3.out', delay: 0.1 });
        gsap.fromTo(btn, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, delay: 0.4 });
      }
    }

    burger.addEventListener('click', toggle);
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { if (open) toggle(); });
    });
  })();

  /* ---------------- scroll reveals ---------------- */
  function setupReveals() {
    gsap.utils.toArray('.reveal').forEach(function (el) {
      gsap.fromTo(el, { opacity: 0, y: 44 }, {
        opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%' }
      });
    });
  }

  if (reduceMotion) {
    document.querySelectorAll('.reveal').forEach(function (el) { el.style.opacity = 1; });
  } else {
    setupReveals();
  }

  /* ---------------- animated counters ---------------- */
  gsap.utils.toArray('.stat-num').forEach(function (el) {
    var target = parseFloat(el.getAttribute('data-count'));
    var decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
    var obj = { val: 0 };
    ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      once: true,
      onEnter: function () {
        gsap.to(obj, {
          val: target,
          duration: 1.6,
          ease: 'power2.out',
          onUpdate: function () {
            el.textContent = obj.val.toFixed(decimals).replace('.', ',');
          }
        });
      }
    });
  });

  /* ---------------- reviews carousel ---------------- */
  (function reviews() {
    var track = document.getElementById('reviewTrack');
    var cards = track.children;
    var prev = document.getElementById('reviewPrev');
    var next = document.getElementById('reviewNext');
    var i = 0;
    var total = cards.length;
    var timer;

    function go(n) {
      i = (n + total) % total;
      gsap.to(track, { xPercent: -100 * i, duration: 0.6, ease: 'power3.inOut' });
    }

    function auto() {
      clearInterval(timer);
      timer = setInterval(function () { go(i + 1); }, 6000);
    }

    next.addEventListener('click', function () { go(i + 1); auto(); });
    prev.addEventListener('click', function () { go(i - 1); auto(); });
    auto();
  })();

  /* ---------------- year ---------------- */
  document.getElementById('year').textContent = new Date().getFullYear();

  /* ---------------- cookie banner ---------------- */
  (function cookies() {
    var banner = document.getElementById('cookieBanner');
    var accept = document.getElementById('cookieAccept');
    var reject = document.getElementById('cookieReject');
    var KEY = 'brok_cookie_consent';

    if (!localStorage.getItem(KEY)) {
      setTimeout(function () { banner.classList.add('is-visible'); }, 1200);
    }

    function close(val) {
      localStorage.setItem(KEY, val);
      banner.classList.remove('is-visible');
    }

    accept.addEventListener('click', function () { close('accepted'); });
    reject.addEventListener('click', function () { close('rejected'); });
  })();

})();
