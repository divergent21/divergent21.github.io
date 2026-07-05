/* BRANA — main.js
   Vanilla JS: mobile menu toggle + mobile catalog accordion.
   No frameworks, no build step. */
(function () {
  'use strict';

  var burgerBtn = document.getElementById('burgerBtn');
  var mobileMenu = document.getElementById('mobileMenu');
  var mobileMenuClose = document.getElementById('mobileMenuClose');
  var mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
  var body = document.body;

  function openMenu() {
    mobileMenu.classList.add('is-open');
    burgerBtn.setAttribute('aria-expanded', 'true');
    body.classList.add('no-scroll');
  }

  function closeMenu() {
    mobileMenu.classList.remove('is-open');
    burgerBtn.setAttribute('aria-expanded', 'false');
    body.classList.remove('no-scroll');
  }

  if (burgerBtn) burgerBtn.addEventListener('click', openMenu);
  if (mobileMenuClose) mobileMenuClose.addEventListener('click', closeMenu);
  if (mobileMenuOverlay) mobileMenuOverlay.addEventListener('click', closeMenu);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  // close menu when a nav link is clicked (in-page anchors)
  document.querySelectorAll('.mobile-nav__link, .mobile-nav__sublink, .mobile-menu__cta').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  // accordion for catalog inside mobile menu
  document.querySelectorAll('.mobile-nav__item--accordion').forEach(function (item) {
    var btn = item.querySelector('.mobile-nav__accordion-btn');
    btn.addEventListener('click', function () {
      var isOpen = item.classList.contains('is-open');
      item.classList.toggle('is-open', !isOpen);
      btn.setAttribute('aria-expanded', String(!isOpen));
    });
  });

  // header shadow on scroll
  var header = document.getElementById('header');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 8) {
      header.style.boxShadow = '0 2px 0 rgba(18,24,31,0.08)';
    } else {
      header.style.boxShadow = 'none';
    }
  });
})();
