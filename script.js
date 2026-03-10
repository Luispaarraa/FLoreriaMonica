/* ══════════════════════════════════════
   Monica Solomon — Florería Artesanal
   script.js
══════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Animación fade-in al hacer scroll ── */
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll('.card, .categoria, .feature').forEach((el) => {
    el.classList.add('fade-in');
    observer.observe(el);
  });

  /* ── Smooth scroll para nav links ── */
  document.querySelectorAll('nav a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  /* ── Header: ocultar/mostrar al hacer scroll ── */
  let lastScroll = 0;
  const header = document.querySelector('header');

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > lastScroll && currentScroll > 100) {
      header.style.transform = 'translateY(-100%)';
    } else {
      header.style.transform = 'translateY(0)';
    }
    lastScroll = currentScroll;
  });

  /* ── Tooltip WhatsApp flotante ── */
  const floatBtn = document.querySelector('.whatsapp-float');
  if (floatBtn) {
    floatBtn.addEventListener('mouseenter', () => {
      floatBtn.setAttribute('title', '¡Escríbenos! Respondemos en minutos 🌸');
    });
  }

  /* ── Carrusel Hero ── */
  const slides   = document.getElementById('heroSlides');
  const dotsWrap = document.getElementById('heroDots');
  if (!slides || !dotsWrap) return;

  const total = slides.children.length;
  let current = 0;
  let autoTimer;

  // Crear puntos
  for (let i = 0; i < total; i++) {
    const dot = document.createElement('button');
    dot.className = 'hero-dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => { goTo(i); resetAuto(); });
    dotsWrap.appendChild(dot);
  }

  function goTo(index) {
    current = (index + total) % total;
    slides.style.transform = `translateX(-${current * 100}%)`;
    document.querySelectorAll('.hero-dot').forEach((d, i) =>
      d.classList.toggle('active', i === current)
    );
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  document.getElementById('heroNext').addEventListener('click', () => { next(); resetAuto(); });
  document.getElementById('heroPrev').addEventListener('click', () => { prev(); resetAuto(); });

  function startAuto() { autoTimer = setInterval(next, 4000); }
  function resetAuto()  { clearInterval(autoTimer); startAuto(); }

  startAuto();

  // Swipe en móvil
  let startX = 0;
  slides.addEventListener('touchstart', e => startX = e.touches[0].clientX);
  slides.addEventListener('touchend', e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) { diff > 0 ? next() : prev(); resetAuto(); }
  });

});