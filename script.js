// Глеб Асташев — Personal Site JS
// Handles: scroll animations, mobile menu, nav shadow

document.addEventListener('DOMContentLoaded', () => {

  /* ─── SCROLL REVEAL ─── */
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(el => observer.observe(el));

  /* ─── NAV SHADOW ON SCROLL ─── */
  const nav = document.querySelector('.nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  /* ─── MOBILE MENU ─── */
  const burger = document.getElementById('burger');
  const dropdown = document.getElementById('navDropdown');

  burger.addEventListener('click', () => {
    const isOpen = burger.classList.toggle('open');
    dropdown.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close on link click
  dropdown.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('open');
      dropdown.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target)) {
      burger.classList.remove('open');
      dropdown.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

  /* ─── SMOOTH ACTIVE NAV ─── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__links a, .nav__dropdown a');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.style.color = link.getAttribute('href') === `#${id}`
            ? 'var(--accent)'
            : '';
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => sectionObserver.observe(s));

});
