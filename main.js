//data
const listings = [
  { id:1, location:'Maldives, Indian Ocean', desc:'Overwater villa · 4 guests', price:32000, rating:'4.98', img:'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80', badge:'Guest favourite', cat:'beachfront', maxGuests:4 },
  { id:2, location:'Santorini, Greece',      desc:'Cave house · 2 guests',       price:18500, rating:'4.95', img:'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600&q=80', badge:null,            cat:'city',      maxGuests:2 },
  { id:3, location:'Bali, Indonesia',        desc:'Villa with pool · 6 guests',  price:12000, rating:'4.92', img:'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=600&q=80', badge:'Superhost',      cat:'pool',      maxGuests:6 },
  { id:4, location:'Coorg, Karnataka',       desc:'Coffee estate · 8 guests',    price:8500,  rating:'4.89', img:'https://images.unsplash.com/photo-1585543805890-6051f7829f98?w=600&q=80', badge:null,            cat:'cabin',     maxGuests:8 },
  { id:5, location:'Manali, Himachal',       desc:'Mountain cabin · 4 guests',   price:5200,  rating:'4.85', img:'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80', badge:null,            cat:'mountain',  maxGuests:4 },
  { id:6, location:'Goa, India',             desc:'Beach house · 5 guests',      price:9800,  rating:'4.91', img:'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&q=80', badge:'Guest favourite', cat:'beachfront', maxGuests:5 },
  { id:7, location:'Tokyo, Japan',           desc:'Studio flat · 2 guests',      price:14300, rating:'4.97', img:'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=80', badge:null,            cat:'city',      maxGuests:2 },
  { id:8, location:'Amalfi Coast, Italy',    desc:'Cliffside villa · 6 guests',  price:28000, rating:'4.96', img:'https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?w=600&q=80', badge:'Superhost',      cat:'beachfront', maxGuests:6 },
  { id:9, location:'Jaipur, Rajasthan',      desc:'Heritage haveli · 10 guests', price:15000, rating:'4.90', img:'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=600&q=80', badge:null,            cat:'castle',    maxGuests:10 },
  { id:10,location:'Swiss Alps, Switzerland',desc:'Snow chalet · 6 guests',      price:38000, rating:'4.99', img:'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=600&q=80', badge:'Guest favourite', cat:'mountain',  maxGuests:6 },
  { id:11,location:'Kerala Backwaters, India',desc:'Houseboat · 4 guests',       price:7500,  rating:'4.88', img:'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&q=80', badge:null,            cat:'tropical',  maxGuests:4 },
  { id:12,location:'Kyoto, Japan',           desc:'Traditional ryokan · 2 guests',price:22000,rating:'4.94', img:'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=600&q=80', badge:'Superhost',      cat:'tiny',      maxGuests:2 },
];

const experiences = [
  { type:'Online Experience', title:'Pasta Making in Rome',   price:'From ₹1,200/person', img:'https://images.unsplash.com/photo-1555126634-323283e090fa?w=400&q=80' },
  { type:'Experience',        title:'Sunrise Yoga in Bali',   price:'From ₹800/person',   img:'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&q=80' },
  { type:'Experience',        title:'Surfing Lessons in Goa', price:'From ₹1,500/person', img:'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=400&q=80' },
  { type:'Online Experience', title:'Flamenco Dance, Spain',  price:'From ₹950/person',   img:'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=400&q=80' },
];

const destinations = [
  { name:'Mumbai',      time:'Local stay',   img:'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=200&q=80' },
  { name:'Goa',         time:'1 hr away',    img:'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=200&q=80' },
  { name:'Manali',      time:'2 hrs away',   img:'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=200&q=80' },
  { name:'Jaipur',      time:'3 hrs away',   img:'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=200&q=80' },
  { name:'Coorg',       time:'4 hrs away',   img:'https://images.unsplash.com/photo-1600240644455-3edc55c375fe?w=200&q=80' },
  { name:'Pondicherry', time:'5 hrs away',   img:'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=200&q=80' },
  { name:'Shimla',      time:'3 hrs away',   img:'https://images.unsplash.com/photo-1562601579-599dec564e06?w=200&q=80' },
  { name:'Udaipur',     time:'4 hrs away',   img:'https://images.unsplash.com/photo-1477587458883-47145ed6979e?w=200&q=80' },
];

