(function () {
  'use strict';

  // theme toggle
  const toggle = document.getElementById('themeToggle');
  const html   = document.documentElement;
  html.setAttribute('data-theme', localStorage.getItem('theme') || 'light');

  toggle.addEventListener('click', () => {
    const next = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });

  // nav scroll
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  // mobile menu
  const menuBtn   = document.getElementById('menuBtn');
  const navMobile = document.getElementById('navMobile');
  menuBtn.addEventListener('click', () => navMobile.classList.toggle('open'));
  navMobile.querySelectorAll('a').forEach(l =>
    l.addEventListener('click', () => navMobile.classList.remove('open'))
  );

  // scroll reveal
  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.07, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
  }

  // smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
      const t = document.querySelector(this.getAttribute('href'));
      if (t) {
        e.preventDefault();
        const offset = parseInt(getComputedStyle(html).getPropertyValue('--nav-h')) || 56;
        window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - offset - 16, behavior: 'smooth' });
      }
    });
  });

})();