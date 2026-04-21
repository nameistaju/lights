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
  // PENDANT LIGHTS
  { id: 1, name: 'Aura Crystal Pendant', category: 'pendant', price: 12500, oldPrice: 15000, desc: 'Cascading crystal arms with warm-toned LED glow.', image: 'Pendant Lights1.jpeg', badge: 'bestseller' },
  { id: 2, name: 'Ember Glass Drop', category: 'pendant', price: 9800, oldPrice: 11500, desc: 'Hand-blown amber glass pendant with Edison filament.', image: 'Pendant Lights2.jpeg', badge: 'sale' },
  { id: 3, name: 'Modern Drop', category: 'pendant', price: 7500, oldPrice: null, desc: 'Elegant vertical drop pendant for modern hallways.', image: 'Pendant Lights3.jpeg', badge: null },
  { id: 4, name: 'Crystal Sphere', category: 'pendant', price: 13500, oldPrice: null, desc: 'Sophisticated crystal sphere for luxury interiors.', image: 'Pendant Lights4.jpeg', badge: 'new' },
  { id: 5, name: 'Industrial Loft', category: 'pendant', price: 8200, oldPrice: 9500, desc: 'Classic industrial style with a modern twist.', image: 'Pendant Lights5.jpeg', badge: 'sale' },
  { id: 6, name: 'Nordic Minimalist', category: 'pendant', price: 6900, oldPrice: null, desc: 'Scandinavian inspired clean lines and warm light.', image: 'Pendant Lights6.jpeg', badge: null },
  { id: 7, name: 'Gilded Cage', category: 'pendant', price: 11000, oldPrice: 13000, desc: 'Intricate metal mesh cage with gold leaf finish.', image: 'Pendant Lights7.jpeg', badge: 'sale' },
  { id: 8, name: 'Vintage Lantern', category: 'pendant', price: 8900, oldPrice: null, desc: 'Antique-style lantern with modern LED efficiency.', image: 'Pendant Lights9.jpeg', badge: null },
  { id: 9, name: 'Chrome Orbit', category: 'pendant', price: 14500, oldPrice: null, desc: 'Futuristic concentric rings in polished chrome.', image: 'Pendant Lights10.jpeg', badge: 'new' },
  { id: 10, name: 'Opal Globe', category: 'pendant', price: 5500, oldPrice: 6500, desc: 'Soft diffused opal glass for a calming atmosphere.', image: 'Pendant Lights11.jpeg', badge: null },
  { id: 11, name: 'Black Diamond', category: 'pendant', price: 10200, oldPrice: null, desc: 'Geometric diamond-cut frame in matte black.', image: 'Pendant Lights12.jpeg', badge: null },
  { id: 12, name: 'Copper Bell', category: 'pendant', price: 7800, oldPrice: 8500, desc: 'Hammered copper finish with a warm internal glow.', image: 'Pendant Lights13.jpeg', badge: 'sale' },

  // FLOOR LAMPS
  { id: 13, name: 'Arc Floor Lamp', category: 'floor', price: 8900, oldPrice: null, desc: 'Minimalist brushed-gold arc lamp with touch control.', image: 'floorLamp1.jpg', badge: 'new' },
  { id: 14, name: 'Studio Desk Light', category: 'floor', price: 4200, oldPrice: null, desc: 'Architect-style pivoting arm lamp with high CRI.', image: 'floorlamp2.jpeg', badge: null },
  { id: 15, name: 'Industrial Tripod', category: 'floor', price: 11200, oldPrice: null, desc: 'Rugged tripod stand with adjustable searchlight head.', image: 'floorlamp3.jpeg', badge: null },

  // DECORATIVE
  { id: 16, name: 'Luxe Chandelier', category: 'decorative', price: 28000, oldPrice: 32000, desc: 'Statement piece with 42 hand-blown glass globes.', image: 'Decorative1.jpg', badge: 'bestseller' },
  { id: 17, name: 'Golden Branch', category: 'decorative', price: 35000, oldPrice: 40000, desc: 'Artistic branch-like structure with LED "buds".', image: 'Decorative2.jpeg', badge: 'new' },
  { id: 18, name: 'Ornate Sconce', category: 'decorative', price: 6700, oldPrice: null, desc: 'Traditional ornate wall sconce for classic halls.', image: 'Decorative3.jpeg', badge: null },

  // ARCHITECTURAL
  { id: 19, name: 'Linear Track Zoom', category: 'architectural', price: 5500, oldPrice: null, desc: 'Recessed modular track lighting with zoom focus.', image: 'Architectural.png', badge: 'new' },
  { id: 20, name: 'Halo Wall Sconce', category: 'architectural', price: 6700, oldPrice: null, desc: 'Backlit wall fixture creating soft halation.', image: 'Architectural2.png', badge: 'new' },

  // SMART LIGHTING
  { id: 21, name: 'Smart Nexus Globe', category: 'smart', price: 3200, oldPrice: null, desc: 'App-controlled color-temp bulb with scheduling.', image: 'smart2.png', badge: 'bestseller' },

  // FALL CEILING LIGHTS
  { id: 22, name: 'Recessed Pro', category: 'fall-ceiling', price: 1800, oldPrice: 2200, desc: 'Anti-glare recessed light for residential use.', image: 'fall ceiling lights.jpeg', badge: 'bestseller' },
  { id: 23, name: 'Cove Accent', category: 'fall-ceiling', price: 2400, oldPrice: null, desc: 'Uniform cove lighting for ceiling borders.', image: 'fall ceiling lights1.jpeg', badge: 'new' },
  { id: 24, name: 'Panel Slim', category: 'fall-ceiling', price: 3500, oldPrice: null, desc: 'Ultra-slim LED panel for clean aesthetics.', image: 'fall ceiling lights2.jpeg', badge: null },
  { id: 25, name: 'Starry Ceiling', category: 'fall-ceiling', price: 5800, oldPrice: 6500, desc: 'Fiber-optic starry effect for premium rooms.', image: 'fall ceiling lights3.jpeg', badge: 'sale' },
  { id: 26, name: 'Recessed Zoom', category: 'fall-ceiling', price: 2100, oldPrice: null, desc: 'Adjustable beam angle recessed fixture.', image: 'fall ceiling lights4.jpeg', badge: null },
  { id: 27, name: 'Square Downlight', category: 'fall-ceiling', price: 1950, oldPrice: 2400, desc: 'Modern square-framed recessed downlight.', image: 'fall ceiling lights6.jpeg', badge: 'sale' },
  { id: 28, name: 'Linear Slot', category: 'fall-ceiling', price: 4200, oldPrice: null, desc: 'Minimalist linear slot light for seamless lines.', image: 'fall ceiling lights7.jpeg', badge: 'new' },
  { id: 29, name: 'Directional Spot', category: 'fall-ceiling', price: 2800, oldPrice: null, desc: 'Focus light for artwork or specific zones.', image: 'fall ceiling lights8.jpeg', badge: null },
  { id: 30, name: 'Deep Recessed', category: 'fall-ceiling', price: 2300, oldPrice: 2900, desc: 'Deep-set LED for ultra-low glare experience.', image: 'fall ceiling lights9.jpeg', badge: 'sale' },
  { id: 31, name: 'Trimless Edge', category: 'fall-ceiling', price: 3100, oldPrice: null, desc: 'Trimless design for a perfectly flush finish.', image: 'fall ceiling lights10.jpeg', badge: 'new' }
];

