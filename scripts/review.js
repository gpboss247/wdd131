// review.js - Fegor Homes Ltd Review Confirmation Page

// ===== Increment and Display Review Counter =====
function updateReviewCounter() {
  const STORAGE_KEY = "reviewCount";
  let count = parseInt(localStorage.getItem(STORAGE_KEY)) || 0;
  count += 1;
  localStorage.setItem(STORAGE_KEY, count);

  const countEl = document.getElementById("review-count");
  if (countEl) {
    countEl.textContent = count;
  }
}

// ===== Parse URL Query Parameters =====
function getQueryParams() {
  const params = new URLSearchParams(window.location.search);
  const data = {};
  for (const [key, value] of params.entries()) {
    if (data[key]) {
      data[key] = Array.isArray(data[key])
        ? [...data[key], value]
        : [data[key], value];
    } else {
      data[key] = value;
    }
  }
  return data;
}

// ===== Display Submission Summary =====
function displaySummary() {
  const params = getQueryParams();
  const summaryList = document.getElementById("summary-list");

  if (!summaryList) return;

  const ratingStars = {
    "1": "&#9733;",
    "2": "&#9733;&#9733;",
    "3": "&#9733;&#9733;&#9733;",
    "4": "&#9733;&#9733;&#9733;&#9733;",
    "5": "&#9733;&#9733;&#9733;&#9733;&#9733;"
  };

  const fieldLabels = {
    "product-name": "Product",
    "rating": "Overall Rating",
    "install-date": "Date of Installation",
    "features": "Useful Features",
    "written-review": "Written Review",
    "user-name": "Your Name"
  };

  const summaryItems = [];

  // Product Name
  if (params["product-name"]) {
    summaryItems.push({
      label: fieldLabels["product-name"],
      value: params["product-name"].toUpperCase()
    });
  }

  // Rating
  if (params["rating"]) {
    summaryItems.push({
      label: fieldLabels["rating"],
      value: `${ratingStars[params["rating"]]} (${params["rating"]} out of 5)`,
      isHTML: true
    });
  }

  // Install Date
  if (params["install-date"]) {
    const dateObj = new Date(`${params["install-date"]}T00:00:00`);
    const formatted = dateObj.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
    summaryItems.push({
      label: fieldLabels["install-date"],
      value: formatted
    });
  }

  // Features (can be multiple)
  if (params["features"]) {
    const featureList = Array.isArray(params["features"])
      ? params["features"].join(", ")
      : params["features"];
    summaryItems.push({
      label: fieldLabels["features"],
      value: featureList
    });
  }

  // Written Review
  if (params["written-review"] && params["written-review"].trim() !== "") {
    summaryItems.push({
      label: fieldLabels["written-review"],
      value: `"${params["written-review"]}"`
    });
  }

  // User Name
  if (params["user-name"] && params["user-name"].trim() !== "") {
    summaryItems.push({
      label: fieldLabels["user-name"],
      value: params["user-name"]
    });
  }

  // Build list items using template literals
  if (summaryItems.length > 0) {
    summaryItems.forEach((item) => {
      const li = document.createElement("li");
      if (item.isHTML) {
        li.innerHTML = `<strong>${item.label}</strong>${item.value}`;
      } else {
        li.innerHTML = `<strong>${item.label}</strong>${item.value}`;
      }
      summaryList.appendChild(li);
    });
  } else {
    const detailsBox = document.getElementById("confirmation-details");
    if (detailsBox) {
      detailsBox.style.display = "none";
    }
  }
}

// ===== Set Last Modified Footer =====
function setLastModified() {
  const lastModifiedEl = document.getElementById("last-modified");
  if (lastModifiedEl) {
    lastModifiedEl.textContent = `Last Modified: ${document.lastModified}`;
  }
}

// ===== Initialize Confirmation Page =====
function initReviewPage() {
  updateReviewCounter();
  displaySummary();
  setLastModified();
}

document.addEventListener("DOMContentLoaded", initReviewPage);