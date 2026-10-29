/* =============================================
   CampusFinder – app.js
   College Lost & Found – Frontend Logic
============================================= */

/* =============================================
   SAMPLE DATA
============================================= */
const SAMPLE_ITEMS = [
  {
    id: 1, type: 'lost', title: 'Black Sony WH-1000XM5 Headphones',
    category: 'electronics', location: 'library', date: '2024-10-27',
    color: 'Matte black', description: 'Left on the 3rd floor study area near the window. Has a small green sticker on the left earcup. Case was not with it.',
    contact: 'arjun.s@college.edu', emoji: '🎧', reporter: 'Arjun Sharma'
  },
  {
    id: 2, type: 'found', title: 'Blue Jansport Backpack',
    category: 'bags', location: 'cafeteria', date: '2024-10-26',
    color: 'Navy blue with grey accents', description: 'Found on a chair near the entrance of the cafeteria. Contains notebooks, a pencil pouch, and a water bottle. Submitted to security desk.',
    contact: 'priya.m@college.edu', emoji: '🎒', reporter: 'Priya Mehta'
  },
  {
    id: 3, type: 'lost', title: 'MacBook Pro 14" (Space Grey)',
    category: 'electronics', location: 'lab', date: '2024-10-25',
    color: 'Space grey, Apple sticker on lid', description: 'Lost my MacBook Pro in the CS lab (Room 204). Has a CampusFinder sticker on the back. Serial number available. Please contact immediately!',
    contact: '+91 98765 12345', emoji: '💻', reporter: 'Rohan Gupta'
  },
  {
    id: 4, type: 'found', title: 'Set of Car Keys (Honda + Home)',
    category: 'keys', location: 'parking', date: '2024-10-28',
    color: 'Silver, Honda logo keychain + red lanyard', description: 'Found on the ground near the B-block parking entrance. Has a Honda key, two home keys, and a red cloth keychain.',
    contact: 'security@college.edu', emoji: '🔑', reporter: 'Security Office'
  },
  {
    id: 5, type: 'reunited', title: 'iPhone 14 Pro (Gold)',
    category: 'electronics', location: 'gym', date: '2024-10-20',
    color: 'Gold, cracked top corner', description: 'iPhone found near the treadmill section. Returned to owner after identity verification at security office.',
    contact: 'Resolved', emoji: '📱', reporter: 'Gym Staff'
  },
  {
    id: 6, type: 'lost', title: 'Student ID Card – Ananya Reddy',
    category: 'keys', location: 'auditorium', date: '2024-10-28',
    color: 'White card, photo ID', description: 'Lost my college ID during the cultural fest event. Roll no: 22CS1047. Please return to the student office or contact directly.',
    contact: 'ananya.r@college.edu', emoji: '💳', reporter: 'Ananya Reddy'
  },
  {
    id: 7, type: 'found', title: 'Calculus Textbook (Thomas)',
    category: 'books', location: 'library', date: '2024-10-27',
    color: 'Red cover, "Thomas Calculus 14th Ed"', description: 'Found on the 2nd floor reading table. Has the name "Vikram" written inside the front cover. Can collect from the library help desk.',
    contact: 'library@college.edu', emoji: '📚', reporter: 'Library Staff'
  },
  {
    id: 8, type: 'lost', title: 'Black Nike Dri-FIT Jacket',
    category: 'clothing', location: 'gym', date: '2024-10-24',
    color: 'Black with white Nike swoosh', description: 'Left in the changing room area. Medium size. Has my name "Karan" written on the inside collar tag in marker.',
    contact: 'karan.v@college.edu', emoji: '🧥', reporter: 'Karan Verma'
  },
  {
    id: 9, type: 'found', title: 'Silver Fossil Watch',
    category: 'jewelry', location: 'cafeteria', date: '2024-10-23',
    color: 'Silver metal band, round face', description: 'Found near the food counter. Watch is in good condition. Handed over to the canteen supervisor. Please claim with a description.',
    contact: 'canteen@college.edu', emoji: '⌚', reporter: 'Canteen Staff'
  },
  {
    id: 10, type: 'lost', title: 'Basketball (Spalding)',
    category: 'sports', location: 'gym', date: '2024-10-22',
    color: 'Orange, "23" written in marker', description: 'Lost during the intramural tournament on Saturday. Has the number 23 written in blue marker. Please contact if found.',
    contact: 'sports@college.edu', emoji: '🏀', reporter: 'Sports Dept.'
  },
  {
    id: 11, type: 'found', title: 'Purple Water Bottle (Hydrapeak)',
    category: 'other', location: 'classroom', date: '2024-10-28',
    color: 'Purple, Hydrapeak brand sticker', description: 'Found in Room 301 after the afternoon lectures. 32oz insulated bottle with a straw lid.',
    contact: 'neha.k@college.edu', emoji: '🧴', reporter: 'Neha Kumar'
  },
  {
    id: 12, type: 'reunited', title: 'Brown Leather Wallet',
    category: 'other', location: 'hostel', date: '2024-10-18',
    color: 'Brown leather, multiple cards inside', description: 'Found in the hostel common room. All contents (cash, cards, ID) intact. Successfully returned to owner.',
    contact: 'Resolved', emoji: '👜', reporter: 'Hostel Warden'
  },
];

