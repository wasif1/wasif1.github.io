/* CodeFoundri — Main JS */

function openCalendly(e) {
  if (e) e.preventDefault();
  if (typeof Calendly !== 'undefined' && Calendly.showPopupWidget) {
    Calendly.showPopupWidget('https://calendly.com/codefoundri/30min');
  } else {
    window.open('https://calendly.com/codefoundri/30min', '_blank');
  }
  return false;
}

document.addEventListener('DOMContentLoaded', function () {

  // ── NAV SCROLL ──
  const nav = document.getElementById('nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  // ── MOBILE MENU ──
  const toggle = document.getElementById('nav-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  if (toggle && mobileMenu) {
    toggle.addEventListener('click', function () {
      mobileMenu.classList.toggle('open');
      const spans = toggle.querySelectorAll('span');
      if (mobileMenu.classList.contains('open')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      }
    });
    document.querySelectorAll('.mob-link').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.remove('open');
      });
    });
  }

  // ── SCROLL ANIMATIONS ──
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.anim').forEach(function (el) { observer.observe(el); });

  // ── COUNTER ANIMATION ──
  function animateCounter(el) {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 1800;
    const start = performance.now();
    (function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 4);
      el.textContent = Math.round(ease * target) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    })(start);
  }
  const counterObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-count]').forEach(function (el) { counterObs.observe(el); });

  // ── FAQ ACCORDION ──
  document.querySelectorAll('.faq-q').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const answer = this.nextElementSibling;
      const isOpen = this.classList.contains('open');
      document.querySelectorAll('.faq-q.open').forEach(function (ob) {
        ob.classList.remove('open');
        ob.nextElementSibling.classList.remove('open');
      });
      if (!isOpen) {
        this.classList.add('open');
        answer.classList.add('open');
      }
    });
  });

  // ── ACTIVE NAV LINK ──
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link, .mob-link').forEach(function (link) {
    const href = link.getAttribute('href');
    if (href && href.includes(path) && path !== '') {
      link.classList.add('active');
    }
  });

  // ── SMOOTH SCROLL for anchor links ──
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ── FORM SUBMIT (Web3Forms) ──
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      const btn = document.getElementById('submit-btn');
      const successBox = document.getElementById('form-success');
      const errorBox = document.getElementById('form-error');

      // Reset state
      successBox.style.display = 'none';
      errorBox.style.display = 'none';
      btn.disabled = true;
      btn.textContent = 'Sending…';

      const data = Object.fromEntries(new FormData(form));

      try {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(data)
        });
        const json = await res.json();
        console.log('[Web3Forms]', res.status, json);
        if (res.ok && json.success) {
          successBox.style.display = 'block';
          form.reset();
        } else {
          errorBox.querySelector('span.w3f-msg') && (errorBox.querySelector('span.w3f-msg').textContent = json.message || '');
          errorBox.style.display = 'block';
        }
      } catch (err) {
        console.error('[Web3Forms error]', err);
        errorBox.style.display = 'block';
      } finally {
        btn.disabled = false;
        btn.innerHTML = 'Send Message <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"/></svg>';
      }
    });
  }

  // ── PORTFOLIO FILTER ──
  var filterTabs = document.querySelectorAll('.filter-tab');
  var workCards = document.querySelectorAll('.work-card');
  if (filterTabs.length && workCards.length) {
    filterTabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        filterTabs.forEach(function (t) { t.classList.remove('active'); });
        this.classList.add('active');
        var filter = this.dataset.filter;
        workCards.forEach(function (card) {
          var cats = card.dataset.cat || '';
          card.style.display = (filter === 'all' || cats.split(' ').indexOf(filter) !== -1) ? '' : 'none';
        });
      });
    });
  }

  // ── PREFERS REDUCED MOTION ──
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.testi-track, .trust-track').forEach(function (el) {
      el.style.animationPlayState = 'paused';
    });
  }
});
