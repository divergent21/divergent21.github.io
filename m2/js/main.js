/* m2 — interaction layer (no markup generation, only class/attr toggles) */
(function () {
  'use strict';

  /* ---------- Promo strip close ---------- */
  var promoClose = document.getElementById('promoClose');
  var promoStrip = document.getElementById('promoStrip');
  if (promoClose && promoStrip) {
    promoClose.addEventListener('click', function () {
      promoStrip.classList.add('is-closed');
    });
  }

  /* ---------- Sticky header shadow on scroll ---------- */
  var header = document.getElementById('siteHeader');
  var backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', function () {
    var scrolled = window.scrollY > 12;
    if (header) header.style.boxShadow = scrolled ? '0 6px 20px rgba(32,36,42,0.08)' : 'none';
    if (backToTop) backToTop.classList.toggle('is-visible', window.scrollY > 500);
  });

  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- Mobile full-screen menu ---------- */
  var burgerBtn = document.getElementById('burgerBtn');
  var mobileMenu = document.getElementById('mobileMenu');
  var mobileMenuClose = document.getElementById('mobileMenuClose');

  function openMobileMenu() {
    mobileMenu.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }
  function closeMobileMenu() {
    mobileMenu.classList.remove('is-open');
    if (!document.getElementById('mobileCatalog').classList.contains('is-open')) {
      document.body.style.overflow = '';
    }
  }
  if (burgerBtn) burgerBtn.addEventListener('click', openMobileMenu);
  if (mobileMenuClose) mobileMenuClose.addEventListener('click', closeMobileMenu);

  /* ---------- Mobile catalog drill-down ---------- */
  var mobileCatalogOpen = document.getElementById('mobileCatalogOpen');
  var mobileCatalog = document.getElementById('mobileCatalog');
  var mobileCatalogClose = document.getElementById('mobileCatalogClose');

  if (mobileCatalogOpen) {
    mobileCatalogOpen.addEventListener('click', function () {
      mobileCatalog.classList.add('is-open');
    });
  }
  if (mobileCatalogClose) {
    mobileCatalogClose.addEventListener('click', function () {
      mobileCatalog.classList.remove('is-open');
    });
  }

  var catalogRows = document.querySelectorAll('.m2-mobile-catalog__row');
  catalogRows.forEach(function (row) {
    row.addEventListener('click', function () {
      var sub = row.nextElementSibling;
      if (!sub) return;
      var isOpen = sub.classList.contains('is-open');
      document.querySelectorAll('.m2-mobile-catalog__sub.is-open').forEach(function (el) {
        el.classList.remove('is-open');
      });
      if (!isOpen) sub.classList.add('is-open');
    });
  });

  /* ---------- Desktop catalog mega-menu ---------- */
  var catalogBtn = document.getElementById('catalogBtn');
  var catalogMenu = document.getElementById('catalogMenu');
  var catalogList = document.getElementById('catalogList');

  if (catalogBtn && catalogMenu) {
    catalogBtn.addEventListener('click', function () {
      var isOpen = catalogMenu.classList.toggle('is-open');
      catalogBtn.classList.toggle('is-active', isOpen);
    });

    document.addEventListener('click', function (e) {
      if (!catalogMenu.contains(e.target) && !catalogBtn.contains(e.target)) {
        catalogMenu.classList.remove('is-open');
        catalogBtn.classList.remove('is-active');
      }
    });
  }

  if (catalogList) {
    var items = catalogList.querySelectorAll('.m2-catalog-menu__item');
    var panels = document.querySelectorAll('.m2-catalog-menu__panel');
    items.forEach(function (item) {
      item.addEventListener('mouseenter', function () {
        activatePanel(item.getAttribute('data-panel'));
      });
      item.addEventListener('click', function (e) {
        e.preventDefault();
        activatePanel(item.getAttribute('data-panel'));
      });
    });
    function activatePanel(idx) {
      items.forEach(function (i) { i.classList.toggle('is-active', i.getAttribute('data-panel') === idx); });
      panels.forEach(function (p) { p.classList.toggle('is-active', p.getAttribute('data-panel') === idx); });
    }
  }

  /* ---------- Hero slider ---------- */
  var heroSlider = document.getElementById('heroSlider');
  if (heroSlider) {
    var slides = heroSlider.querySelectorAll('.m2-hero__slide');
    var dots = heroSlider.querySelectorAll('.m2-hero__dot');
    var counter = document.getElementById('heroCounter');
    var current = 0;
    var timer;

    function pad2(n) { return n < 10 ? '0' + n : '' + n; }

    function goTo(idx) {
      current = (idx + slides.length) % slides.length;
      slides.forEach(function (s, i) { s.classList.toggle('is-active', i === current); });
      dots.forEach(function (d, i) { d.classList.toggle('is-active', i === current); });
      if (counter) counter.innerHTML = '<b>' + pad2(current + 1) + '</b> / ' + pad2(slides.length);
    }
    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }
    function restart() {
      clearInterval(timer);
      timer = setInterval(next, 6000);
    }

    var prevBtn = document.getElementById('heroPrev');
    var nextBtn = document.getElementById('heroNext');
    if (prevBtn) prevBtn.addEventListener('click', function () { prev(); restart(); });
    if (nextBtn) nextBtn.addEventListener('click', function () { next(); restart(); });
    dots.forEach(function (dot) {
      dot.addEventListener('click', function () {
        goTo(parseInt(dot.getAttribute('data-slide'), 10));
        restart();
      });
    });
    restart();
  }

  /* ---------- Countdown timer (demo, resets daily at midnight) ---------- */
  var tHours = document.getElementById('tHours');
  var tMinutes = document.getElementById('tMinutes');
  var tSeconds = document.getElementById('tSeconds');

  function pad(n) { return n < 10 ? '0' + n : '' + n; }

  function tickCountdown() {
    var now = new Date();
    var end = new Date(now);
    end.setHours(24, 0, 0, 0);
    var diff = Math.max(0, end - now);
    var h = Math.floor(diff / 3600000);
    var m = Math.floor((diff % 3600000) / 60000);
    var s = Math.floor((diff % 60000) / 1000);
    if (tHours) tHours.textContent = pad(h);
    if (tMinutes) tMinutes.textContent = pad(m);
    if (tSeconds) tSeconds.textContent = pad(s);
  }
  if (tHours) {
    tickCountdown();
    setInterval(tickCountdown, 1000);
  }
})();