let currentItems = [...SAMPLE_ITEMS];
let visibleCount = 6;
let activeFilter = 'all';
let activeCategoryFilter = 'all';
let activeLocationFilter = 'all';
let currentSearchQuery = '';
let reportType = 'lost';

/* =============================================
   DOM READY
============================================= */
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initHeroSearch();
  initCounterAnimation();
  initQuickActions();
  initFilters();
  renderItems();
  initReportModal();
  initItemDetailModal();
  initContactForm();
  initScrollAnimations();
  initFileUpload();
  setTodayDate();
  initHamburger();
});

/* =============================================
   NAVBAR
============================================= */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active link highlighting
    const sections = document.querySelectorAll('section[id], nav[id]');
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) {
        current = sec.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  });

  // Report nav button
  document.getElementById('reportNavBtn').addEventListener('click', () => {
    openReportModal('lost');
  });

  // Login btn (placeholder)
  document.getElementById('loginBtn').addEventListener('click', () => {
    showToast('Sign In', 'Authentication coming soon! For now, browse freely.', '🔐');
  });
}

function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  // Close menu on link click
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });
}

/* =============================================
   HERO SEARCH
============================================= */
function initHeroSearch() {
  const searchBtn = document.getElementById('heroSearchBtn');
  const searchInput = document.getElementById('heroSearch');

  const doSearch = () => {
    currentSearchQuery = searchInput.value.toLowerCase().trim();
    scrollToSection('browse');
    setTimeout(() => {
      renderItems();
    }, 400);
  };

  searchBtn.addEventListener('click', doSearch);
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') doSearch();
  });
}

/* =============================================
   COUNTER ANIMATION
============================================= */
function initCounterAnimation() {
  const counters = document.querySelectorAll('.stat-num');
  let animated = false;

  const animate = () => {
    if (animated) return;
    const heroSection = document.querySelector('.hero');
    const rect = heroSection.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      animated = true;
      counters.forEach(counter => {
        const target = parseInt(counter.dataset.target);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          counter.textContent = Math.floor(current).toLocaleString();
        }, 16);
      });
    }
  };

  window.addEventListener('scroll', animate);
  setTimeout(animate, 500);
}

/* =============================================
   QUICK ACTIONS
============================================= */
function initQuickActions() {
  document.getElementById('reportLostBtn').addEventListener('click', () => openReportModal('lost'));
  document.getElementById('reportFoundBtn').addEventListener('click', () => openReportModal('found'));
}

