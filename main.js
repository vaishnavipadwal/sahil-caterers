/* ============================================
   SAHIL CATERERS — MAIN.JS
============================================ */

// ===== LOADER =====
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) {
      loader.classList.add('hidden');
      setTimeout(() => loader.remove(), 600);
    }
  }, 2200);
});

// ===== AOS INIT =====
AOS.init({
  duration: 700,
  once: true,
  offset: 80,
  easing: 'ease-out-cubic',
});

// ===== NAVBAR =====
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close nav on link click
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  const scrollPos = window.scrollY + 80;
  sections.forEach(section => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (scrollPos >= top && scrollPos < bottom) {
      document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
      link?.classList.add('active');
    }
  });
});

// ===== SCROLL PROGRESS =====
const scrollProgress = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
  const winScroll = document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  if (scrollProgress) scrollProgress.style.width = scrolled + '%';
});

// ===== BACK TO TOP =====
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    backToTop?.classList.add('visible');
  } else {
    backToTop?.classList.remove('visible');
  }
});
backToTop?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== PARTICLES =====
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  const count = 30;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.cssText = `
      left: ${Math.random() * 100}%;
      bottom: ${Math.random() * 40}%;
      --dur: ${4 + Math.random() * 6}s;
      --delay: ${Math.random() * 5}s;
      width: ${2 + Math.random() * 4}px;
      height: ${2 + Math.random() * 4}px;
      opacity: 0;
    `;
    container.appendChild(p);
  }
}
createParticles();

// ===== MENU TABS =====
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanes = document.querySelectorAll('.tab-pane');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.tab;
    tabBtns.forEach(b => b.classList.remove('active'));
    tabPanes.forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    const pane = document.getElementById(`tab-${target}`);
    if (pane) pane.classList.add('active');
  });
});

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

contactForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = contactForm.querySelector('button[type="submit"]');
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  btn.disabled = true;
  setTimeout(() => {
    contactForm.style.display = 'none';
    if (formSuccess) formSuccess.style.display = 'block';
  }, 1500);
});

// ===== SMOOTH SCROLL for anchor links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 70;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ===== COUNTER ANIMATION =====
function animateCounters() {
  document.querySelectorAll('.stat-num').forEach(el => {
    const text = el.innerText;
    const num = parseInt(text.replace(/\D/g, ''));
    const suffix = text.replace(/[\d]/g, '');
    if (!num) return;
    let start = 0;
    const step = num / 60;
    const timer = setInterval(() => {
      start = Math.min(start + step, num);
      el.innerText = Math.floor(start) + suffix;
      if (start >= num) clearInterval(timer);
    }, 20);
  });
}

// Trigger counter animation when stats section comes into view
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounters();
      statsObserver.disconnect();
    }
  });
}, { threshold: 0.5 });

const statsBand = document.querySelector('.stats-band');
if (statsBand) statsObserver.observe(statsBand);

// ===== GALLERY LIGHTBOX (simple) =====
document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    const placeholder = item.querySelector('.gallery-placeholder');
    const emoji = placeholder?.querySelector('span')?.textContent || '🍛';
    const title = placeholder?.querySelector('p')?.textContent || 'Food';

    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position:fixed;inset:0;background:rgba(0,0,0,0.92);z-index:9999;
      display:flex;align-items:center;justify-content:center;flex-direction:column;gap:1rem;
      cursor:pointer;animation:fadeIn 0.3s ease;
    `;
    overlay.innerHTML = `
      <style>@keyframes fadeIn{from{opacity:0}to{opacity:1}}</style>
      <div style="font-size:8rem;">${emoji}</div>
      <p style="color:white;font-size:1.2rem;font-family:'Playfair Display',serif;">${title}</p>
      <p style="color:rgba(255,255,255,0.4);font-size:0.8rem;">📸 Replace with your real food photos in /images/gallery/</p>
      <p style="color:rgba(255,255,255,0.3);font-size:0.75rem;margin-top:0.5rem;">Click anywhere to close</p>
    `;
    overlay.addEventListener('click', () => overlay.remove());
    document.body.appendChild(overlay);
  });
});

console.log(`
🍽️  Sahil Caterers Website
━━━━━━━━━━━━━━━━━━━━━━━
📞 Contact: 9623311557
📞 Contact: 82378 97633
📍 Warje Malwadi, Pune 411058
━━━━━━━━━━━━━━━━━━━━━━━
Built with ❤️ for Sahil Caterers
`);