// ─── RENDER FEATURED PRODUCTS ───
function renderFeaturedProducts() {
  const grid = document.getElementById('featuredGrid');
  if (!grid) return;

  const featured = products.filter(p => p.badge === 'bestseller' || p.badge === 'new').slice(0, 4);
  grid.innerHTML = featured.map(p => `
    <div class="product-card reveal delay-${featured.indexOf(p) % 4 + 1}" onclick="openModal(${p.id})">
      <div class="product-img-wrap">
        <img class="product-img" src="${p.image}" alt="${p.name}">
        ${p.badge ? `<span class="product-badge ${p.badge === 'new' ? 'new' : ''}">${p.badge === 'bestseller' ? '★ Best Seller' : p.badge === 'new' ? 'New Arrival' : ''}</span>` : ''}
        <button class="product-wishlist" onclick="event.stopPropagation(); this.textContent = this.textContent === '🤍' ? '❤️' : '🤍'">🤍</button>
      </div>
      <div class="product-info">
        <p class="product-cat">${categoryLabel(p.category)}</p>
        <h3 class="product-name">${p.name}</h3>
        <p class="product-desc">${p.desc}</p>
        <div class="product-footer">
          <button class="btn-view" onclick="event.stopPropagation(); openModal(${p.id})" style="width: 100%;">View Details</button>
        </div>
      </div>
    </div>
  `).join('');
  // Re-observe new elements
  grid.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
}

function categoryLabel(cat) {
  const map = { 
    pendant: 'Pendant Lights', 
    floor: 'Floor Lamps', 
    decorative: 'Decorative', 
    architectural: 'Architectural', 
    smart: 'Smart Lighting',
    'fall-ceiling': 'Fall Ceiling Lights'
  };
  return map[cat] || cat;
}

// ─── PRODUCT MODAL ───
function openModal(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;

  const modal = document.getElementById('productModal');
  if (!modal) return;

  modal.querySelector('.modal-img-side').innerHTML = `<img src="${product.image}" alt="${product.name}" style="width:100%; height:100%; object-fit:cover;">`;
  modal.querySelector('.modal-product-name').textContent = product.name;
  modal.querySelector('.modal-product-cat').textContent = categoryLabel(product.category);

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
        <img class="product-img" src="${p.image}" alt="${p.name}">
        ${p.badge ? `<span class="product-badge ${p.badge === 'new' ? 'new' : ''}">${p.badge === 'bestseller' ? '★ Best Seller' : p.badge === 'new' ? 'New Arrival' : ''}</span>` : ''}
        <button class="product-wishlist" onclick="event.stopPropagation(); this.textContent = this.textContent === '🤍' ? '❤️' : '🤍'">🤍</button>
      </div>
      <div class="product-info">
        <p class="product-cat">${categoryLabel(p.category)}</p>
        <h3 class="product-name">${p.name}</h3>
        <p class="product-desc">${p.desc}</p>
        <div class="product-footer">
          <button class="btn-view" onclick="event.stopPropagation(); openModal(${p.id})" style="width: 100%;">View Details</button>
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
  const cards = document.querySelectorAll('#allProductsGrid .product-card');
  let visible = 0;

  cards.forEach(card => {
    const name = card.querySelector('.product-name')?.textContent.toLowerCase() || '';
    const desc = card.querySelector('.product-desc')?.textContent.toLowerCase() || '';
    const cat = card.dataset.category;

    const matchSearch = name.includes(searchVal) || desc.includes(searchVal);
    const matchCat = catVal === 'all' || cat === catVal;

    const show = matchSearch && matchCat;
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
  if (search) search.addEventListener('input', filterProducts);
  if (catFilter) catFilter.addEventListener('change', filterProducts);
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
