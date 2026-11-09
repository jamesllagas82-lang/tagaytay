"use strict";

// ==============================
// ELEMENT SELECTORS
// ==============================

const menuToggle = document.getElementById("menu-toggle");
const navbar = document.getElementById("navbar");
const navLinks = document.querySelectorAll(".nav-link");
const header = document.getElementById("header");

// ==============================
// MOBILE NAVIGATION
// ==============================

function closeMobileMenu() {
  if (!navbar || !menuToggle) return;

  navbar.classList.remove("show");

  menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");
}

if (menuToggle && navbar) {
  // Toggle mobile menu
  menuToggle.addEventListener("click", () => {
    const isOpen = navbar.classList.toggle("show");

    menuToggle.innerHTML = isOpen
      ? '<i class="fas fa-times"></i>'
      : '<i class="fas fa-bars"></i>';

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu",
    );
  });

  // Close menu when a navigation link is clicked
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeMobileMenu();
    });
  });

  // Close menu when Escape is pressed
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navbar.classList.contains("show")) {
      closeMobileMenu();
      menuToggle.focus();
    }
  });

  // Close mobile menu when switching to desktop
  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
      closeMobileMenu();
    }
  });
}

// ==============================
// HEADER SCROLL EFFECT
// ==============================

function updateHeader() {
  if (!header) return;

  header.classList.toggle("scrolled", window.scrollY > 60);
}

window.addEventListener("scroll", updateHeader, {
  passive: true,
});

updateHeader();

// ==============================
// ACTIVE NAVIGATION LINK
// ==============================

const sections = document.querySelectorAll("section[id]");

function setActiveLink(targetId) {
  navLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${targetId}`;

    link.classList.toggle("active", isActive);

    if (isActive) {
      link.setAttribute("aria-current", "location");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

// Highlight the clicked link immediately
navLinks.forEach((link) => {
  link.addEventListener("click", function () {
    const target = this.getAttribute("href");

    if (!target || !target.startsWith("#")) return;

    const targetSection = document.querySelector(target);

    if (!targetSection) return;

    // Immediately move the underline to the clicked link
    setActiveLink(targetSection.id);

    // Close mobile menu if it is open
    closeMobileMenu();
  });
});

// Update active link according to the section being viewed
function updateActiveLink() {
  if (!sections.length || !navLinks.length) return;

  const headerHeight = header ? header.offsetHeight : 0;
  const scrollPosition = window.scrollY + headerHeight + 100;

  let currentSection = sections[0].id;

  sections.forEach((section) => {
    const sectionTop = section.getBoundingClientRect().top + window.scrollY;

    if (scrollPosition >= sectionTop) {
      currentSection = section.id;
    }
  });

  // Highlight the last section when reaching the page bottom
  if (
    window.innerHeight + window.scrollY >=
    document.documentElement.scrollHeight - 5
  ) {
    currentSection = sections[sections.length - 1].id;
  }

  setActiveLink(currentSection);
}

window.addEventListener("scroll", updateActiveLink, {
  passive: true,
});

window.addEventListener("load", updateActiveLink);
window.addEventListener("resize", updateActiveLink);

updateActiveLink();

// ==============================
// CONTACT FORM VALIDATION
// ==============================

const contactForm = document.getElementById("contact-form");
const formNote = document.getElementById("form-note");

if (contactForm && formNote) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name")?.value.trim() || "";

    const email = document.getElementById("email")?.value.trim() || "";

    const subject = document.getElementById("subject")?.value.trim() || "";

    const message = document.getElementById("message")?.value.trim() || "";

    // Check for empty fields
    if (!name || !email || !subject || !message) {
      formNote.textContent = "Please complete all fields.";
      return;
    }

    // Check email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      formNote.textContent = "Please enter a valid email address.";
      return;
    }

    // Frontend validation only; no message is sent yet
    formNote.textContent =
      "Your inquiry has been validated. Connect this form to an email service or backend to send it.";

    contactForm.reset();
  });
}

// ==============================
// AUTOMATIC FOOTER YEAR
// ==============================

const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}
