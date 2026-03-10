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

  /* ── Galería por categoría ── */

  // Define las fotos de cada categoría
  // Agrega o quita fotos según las que tengas en cada carpeta
  const galeriasData = {
    amarillas: {
      fotos: [
        'img/galeria/amarillas/1.jpg',
        'img/galeria/amarillas/2.jpg',
        'img/galeria/amarillas/3.jpg',
        'img/galeria/amarillas/4.jpg',
      ]
    },
    arreglos: {
      fotos: [
        'img/galeria/arreglos/1.jpg',
        'img/galeria/arreglos/2.jpg',
        'img/galeria/arreglos/3.jpg',
        'img/galeria/arreglos/4.jpg',
      ]
    },
    ramos: {
      fotos: [
        'img/galeria/ramos/1.jpg',
        'img/galeria/ramos/2.jpg',
        'img/galeria/ramos/3.jpg',
        'img/galeria/ramos/4.jpg',
      ]
    },
    jarrones: {
      fotos: [
        'img/galeria/jarrones/1.jpg',
        'img/galeria/jarrones/2.jpg',
        'img/galeria/jarrones/3.jpg',
        'img/galeria/jarrones/4.jpg',
      ]
    },
    condolencias: {
      fotos: [
        'img/galeria/condolencias/1.jpg',
        'img/galeria/condolencias/2.jpg',
        'img/galeria/condolencias/3.jpg',
        'img/galeria/condolencias/4.jpg',
      ]
    }
  };

  const modal      = document.getElementById('galeriaModal');
  const grid       = document.getElementById('galeriaGrid');
  const titulo     = document.getElementById('galeriaTitulo');
  const cerrarBtn  = document.getElementById('galeriaCerrar');

  document.querySelectorAll('.categoria').forEach(cat => {
    cat.addEventListener('click', (e) => {
      e.preventDefault();
      const key    = cat.dataset.galeria;
      const nombre = cat.dataset.titulo;
      const data   = galeriasData[key];
      if (!data) return;

      titulo.textContent = nombre;
      grid.innerHTML = '';

      data.fotos.forEach(src => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = nombre;
        img.loading = 'lazy';
        grid.appendChild(img);
      });

      modal.classList.add('activo');
      document.body.style.overflow = 'hidden';
    });
  });

  cerrarBtn.addEventListener('click', cerrarModal);
  modal.addEventListener('click', (e) => { if (e.target === modal) cerrarModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') cerrarModal(); });

  function cerrarModal() {
    modal.classList.remove('activo');
    document.body.style.overflow = '';
  }


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