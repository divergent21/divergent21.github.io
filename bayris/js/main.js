/*
  Bayris — main.js
  Мінімальна нав'язана JS-логіка: перемикання мобільного меню (fullscreen overlay),
  акордеон для підпунктів «Продукція» / «Рішення» та розгортання блоку «Про компанію».
  Сторінка повністю функціональна як статичний HTML+CSS; цей файл лише додає
  зручні інтеракції для мобільного меню, без будь-якого рендеру розмітки.
*/

document.addEventListener('DOMContentLoaded', function () {
  var burgerBtn = document.getElementById('burgerBtn');
  var mobileMenu = document.getElementById('mobileMenu');
  var mobileMenuClose = document.getElementById('mobileMenuClose');

  function openMenu() {
    mobileMenu.classList.add('is-open');
    document.body.classList.add('menu-open');
    burgerBtn.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    mobileMenu.classList.remove('is-open');
    document.body.classList.remove('menu-open');
    burgerBtn.setAttribute('aria-expanded', 'false');
  }

  if (burgerBtn && mobileMenu) {
    burgerBtn.addEventListener('click', openMenu);
  }
  if (mobileMenuClose) {
    mobileMenuClose.addEventListener('click', closeMenu);
  }

  // close mobile menu on link click (so navigation feels instant)
  mobileMenu.querySelectorAll('.mobile-nav__link, .mobile-nav__sub-link, .mobile-nav__cta').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  // accordion for "Продукція" / "Рішення" inside mobile menu
  document.querySelectorAll('.mobile-nav__item--accordion').forEach(function (item) {
    var toggle = item.querySelector('.mobile-nav__toggle');
    toggle.addEventListener('click', function () {
      var isOpen = item.classList.contains('is-open');
      document.querySelectorAll('.mobile-nav__item--accordion').forEach(function (other) {
        other.classList.remove('is-open');
        other.querySelector('.mobile-nav__toggle').setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('is-open');
        toggle.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // "Читати повністю" expandable about section
  var aboutToggle = document.getElementById('aboutToggle');
  var aboutBody = document.getElementById('aboutBody');
  if (aboutToggle && aboutBody) {
    aboutToggle.addEventListener('click', function () {
      var expanded = aboutBody.classList.toggle('is-expanded');
      aboutToggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
      aboutToggle.textContent = expanded ? 'Згорнути' : 'Читати повністю';
    });
  }
});
