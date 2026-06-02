/* portfolio-enhancements.js
   Drop this at the bottom of your <body>, after the DOM.
   Works with portfolio-upgraded.css
*/

(function() {
  'use strict';

  /* ─── CUSTOM CURSOR ─── */
  const cursor = document.querySelector('.cursor');
  const ring   = document.querySelector('.cursor-ring');
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    if (cursor) { cursor.style.left = mx + 'px'; cursor.style.top = my + 'px'; }
  });

  // Smooth follower ring
  function animateRing() {
    if (ring) {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
    }
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Hover expansion
  const hoverTargets = 'a, button, .skill-tag, .project-card, .stat-card, .pos-card, .contact-link';
  document.querySelectorAll(hoverTargets).forEach(el => {
    el.addEventListener('mouseenter', () => ring && ring.classList.add('hovering'));
    el.addEventListener('mouseleave', () => ring && ring.classList.remove('hovering'));
  });

  // Hide cursor when leaving window
  document.addEventListener('mouseleave', () => {
    if (cursor) cursor.style.opacity = '0';
    if (ring)   ring.style.opacity   = '0';
  });
  document.addEventListener('mouseenter', () => {
    if (cursor) cursor.style.opacity = '1';
    if (ring)   ring.style.opacity   = '0.7';
  });

  /* ─── NAV: scroll state ─── */
  const nav = document.querySelector('nav');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const sy = window.scrollY;
    if (nav) {
      nav.classList.toggle('scrolled', sy > 40);
      // Hide nav on scroll down, show on scroll up
      if (sy > lastScroll + 60 && sy > 200) {
        nav.style.transform = 'translateY(-100%)';
      } else if (sy < lastScroll - 10 || sy < 80) {
        nav.style.transform = 'translateY(0)';
      }
      lastScroll = sy;
    }
    highlightActiveNav();
  }, { passive: true });
  nav && (nav.style.transition = 'transform 0.4s cubic-bezier(0.16,1,0.3,1), background 0.4s, border-color 0.4s');

  /* ─── ACTIVE NAV LINK ─── */
  function highlightActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const links    = document.querySelectorAll('.nav-links a');
    const scrollY  = window.scrollY + 120;
    sections.forEach(sec => {
      if (scrollY >= sec.offsetTop && scrollY < sec.offsetTop + sec.offsetHeight) {
        links.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav-links a[href="#${sec.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }

  /* ─── INTERSECTION OBSERVER: fade-in & stagger ─── */
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-in, .stagger-children').forEach(el => io.observe(el));

  /* ─── PROJECT CARD SPOTLIGHT ─── */
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mx', x + 'px');
      card.style.setProperty('--my', y + 'px');
      const spotlight = card.querySelector('.project-card::before');
      // Apply via inline style on ::before via CSS custom props
      card.style.background = `radial-gradient(circle 220px at ${x}px ${y}px, rgba(79,142,247,0.07), transparent 70%), var(--bg2)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.background = '';
    });
  });

  /* ─── SKILL-TAG click: copy ─── */
  document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.title = 'Click to copy';
    tag.style.cursor = 'pointer';
    tag.addEventListener('click', () => {
      const text = tag.textContent.trim();
      navigator.clipboard?.writeText(text).then(() => {
        const orig = tag.textContent;
        tag.textContent = '✓ copied';
        setTimeout(() => tag.textContent = orig, 1200);
      });
    });
  });

  /* ─── STAT CARD: count-up animation ─── */
  const countUpObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const rawText = el.dataset.target || el.textContent;
      const suffix  = rawText.replace(/[\d.]/g, '');
      const target  = parseFloat(rawText.replace(/[^\d.]/g, ''));
      if (isNaN(target)) return;
      let start = null;
      const duration = 1400;
      const step = ts => {
        if (!start) start = ts;
        const prog = Math.min((ts - start) / duration, 1);
        const ease = 1 - Math.pow(1 - prog, 4);
        const val  = target < 10 ? (ease * target).toFixed(1) : Math.round(ease * target);
        el.textContent = val + suffix;
        if (prog < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      countUpObs.unobserve(el);
    });
  }, { threshold: 0.6 });

  document.querySelectorAll('.stat-num').forEach(el => {
    // Extract suffix from existing markup (e.g. <span>+</span>)
    const spans = el.querySelectorAll('span');
    let suffix = '';
    spans.forEach(s => { suffix += s.textContent; s.remove(); });
    const plainNum = el.textContent.trim();
    el.dataset.target = plainNum + suffix;
    countUpObs.observe(el);
  });

  /* ─── ORB PARALLAX (subtle) ─── */
  const orbs = document.querySelectorAll('.orb');
  window.addEventListener('scroll', () => {
    const sy = window.scrollY;
    orbs.forEach((orb, i) => {
      const speed = (i + 1) * 0.08;
      orb.style.transform = `translateY(${sy * speed}px)`;
    });
  }, { passive: true });

  /* ─── SMOOTH REVEAL: typed eyebrow text ─── */
  // Optional: activates if .hero-eyebrow has data-type="true"
  const eyebrow = document.querySelector('.hero-eyebrow[data-typed]');
  if (eyebrow) {
    const text = eyebrow.dataset.typed;
    eyebrow.textContent = '';
    let i = 0;
    const type = () => {
      if (i < text.length) {
        eyebrow.textContent += text[i++];
        setTimeout(type, 40 + Math.random() * 20);
      }
    };
    setTimeout(type, 600);
  }

})();
