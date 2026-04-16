/* ========================================
   LUXARC – LIGHT ARCHITECTURE
   Main JavaScript
   ======================================== */

'use strict';

// ─── PAGE LOADER ───
window.addEventListener('load', () => {
  const loader = document.getElementById('pageLoader');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('hidden');
      setTimeout(() => loader.remove(), 500);
    }, 1600);
  }
});

// ─── CUSTOM CURSOR ───
const cursor = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');
if (cursor && cursorRing) {
  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX; mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  document.querySelectorAll('a, button, .cat-card, .product-card, .service-card, .gallery-item').forEach(el => {
    el.addEventListener('mouseenter', () => { cursor.classList.add('hover'); cursorRing.classList.add('hover'); });
    el.addEventListener('mouseleave', () => { cursor.classList.remove('hover'); cursorRing.classList.remove('hover'); });
  });
}

// ─── NAVBAR ───
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (navbar) {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }
});

// ─── HAMBURGER MENU ───
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileNav.classList.toggle('active');
    document.body.classList.toggle('menu-open', mobileNav.classList.contains('active'));
  });
  document.querySelectorAll('.mobile-nav a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileNav.classList.remove('active');
      document.body.classList.remove('menu-open');
    });
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      hamburger.classList.remove('active');
      mobileNav.classList.remove('active');
      document.body.classList.remove('menu-open');
    }
  });
}

// ─── SCROLL REVEAL (Intersection Observer) ───
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

// ─── ANIMATED COUNTERS ───
function animateCounter(el, target, duration = 1800) {
  let start = 0;
  const step = target / (duration / 16);
  const isDecimal = target % 1 !== 0;
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      start = target;
      clearInterval(timer);
    }
    el.textContent = isDecimal ? start.toFixed(1) : Math.floor(start);
  }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseFloat(el.dataset.target || el.textContent);
      animateCounter(el, target);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-num[data-target]').forEach(el => {
  counterObserver.observe(el);
});

// ─── PRODUCT DATA ───
const products = [
  {
    id: 1, name: 'Aura Pendant', category: 'pendant',
    price: 12500, oldPrice: 15000,
    desc: 'Cascading crystal arms with warm-toned LED glow. Perfect for dining spaces.',
    emoji: '🔆', badge: 'bestseller', isNew: false
  },
  {
    id: 2, name: 'Arc Floor Lamp', category: 'floor',
    price: 8900, oldPrice: null,
    desc: 'Minimalist brushed-gold arc lamp with adjustable dimmer and touch control.',
    emoji: '🕯️', badge: 'new', isNew: true
  },
  {
    id: 3, name: 'Luxe Chandelier', category: 'decorative',
    price: 28000, oldPrice: 32000,
    desc: 'Statement piece with 42 hand-blown glass globes. Bespoke installation included.',
    emoji: '✨', badge: 'sale', isNew: false
  },
  {
    id: 4, name: 'Linear Track', category: 'architectural',
    price: 5500, oldPrice: null,
    desc: 'Recessed modular track lighting system for commercial and residential ceilings.',
    emoji: '💡', badge: 'new', isNew: true
  },
  {
    id: 5, name: 'Smart Globe', category: 'smart',
    price: 3200, oldPrice: null,
    desc: 'App-controlled color-temp bulb with circadian rhythm scheduling.',
    emoji: '🌐', badge: null, isNew: false
  },
  {
    id: 6, name: 'Ember Pendant', category: 'pendant',
    price: 9800, oldPrice: 11500,
    desc: 'Hand-blown amber glass pendant with Edison filament. Warm 2200K glow.',
    emoji: '🔸', badge: 'sale', isNew: false
  },
  {
    id: 7, name: 'Studio Desk Light', category: 'floor',
    price: 4200, oldPrice: null,
    desc: 'Architect-style pivoting arm lamp. CRI 95+ for true color rendering.',
    emoji: '📐', badge: null, isNew: false
  },
  {
    id: 8, name: 'Halo Wall Sconce', category: 'architectural',
    price: 6700, oldPrice: null,
    desc: 'Circular backlit wall fixture creating a soft halation effect. IP44 rated.',
    emoji: '⭕', badge: 'new', isNew: true
  }
];

// ─── RENDER FEATURED PRODUCTS ───
function renderFeaturedProducts() {
  const grid = document.getElementById('featuredGrid');
  if (!grid) return;

  const featured = products.slice(0, 4);
  grid.innerHTML = featured.map(p => `
    <div class="product-card reveal delay-${featured.indexOf(p) % 4 + 1}" onclick="openModal(${p.id})">
      <div class="product-img-wrap">
        <img class="product-img" src="abt.jpeg" alt="${p.name}">
        <div class="product-img-label">Replace with your product image</div>
        ${p.badge ? `<span class="product-badge ${p.badge === 'new' ? 'new' : p.badge === 'sale' ? 'sale' : ''}">${p.badge === 'bestseller' ? '★ Best Seller' : p.badge === 'new' ? 'New Arrival' : 'Sale'}</span>` : ''}
        <button class="product-wishlist" onclick="event.stopPropagation(); this.textContent = this.textContent === '🤍' ? '❤️' : '🤍'">🤍</button>
      </div>
      <div class="product-info">
        <p class="product-cat">${categoryLabel(p.category)}</p>
        <h3 class="product-name">${p.name}</h3>
        <p class="product-desc">${p.desc}</p>
        <div class="product-footer">
          <div>
            ${p.oldPrice ? `<span class="product-price-old">₹${p.oldPrice.toLocaleString()}</span>` : ''}
            <span class="product-price">₹${p.price.toLocaleString()}</span>
          </div>
          <button class="btn-view" onclick="event.stopPropagation(); openModal(${p.id})">View Details</button>
        </div>
      </div>
    </div>
  `).join('');
  // Re-observe new elements
  grid.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
}

