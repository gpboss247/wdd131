// ============================================
// Fegor Homes Ltd - Contact Page JavaScript
// ============================================

// ===== localStorage: Track Enquiry Count =====
function incrementEnquiryCount() {
  const KEY = "fegorEnquiryCount";
  let count = parseInt(localStorage.getItem(KEY)) || 0;
  count += 1;
  localStorage.setItem(KEY, count);
  return count;
}

// ===== Validate Form =====
function validateForm(formData) {
  const errors = [];

  if (!formData.get("first-name").trim()) {
    errors.push("First name is required.");
  }
  if (!formData.get("last-name").trim()) {
    errors.push("Last name is required.");
  }

  const email = formData.get("email").trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    errors.push("A valid email address is required.");
  }

  if (!formData.get("phone").trim()) {
    errors.push("Phone number is required.");
  }
  if (!formData.get("interest")) {
    errors.push("Please select your area of interest.");
  }
  if (!formData.get("message").trim()) {
    errors.push("Please enter your message.");
  }
  if (!formData.get("consent")) {
    errors.push("Please agree to be contacted.");
  }

  return errors;
}

// ===== Handle Form Submission =====
function initContactForm() {
  const form = document.getElementById("inquiry-form");
  const errorBox = document.getElementById("form-error");
  const successBox = document.getElementById("form-success");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const errors = validateForm(formData);

    if (errors.length > 0) {
      errorBox.style.display = "block";
      errorBox.innerHTML = errors.map((err) => `<p>⚠ ${err}</p>`).join("");
      errorBox.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    errorBox.style.display = "none";

    const count = incrementEnquiryCount();

    // Save enquiry details to localStorage
    const enquiry = {
      name: `${formData.get("first-name")} ${formData.get("last-name")}`,
      email: formData.get("email"),
      interest: formData.get("interest"),
      timestamp: new Date().toISOString()
    };
    localStorage.setItem("fegorLastEnquiry", JSON.stringify(enquiry));

    // Show success message
    form.style.display = "none";
    successBox.style.display = "block";
    successBox.innerHTML = `
      <div class="success-icon">&#10003;</div>
      <h3>Enquiry Sent Successfully!</h3>
      <p>Thank you, <strong>${enquiry.name}</strong>. One of our property experts
      will contact you at <strong>${enquiry.email}</strong> within 24 hours.</p>
      <p style="margin-top:0.5rem; font-size:0.82rem; color:var(--color-text-light);">
        You are enquiry #${count} — we appreciate your trust in Fegor Homes Ltd.
      </p>
    `;
  });
}

document.addEventListener("DOMContentLoaded", initContactForm);