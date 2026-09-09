/* =========================
   MOBILE NAVIGATION
========================= */

const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

if (navToggle) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });
}


/* =========================
   CONTACT FORM
========================= */

const contactForm = document.getElementById("contactForm");
const sendButton = document.getElementById("sendButton");

if (contactForm) {
  contactForm.addEventListener("submit", () => {

    if (sendButton) {
      sendButton.disabled = true;
      sendButton.textContent = "Sending...";
    }

  });
}
