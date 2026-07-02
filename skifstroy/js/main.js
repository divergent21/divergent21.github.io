(function () {
  'use strict';

  /* ---------- Mobile nav open/close ---------- */
  var burger = document.querySelector('[data-burger]');
  var mobileClose = document.querySelector('[data-mobile-close]');
  var backdrop = document.querySelector('[data-mobile-backdrop]');
  var body = document.body;

  function openMobileNav() {
    body.setAttribute('data-mobile-open', '');
    burger.setAttribute('aria-expanded', 'true');
  }
  function closeMobileNav() {
    body.removeAttribute('data-mobile-open');
    burger.setAttribute('aria-expanded', 'false');
  }

  if (burger) {
    burger.addEventListener('click', function () {
      if (body.hasAttribute('data-mobile-open')) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });
  }
  if (mobileClose) mobileClose.addEventListener('click', closeMobileNav);
  if (backdrop) backdrop.addEventListener('click', closeMobileNav);

  document.querySelectorAll('[data-mobile-link]').forEach(function (link) {
    link.addEventListener('click', closeMobileNav);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMobileNav();
  });

  /* ---------- Mobile catalog accordion ---------- */
  var accordionBtn = document.querySelector('[data-mobile-accordion]');
  if (accordionBtn) {
    var accordionItem = accordionBtn.closest('.mobile-nav__item--accordion');
    accordionBtn.addEventListener('click', function () {
      var isOpen = accordionItem.hasAttribute('data-open');
      if (isOpen) {
        accordionItem.removeAttribute('data-open');
      } else {
        accordionItem.setAttribute('data-open', '');
      }
    });
  }

  /* ---------- Desktop catalog dropdown (click + touch friendly) ---------- */
  var catalogToggle = document.querySelector('[data-catalog-toggle]');
  var catalogItem = catalogToggle ? catalogToggle.closest('.main-nav__item--dropdown') : null;

  if (catalogToggle && catalogItem) {
    catalogToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      var isOpen = catalogItem.hasAttribute('data-open');
      if (isOpen) {
        catalogItem.removeAttribute('data-open');
        catalogToggle.setAttribute('aria-expanded', 'false');
      } else {
        catalogItem.setAttribute('data-open', '');
        catalogToggle.setAttribute('aria-expanded', 'true');
      }
    });

    document.addEventListener('click', function () {
      catalogItem.removeAttribute('data-open');
      catalogToggle.setAttribute('aria-expanded', 'false');
    });
  }

  /* ---------- Sticky header shadow on scroll ---------- */
  var header = document.getElementById('header');
  if (header) {
    var lastState = false;
    window.addEventListener('scroll', function () {
      var scrolled = window.scrollY > 8;
      if (scrolled !== lastState) {
        header.style.boxShadow = scrolled ? '0 8px 24px rgba(29,27,24,.06)' : 'none';
        lastState = scrolled;
      }
    }, { passive: true });
  }

  /* ---------- Contact form (static demo submit) ---------- */
  var form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = form.querySelector('.contact-form__input');
      var btn = form.querySelector('button');
      if (!input.value.trim()) return;
      btn.textContent = 'Заявка отправлена ✓';
      input.value = '';
      setTimeout(function () {
        btn.textContent = 'Получить консультацию';
      }, 2500);
    });
  }
})();
