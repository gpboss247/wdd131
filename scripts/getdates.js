// Get the current year
const currentYear = new Date().getFullYear();

// Insert current year into footer
document.getElementById("currentyear").textContent = currentYear;

// Insert last modified date into footer
document.getElementById("lastModified").textContent =
    `Last Modification: ${document.lastModified}`;