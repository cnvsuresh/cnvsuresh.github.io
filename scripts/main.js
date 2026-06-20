/* ========================================
   Dynamic Year & Career Duration
   ======================================== */
const CAREER_START = new Date(2015, 9);
const now = new Date();
const careerYears = Math.floor((now - CAREER_START) / (365.25 * 24 * 60 * 60 * 1000));

const dynYearsEl = document.getElementById('dynamicYears');
if (dynYearsEl) dynYearsEl.textContent = careerYears;

const expCountEl = document.getElementById('expCount');
if (expCountEl) expCountEl.setAttribute('data-count', careerYears);

const footerYearEl = document.getElementById('footerYear');
if (footerYearEl) footerYearEl.textContent = now.getFullYear();

/* ========================================
   Navigation
   ======================================== */
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const navLinkItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
});

navLinkItems.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

/* ========================================
   Active Nav Link on Scroll
   ======================================== */
const sections = document.querySelectorAll('section[id]');

function updateActiveLink() {
  const scrollY = window.scrollY + 100;
  sections.forEach(section => {
    const top = section.offsetTop - 100;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-link[href="#${id}"]`);
    if (link) {
      link.classList.toggle('active', scrollY >= top && scrollY < bottom);
    }
  });
}

window.addEventListener('scroll', updateActiveLink);

/* ========================================
   Typing Effect
   ======================================== */
const titles = [
  'Technical Project Manager',
  'DevOps Engineer',
  'Senior Backend Engineer',
  'Cloud Solutions Architect',
  'Team Lead & Mentor'
];

const typedText = document.getElementById('typedText');
let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const current = titles[titleIndex];

  if (isDeleting) {
    typedText.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typedText.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }

  let speed = isDeleting ? 40 : 80;

  if (!isDeleting && charIndex === current.length) {
    speed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    titleIndex = (titleIndex + 1) % titles.length;
    speed = 500;
  }

  setTimeout(typeEffect, speed);
}

typeEffect();

/* ========================================
   Counter Animation
   ======================================== */
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-count'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    function update() {
      current += step;
      if (current < target) {
        counter.textContent = Math.floor(current);
        requestAnimationFrame(update);
      } else {
        counter.textContent = target;
      }
    }

    update();
  });
}

/* ========================================
   Particle Background
   ======================================== */
function createParticles() {
  const container = document.getElementById('particles');
  const count = 30;

  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDuration = (Math.random() * 15 + 10) + 's';
    particle.style.animationDelay = (Math.random() * 10) + 's';
    particle.style.width = particle.style.height = (Math.random() * 4 + 2) + 'px';
    container.appendChild(particle);
  }
}

createParticles();

/* ========================================
   Scroll Animations (Intersection Observer)
   ======================================== */
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

document.querySelectorAll('.timeline-item, .skill-category, .info-card, .edu-card, .tool-item, .project-card').forEach(el => {
  observer.observe(el);
});

/* ========================================
   Counter Trigger on Hero Visible
   ======================================== */
let countersAnimated = false;
const heroObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !countersAnimated) {
      countersAnimated = true;
      animateCounters();
    }
  });
}, { threshold: 0.3 });

const heroSection = document.getElementById('home');
if (heroSection) heroObserver.observe(heroSection);

/* ========================================
   Copy Email
   ======================================== */
document.querySelectorAll('.copy-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const text = btn.getAttribute('data-copy');
    navigator.clipboard.writeText(text).then(() => {
      btn.classList.add('copied');
      const icon = btn.querySelector('i');
      icon.classList.remove('fa-copy');
      icon.classList.add('fa-check');
      setTimeout(() => {
        btn.classList.remove('copied');
        icon.classList.remove('fa-check');
        icon.classList.add('fa-copy');
      }, 2000);
    });
  });
});

/* ========================================
   Contact Form
   ======================================== */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    btn.innerHTML = 'Message Sent! <i class="fas fa-check"></i>';
    btn.style.background = '#10b981';
    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.style.background = '';
      contactForm.reset();
    }, 3000);
  });
}

/* ========================================
   Staggered reveal animations
   ======================================== */
document.querySelectorAll('.skill-category').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.1}s`;
});

document.querySelectorAll('.timeline-item').forEach((item, i) => {
  item.style.transitionDelay = `${i * 0.08}s`;
});

document.querySelectorAll('.project-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.1}s`;
});