function categoryLabel(cat) {
  const map = { pendant: 'Pendant Lights', floor: 'Floor Lamps', decorative: 'Decorative', architectural: 'Architectural', smart: 'Smart Lighting' };
  return map[cat] || cat;
}

// ─── PRODUCT MODAL ───
function openModal(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;

  const modal = document.getElementById('productModal');
  if (!modal) return;

  modal.querySelector('.modal-img-side').innerHTML = `<span style="font-size:5rem">${product.emoji}</span>`;
  modal.querySelector('.modal-product-name').textContent = product.name;
  modal.querySelector('.modal-product-cat').textContent = categoryLabel(product.category);
  modal.querySelector('.modal-product-price').textContent = `₹${product.price.toLocaleString()}`;
  modal.querySelector('.modal-product-desc').textContent = product.desc;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = document.getElementById('productModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Close modal on overlay click
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('productModal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  renderFeaturedProducts();
  renderAllProducts();
});

// ─── PRODUCTS PAGE: RENDER ALL ───
function renderAllProducts() {
  const grid = document.getElementById('allProductsGrid');
  if (!grid) return;

  grid.innerHTML = products.map(p => `
    <div class="product-card" data-category="${p.category}" data-price="${p.price}" onclick="openModal(${p.id})">
      <div class="product-img-wrap">
        <img class="product-img" src="abt.jpeg" alt="${p.name}">
        <div class="product-img-label">Replace with your product image</div>
        ${p.badge ? `<span class="product-badge ${p.badge === 'new' ? 'new' : p.badge === 'sale' ? 'sale' : ''}">${p.badge === 'bestseller' ? '★ Best Seller' : p.badge === 'new' ? 'New Arrival' : 'Sale'}</span>` : ''}
        <button class="product-wishlist" onclick="event.stopPropagation(); this.textContent = this.textContent === '🤍' ? '❤️' : '🤍'">🤍</button>
      </div>
      <div class="product-info">
        <p class="product-cat">${categoryLabel(p.category)}</p>
        <h3 class="product-name">${p.name}</h3>
        <p class="product-desc">${p.desc}</p>
        <div class="product-footer">
          <div>
            ${p.oldPrice ? `<span class="product-price-old">₹${p.oldPrice.toLocaleString()}</span>` : ''}
            <span class="product-price">₹${p.price.toLocaleString()}</span>
          </div>
          <button class="btn-view" onclick="event.stopPropagation(); openModal(${p.id})">View Details</button>
        </div>
      </div>
    </div>
  `).join('');

  updateCount();
}

// ─── FILTER & SEARCH (Products Page) ───
function filterProducts() {
  const searchVal = (document.getElementById('searchInput')?.value || '').toLowerCase();
  const catVal = document.getElementById('catFilter')?.value || 'all';
  const priceVal = document.getElementById('priceFilter')?.value || 'all';

  const cards = document.querySelectorAll('#allProductsGrid .product-card');
  let visible = 0;

  cards.forEach(card => {
    const name = card.querySelector('.product-name')?.textContent.toLowerCase() || '';
    const desc = card.querySelector('.product-desc')?.textContent.toLowerCase() || '';
    const cat = card.dataset.category;
    const price = parseInt(card.dataset.price || 0);

    const matchSearch = name.includes(searchVal) || desc.includes(searchVal);
    const matchCat = catVal === 'all' || cat === catVal;
    let matchPrice = true;
    if (priceVal === 'under5') matchPrice = price < 5000;
    else if (priceVal === '5to15') matchPrice = price >= 5000 && price <= 15000;
    else if (priceVal === 'above15') matchPrice = price > 15000;

    const show = matchSearch && matchCat && matchPrice;
    card.style.display = show ? '' : 'none';
    if (show) visible++;
  });

  updateCount(visible);
}

function updateCount(count) {
  const el = document.getElementById('productCount');
  if (el) {
    const total = count !== undefined ? count : products.length;
    el.textContent = `${total} product${total !== 1 ? 's' : ''} found`;
  }
}

// Attach filter events
document.addEventListener('DOMContentLoaded', () => {
  const search = document.getElementById('searchInput');
  const catFilter = document.getElementById('catFilter');
  const priceFilter = document.getElementById('priceFilter');
  if (search) search.addEventListener('input', filterProducts);
  if (catFilter) catFilter.addEventListener('change', filterProducts);
  if (priceFilter) priceFilter.addEventListener('change', filterProducts);
});

// ─── SMOOTH ACTIVE NAV HIGHLIGHT ───
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

const activeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === '#' + entry.target.id
          ? 'var(--gold)' : '';
      });
    }
  });
}, { threshold: 0.3 });

sections.forEach(s => activeObserver.observe(s));

// ─── PARALLAX HERO ───
window.addEventListener('scroll', () => {
  const heroContent = document.querySelector('.hero-content');
  if (heroContent && window.scrollY < window.innerHeight) {
    heroContent.style.transform = `translateY(${window.scrollY * 0.3}px)`;
    heroContent.style.opacity = 1 - (window.scrollY / window.innerHeight) * 1.5;
  }
});

// ─── LIGHT BEAM MOUSE FOLLOW ───
document.addEventListener('mousemove', (e) => {
  const beams = document.querySelectorAll('.light-beam');
  const px = (e.clientX / window.innerWidth - 0.5) * 6;
  beams.forEach((beam, i) => {
    const offset = (i % 2 === 0 ? 1 : -1) * px * (i * 0.4 + 0.5);
    beam.style.marginLeft = offset + 'px';
  });
});
