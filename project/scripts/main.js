// ============================================
// Fegor Homes Ltd - Main JavaScript
// ============================================

// ===== PROPERTIES DATA =====
const properties = [
  {
    id: "prop-001",
    title: "Luxury 5-Bedroom Duplex",
    type: "sale",
    category: "luxury",
    price: 450000000,
    location: "Lekki Phase 1, Lagos",
    beds: 5,
    baths: 6,
    sqft: 6200,
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
    featured: true
  },
  {
    id: "prop-002",
    title: "Modern 3-Bedroom Apartment",
    type: "rent",
    category: "residential",
    price: 3500000,
    location: "Victoria Island, Lagos",
    beds: 3,
    baths: 3,
    sqft: 2100,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    featured: true
  },
  {
    id: "prop-003",
    title: "Prime Commercial Plaza",
    type: "sale",
    category: "commercial",
    price: 850000000,
    location: "Ikeja GRA, Lagos",
    beds: 0,
    baths: 8,
    sqft: 12000,
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
    featured: true
  },
  {
    id: "prop-004",
    title: "4-Bedroom Terrace House",
    type: "sale",
    category: "residential",
    price: 180000000,
    location: "Ajah, Lagos",
    beds: 4,
    baths: 4,
    sqft: 3800,
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80",
    featured: false
  },
  {
    id: "prop-005",
    title: "Penthouse Suite",
    type: "rent",
    category: "luxury",
    price: 8000000,
    location: "Banana Island, Lagos",
    beds: 4,
    baths: 5,
    sqft: 5100,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    featured: false
  },
  {
    id: "prop-006",
    title: "2-Bedroom Smart Apartment",
    type: "rent",
    category: "residential",
    price: 1800000,
    location: "Yaba, Lagos",
    beds: 2,
    baths: 2,
    sqft: 1400,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
    featured: false
  },
  {
    id: "prop-007",
    title: "Luxury 6-Bedroom Mansion",
    type: "sale",
    category: "luxury",
    price: 1200000000,
    location: "Banana Island, Lagos",
    beds: 6,
    baths: 8,
    sqft: 9500,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    featured: false
  },
  {
    id: "prop-008",
    title: "Office Complex",
    type: "rent",
    category: "commercial",
    price: 5500000,
    location: "Victoria Island, Lagos",
    beds: 0,
    baths: 4,
    sqft: 7200,
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    featured: false
  },
  {
    id: "prop-009",
    title: "3-Bedroom Bungalow",
    type: "sale",
    category: "residential",
    price: 95000000,
    location: "Surulere, Lagos",
    beds: 3,
    baths: 3,
    sqft: 2600,
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80",
    featured: false
  }
];

// ===== FORMAT PRICE IN NAIRA =====
function formatPrice(price, type) {
  const formatted = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0
  }).format(price);
  return type === "rent" ? `${formatted}/yr` : formatted;
}

// ===== BUILD PROPERTY CARD HTML =====
function buildPropertyCard(property) {
  const badgeClass = {
    sale: "badge-sale",
    rent: "badge-rent"
  };

  const categoryBadge = {
    luxury: "badge-luxury",
    commercial: "badge-commercial",
    residential: property.type === "sale" ? "badge-sale" : "badge-rent"
  };

  const badgeLabel = {
    luxury: "Luxury",
    commercial: "Commercial",
    residential: property.type === "sale" ? "For Sale" : "For Rent"
  };

  const bedsDisplay = property.beds > 0
    ? `<span>🛏 ${property.beds} Beds</span>`
    : `<span>🏢 Commercial</span>`;

  return `
    <article class="property-card">
      <div class="property-img-wrap">
        <img
          src="${property.image}"
          alt="${property.title} in ${property.location}"
          loading="lazy"
          width="800"
          height="500"
        >
        <span class="property-badge ${categoryBadge[property.category]}">${badgeLabel[property.category]}</span>
      </div>
      <div class="property-body">
        <p class="property-price">${formatPrice(property.price, property.type)}</p>
        <h3 class="property-title">${property.title}</h3>
        <p class="property-location">📍 ${property.location}</p>
        <div class="property-features">
          ${bedsDisplay}
          <span>🚿 ${property.baths} Baths</span>
          <span>📐 ${property.sqft.toLocaleString()} sqft</span>
        </div>
      </div>
    </article>
  `;
}

// ===== NAVBAR SCROLL EFFECT =====
function initNavbar() {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 60) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
}

// ===== MOBILE NAV TOGGLE =====
function initMobileNav() {
  const toggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  if (!toggle || !navLinks) return;

  toggle.addEventListener("click", () => {
    toggle.classList.toggle("open");
    navLinks.classList.toggle("open");
    document.body.style.overflow = navLinks.classList.contains("open") ? "hidden" : "";
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      toggle.classList.remove("open");
      navLinks.classList.remove("open");
      document.body.style.overflow = "";
    });
  });
}

// ===== SET ACTIVE NAV LINK =====
function setActiveNavLink() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach((link) => {
    const linkPage = link.getAttribute("href").split("/").pop();
    if (linkPage === currentPage) {
      link.classList.add("active");
    }
  });
}

// ===== LAST MODIFIED FOOTER =====
function setLastModified() {
  const el = document.getElementById("last-modified");
  if (el) {
    el.textContent = `Last Modified: ${document.lastModified}`;
  }
}

// ===== localStorage: TRACK VISITS =====
function trackVisit() {
  const VISIT_KEY = "fegorVisitCount";
  const PAGE_KEY = "fegorLastPage";
  let count = parseInt(localStorage.getItem(VISIT_KEY)) || 0;
  count += 1;
  localStorage.setItem(VISIT_KEY, count);
  localStorage.setItem(PAGE_KEY, window.location.pathname);
}

// ===== localStorage: SAVE PREFERRED VIEW =====
function savePreferredView(view) {
  localStorage.setItem("fegorPreferredView", view);
}

function getPreferredView() {
  return localStorage.getItem("fegorPreferredView") || "grid";
}

// ===== ANIMATE STATS ON SCROLL =====
function animateStats() {
  const statNumbers = document.querySelectorAll(".stat-number[data-target]");
  if (statNumbers.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.getAttribute("data-target"));
        const suffix = entry.target.getAttribute("data-suffix") || "";
        let current = 0;
        const increment = Math.ceil(target / 60);
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          entry.target.textContent = `${current.toLocaleString()}${suffix}`;
        }, 30);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach((el) => observer.observe(el));
}

// ===== INIT ALL =====
document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initMobileNav();
  setActiveNavLink();
  setLastModified();
  trackVisit();
  animateStats();
});