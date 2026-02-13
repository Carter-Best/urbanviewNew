/**
 * Urban View Plus - Aluminium & Metal Fabrication
 * Main JavaScript
 */

document.addEventListener("DOMContentLoaded", function () {
  // Mobile Navigation Toggle
  const navToggle = document.getElementById("navToggle");
  const nav = document.getElementById("nav");

  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      navToggle.classList.toggle("active");
      nav.classList.toggle("active");
      document.body.style.overflow = nav.classList.contains("active")
        ? "hidden"
        : "";
    });

    // Close nav when clicking a link
    nav.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        navToggle.classList.remove("active");
        nav.classList.remove("active");
        document.body.style.overflow = "";
      });
    });
  }

  // Header scroll effect
  const header = document.getElementById("header");
  if (header) {
    let lastScroll = 0;
    window.addEventListener("scroll", () => {
      const currentScroll = window.pageYOffset;
      if (currentScroll > 80) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
      lastScroll = currentScroll;
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href === "#") return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Testimonial Slider
  const testimonialCards = document.querySelectorAll(".testimonial-card");
  const dotsContainer = document.getElementById("testimonialDots");

  if (testimonialCards.length > 0 && dotsContainer) {
    testimonialCards.forEach((_, index) => {
      const dot = document.createElement("button");
      dot.className = "testimonial-dot" + (index === 0 ? " active" : "");
      dot.setAttribute("aria-label", `View testimonial ${index + 1}`);
      dot.addEventListener("click", () => showTestimonial(index));
      dotsContainer.appendChild(dot);
    });

    let currentIndex = 0;
    const dots = dotsContainer.querySelectorAll(".testimonial-dot");

    function showTestimonial(index) {
      testimonialCards.forEach((card, i) => {
        card.classList.toggle("active", i === index);
      });
      dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
      });
      currentIndex = index;
    }

    // Auto-advance testimonials
    setInterval(() => {
      currentIndex = (currentIndex + 1) % testimonialCards.length;
      showTestimonial(currentIndex);
    }, 6000);
  }

  // Portfolio Lightbox
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxClose = document.getElementById("lightboxClose");
  const portfolioItems = document.querySelectorAll('[data-lightbox="gallery"]');

  if (lightbox && lightboxImg && portfolioItems.length > 0) {
    portfolioItems.forEach((item) => {
      item.addEventListener("click", function (e) {
        e.preventDefault();
        const imgSrc = this.getAttribute("href");
        lightboxImg.src = imgSrc;
        lightboxImg.alt = this.getAttribute("data-caption") || "Project image";
        lightbox.classList.add("active");
        lightbox.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
      });
    });

    function closeLightbox() {
      lightbox.classList.remove("active");
      lightbox.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }

    if (lightboxClose) {
      lightboxClose.addEventListener("click", closeLightbox);
    }

    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && lightbox.classList.contains("active")) {
        closeLightbox();
      }
    });
  }

  // Contact Form Handling
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      if (!name || !phone || !email || !message) {
        showFormMessage("Please fill in all required fields.", "error");
        return;
      }

      // Simulate form submission (replace with actual backend/API)
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = "Sending...";
      submitBtn.disabled = true;

      setTimeout(() => {
        showFormMessage(
          "Thank you! Your message has been sent. We will contact you shortly.",
          "success",
        );
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 1500);
    });
  }

  function showFormMessage(text, type) {
    let messageEl = document.querySelector(".form-message");
    if (!messageEl) {
      messageEl = document.createElement("div");
      messageEl.className = "form-message";
      contactForm.insertBefore(messageEl, contactForm.firstChild);
    }
    messageEl.textContent = text;
    messageEl.className = "form-message " + type;
    messageEl.style.display = "block";
    messageEl.style.padding = "16px";
    messageEl.style.borderRadius = "8px";
    messageEl.style.marginBottom = "20px";
    messageEl.style.fontWeight = "500";
    messageEl.style.background =
      type === "success" ? "rgba(34, 197, 94, 0.2)" : "rgba(239, 68, 68, 0.2)";
    messageEl.style.color = type === "success" ? "#22c55e" : "#ef4444";

    setTimeout(() => {
      messageEl.style.display = "none";
    }, 5000);
  }

  // Scroll-triggered animations (optional enhancement)
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");
      }
    });
  }, observerOptions);

  // Add animation class to elements
  document
    .querySelectorAll(
      ".service-card, .portfolio-item, .why-card, .about-content, .about-images",
    )
    .forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
      el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      observer.observe(el);
    });

  // Apply animate-in styles
  const style = document.createElement("style");
  style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
  document.head.appendChild(style);
});

// gallery page script
const images = document.querySelectorAll(".gallery-item img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".close");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

let currentIndex = 0;

images.forEach((img, index) => {
  img.addEventListener("click", () => {
    lightbox.style.display = "flex";
    lightboxImg.src = img.src;
    currentIndex = index;
  });
});

closeBtn.addEventListener("click", () => {
  lightbox.style.display = "none";
});

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % images.length;
  lightboxImg.src = images[currentIndex].src;
});

prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  lightboxImg.src = images[currentIndex].src;
});

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    lightbox.style.display = "none";
  }
});
