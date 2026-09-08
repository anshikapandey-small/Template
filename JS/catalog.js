/* ---------- handle arriving via a #hash link (e.g. "catalog.html#figurines") ---------- */
const initialHash = window.location.hash ? window.location.hash.substring(1) : null;

if (initialHash) {
  window.scrollTo(0, 0); // cancel the browser's own instant jump so nothing auto-opens prematurely
}

/* ---------- hero slideshow: crossfades between images every 3s ---------- */
const heroSlides = document.querySelectorAll('.hero-slide');
if (heroSlides.length) {
  let currentSlide = 0;
  setInterval(() => {
    heroSlides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % heroSlides.length;
    heroSlides[currentSlide].classList.add('active');
  }, 3000);
}

/* ---------- mobile nav toggle ---------- */
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if (navToggle) {
  navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
}

/* ---------- explore button -> smooth scroll to catalog ---------- */
const exploreBtn = document.getElementById('exploreBtn');
if (exploreBtn) {
  exploreBtn.addEventListener('click', () => {
    document.getElementById('catalog').scrollIntoView({ behavior: 'smooth' });
  });
}

/* ---------- FLIP helper: animates cards sliding into their new slot ---------- */
function flip(grid, mutate) {
  const before = new Map();
  grid.querySelectorAll('.card:not(.hide)').forEach(c => before.set(c, c.getBoundingClientRect()));

  mutate();

  requestAnimationFrame(() => {
    grid.querySelectorAll('.card:not(.hide)').forEach(c => {
      const prev = before.get(c);
      if (!prev) return; // newly revealed card - CSS fade-in handles it
      const now = c.getBoundingClientRect();
      const dx = prev.left - now.left;
      const dy = prev.top - now.top;
      if (dx || dy) {
        c.style.transition = 'none';
        c.style.transform = `translate(${dx}px, ${dy}px)`;
        requestAnimationFrame(() => {
          c.style.transition = 'transform .5s cubic-bezier(.65,0,.35,1)';
          c.style.transform = '';
        });
      }
    });
  });
}

/* ---------- each section: header toggle (open/close) + show-more (reveal all) ---------- */
document.querySelectorAll('[data-section]').forEach(section => {
  const header = section.querySelector('.cat-header');
  const panel = section.querySelector('.cat-panel');
  const grid = section.querySelector('[data-grid]');
  const showMoreCard = section.querySelector('[data-showmore]');
  const showMoreBtn = showMoreCard ? showMoreCard.querySelector('.show-more-btn') : null;

  function resyncPanel() {
    if (header.getAttribute('aria-expanded') === 'true') {
      setTimeout(() => { panel.style.maxHeight = panel.scrollHeight + 'px'; }, 320);
    }
  }

  /* header round-arrow button: opens/closes the whole section.
     Closing it also resets the "show more" state back to default,
     so next time it's opened it starts fresh at 3 cards again. */

  function openSection() {
    header.setAttribute('aria-expanded', 'true');
    panel.style.maxHeight = panel.scrollHeight + 'px';
  }

  function closeSection() {
    panel.style.maxHeight = panel.scrollHeight + 'px';
    requestAnimationFrame(() => { panel.style.maxHeight = '0px'; });
    header.setAttribute('aria-expanded', 'false');

    setTimeout(() => {
      if (grid) grid.classList.remove('expanded');
      if (showMoreCard) showMoreCard.classList.remove('hide', 'hide-out');
    }, 560);
  }

  // auto-open when the section scrolls into view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && header.getAttribute('aria-expanded') !== 'true') {
        openSection();
      }
    });
  }, { threshold: 0.25 }); // opens once 25% of the section is visible

  // if we're navigating in via a #hash, delay every section's observer so nothing
  // above the target can auto-open and shift the page while we're still scrolling
  // toward it. Once that settles, normal scroll-triggered opening resumes as usual.
  const observeDelay = initialHash ? 900 : 0;
  setTimeout(() => observer.observe(section), observeDelay);

  // clicking the round arrow still lets the user manually close/reopen it
  header.addEventListener('click', () => {
    const isOpen = header.getAttribute('aria-expanded') === 'true';
    isOpen ? closeSection() : openSection();
  });

  window.addEventListener('resize', () => {
    if (header.getAttribute('aria-expanded') === 'true') {
      panel.style.maxHeight = panel.scrollHeight + 'px';
    }
  });

  /* show more button inside the grid: reveals the rest of the products
     in place, with cards sliding smoothly into their new positions */
  if (showMoreBtn) {
    showMoreBtn.addEventListener('click', () => {
      flip(grid, () => {
        showMoreCard.classList.add('hide-out');
        setTimeout(() => showMoreCard.classList.add('hide'), 260);
        grid.classList.add('expanded');
      });
      resyncPanel();
    });
  }
});

/* ---------- directly open + scroll to the target section, independent of the observer above ---------- */
if (initialHash) {
  const target = document.getElementById(initialHash);
  if (target) {
    const targetHeader = target.querySelector('.cat-header');
    const targetPanel = target.querySelector('.cat-panel');
    targetHeader.setAttribute('aria-expanded', 'true');
    targetPanel.style.maxHeight = targetPanel.scrollHeight + 'px';

    setTimeout(() => {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 60);
  }
}

/* ---------- subcategory filters (Figurines / DWE) ---------- */
document.querySelectorAll('[data-subcats]').forEach(group => {
  const pills = group.querySelectorAll('.subcat-pill');
  const section = group.closest('[data-section]');
  const panel = section.querySelector('.cat-panel');
  const header = section.querySelector('.cat-header');
  const grid = section.querySelector('[data-grid]');
  const allCards = section.querySelectorAll('.card[data-sub]');
  const showMoreCard = section.querySelector('[data-showmore]');

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const filterValue = pill.getAttribute('data-filter');

      flip(grid, () => {
        allCards.forEach(card => {
          const match = filterValue === 'all' || card.getAttribute('data-sub') === filterValue;
          card.classList.toggle('hide', !match);
        });

        if (filterValue === 'all') {
          // back to default: 3 cards + show more button
          grid.classList.remove('expanded');
          showMoreCard.classList.remove('hide', 'hide-out');
        } else {
          // a specific category: that category likely has only a few items,
          // so just reveal everything that matches and hide the show-more button
          grid.classList.add('expanded');
          showMoreCard.classList.add('hide');
        }
      });

      if (header.getAttribute('aria-expanded') === 'true') {
        setTimeout(() => { panel.style.maxHeight = panel.scrollHeight + 'px'; }, 260);
      }
    });
  });
});

/* ---------- FAQ accordion ---------- */
document.querySelectorAll('.faq-item').forEach(item => {
  const question = item.querySelector('.faq-question');
  const answer = item.querySelector('.faq-answer');

  question.addEventListener('click', () => {
    const isOpen = question.getAttribute('aria-expanded') === 'true';

    if (isOpen) {
      answer.style.maxHeight = answer.scrollHeight + 'px';
      requestAnimationFrame(() => { answer.style.maxHeight = '0px'; });
      question.setAttribute('aria-expanded', 'false');
    } else {
      question.setAttribute('aria-expanded', 'true');
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  });
});