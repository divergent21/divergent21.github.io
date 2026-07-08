/*
 * Astra Company — main.js
 * Vanilla JS: sticky header shadow, mobile menu toggle, mobile accordion.
 * No frameworks, no build step.
 */
(function () {
  'use strict';

  var header = document.getElementById('header');
  var burgerBtn = document.getElementById('burgerBtn');
  var mobileMenu = document.getElementById('mobileMenu');
  var mobileMenuClose = document.getElementById('mobileMenuClose');
  var backdrop = document.getElementById('mobileMenuBackdrop');
  var body = document.body;

  // ---- sticky header shadow on scroll ----
  function onScroll() {
    if (window.scrollY > 12) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---- mobile menu open/close ----
  function openMenu() {
    mobileMenu.classList.add('is-open');
    burgerBtn.classList.add('is-active');
    burgerBtn.setAttribute('aria-expanded', 'true');
    body.classList.add('menu-open');
  }

  function closeMenu() {
    mobileMenu.classList.remove('is-open');
    burgerBtn.classList.remove('is-active');
    burgerBtn.setAttribute('aria-expanded', 'false');
    body.classList.remove('menu-open');
  }

  if (burgerBtn) {
    burgerBtn.addEventListener('click', function () {
      if (mobileMenu.classList.contains('is-open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }

  if (mobileMenuClose) {
    mobileMenuClose.addEventListener('click', closeMenu);
  }

  if (backdrop) {
    backdrop.addEventListener('click', closeMenu);
  }

  // close menu on escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeMenu();
    }
  });

  // ---- mobile menu accordion groups ----
  var groupToggles = document.querySelectorAll('[data-group-toggle]');
  groupToggles.forEach(function (toggle) {
    toggle.addEventListener('click', function () {
      var item = toggle.closest('.mobile-menu__item--group');
      if (!item) return;
      var isOpen = item.classList.contains('is-open');

      // close all other groups (accordion behaviour)
      document.querySelectorAll('.mobile-menu__item--group.is-open').forEach(function (openItem) {
        if (openItem !== item) openItem.classList.remove('is-open');
      });

      item.classList.toggle('is-open', !isOpen);
    });
  });

  // close mobile menu automatically if resized to desktop width
  window.addEventListener('resize', function () {
    if (window.innerWidth > 980) {
      closeMenu();
    }
  });
})();
