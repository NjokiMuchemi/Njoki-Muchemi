console.log('script.js loaded — hello Njoki!');

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded and parsed');

  // update copyright year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // theme toggle
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    const saved = localStorage.getItem('theme') || 'light';
    document.body.classList.toggle('dark', saved === 'dark');
    themeToggle.setAttribute('aria-pressed', saved === 'dark');

    themeToggle.addEventListener('click', () => {
      const isDark = document.body.classList.toggle('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      themeToggle.setAttribute('aria-pressed', isDark);
    });
  }

  // mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('nav ul');
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('show');
    });
  }

  // ---------------------- anchor scrolling WITH header offset ----------------------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (!href || href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      const header = document.querySelector('header');
      const headerOffset = header ? header.offsetHeight : 0;
      const buffer = 12;

      const elementTop = target.getBoundingClientRect().top + window.pageYOffset;
      const scrollToPos = elementTop - headerOffset - buffer;

      window.scrollTo({ top: scrollToPos, behavior: 'smooth' });
      history.pushState(null, '', href);

      if (navMenu && navMenu.classList.contains('show')) {
        navMenu.classList.remove('show');
      }
    });
  });
});

// Contact Form Submission with EmailJS
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function(e) {
    e.preventDefault();

    emailjs.sendForm(
      "service_370jhtf",    // replace with your EmailJS Service ID
      "template_pja8ug8",   // your template ID
      this
    )
    .then(function() {
      showFormMessage("✅ Thank you! Your message has been sent.", "success");
      contactForm.reset();
    }, function(error) {
      console.error("FAILED...", error);
      showFormMessage("⚠️ Oops! Something went wrong. Please try again.", "error");
    });
  });
}

// helper: show a short message above the form
function showFormMessage(text, type = "info") {
  let msg = document.getElementById("formMessage");
  msg.textContent = text;
  msg.className = `form-message ${type}`;
  setTimeout(() => { msg.textContent = ""; msg.className = "form-message"; }, 4000);
}

// ---------------------- highlight active nav link ----------------------
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 80;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// ---------------------- email validation helper ----------------------
function validateEmail(email) {
  // Simple regex to check format
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

// ---------------------- scroll animations ----------------------
const faders = document.querySelectorAll('.fade-in');

function handleScroll() {
  faders.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.classList.add('show');
    }
  });
}

window.addEventListener('scroll', handleScroll);
handleScroll();
