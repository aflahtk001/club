/**
 * APEX SPORTS CLUB - Interactive JavaScript
 * Multi-Sport Club Application Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initStatsCounter();
  initSportFilter();
  initFixtureFilter();
  initPricingToggle();
  initGalleryLightbox();
  initModals();
});

/* ==========================================
   1. Navbar & Mobile Menu Handling
   ========================================== */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky Navbar on Scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile Hamburger Toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const spans = mobileToggle.querySelectorAll('span');
      if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });
  }

  // Close Mobile Menu on Nav Item Click & Update Active State
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        const spans = mobileToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }

      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });

  // Active Link on Scroll (ScrollSpy)
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const correspondingLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

      if (correspondingLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(l => l.classList.remove('active'));
        correspondingLink.classList.add('active');
      }
    });
  });
}

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}

/* ==========================================
   2. Number Counter Animation
   ========================================== */
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number');
  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        statNumbers.forEach(stat => {
          const target = +stat.getAttribute('data-target');
          const duration = 1800; // ms
          const increment = target / (duration / 25);
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              stat.textContent = target.toLocaleString();
              clearInterval(timer);
            } else {
              stat.textContent = Math.ceil(current).toLocaleString();
            }
          }, 25);
        });
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.querySelector('.hero-stats-banner');
  if (statsSection) {
    observer.observe(statsSection);
  }
}

/* ==========================================
   3. Sports Disciplines Category Filter
   ========================================== */
function initSportFilter() {
  const filterBtns = document.querySelectorAll('.sport-filter-btn');
  const cards = document.querySelectorAll('.sport-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* ==========================================
   4. Fixture League & Match Filter
   ========================================== */
function initFixtureFilter() {
  const tabBtns = document.querySelectorAll('.fixture-tab-btn');
  const fixtureCards = document.querySelectorAll('.fixture-card');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const sport = btn.getAttribute('data-sport');

      fixtureCards.forEach(card => {
        const cardSport = card.getAttribute('data-sport');
        if (sport === 'all' || cardSport === sport) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================
   5. Membership Pricing Annual/Monthly Switcher
   ========================================== */
function initPricingToggle() {
  const toggle = document.getElementById('pricingToggle');
  const monthlyLabel = document.getElementById('monthlyLabel');
  const annualLabel = document.getElementById('annualLabel');
  const amounts = document.querySelectorAll('.plan-price .amount');
  const periods = document.querySelectorAll('.plan-price .period');

  if (!toggle) return;

  toggle.addEventListener('change', () => {
    const isAnnual = toggle.checked;

    if (isAnnual) {
      monthlyLabel.classList.remove('active');
      annualLabel.classList.add('active');
    } else {
      monthlyLabel.classList.add('active');
      annualLabel.classList.remove('active');
    }

    amounts.forEach(amountEl => {
      const monthlyPrice = amountEl.getAttribute('data-monthly');
      const annualPrice = amountEl.getAttribute('data-annual');
      amountEl.textContent = isAnnual ? annualPrice : monthlyPrice;
    });

    periods.forEach(periodEl => {
      periodEl.textContent = isAnnual ? '/ month (billed yearly)' : '/ month';
    });
  });
}

/* ==========================================
   6. Photo Gallery Filter & Lightbox
   ========================================== */
let currentGalleryIndex = 0;
let visibleGalleryItems = [];

function initGalleryLightbox() {
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const items = Array.from(document.querySelectorAll('.gallery-item'));
  const lightbox = document.getElementById('galleryLightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const closeBtn = document.getElementById('lightboxClose');
  const prevBtn = document.getElementById('lightboxPrev');
  const nextBtn = document.getElementById('lightboxNext');

  visibleGalleryItems = [...items];

  // Filtering
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-gallery');

      items.forEach(item => {
        const cat = item.getAttribute('data-category');
        if (filterVal === 'all' || cat === filterVal) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });

      visibleGalleryItems = items.filter(item => item.style.display !== 'none');
    });
  });

  // Open Lightbox
  items.forEach(item => {
    item.addEventListener('click', () => {
      currentGalleryIndex = visibleGalleryItems.indexOf(item);
      if (currentGalleryIndex === -1) currentGalleryIndex = 0;
      updateLightbox(lightboxImg, lightboxCaption);
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  // Close Lightbox
  const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  // Next / Prev Controls
  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      currentGalleryIndex = (currentGalleryIndex + 1) % visibleGalleryItems.length;
      updateLightbox(lightboxImg, lightboxCaption);
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      currentGalleryIndex = (currentGalleryIndex - 1 + visibleGalleryItems.length) % visibleGalleryItems.length;
      updateLightbox(lightboxImg, lightboxCaption);
    });
  }

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight' && nextBtn) nextBtn.click();
    if (e.key === 'ArrowLeft' && prevBtn) prevBtn.click();
  });
}

function updateLightbox(imgEl, captionEl) {
  if (!visibleGalleryItems.length) return;
  const currentItem = visibleGalleryItems[currentGalleryIndex];
  const imgSrc = currentItem.getAttribute('data-img');
  const imgTitle = currentItem.getAttribute('data-title');

  imgEl.src = imgSrc;
  captionEl.textContent = imgTitle || 'APEX Sports Club Arena';
}

/* ==========================================
   7. Modals (Registration / Join Club)
   ========================================== */
function initModals() {
  const modal = document.getElementById('joinModal');
  const openBtns = document.querySelectorAll('.open-modal-btn');
  const closeBtn = modal ? modal.querySelector('.modal-close-btn') : null;
  const regPlan = document.getElementById('regPlan');
  const regSport = document.getElementById('regSport');
  const modalTitle = document.getElementById('modalTitle');

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const plan = btn.getAttribute('data-plan');
      const sport = btn.getAttribute('data-sport');
      const item = btn.getAttribute('data-item');

      if (modal) {
        if (plan && regPlan) {
          regPlan.value = plan;
          modalTitle.textContent = `Join APEX - ${plan}`;
        } else if (sport && regSport) {
          regSport.value = sport;
          modalTitle.textContent = `Register for ${sport} Academy`;
        } else if (item) {
          modalTitle.textContent = `Order Gear - ${item}`;
        } else {
          modalTitle.textContent = 'Join APEX Sports Club';
        }

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }
}

/* ==========================================
   8. Form Submission & Toast Alert Handlers
   ========================================== */
function handleRegisterSubmit(event) {
  event.preventDefault();
  const modal = document.getElementById('joinModal');
  const name = document.getElementById('regName').value;
  const plan = document.getElementById('regPlan').value;

  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  showToast(`Welcome ${name}! Your application for ${plan} has been received. Our team will contact you shortly.`, 'success');
  event.target.reset();
}

function handleContactSubmit(event) {
  event.preventDefault();
  const name = document.getElementById('cName').value;
  const sport = document.getElementById('cSport').value;

  showToast(`Thank you ${name}! Your inquiry for ${sport || 'Club Trial'} has been submitted. We'll reach out within 2 hours.`, 'success');
  event.target.reset();
}

function handleNewsletter(event) {
  event.preventDefault();
  showToast('You have successfully subscribed to the Apex Club Newsletter!', 'success');
  event.target.reset();
}

function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toastMessage');
  const toastIcon = document.getElementById('toastIcon');

  if (!toast) return;

  toastMessage.textContent = message;

  if (type === 'success') {
    toastIcon.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    toastIcon.style.color = '#10B981';
  } else {
    toastIcon.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i>';
    toastIcon.style.color = '#E63946';
  }

  toast.classList.add('active');

  setTimeout(() => {
    toast.classList.remove('active');
  }, 4500);
}
