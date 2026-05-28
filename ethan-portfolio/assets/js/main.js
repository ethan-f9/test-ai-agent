/* ========== 1. GSAP SCROLLTRIGGER ========== */
gsap.registerPlugin(ScrollTrigger);

// Hero entrance — staggered on page load
gsap.from('.hero__badge', { opacity: 0, y: -20, duration: 0.5, delay: 0.2 });
gsap.from('h1', { opacity: 0, y: 30, duration: 0.6, delay: 0.4 });
gsap.from('.hero__subtitle', { opacity: 0, y: 20, duration: 0.6, delay: 0.6 });
gsap.from('.hero__cta', { opacity: 0, y: 20, duration: 0.6, delay: 0.8 });
gsap.from('.hero__visual', { opacity: 0, x: 40, duration: 0.8, delay: 0.5 });

// About section
gsap.from('.about__avatar', {
  scrollTrigger: { trigger: '#about', start: 'top 80%' },
  opacity: 0, x: -40, duration: 0.7
});
gsap.from('.about__content', {
  scrollTrigger: { trigger: '#about', start: 'top 80%' },
  opacity: 0, x: 40, duration: 0.7
});

// Services cards — stagger
gsap.from('.services .card', {
  scrollTrigger: { trigger: '#services', start: 'top 75%' },
  opacity: 0, y: 40, duration: 0.6, stagger: 0.15
});

// Portfolio cards — stagger
gsap.from('.portfolio .card', {
  scrollTrigger: { trigger: '#portfolio', start: 'top 75%' },
  opacity: 0, y: 40, duration: 0.6, stagger: 0.15
});

// Testimonials — stagger
gsap.from('.testimonials .card', {
  scrollTrigger: { trigger: '#testimonials', start: 'top 75%' },
  opacity: 0, y: 30, duration: 0.5, stagger: 0.1
});

// Contact section
gsap.from('#contact .contact__info', {
  scrollTrigger: { trigger: '#contact', start: 'top 80%' },
  opacity: 0, x: -30, duration: 0.6
});
gsap.from('#contact .contact__form', {
  scrollTrigger: { trigger: '#contact', start: 'top 80%' },
  opacity: 0, x: 30, duration: 0.6
});

// Section headings
gsap.utils.toArray('section h2').forEach(heading => {
  gsap.from(heading, {
    scrollTrigger: { trigger: heading, start: 'top 85%' },
    opacity: 0, y: 20, duration: 0.5
  });
});


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
