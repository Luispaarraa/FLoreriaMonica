/* ══════════════════════════════════════
   Monica Solomon — Florería Artesanal
   script.js
══════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

    /* ── Animación de entrada con IntersectionObserver ──
       Las tarjetas y secciones se revelan al hacer scroll */
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
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
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
  
    /* ── Tooltip en botón WhatsApp flotante ── */
    const floatBtn = document.querySelector('.whatsapp-float');
    if (floatBtn) {
      floatBtn.addEventListener('mouseenter', () => {
        floatBtn.setAttribute('title', '¡Escríbenos! Respondemos en minutos 🌸');
      });
    }
  
  });