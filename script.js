document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');
  const navList = document.querySelector('#primary-menu');
  const navLinks = navList ? navList.querySelectorAll('a[href^="#"]') : [];

  function closeNav() {
    if (!nav || !navToggle) return;
    nav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Hauptmenü umschalten');
  }

  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      navToggle.setAttribute('aria-label', isOpen ? 'Hauptmenü schließen' : 'Hauptmenü umschalten');
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeNav();
      }
    });

    document.addEventListener('click', (event) => {
      if (!nav.classList.contains('open')) return;
      if (!nav.contains(event.target) && !navToggle.contains(event.target)) {
        closeNav();
      }
    });

    nav.addEventListener('focusout', (event) => {
      const next = event.relatedTarget;
      if (!next || (!nav.contains(next) && !navToggle.contains(next))) {
        closeNav();
      }
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      closeNav();
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#' || targetId === '#0') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        event.preventDefault();
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        targetElement.setAttribute('tabindex', '-1');
        targetElement.focus({ preventScroll: true });
        targetElement.addEventListener('blur', () => {
          targetElement.removeAttribute('tabindex');
        }, { once: true });
      }
    });
  });

  const faqButtons = document.querySelectorAll('.faq-question');
  faqButtons.forEach((button) => {
    const answerId = button.getAttribute('aria-controls');
    const answer = answerId ? document.getElementById(answerId) : null;

    button.addEventListener('click', () => {
      const isExpanded = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!isExpanded));
      if (answer) {
        answer.hidden = isExpanded;
      }
    });

    button.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        button.click();
      }
    });
  });

  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});