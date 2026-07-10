/**
 * Promat UA — mobile menu toggle
 * Vanilla JS. No markup is generated here — it only toggles classes/attrs
 * on markup that already exists in index.html.
 */
(function () {
  var openBtn = document.getElementById('menu-open');
  var closeBtn = document.getElementById('menu-close');
  var menu = document.getElementById('mobile-menu');

  if (!openBtn || !closeBtn || !menu) return;

  function openMenu() {
    menu.classList.add('mobile-menu--open');
    menu.setAttribute('aria-hidden', 'false');
    openBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    menu.classList.remove('mobile-menu--open');
    menu.setAttribute('aria-hidden', 'true');
    openBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  openBtn.addEventListener('click', openMenu);
  closeBtn.addEventListener('click', closeMenu);

  menu.querySelectorAll('.mobile-menu__link').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menu.classList.contains('mobile-menu--open')) {
      closeMenu();
    }
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth > 980 && menu.classList.contains('mobile-menu--open')) {
      closeMenu();
    }
  });
})();
