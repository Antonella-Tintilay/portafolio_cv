/* ==========================================================================
   Portafolio de Antonella Raquel Tintilay
   JavaScript puro (Vanilla JS). Sin librerías ni frameworks.

   Funcionalidades:
   1. Año actual en el pie de página.
   2. Menú de navegación móvil accesible.
   3. Sombra del encabezado al hacer scroll.
   4. Resaltado del enlace de la sección visible.
   5. Animaciones de aparición al hacer scroll.
   6. Botón para copiar el correo.
   7. Botón "volver arriba".
   8. Selector de tema claro/oscuro.
   ========================================================================== */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  setCurrentYear();
  initScrollReveal();
  initMobileMenu();
  initHeaderState();
  initActiveNavLink();
  initCopyEmail();
  initBackToTop();
  initThemeToggle();
});

/* -------------------------------------------------------------------------
   1. Año actual
   El año del copyright se calcula solo para no tener que actualizarlo a mano.
   ------------------------------------------------------------------------- */
function setCurrentYear() {
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = String(new Date().getFullYear());
  }
}

/* -------------------------------------------------------------------------
   2. Menú móvil
   El botón abre y cierra el panel de navegación. Se actualiza
   aria-expanded para que los lectores de pantalla anuncien el estado.
   ------------------------------------------------------------------------- */
function initMobileMenu() {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('primary-nav');
  if (!toggle || !nav) return;

  const desktopQuery = window.matchMedia('(min-width: 901px)');

  const closeMenu = () => {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menú');
  };

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
  });

  // Al elegir un destino, el menú se cierra.
  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  // Escape cierra el menú y devuelve el foco al botón.
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && nav.classList.contains('is-open')) {
      closeMenu();
      toggle.focus();
    }
  });

  // Si la ventana pasa a escritorio, se limpia el estado abierto.
  desktopQuery.addEventListener('change', (event) => {
    if (event.matches) closeMenu();
  });
}

/* -------------------------------------------------------------------------
   3. Estado del encabezado
   Agrega una clase cuando la página se desplaza para mostrar el borde
   inferior y un fondo un poco más opaco.
   ------------------------------------------------------------------------- */
function initHeaderState() {
  const header = document.getElementById('site-header');
  if (!header) return;

  const updateHeader = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  };

  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });
}

/* -------------------------------------------------------------------------
   4. Enlace activo según la sección visible
   Calcula qué sección está en la parte superior del viewport y marca
   el enlace correspondiente con la clase .is-active.
   ------------------------------------------------------------------------- */
function initActiveNavLink() {
  const links = Array.from(document.querySelectorAll('.site-nav a[href^="#"]'));
  if (links.length === 0) return;

  const sections = links
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  if (sections.length === 0) return;

  let ticking = false;

  const updateActiveLink = () => {
    ticking = false;

    const scrollPosition = window.scrollY + 140;
    let currentSection = sections[0];

    sections.forEach((section) => {
      if (section.offsetTop <= scrollPosition) {
        currentSection = section;
      }
    });

    // Si se llegó al final de la página, se marca la última sección.
    const atBottom =
      window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;

    if (atBottom) {
      currentSection = sections[sections.length - 1];
    }

    links.forEach((link) => {
      const isActive = link.getAttribute('href') === `#${currentSection.id}`;
      link.classList.toggle('is-active', isActive);

      if (isActive) {
        link.setAttribute('aria-current', 'location');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  };

  // requestAnimationFrame evita recalcular en cada píxel de scroll.
  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(updateActiveLink);
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  updateActiveLink();
}

/* -------------------------------------------------------------------------
   5. Animaciones de aparición
   IntersectionObserver agrega la clase .is-visible cuando un elemento entra
   en pantalla. Si el usuario prefiere menos movimiento, todo se muestra sin
   animación. Si el navegador no lo soporta, también se muestra todo.
   ------------------------------------------------------------------------- */
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (elements.length === 0) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    elements.forEach((element) => element.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach((element) => observer.observe(element));
}

/* -------------------------------------------------------------------------
   6. Copiar el correo
   Usa la API del portapapeles cuando está disponible y, si no, un método
   alternativo con un <textarea> temporal. Muestra un mensaje de estado.
   ------------------------------------------------------------------------- */
function initCopyEmail() {
  const button = document.querySelector('[data-copy]');
  if (!button) return;

  const feedback = document.querySelector('.copy-feedback');
  const originalText = button.textContent;
  let resetTimer = null;

  const showFeedback = (message) => {
    if (feedback) feedback.textContent = message;
    window.clearTimeout(resetTimer);
    resetTimer = window.setTimeout(() => {
      if (feedback) feedback.textContent = '';
      button.textContent = originalText;
    }, 2600);
  };

  button.addEventListener('click', async () => {
    const value = button.dataset.copy;

    try {
      if (navigator.clipboard && window.isSecureContext) {
        try {
          await navigator.clipboard.writeText(value);
        } catch (clipboardError) {
          // Si el navegador bloquea la API moderna, se intenta el método clásico.
          fallbackCopy(value);
        }
      } else {
        fallbackCopy(value);
      }

      button.textContent = 'Copiado';
      showFeedback('Correo copiado al portapapeles.');
    } catch (error) {
      showFeedback(`No se pudo copiar. El correo es ${value}.`);
    }
  });
}

// Método alternativo para navegadores o contextos sin API de portapapeles.
function fallbackCopy(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();

  const copied = document.execCommand('copy');
  document.body.removeChild(textarea);

  if (!copied) {
    throw new Error('El navegador no permitió copiar el texto.');
  }
}

/* -------------------------------------------------------------------------
   7. Botón "volver arriba"
   Se muestra después de desplazarse un poco. El enlace apunta a #inicio,
   por lo que el movimiento lo resuelve el scroll suave definido en CSS.
   ------------------------------------------------------------------------- */
function initBackToTop() {
  const button = document.querySelector('.to-top');
  if (!button) return;

  let ticking = false;

  const updateVisibility = () => {
    ticking = false;
    button.classList.toggle('is-visible', window.scrollY > 600);
  };

  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(updateVisibility);
      }
    },
    { passive: true }
  );

  updateVisibility();
}

/* -------------------------------------------------------------------------
   8. Selector de tema
   El modo oscuro es el predeterminado. El tema elegido se guarda en
   localStorage y se vuelve a aplicar desde el <head> antes del primer
   pintado, para que no haya un destello del tema equivocado.
   ------------------------------------------------------------------------- */
function initThemeToggle() {
  const toggle = document.querySelector('.theme-toggle');
  if (!toggle) return;

  const root = document.documentElement;
  const themeColor = document.querySelector('meta[name="theme-color"]');
  const STORAGE_KEY = 'theme';
  const COLORS = { dark: '#070a0e', light: '#f6f8fa' };

  const applyTheme = (theme, persist) => {
    const isLight = theme === 'light';

    if (isLight) {
      root.setAttribute('data-theme', 'light');
    } else {
      root.removeAttribute('data-theme');
    }

    toggle.setAttribute('aria-pressed', String(isLight));

    if (themeColor) {
      themeColor.setAttribute('content', isLight ? COLORS.light : COLORS.dark);
    }

    if (!persist) return;

    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (error) {
      // Con el almacenamiento bloqueado, el tema funciona igual en la sesión.
    }
  };

  applyTheme(root.getAttribute('data-theme') === 'light' ? 'light' : 'dark', false);

  toggle.addEventListener('click', () => {
    const isLight = root.getAttribute('data-theme') === 'light';
    applyTheme(isLight ? 'dark' : 'light', true);
  });
}