/* =============================================
   FILTERS & RENDERING
============================================= */
function initFilters() {
  // Status tabs
  document.querySelectorAll('.filter-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeFilter = tab.dataset.filter;
      visibleCount = 6;
      renderItems();
    });
  });

  // Category filter
  document.getElementById('categoryFilter').addEventListener('change', (e) => {
    activeCategoryFilter = e.target.value;
    visibleCount = 6;
    renderItems();
  });

  // Location filter
  document.getElementById('locationFilter').addEventListener('change', (e) => {
    activeLocationFilter = e.target.value;
    visibleCount = 6;
    renderItems();
  });

  // Load more
  document.getElementById('loadMoreBtn').addEventListener('click', () => {
    visibleCount += 6;
    renderItems();
  });
}

function getFilteredItems() {
  return SAMPLE_ITEMS.filter(item => {
    const matchStatus = activeFilter === 'all' || item.type === activeFilter;
    const matchCategory = activeCategoryFilter === 'all' || item.category === activeCategoryFilter;
    const matchLocation = activeLocationFilter === 'all' || item.location === activeLocationFilter;
    const matchSearch = !currentSearchQuery ||
      item.title.toLowerCase().includes(currentSearchQuery) ||
      item.description.toLowerCase().includes(currentSearchQuery) ||
      item.color.toLowerCase().includes(currentSearchQuery);
    return matchStatus && matchCategory && matchLocation && matchSearch;
  });
}

function renderItems() {
  const grid = document.getElementById('itemsGrid');
  const noItems = document.getElementById('noItems');
  const loadMoreBtn = document.getElementById('loadMoreBtn');

  const filtered = getFilteredItems();
  const toShow = filtered.slice(0, visibleCount);

  grid.innerHTML = '';

  if (filtered.length === 0) {
    noItems.classList.remove('hidden');
    loadMoreBtn.style.display = 'none';
    return;
  }

  noItems.classList.add('hidden');
  loadMoreBtn.style.display = filtered.length > visibleCount ? 'inline-flex' : 'none';

  toShow.forEach((item, i) => {
    const card = createItemCard(item, i);
    grid.appendChild(card);
  });

  // Trigger fade-in
  setTimeout(() => {
    grid.querySelectorAll('.item-card').forEach(card => {
      card.classList.add('visible');
    });
  }, 50);
}

function createItemCard(item, index) {
  const card = document.createElement('div');
  card.className = 'item-card fade-in';
  card.style.transitionDelay = `${index * 60}ms`;

  const statusClass = {
    lost: 'status-lost',
    found: 'status-found',
    reunited: 'status-reunited'
  }[item.type];

  const statusEmoji = { lost: '😟', found: '😊', reunited: '✅' }[item.type];
  const statusLabel = { lost: 'Lost', found: 'Found', reunited: 'Reunited' }[item.type];

  const locationLabels = {
    library: '📚 Library', cafeteria: '🍽️ Cafeteria', lab: '💻 CS Lab',
    gym: '🏋️ Gymnasium', parking: '🚗 Parking Lot', classroom: '🏫 Classroom',
    hostel: '🏠 Hostel', auditorium: '🎭 Auditorium'
  };

  card.innerHTML = `
    <div class="item-card-emoji">${item.emoji}</div>
    <div class="item-card-body">
      <span class="item-card-status ${statusClass}">${statusEmoji} ${statusLabel}</span>
      <h3 class="item-card-title">${item.title}</h3>
      <p class="item-card-desc">${item.description}</p>
      <div class="item-card-meta">
        <span class="meta-tag">📍 ${locationLabels[item.location] || item.location}</span>
        <span class="meta-tag">📅 ${formatDate(item.date)}</span>
        ${item.color ? `<span class="meta-tag">🎨 ${item.color}</span>` : ''}
      </div>
    </div>
  `;

  card.addEventListener('click', () => openItemDetail(item));
  return card;
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

/* =============================================
   REPORT MODAL
============================================= */
function initReportModal() {
  const overlay = document.getElementById('reportModal');

  // Close
  document.getElementById('modalClose').addEventListener('click', closeReportModal);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeReportModal();
  });

  // Modal tabs
  document.querySelectorAll('.modal-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.modal-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      reportType = tab.dataset.tab;
    });
  });

  // Form submission
  document.getElementById('reportForm').addEventListener('submit', handleReportSubmit);
}

