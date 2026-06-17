// ============================================
// Fegor Homes Ltd - Home Page JavaScript
// ============================================

// ===== SERVICES DATA =====
const services = [
  {
    icon: "🏛️",
    title: "Real Estate Consulting & Advisory",
    description: "Expert guidance for buyers, sellers, and investors. We analyze market trends and provide strategic advice to maximize your real estate returns."
  },
  {
    icon: "📈",
    title: "Property Investment & Off-Plan Sales",
    description: "Access exclusive off-plan investment opportunities with high ROI potential. We connect you with the best development projects across Lagos."
  },
  {
    icon: "🏢",
    title: "Commercial & Residential Sales",
    description: "From family homes to large commercial complexes, we handle the full sales process with professionalism and expert market knowledge."
  },
  {
    icon: "💎",
    title: "Luxury & High-Value Properties",
    description: "Specialized in premium properties on Banana Island, Ikoyi, and Victoria Island. We cater to discerning clients seeking the finest homes."
  }
];

// ===== TESTIMONIALS DATA =====
const testimonials = [
  {
    text: "Fegor Homes made my property investment journey seamless. Their team helped me identify a prime off-plan property in Lekki that has already appreciated by 40% in two years. Truly exceptional service.",
    name: "Chukwuemeka Obi",
    role: "Property Investor, Abuja",
    initials: "CO"
  },
  {
    text: "I was relocating from the UK and needed a trusted real estate partner in Lagos. Fegor Homes handled everything — property search, documentation, and negotiation. I could not have asked for better.",
    name: "Adaeze Nwosu",
    role: "Homebuyer, Victoria Island",
    initials: "AN"
  },
  {
    text: "The team at Fegor Homes has unparalleled knowledge of the Lagos luxury market. They found us our dream home on Banana Island within three weeks. Highly professional and results-driven.",
    name: "Babatunde Adeyemi",
    role: "Luxury Property Client",
    initials: "BA"
  }
];

// ===== WHY CHOOSE US DATA =====
const whyReasons = [
  { icon: "✅", text: "Over 12 years of deep expertise in the Nigerian real estate market" },
  { icon: "🏆", text: "Trusted by 1,200+ satisfied clients across Nigeria" },
  { icon: "🔍", text: "Rigorous property verification and due diligence process" },
  { icon: "💼", text: "End-to-end support from search through to completion" },
  { icon: "📊", text: "Data-driven investment advisory to maximize your returns" }
];

// ===== RENDER FEATURED PROPERTIES =====
function renderFeaturedProperties() {
  const container = document.getElementById("featured-properties");
  if (!container) return;

  const featured = properties.filter((p) => p.featured === true);

  container.innerHTML = featured
    .map((property) => buildPropertyCard(property))
    .join("");
}

// ===== RENDER SERVICES =====
function renderServices() {
  const container = document.getElementById("services-grid");
  if (!container) return;

  container.innerHTML = services
    .map((service) => `
      <div class="service-card">
        <div class="service-icon">${service.icon}</div>
        <h3>${service.title}</h3>
        <p>${service.description}</p>
      </div>
    `)
    .join("");
}

// ===== RENDER TESTIMONIALS =====
function renderTestimonials() {
  const container = document.getElementById("testimonials-grid");
  if (!container) return;

  container.innerHTML = testimonials
    .map((t) => `
      <div class="testimonial-card">
        <p class="testimonial-text">${t.text}</p>
        <div class="testimonial-author">
          <div class="testimonial-avatar">${t.initials}</div>
          <div>
            <span class="testimonial-name">${t.name}</span>
            <span class="testimonial-role">${t.role}</span>
          </div>
        </div>
      </div>
    `)
    .join("");
}

// ===== RENDER WHY LIST =====
function renderWhyList() {
  const container = document.getElementById("why-list");
  if (!container) return;

  container.innerHTML = whyReasons
    .map((reason) => `
      <li>
        <span>${reason.icon}</span>
        <span>${reason.text}</span>
      </li>
    `)
    .join("");
}

// ===== HERO SEARCH REDIRECT =====
function initHeroSearch() {
  const searchBtn = document.getElementById("search-btn");
  if (!searchBtn) return;

  searchBtn.addEventListener("click", () => {
    const type = document.getElementById("search-type").value;
    const location = document.getElementById("search-location").value;
    const category = document.getElementById("search-category").value;

    const params = new URLSearchParams();
    if (type !== "all") params.set("type", type);
    if (location !== "all") params.set("location", location);
    if (category !== "all") params.set("category", category);

    const queryString = params.toString();
    window.location.href = queryString
      ? `properties.html?${queryString}`
      : "properties.html";
  });
}

// ===== INIT HOME PAGE =====
document.addEventListener("DOMContentLoaded", () => {
  renderFeaturedProperties();
  renderServices();
  renderTestimonials();
  renderWhyList();
  initHeroSearch();
});