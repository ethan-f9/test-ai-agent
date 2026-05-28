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

// Services & Portfolio cards — stacked animation (replaces stagger)
// Handled by initStackedCards() below

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


/* ========== 5. STACKED CARDS ANIMATION ========== */
function initStackedCards(selector) {
  const container = document.querySelector(selector + ' .stack-container');
  if (!container) return;
  const cards = container.querySelectorAll('.card');
  const total = cards.length;
  if (total === 0) return;

  // Set initial stacked position
  gsap.set(cards, {
    position: 'absolute',
    top: 0,
    left: '50%',
    xPercent: -50,
    width: '100%',
    maxWidth: '700px'
  });

  cards.forEach((card, i) => {
    const depth = total - 1 - i;
    gsap.set(card, {
      scale: 1 - depth * 0.05,
      y: depth * 16,
      zIndex: i + 1,
      opacity: i === 0 ? 0.4 : i === 1 ? 0.7 : 1
    });
  });

  // ScrollTrigger — each card peels away on scroll
  cards.forEach((card, i) => {
    if (i === total - 1) return;

    ScrollTrigger.create({
      trigger: selector,
      start: `top+=${i * 200} center`,
      end: `top+=${i * 200 + 200} center`,
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        const baseScale = 1 - (total - 1 - i) * 0.05;
        gsap.set(card, {
          y: -progress * 500,
          opacity: 1 - progress,
          scale: baseScale + progress * 0.05,
          rotation: progress * -5
        });

        // Card behind moves forward
        if (i + 1 < total) {
          const nextCard = cards[i + 1];
          const nextDepth = total - 2 - i;
          gsap.set(nextCard, {
            scale: (1 - nextDepth * 0.05) + progress * 0.05,
            y: (nextDepth * 16) - progress * 16,
            opacity: 0.4 + progress * 0.3
          });
        }
      }
    });
  });
}

// Only init stacked cards on desktop
if (window.innerWidth > 768) {
  initStackedCards('#portfolio');
  initStackedCards('#services');
}

// Set wrapper height for scroll room
document.querySelectorAll('.stack-wrapper').forEach(wrapper => {
  const cards = wrapper.querySelectorAll('.card');
  wrapper.style.minHeight = `${cards.length * 250 + 400}px`;
});

// Refresh ScrollTrigger after all animations are initialized
ScrollTrigger.refresh();