const wished       = new Set();           
let   activeCategory = 'all';            
let   searchFilters  = {};               
let   currentBooking = null;            
let   bGuests        = 2;               
let   sGuests        = 2;               


function fmt(n) {
  return '₹' + n.toLocaleString('en-IN');
}


function renderListings() {
  const grid = document.getElementById('listingsGrid');
  const none = document.getElementById('noResults');
  const rBar = document.getElementById('resultsBar');
  const rCnt = document.getElementById('resultsCount');

  // Apply all filters
  let results = listings.filter(function(l) {

    // Category filter
    if (activeCategory !== 'all' && l.cat !== activeCategory) return false;

    // Search: destination text
    if (searchFilters.where) {
      const w = searchFilters.where.toLowerCase();
      if (!l.location.toLowerCase().includes(w)) return false;
    }

    // Search: max price
    if (searchFilters.maxPrice && l.price > searchFilters.maxPrice) return false;

    // Search: guests
    if (searchFilters.guests && l.maxGuests < searchFilters.guests) return false;

    return true;
  });

 
  const isFiltered = searchFilters.where || searchFilters.maxPrice || activeCategory !== 'all';
  if (isFiltered) {
    rBar.style.display = 'flex';
    rCnt.textContent = results.length + ' stay' + (results.length !== 1 ? 's' : '') + ' found';
  } else {
    rBar.style.display = 'none';
  }

  if (results.length === 0) {
    grid.innerHTML = '';
    none.style.display = 'block';
  } else {
    none.style.display = 'none';
    grid.innerHTML = results.map(function(l, i) {
      return `
        <div class="listing-card" style="animation-delay:${i * 0.06}s">
          <div class="card-img">
            <img src="${l.img}" alt="${l.location}" loading="lazy"/>
            ${l.badge ? `<div class="badge">${l.badge}</div>` : ''}
            <button class="wish-btn ${wished.has(l.id) ? 'wished' : ''}"
                    title="${wished.has(l.id) ? 'Remove from saved' : 'Save'}"
                    onclick="toggleWish(event,${l.id})">
              <i class="${wished.has(l.id) ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
            </button>
          </div>
          <div class="card-info">
            <div class="card-row1">
              <div class="card-location">${l.location}</div>
              <div class="card-rating"><i class="fa fa-star"></i> ${l.rating}</div>
            </div>
            <div class="card-desc">${l.desc}</div>
            <div class="card-price"><strong>${fmt(l.price)}</strong> <span>/ night</span></div>
            <button class="book-btn" onclick="openBooking(${l.id})">Reserve now</button>
          </div>
        </div>`;
    }).join('');
  }
}


function renderExperiences() {
  document.getElementById('expGrid').innerHTML = experiences.map(function(e) {
    return `
      <div class="exp-card">
        <img src="${e.img}" alt="${e.title}" loading="lazy"/>
        <div class="exp-info">
          <div class="exp-type">${e.type}</div>
          <h3>${e.title}</h3>
          <div class="exp-price">${e.price}</div>
        </div>
        <button class="exp-book" onclick="showToast('Booking experience: ${e.title}')">Book</button>
      </div>`;
  }).join('');
}


function renderDestinations() {
  document.getElementById('destGrid').innerHTML = destinations.map(function(d) {
    return `
      <div class="dest-card" onclick="quickSearchDest('${d.name}')">
        <img class="dest-img" src="${d.img}" alt="${d.name}" loading="lazy"/>
        <div>
          <div class="dest-name">${d.name}</div>
          <div class="dest-time">${d.time}</div>
        </div>
      </div>`;
  }).join('');
}