function openReportModal(type) {
  reportType = type;
  document.getElementById('reportModal').classList.add('active');
  document.body.style.overflow = 'hidden';

  // Set active tab
  document.querySelectorAll('.modal-tab').forEach(tab => {
    tab.classList.toggle('active', tab.dataset.tab === type);
  });

  // Reset form
  document.getElementById('reportForm').reset();
  document.getElementById('filePreview').hidden = true;
  document.getElementById('fileUploadTrigger').hidden = false;
}

function closeReportModal() {
  document.getElementById('reportModal').classList.remove('active');
  document.body.style.overflow = '';
}

async function handleReportSubmit(e) {
  e.preventDefault();

  // Validate
  const required = ['itemName', 'itemCategory', 'itemLocation', 'itemDate', 'itemDescription', 'contactName', 'contactEmail'];
  let isValid = true;

  required.forEach(id => {
    const el = document.getElementById(id);
    if (!el.value.trim()) {
      el.classList.add('error');
      isValid = false;
      el.addEventListener('input', () => el.classList.remove('error'), { once: true });
    }
  });

  if (!isValid) {
    showToast('Missing Fields', 'Please fill in all required fields.', '⚠️');
    return;
  }

  // Show loading
  const submitBtnText = document.getElementById('submitBtnText');
  const btnLoader = document.getElementById('btnLoader');
  submitBtnText.textContent = 'Submitting...';
  btnLoader.classList.remove('hidden');
  document.getElementById('submitBtn').disabled = true;

  // Simulate submission
  await delay(1800);

  // Add to items list
  const locationLabels = {
    library: 'library', cafeteria: 'cafeteria', lab: 'lab',
    gym: 'gym', parking: 'parking', classroom: 'classroom',
    hostel: 'hostel', auditorium: 'auditorium'
  };

  const categoryEmojis = {
    electronics: '📱', clothing: '👕', bags: '🎒',
    keys: '🔑', books: '📚', jewelry: '💍', sports: '⚽', other: '📦'
  };

  const newItem = {
    id: Date.now(),
    type: reportType,
    title: document.getElementById('itemName').value,
    category: document.getElementById('itemCategory').value,
    location: document.getElementById('itemLocation').value,
    date: document.getElementById('itemDate').value,
    color: document.getElementById('itemColor').value,
    description: document.getElementById('itemDescription').value,
    contact: document.getElementById('contactEmail').value,
    reporter: document.getElementById('contactName').value,
    emoji: categoryEmojis[document.getElementById('itemCategory').value] || '📦'
  };

  SAMPLE_ITEMS.unshift(newItem);

  // Reset button
  submitBtnText.textContent = 'Submit Report';
  btnLoader.classList.add('hidden');
  document.getElementById('submitBtn').disabled = false;

  closeReportModal();
  renderItems();
  showToast('Report Submitted!', 'Your item has been listed. We\'ll notify you of any matches.', '✅');
}

/* =============================================
   ITEM DETAIL MODAL
============================================= */
function initItemDetailModal() {
  const overlay = document.getElementById('itemDetailModal');
  document.getElementById('itemDetailClose').addEventListener('click', closeItemDetail);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeItemDetail();
  });
}

