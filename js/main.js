/* ===== Loader ===== */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
  }, 1200);
});

/* ===== Theme Toggle ===== */
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateThemeIcon(next);
});

function updateThemeIcon(theme) {
  themeToggle.innerHTML = theme === 'dark'
    ? '<i class="fas fa-moon"></i>'
    : '<i class="fas fa-sun"></i>';
}

/* ===== Navbar Scroll ===== */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

/* ===== Mobile Nav ===== */
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

/* ===== Active Nav Link ===== */
const sections = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 100;
    if (window.scrollY >= top) current = section.getAttribute('id');
  });
  navLinkEls.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
});

/* ===== Typing Effect ===== */
const roles = [
  'IT Undergraduate at SLIIT',
  'Aspiring Software Engineer',
  'QA Engineering Enthusiast',
  'Future Project Manager',
  'Software Engineer',
  'Web Developer',
  'AI & Machine Learning Explorer',
  'Open Source Contributor',
  'Tech Blogger',
  'Continuous Learner',
  'Problem Solver',
  'Team Player',
  'Detail-Oriented',
  'Adaptable'
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingEl = document.getElementById('typingText');
const typeSpeed = 80;
const deleteSpeed = 40;
const pauseTime = 2000;

function typeEffect() {
  const current = roles[roleIndex];

  if (isDeleting) {
    typingEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }

  let speed = isDeleting ? deleteSpeed : typeSpeed;

  if (!isDeleting && charIndex === current.length) {
    speed = pauseTime;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    speed = 500;
  }

  setTimeout(typeEffect, speed);
}

typeEffect();

/* ===== Particle Background ===== */
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];
let animationId;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function createParticles() {
  particles = [];
  const count = Math.min(Math.floor(window.innerWidth / 12), 120);
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5 + 0.5,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: (Math.random() - 0.5) * 0.4,
      opacity: Math.random() * 0.5 + 0.2
    });
  }
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p, i) => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0, 212, 255, ${p.opacity})`;
    ctx.fill();

    p.x += p.speedX;
    p.y += p.speedY;

    if (p.x < 0) p.x = canvas.width;
    if (p.x > canvas.width) p.x = 0;
    if (p.y < 0) p.y = canvas.height;
    if (p.y > canvas.height) p.y = 0;

    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[j].x - p.x;
      const dy = particles[j].y - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(0, 212, 255, ${0.08 * (1 - dist / 120)})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  });

  animationId = requestAnimationFrame(drawParticles);
}

resizeCanvas();
createParticles();
drawParticles();

window.addEventListener('resize', () => {
  resizeCanvas();
  createParticles();
});

/* ===== Scroll Reveal ===== */
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => entry.target.classList.add('visible'), delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

/* ===== 3D Tilt Effect ===== */
document.querySelectorAll('.tilt-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale(1)';
  });
});

/* ===== Stats Counter ===== */
const statNumbers = document.querySelectorAll('.stat-number');
let statsAnimated = false;

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !statsAnimated) {
      statsAnimated = true;
      statNumbers.forEach(stat => {
        const target = parseInt(stat.dataset.target, 10);
        animateCounter(stat, target);
      });
    }
  });
}, { threshold: 0.5 });

const statsSection = document.getElementById('stats');
if (statsSection) statsObserver.observe(statsSection);

function animateCounter(el, target) {
  let current = 0;
  const increment = target / 60;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      el.textContent = target + '+';
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current);
    }
  }, 25);
}

/* ===== Contact Form (FormSubmit → Gmail) ===== */
const CONTACT_EMAIL = 'sandeepasuraj80@gmail.com';
const FORMSUBMIT_URL = `https://formsubmit.co/ajax/${CONTACT_EMAIL}`;

function isLocalFilePreview() {
  return window.location.protocol === 'file:';
}

function isFormSubmitSuccess(result) {
  return result.success === true || result.success === 'true';
}

document.getElementById('contactForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const form = e.target;
  const btn = document.getElementById('formSubmitBtn');
  const status = document.getElementById('formStatus');
  const subjectField = document.getElementById('formEmailSubject');
  const data = new FormData(form);

  const name = String(data.get('name') || '').trim();
  const email = String(data.get('email') || '').trim();
  const subject = String(data.get('subject') || '').trim();
  const message = String(data.get('message') || '').trim();

  if (data.get('_honey')) return;

  if (!name || !email || !subject || !message) {
    status.textContent = 'Please fill in all fields before sending.';
    status.className = 'form-status form-status-error';
    return;
  }

  if (isLocalFilePreview()) {
    status.textContent = 'Open your live GitHub Pages site to test email delivery. Local file preview cannot send messages.';
    status.className = 'form-status form-status-error';
    return;
  }

  subjectField.value = `Portfolio Contact: ${subject}`;

  const payload = new FormData(form);
  payload.set('_replyto', email);

  const originalBtn = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  status.textContent = '';
  status.className = 'form-status';

  try {
    const response = await fetch(FORMSUBMIT_URL, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: payload,
    });

    let result = {};
    try {
      result = await response.json();
    } catch {
      throw new Error('Unexpected response from email service.');
    }

    if (!isFormSubmitSuccess(result)) {
      throw new Error(result.message || 'Failed to send message.');
    }

    btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
    btn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
    status.textContent =
      'Thank you! If this is your first submission, check sandeepasuraj80@gmail.com (including Spam) and click the FormSubmit activation link. After that, new messages will arrive in your inbox.';
    status.classList.add('form-status-success');
    form.reset();
    subjectField.value = 'New Portfolio Contact Message';

    setTimeout(() => {
      btn.innerHTML = originalBtn;
      btn.style.background = '';
      btn.disabled = false;
      status.textContent = '';
      status.className = 'form-status';
    }, 8000);
  } catch (error) {
    btn.innerHTML = originalBtn;
    btn.disabled = false;
    status.textContent =
      error.message ||
      'Something went wrong. Please try again on your live site or email sandeepasuraj80@gmail.com directly.';
    status.classList.add('form-status-error');
  }
});

/* ===== Smooth Scroll for anchor links ===== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