function quickSearchDest(name) {
  searchFilters.where = name;
  document.getElementById('nb-where').textContent = name;
  renderListings();
  document.getElementById('listingsGrid').scrollIntoView({ behavior:'smooth', block:'start' });
  showToast('Showing stays in ' + name);
}


function toggleWish(e, id) {
  e.stopPropagation();
  if (wished.has(id)) {
    wished.delete(id);
    showToast('Removed from saved places');
  } else {
    wished.add(id);
    showToast('Saved to your wishlist ❤️');
  }
  renderListings();
}

function openWishlistPanel() {
  closeUserMenu();
  const overlay = document.getElementById('wishlistOverlay');
  overlay.classList.add('open');
  renderWishlistPanel();
}
function closeWishlistPanel() {
  document.getElementById('wishlistOverlay').classList.remove('open');
}
function closeWishlistOutside(e) {
  if (e.target === document.getElementById('wishlistOverlay')) closeWishlistPanel();
}
function renderWishlistPanel() {
  const content = document.getElementById('wishlistContent');
  const saved = listings.filter(function(l) { return wished.has(l.id); });
  if (saved.length === 0) {
    content.innerHTML = `<div class="wishlist-empty"><i class="fa-regular fa-heart"></i><p>No saved places yet.<br/>Tap the ♡ on any listing to save it.</p></div>`;
  } else {
    content.innerHTML = saved.map(function(l) {
      return `
        <div class="wishlist-item">
          <img src="${l.img}" alt="${l.location}"/>
          <div class="wi-info">
            <h4>${l.location}</h4>
            <span>${fmt(l.price)} / night</span>
          </div>
          <button class="wi-remove" onclick="removeWish(${l.id})" title="Remove"><i class="fa fa-times"></i></button>
        </div>`;
    }).join('');
  }
}
function removeWish(id) {
  wished.delete(id);
  renderListings();
  renderWishlistPanel();
  showToast('Removed from saved places');
}

// ── CATEGORY FILTER 
function filterCategory(el) {
  document.querySelectorAll('.cat-item').forEach(function(c) { c.classList.remove('active'); });
  el.classList.add('active');
  activeCategory = el.getAttribute('data-cat');
  renderListings();
  if (activeCategory !== 'all') {
    showToast('Showing ' + el.querySelector('span').textContent + ' stays');
  }
}

// ── search
function openModal() {
  document.getElementById('modalOverlay').classList.add('open');

  if (searchFilters.where) document.getElementById('whereInput').value = searchFilters.where;
  if (searchFilters.checkin)  document.getElementById('checkinInput').value = searchFilters.checkin;
  if (searchFilters.checkout) document.getElementById('checkoutInput').value = searchFilters.checkout;
  document.getElementById('guestCount').textContent = sGuests;
  updatePriceLabel();
}
function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
}
function closeModalOutside(e) {
  if (e.target === document.getElementById('modalOverlay')) closeModal();
}

function changeGuests(delta) {
  sGuests = Math.max(1, Math.min(16, sGuests + delta));
  document.getElementById('guestCount').textContent = sGuests;
}

function updatePriceLabel() {
  const val = parseInt(document.getElementById('priceRange').value);
  document.getElementById('priceLabel').textContent = val >= 50000 ? 'Any price' : fmt(val);
}

function clearModalFields() {
  document.getElementById('whereInput').value = '';
  document.getElementById('checkinInput').value = '';
  document.getElementById('checkoutInput').value = '';
  sGuests = 2;
  document.getElementById('guestCount').textContent = 2;
  document.getElementById('priceRange').value = 50000;
  updatePriceLabel();
}

