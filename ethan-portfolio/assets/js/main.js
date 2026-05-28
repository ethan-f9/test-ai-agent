/* ========== 1. SCROLL REVEAL (Intersection Observer) ========== */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


/* ========== 2. NAV SCROLL STATE ========== */
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
  header.classList.toggle('nav--scrolled', window.scrollY > 50);
}, { passive: true });


/* ========== 3. SCROLL SPY (Active Nav Link) ========== */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav__link');

const spyObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.remove('active'));
      const active = document.querySelector(`.nav__link[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.5 });

sections.forEach(section => spyObserver.observe(section));


/* ========== 4. MOBILE HAMBURGER MENU ========== */
const hamburger = document.querySelector('.nav__hamburger');
const navMenu = document.querySelector('.nav__menu');

hamburger.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('nav__menu--open');
  hamburger.setAttribute('aria-expanded', String(isOpen));
});

// Close menu on nav link click
navMenu.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('nav__menu--open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});
