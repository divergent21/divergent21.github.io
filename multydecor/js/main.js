// MultyDecor - Main JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // Mobile Menu
  var burger = document.querySelector('.header__burger');
  var mobileMenu = document.querySelector('.mobile-menu');
  var closeBtn = document.querySelector('.mobile-menu__close');
  var overlay = mobileMenu;
  var menuLinks = document.querySelectorAll('.mobile-menu__link');

  function openMenu() {
    mobileMenu.classList.add('mobile-menu--open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    mobileMenu.classList.remove('mobile-menu--open');
    document.body.style.overflow = '';
  }

  if (burger) {
    burger.addEventListener('click', openMenu);
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeMenu);
  }

  if (overlay) {
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) {
        closeMenu();
      }
    });
  }

  menuLinks.forEach(function(link) {
    link.addEventListener('click', closeMenu);
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        var headerHeight = document.querySelector('.header').offsetHeight;
        var targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Form submit
  var form = document.querySelector('.contacts__form');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      var btn = form.querySelector('.contacts__submit');
      btn.textContent = 'Надіслано ✓';
      btn.style.background = '#2a7a3a';
      setTimeout(function() {
        btn.textContent = 'Надіслати заявку';
        btn.style.background = '';
        form.reset();
      }, 2000);
    });
  }
});