function openItemDetail(item) {
  const body = document.getElementById('itemDetailBody');

  const statusClass = { lost: 'status-lost', found: 'status-found', reunited: 'status-reunited' }[item.type];
  const statusLabel = { lost: '😟 Lost', found: '😊 Found', reunited: '✅ Reunited' }[item.type];

  const locationLabels = {
    library: '📚 Library', cafeteria: '🍽️ Cafeteria', lab: '💻 CS Lab',
    gym: '🏋️ Gymnasium', parking: '🚗 Parking Lot', classroom: '🏫 Classroom',
    hostel: '🏠 Hostel', auditorium: '🎭 Auditorium'
  };

  const isResolved = item.type === 'reunited';

  body.innerHTML = `
    <div class="detail-status-header">
      <span class="item-card-status ${statusClass}">${statusLabel}</span>
      <span style="font-size:0.8rem; color: var(--clr-muted);">Posted by ${item.reporter}</span>
    </div>
    <div class="detail-emoji">${item.emoji}</div>
    <h2 class="detail-title">${item.title}</h2>
    <div class="detail-info-grid">
      <div class="detail-info-item">
        <div class="label">📍 Location</div>
        <div class="value">${locationLabels[item.location] || item.location}</div>
      </div>
      <div class="detail-info-item">
        <div class="label">📅 Date</div>
        <div class="value">${formatDate(item.date)}</div>
      </div>
      <div class="detail-info-item">
        <div class="label">🏷️ Category</div>
        <div class="value" style="text-transform: capitalize">${item.category}</div>
      </div>
      <div class="detail-info-item">
        <div class="label">🎨 Color / Appearance</div>
        <div class="value">${item.color || 'Not specified'}</div>
      </div>
    </div>
    <div class="detail-desc">
      <div class="label">📝 Description</div>
      <p>${item.description}</p>
    </div>
    <div class="detail-actions">
      ${!isResolved ? `
        <button class="btn-primary" onclick="handleClaimItem('${item.id}', '${item.contact}')">
          ${item.type === 'lost' ? '📞 I Found This!' : '📞 This Is Mine!'}
        </button>
        <button class="btn-outline" onclick="closeItemDetail()">Close</button>
      ` : `
        <button class="btn-outline btn-full" onclick="closeItemDetail()">This item has been returned ✅</button>
      `}
    </div>
  `;

  document.getElementById('itemDetailModal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeItemDetail() {
  document.getElementById('itemDetailModal').classList.remove('active');
  document.body.style.overflow = '';
}

function handleClaimItem(id, contact) {
  closeItemDetail();
  showToast('Contact Initiated!', `Please reach the reporter at: ${contact}`, '📬');
}

/* =============================================
   CONTACT FORM
============================================= */
function initContactForm() {
  document.getElementById('contactForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    btn.textContent = 'Sending...';
    btn.disabled = true;

    await delay(1500);

    btn.textContent = 'Message Sent!';
    showToast('Message Sent!', 'We\'ll get back to you within 24 hours.', '📧');
    e.target.reset();

    setTimeout(() => {
      btn.textContent = 'Send Message';
      btn.disabled = false;
    }, 3000);
  });
}

/* =============================================
   FILE UPLOAD
============================================= */
function initFileUpload() {
  const trigger = document.getElementById('fileUploadTrigger');
  const input = document.getElementById('itemPhoto');
  const preview = document.getElementById('filePreview');
  const uploadArea = document.getElementById('fileUpload');

  trigger.addEventListener('click', () => input.click());

  input.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    showFilePreview(file, trigger, preview);
  });

  uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('drag-over');
  });
  uploadArea.addEventListener('dragleave', () => uploadArea.classList.remove('drag-over'));
  uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('drag-over');
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      showFilePreview(file, trigger, preview);
    }
  });
}

function showFilePreview(file, trigger, preview) {
  const reader = new FileReader();
  reader.onload = (e) => {
    preview.innerHTML = `<img src="${e.target.result}" alt="Preview" /><p style="font-size:0.8rem; color:var(--clr-muted); margin-top:8px;">${file.name}</p>`;
    trigger.hidden = true;
    preview.hidden = false;
  };
  reader.readAsDataURL(file);
}

/* =============================================
   SCROLL ANIMATIONS
============================================= */
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.step-card, .action-card, .contact-item').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });
}

/* =============================================
   TOAST NOTIFICATIONS
============================================= */
function showToast(title, message, icon = '✅') {
  const toast = document.getElementById('successToast');
  toast.querySelector('strong').textContent = title;
  toast.querySelector('p').textContent = message;
  toast.querySelector('.toast-icon').textContent = icon;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

/* =============================================
   UTILITIES
============================================= */
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function setTodayDate() {
  const today = new Date().toISOString().split('T')[0];
  const dateInput = document.getElementById('itemDate');
  if (dateInput) {
    dateInput.value = today;
    dateInput.max = today;
  }
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