function doSearch() {
  const where    = document.getElementById('whereInput').value.trim();
  const checkin  = document.getElementById('checkinInput').value;
  const checkout = document.getElementById('checkoutInput').value;
  const maxPrice = parseInt(document.getElementById('priceRange').value);

  // Validate dates
  if (checkin && checkout && checkin >= checkout) {
    showToast('Check-out must be after check-in!');
    return;
  }

  // Save filters to state
  searchFilters = {
    where:    where || '',
    checkin:  checkin,
    checkout: checkout,
    guests:   sGuests,
    maxPrice: maxPrice >= 50000 ? null : maxPrice,
  };

  // Update navbar search bar labels
  document.getElementById('nb-where').textContent    = where    || 'Search destinations';
  document.getElementById('nb-checkin').textContent  = checkin  || 'Add date';
  document.getElementById('nb-checkout').textContent = checkout || 'Add date';
  document.getElementById('nb-guests').textContent   = sGuests + ' guest' + (sGuests > 1 ? 's' : '');

  closeModal();
  renderListings();

  const count = listings.filter(function(l) {
    if (activeCategory !== 'all' && l.cat !== activeCategory) return false;
    if (where && !l.location.toLowerCase().includes(where.toLowerCase())) return false;
    if (searchFilters.maxPrice && l.price > searchFilters.maxPrice) return false;
    if (l.maxGuests < sGuests) return false;
    return true;
  }).length;

  showToast(count + ' stay' + (count !== 1 ? 's' : '') + ' found' + (where ? ' in ' + where : ''));
  document.getElementById('listingsGrid').scrollIntoView({ behavior:'smooth', block:'start' });
}

function clearSearch() {
  searchFilters = {};
  sGuests = 2;
  document.getElementById('nb-where').textContent    = 'Search destinations';
  document.getElementById('nb-checkin').textContent  = 'Add date';
  document.getElementById('nb-checkout').textContent = 'Add date';
  document.getElementById('nb-guests').textContent   = 'Add guests';
  activeCategory = 'all';
  document.querySelectorAll('.cat-item').forEach(function(c) { c.classList.remove('active'); });
  document.querySelector('[data-cat="all"]').classList.add('active');
  renderListings();
  showToast('Filters cleared');
}

// ── BOOKING MODAL ─────────────────────────────────────────────
function openBooking(id) {
  currentBooking = listings.find(function(l) { return l.id === id; });
  if (!currentBooking) return;

  // Pre-fill dates from search
  document.getElementById('bCheckin').value  = searchFilters.checkin  || '';
  document.getElementById('bCheckout').value = searchFilters.checkout || '';
  bGuests = searchFilters.guests || 2;
  document.getElementById('bGuestCount').textContent = bGuests;
  document.getElementById('bName').value  = '';
  document.getElementById('bEmail').value = '';

  // Preview card
  document.getElementById('bookingPreview').innerHTML = `
    <img src="${currentBooking.img}" alt="${currentBooking.location}"/>
    <div class="preview-info">
      <h4>${currentBooking.location}</h4>
      <span>${currentBooking.desc}</span><br/>
      <span style="font-weight:700;color:var(--teal-dark)">${fmt(currentBooking.price)} / night</span>
    </div>`;

  document.getElementById('bookingSummary').style.display = 'none';
  document.getElementById('bookingOverlay').classList.add('open');
  calcTotal();
}
function closeBooking() {
  document.getElementById('bookingOverlay').classList.remove('open');
  currentBooking = null;
}
function closeBookingOutside(e) {
  if (e.target === document.getElementById('bookingOverlay')) closeBooking();
}

function changeBGuests(delta) {
  if (!currentBooking) return;
  bGuests = Math.max(1, Math.min(currentBooking.maxGuests, bGuests + delta));
  document.getElementById('bGuestCount').textContent = bGuests;
}

function calcTotal() {
  if (!currentBooking) return;
  const ci = document.getElementById('bCheckin').value;
  const co = document.getElementById('bCheckout').value;
  const summary = document.getElementById('bookingSummary');

  if (!ci || !co || ci >= co) {
    summary.style.display = 'none';
    return;
  }

  const nights = Math.round((new Date(co) - new Date(ci)) / (1000 * 60 * 60 * 24));
  if (nights <= 0) { summary.style.display = 'none'; return; }

  const subtotal = currentBooking.price * nights;
  const fee      = Math.round(subtotal * 0.12);
  const total    = subtotal + fee;

  document.getElementById('summaryNights').textContent    = nights + ' night' + (nights > 1 ? 's' : '') + ' × ' + fmt(currentBooking.price);
  document.getElementById('summarySubtotal').textContent  = fmt(subtotal);
  document.getElementById('summaryFee').textContent       = fmt(fee);
  document.getElementById('summaryTotal').textContent     = fmt(total);
  summary.style.display = 'block';
}

