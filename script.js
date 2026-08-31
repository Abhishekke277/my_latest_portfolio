(() => {
  "use strict";

  /* ============================================================
     Footer year
     ============================================================ */
  const yearEl = document.getElementById('footerYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ============================================================
     Mobile sidebar menu
     ============================================================ */
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');
  const menuToggle = document.getElementById('menuToggle');
  const menuClose = document.getElementById('menuClose');

  const openMenu = () => { sidebar.classList.add('open'); overlay.classList.add('show'); };
  const closeMenu = () => { sidebar.classList.remove('open'); overlay.classList.remove('show'); };

  menuToggle && menuToggle.addEventListener('click', openMenu);
  menuClose && menuClose.addEventListener('click', closeMenu);
  overlay && overlay.addEventListener('click', closeMenu);
  document.querySelectorAll('.nav-item').forEach(a => a.addEventListener('click', closeMenu));

  /* ============================================================
     Theme toggle
     ============================================================ */
  const themeToggle = document.getElementById('themeToggle');
  const root = document.documentElement;

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    try { localStorage.setItem('ak-theme', theme); } catch (e) {}
  }

  let savedTheme = 'dark';
  try { savedTheme = localStorage.getItem('ak-theme') || 'dark'; } catch (e) {}
  applyTheme(savedTheme);

  themeToggle && themeToggle.addEventListener('click', () => {
    const current = root.getAttribute('data-theme');
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });

  /* ============================================================
     Typing animation in hero
     ============================================================ */
  const roles = [
    "Full Stack Developer",
    "Problem Solver",
    "Python / AI Enthusiast",
    "Backend Developer"
  ];
  const typingEl = document.getElementById('typingRole');
  if (typingEl) {
    let roleIdx = 0, charIdx = 0, deleting = false;

    function tick() {
      const full = roles[roleIdx];
      if (!deleting) {
        charIdx++;
        typingEl.textContent = full.slice(0, charIdx);
        if (charIdx === full.length) { deleting = true; setTimeout(tick, 1400); return; }
      } else {
        charIdx--;
        typingEl.textContent = full.slice(0, charIdx);
        if (charIdx === 0) { deleting = false; roleIdx = (roleIdx + 1) % roles.length; }
      }
      setTimeout(tick, deleting ? 35 : 65);
    }
    tick();
  }

  /* ============================================================
     Active section highlight (sidebar nav)
     ============================================================ */
  const sections = document.querySelectorAll('.section[id]');
  const navItems = document.querySelectorAll('.nav-item');

  function setActive(id) {
    navItems.forEach(el => el.classList.toggle('active', el.dataset.section === id));
  }

  if ('IntersectionObserver' in window && sections.length) {
    const navIO = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });
    sections.forEach(sec => navIO.observe(sec));
  }

  /* ============================================================
     Subtle tilt on project cards only
     ============================================================ */
  const tiltEls = document.querySelectorAll('.tilt');
  if (matchMedia('(hover:hover)').matches) {
    tiltEls.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(700px) rotateX(${(-y * 3.5).toFixed(2)}deg) rotateY(${(x * 3.5).toFixed(2)}deg) translateY(-4px)`;
      });
      card.addEventListener('mouseleave', () => { card.style.transform = ''; });
    });
  }

  /* ============================================================
     Project filtering
     ============================================================ */
  const filterChips = document.querySelectorAll('.filter-chip');
  const repoCards = document.querySelectorAll('.repo-card');

  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const filter = chip.dataset.filter.toLowerCase();

      repoCards.forEach(card => {
        const tags = (card.dataset.tags || '').toLowerCase();
        const show = filter === 'all' || tags.includes(filter);
        card.classList.toggle('filtered-out', !show);
      });
    });
  });

  /* ============================================================
     Contact form — validation + EmailJS
     ============================================================ */
  const EMAILJS_SERVICE_ID = 'service_8ql6ggw';
  const EMAILJS_TEMPLATE_ID = 'template_kn3zhdh';
  const EMAILJS_PUBLIC_KEY = 'pHxbz2fcm2Mxtckzo';
  const DESTINATION_EMAIL = 'abhishekkewat7566@gmail.com';

  const form = document.getElementById('contactForm');
  const statusEl = document.getElementById('formStatus');

  function setError(fieldId, msg) {
    const errEl = document.querySelector(`.field-error[data-for="${fieldId}"]`);
    const inputEl = document.getElementById(fieldId);
    if (errEl) errEl.textContent = msg || '';
    if (inputEl) inputEl.classList.toggle('invalid', !!msg);
  }

  function validate(data) {
    let ok = true;
    if (!data.name.trim()) { setError('name1', 'Please enter your name'); ok = false; } else setError('name1', '');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) { setError('email1', 'Please enter a valid email'); ok = false; } else setError('email1', '');
    if (data.message.trim().length < 10) { setError('message1', 'Message should be at least 10 characters'); ok = false; } else setError('message1', '');
    return ok;
  }

  form && form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
      name: document.getElementById('name1').value,
      email: document.getElementById('email1').value,
      message: document.getElementById('message1').value
    };

    if (!validate(data)) {
      statusEl.textContent = 'Please fix the highlighted fields.';
      statusEl.className = 'form-status error';
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    statusEl.className = 'form-status';
    statusEl.textContent = 'Sending...';

    const emailjsReady = window.emailjs && EMAILJS_SERVICE_ID !== 'YOUR_SERVICE_ID';

    if (emailjsReady) {
      try {
        window.emailjs.init(EMAILJS_PUBLIC_KEY);
        await window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
          from_name: data.name,
          from_email: data.email,
          message: data.message,
          to_email: DESTINATION_EMAIL
        });
        statusEl.textContent = 'Message sent — thanks! I\'ll get back to you soon.';
        statusEl.className = 'form-status success';
        form.reset();
      } catch (err) {
        statusEl.textContent = 'Something went wrong. Please try again or email me directly.';
        statusEl.className = 'form-status error';
      } finally {
        submitBtn.disabled = false;
      }
    } else {
      const subject = encodeURIComponent(`Portfolio message from ${data.name}`);
      const body = encodeURIComponent(`${data.message}\n\n— ${data.name} (${data.email})`);
      window.location.href = `mailto:${DESTINATION_EMAIL}?subject=${subject}&body=${body}`;
      statusEl.textContent = 'Opening your email app to send this message...';
      statusEl.className = 'form-status success';
      submitBtn.disabled = false;
    }
  });

  ['name1', 'email1', 'message1'].forEach(id => {
    const el = document.getElementById(id);
    el && el.addEventListener('input', () => setError(id, ''));
  });

})();