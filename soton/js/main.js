(function () {
  'use strict';

  var burger = document.querySelector('.js-burger');
  var mobileNav = document.querySelector('.js-mobile-nav');
  var closeBtn = document.querySelector('.js-mobile-nav-close');
  var body = document.body;

  function openNav() {
    mobileNav.classList.add('mobile-nav--open');
    burger.setAttribute('aria-expanded', 'true');
    body.classList.add('no-scroll');
  }

  function closeNav() {
    mobileNav.classList.remove('mobile-nav--open');
    burger.setAttribute('aria-expanded', 'false');
    body.classList.remove('no-scroll');
  }

  if (burger && mobileNav) {
    burger.addEventListener('click', function () {
      var expanded = burger.getAttribute('aria-expanded') === 'true';
      expanded ? closeNav() : openNav();
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeNav);
  }

  // Close on link click (except accordion toggles) and on Escape
  if (mobileNav) {
    mobileNav.querySelectorAll('.mobile-nav__link, .mobile-nav__sub-link').forEach(function (link) {
      link.addEventListener('click', closeNav);
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeNav();
  });

  // Mobile accordion for "Продукція"
  document.querySelectorAll('.js-mobile-accordion-toggle').forEach(function (toggle) {
    toggle.addEventListener('click', function () {
      var item = toggle.closest('.mobile-nav__item');
      item.classList.toggle('mobile-nav__item--open');
    });
  });

  // Callback form (front-end only demo)
  document.querySelectorAll('.js-callback-form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('.js-callback-submit');
      var original = btn.textContent;
      btn.textContent = 'Дякуємо, очікуйте дзвінка';
      form.reset();
      setTimeout(function () { btn.textContent = original; }, 3000);
    });
  });
})();