function confirmBooking() {
  if (!currentBooking) return;

  const name     = document.getElementById('bName').value.trim();
  const email    = document.getElementById('bEmail').value.trim();
  const checkin  = document.getElementById('bCheckin').value;
  const checkout = document.getElementById('bCheckout').value;

  // Validation
  if (!name)           { showToast('Please enter your full name'); return; }
  if (!email || !email.includes('@')) { showToast('Please enter a valid email'); return; }
  if (!checkin)        { showToast('Please select a check-in date'); return; }
  if (!checkout)       { showToast('Please select a check-out date'); return; }
  if (checkin >= checkout) { showToast('Check-out must be after check-in!'); return; }

  const nights  = Math.round((new Date(checkout) - new Date(checkin)) / (1000*60*60*24));
  const subtotal = currentBooking.price * nights;
  const fee      = Math.round(subtotal * 0.12);
  const total    = subtotal + fee;
  const ref      = 'NW' + Math.random().toString(36).substring(2,8).toUpperCase();

  // Build confirmation details
  document.getElementById('confirmMsg').textContent = 'Your trip to ' + currentBooking.location + ' is confirmed!';
  document.getElementById('confirmDetails').innerHTML = `
    <div><strong>Booking ref</strong> ${ref}</div>
    <div><strong>Guest</strong> ${name}</div>
    <div><strong>Email</strong> ${email}</div>
    <div><strong>Property</strong> ${currentBooking.location}</div>
    <div><strong>Check-in</strong> ${new Date(checkin).toDateString()}</div>
    <div><strong>Check-out</strong> ${new Date(checkout).toDateString()}</div>
    <div><strong>Guests</strong> ${bGuests}</div>
    <div><strong>Nights</strong> ${nights}</div>
    <div><strong>Total paid</strong> ${fmt(total)}</div>`;

  closeBooking();
  document.getElementById('confirmOverlay').classList.add('open');
}

function closeConfirm() {
  document.getElementById('confirmOverlay').classList.remove('open');
  showToast('Booking confirmed! Check your email 🎉');
}

// ── HERO SLIDER ───────────────────────────────────────────────
let currentSlide = 0;
function goSlide(n) {
  currentSlide = n;
  document.getElementById('heroSlides').style.transform = 'translateX(-' + (n * 100) + '%)';
  document.querySelectorAll('.dot').forEach(function(d, i) {
    d.classList.toggle('active', i === n);
  });
}
setInterval(function() { goSlide((currentSlide + 1) % 3); }, 4500);

// ── USER DROPDOWN ─────────────────────────────────────────────
function toggleUserMenu() {
  document.getElementById('userDropdown').classList.toggle('open');
}
function closeUserMenu() {
  document.getElementById('userDropdown').classList.remove('open');
}
document.addEventListener('click', function(e) {
  if (!e.target.closest('.user-menu') && !e.target.closest('.user-dropdown')) {
    closeUserMenu();
  }
});

// ── NAVBAR SCROLL SHADOW ──────────────────────────────────────
window.addEventListener('scroll', function() {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 10);
});

// ── TOAST ─────────────────────────────────────────────────────
function showToast(msg) {
  const t = document.getElementById('toast');
  document.getElementById('toastMsg').textContent = msg;
  t.classList.add('show');
  setTimeout(function() { t.classList.remove('show'); }, 2500);
}

// ── KEYBOARD: close modals with Escape ───────────────────────
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeModal();
    closeBooking();
    closeWishlistPanel();
    closeUserMenu();
  }
});

// ── INIT ─────────────────────────────────────────────────────
renderListings();
renderExperiences();
renderDestinations();
