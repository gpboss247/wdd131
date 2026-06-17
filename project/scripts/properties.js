// ============================================
// Fegor Homes Ltd - Properties Page JavaScript
// ============================================

let currentFilter = "all";

// ===== RENDER PROPERTIES =====
function renderProperties(filter) {
  const grid = document.getElementById("properties-grid");
  const noResults = document.getElementById("no-results");
  const resultsCount = document.getElementById("results-count");
  if (!grid) return;

  const filtered = filter === "all"
    ? properties
    : properties.filter((p) => p.type === filter || p.category === filter);

  if (filtered.length === 0) {
    grid.innerHTML = "";
    noResults.style.display = "block";
    resultsCount.textContent = "No properties found";
  } else {
    noResults.style.display = "none";
    grid.innerHTML = filtered.map((p) => buildPropertyCard(p)).join("");
    resultsCount.textContent = `Showing ${filtered.length} ${filtered.length === 1 ? "property" : "properties"}`;
  }

  // Save preferred filter to localStorage
  savePreferredView(filter);
}

// ===== INIT FILTER BUTTONS =====
function initFilters() {
  const buttons = document.querySelectorAll(".filter-btn");

  // Check for URL params from homepage search
  const params = new URLSearchParams(window.location.search);
  const typeParam = params.get("type");
  const categoryParam = params.get("category");

  if (typeParam || categoryParam) {
    currentFilter = categoryParam || typeParam;
  } else {
    currentFilter = getPreferredView() === "grid" ? "all" : getPreferredView();
    if (!["all","sale","rent","luxury","commercial","residential"].includes(currentFilter)) {
      currentFilter = "all";
    }
  }

  buttons.forEach((btn) => {
    btn.classList.remove("active");
    if (btn.dataset.filter === currentFilter) {
      btn.classList.add("active");
    }

    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentFilter = btn.dataset.filter;
      renderProperties(currentFilter);
    });
  });

  renderProperties(currentFilter);
}

// ===== RESET FILTER =====
function initResetFilter() {
  const resetBtn = document.getElementById("reset-filter");
  if (!resetBtn) return;
  resetBtn.addEventListener("click", () => {
    currentFilter = "all";
    document.querySelectorAll(".filter-btn").forEach((b) => {
      b.classList.remove("active");
      if (b.dataset.filter === "all") b.classList.add("active");
    });
    renderProperties("all");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initFilters();
  initResetFilter();
});