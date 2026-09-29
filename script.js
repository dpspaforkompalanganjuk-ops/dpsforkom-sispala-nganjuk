document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");
  const body = document.body;

  // Mobile navigation
  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", open ? "true" : "false");
      body.classList.toggle("menu-open", open);
    });

    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        body.classList.remove("menu-open");
      });
    });
  }

  // Current year
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Scroll reveal
  const revealItems = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach(item => observer.observe(item));

  // Gallery lightbox
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightbox-image");
  const closeLightbox = document.querySelector(".lightbox-close");

  document.querySelectorAll(".gallery-card").forEach(card => {
    card.addEventListener("click", () => {
      const src = card.dataset.image;
      if (!src) return;

      const probe = new Image();
      probe.onload = () => {
        lightboxImage.src = src;
        lightbox.classList.add("open");
        lightbox.setAttribute("aria-hidden", "false");
        body.classList.add("menu-open");
      };
      probe.onerror = () => {
        // If the example image has not been uploaded yet, do nothing.
      };
      probe.src = src;
    });
  });

  function closeBox() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImage.src = "";
    body.classList.remove("menu-open");
  }

  closeLightbox?.addEventListener("click", closeBox);
  lightbox?.addEventListener("click", event => {
    if (event.target === lightbox) closeBox();
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeBox();
  });

  // Prevent placeholder contact links from jumping to the top.
  document.querySelectorAll('a[href="#"]').forEach(link => {
    link.addEventListener("click", event => event.preventDefault());
  });
});
