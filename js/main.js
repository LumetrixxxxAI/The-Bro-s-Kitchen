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

  /* ---------------- scroll progress bar ---------------- */
  (function scrollProgress() {
    var bar = document.getElementById('scrollProgress');
    if (!bar) return;
    ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: function (self) {
        bar.style.width = (self.progress * 100) + '%';
      }
    });
  })();

  /* ---------------- back to top ---------------- */
  (function backToTop() {
    var btn = document.getElementById('backToTop');
    if (!btn) return;
    ScrollTrigger.create({
      start: 'top -700',
      onUpdate: function (self) {
        btn.classList.toggle('is-visible', self.scroll() > 700);
      }
    });
  })();

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

  /* ---------------- card reveals (clip-path curtain + stagger) ---------------- */
  function setupCardReveals() {
    ScrollTrigger.batch('.card-reveal', {
      start: 'top 88%',
      onEnter: function (batch) {
        gsap.to(batch, {
          opacity: 1,
          clipPath: 'inset(0 0 0% 0)',
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.1,
          overwrite: true
        });
      }
    });
  }

  if (reduceMotion) {
    document.querySelectorAll('.reveal, .card-reveal').forEach(function (el) {
      el.style.opacity = 1;
      el.style.clipPath = 'none';
    });
  } else {
    setupReveals();
    setupCardReveals();
  }

  /* ---------------- hero media parallax ---------------- */
  if (!reduceMotion) {
    gsap.to('.hero-media', {
      y: 34,
      ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
    });
  }

  /* ---------------- section watermark parallax ---------------- */
  if (!reduceMotion) {
    gsap.utils.toArray('.section-mark').forEach(function (mark) {
      gsap.to(mark, {
        y: -50,
        ease: 'none',
        scrollTrigger: { trigger: mark.parentElement, start: 'top bottom', end: 'bottom top', scrub: true }
      });
    });
  }

  /* ---------------- card tilt on hover (desktop only) ---------------- */
  if (!reduceMotion && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    (function tilt() {
      function addTilt(selector, maxTilt, lift) {
        document.querySelectorAll(selector).forEach(function (card) {
          card.addEventListener('mouseenter', function () {
            gsap.to(card, { y: -lift, duration: 0.4, ease: 'power2.out' });
          });
          card.addEventListener('mousemove', function (e) {
            var r = card.getBoundingClientRect();
            var px = (e.clientX - r.left) / r.width - 0.5;
            var py = (e.clientY - r.top) / r.height - 0.5;
            gsap.to(card, {
              rotateX: -py * maxTilt,
              rotateY: px * maxTilt,
              transformPerspective: 700,
              duration: 0.4,
              ease: 'power2.out'
            });
          });
          card.addEventListener('mouseleave', function () {
            gsap.to(card, { rotateX: 0, rotateY: 0, y: 0, duration: 0.6, ease: 'power3.out' });
          });
        });
      }
      addTilt('.specialty-card', 5, 6);
      addTilt('.order-card', 3, 5);
    })();
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

  /* ---------------- reviews carousel (autoplay only, no manual scroll) ---------------- */
  (function reviews() {
    var track = document.getElementById('reviewTrack');
    var cards = track.children;
    var dots = document.querySelectorAll('#reviewDots .review-dot');
    var i = 0;
    var total = cards.length;
    var timer;
    var DURATION = 5000;

    function setDots() {
      dots.forEach(function (dot, idx) {
        dot.classList.toggle('is-active', idx === i);
        dot.classList.toggle('is-done', idx < i);
      });
    }

    function go(n) {
      i = (n + total) % total;
      gsap.to(track, { xPercent: -100 * i, duration: 0.7, ease: 'power3.inOut' });
      setDots();
    }

    function auto() {
      clearInterval(timer);
      timer = setInterval(function () { go(i + 1); }, DURATION);
    }

    dots.forEach(function (dot, idx) {
      dot.addEventListener('click', function () { go(idx); auto(); });
    });

    go(0);
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
