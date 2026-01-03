async function loadSection(id, file) {
  const res = await fetch(file);
  document.getElementById(id).innerHTML = await res.text();
}

async function loadAllSections() {
  await loadSection("navbar", "partials/navbar.html");
  await loadSection("hero", "partials/hero.html");
  await loadSection("trust", "partials/trust.html");
  await loadSection("courses", "partials/courses.html");
  await loadSection("projects", "partials/projects.html");
  await loadSection("activities", "partials/activities.html");
  await loadSection("testimonials", "partials/testimonials.html");
  await loadSection("whatsapp", "partials/whatsapp.html");
  await loadSection("about", "partials/about.html");
  await loadSection("contact", "partials/contact.html");
  await loadSection("footer", "partials/footer.html");
}

function initSite() {
  // Hero typing animation
  const typingEl = document.getElementById("typing-text");

  if (typingEl) {
    // Respect reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      typingEl.textContent = "taught with clarity.";
      typingEl.classList.remove("border-r");
    } else {
      const words = [
        "made simple.",
        "built to last.",
        "taught with clarity."
      ];

      let wordIndex = 0;
      let charIndex = 0;
      const typeSpeed = 110;
      const holdDelay = 1200;

      function type() {
        const currentWord = words[wordIndex];
        typingEl.textContent = currentWord.slice(0, charIndex + 1);
        charIndex++;

        if (charIndex < currentWord.length) {
          setTimeout(type, typeSpeed);
        } else if (wordIndex < words.length - 1) {
          setTimeout(() => {
            wordIndex++;
            charIndex = 0;
            type();
          }, holdDelay);
        } else {
          // Final word → stop cursor
          typingEl.classList.remove("border-r");
        }
      }

      type();
    }
  }

  // Trust section counters
  const counters = document.querySelectorAll(".counter");

  if (counters.length) {
    const counterObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const numberEl = entry.target;
        const suffixEl = numberEl.nextElementSibling;
        const target = Number(numberEl.dataset.target);
        let count = 0;

        const update = () => {
          count += target / 60;

          if (count < target) {
            numberEl.textContent = Math.ceil(count);
            requestAnimationFrame(update);
          } else {
            numberEl.textContent = target;

            // Reveal suffix after counting finishes
            if (suffixEl) {
              suffixEl.classList.remove("opacity-0", "translate-y-1");
              suffixEl.classList.add("opacity-100", "translate-y-0");
            }
          }
        };

        update();
        counterObserver.unobserve(numberEl);
      });
    }, { threshold: 0.3 });

    counters.forEach(counter => counterObserver.observe(counter));
  }

  // Currency toggle
  const toggle = document.getElementById("currencyToggle");
  if (toggle) {
    toggle.addEventListener("change", () => {
      document.querySelectorAll(".price-inr").forEach(el => el.classList.toggle("hidden", toggle.checked));
      document.querySelectorAll(".price-usd").forEach(el => el.classList.toggle("hidden", !toggle.checked));
    });
  }

  // Age filter
  const buttons = document.querySelectorAll(".age-btn");
  const cards = document.querySelectorAll(".flip-card");
  if (buttons.length && cards.length) {
    buttons.forEach(btn => {
      btn.addEventListener("click", () => {
        const filter = btn.dataset.filter;
        buttons.forEach(b => b.classList.remove("bg-slate-900", "text-white"));
        btn.classList.add("bg-slate-900", "text-white");

        cards.forEach(card => {
          const ages = card.dataset.age.split(" ");
          card.style.display = filter === "all" || ages.includes(filter) ? "block" : "none";
        });
      });
    });
  }

  // Flip cards
  cards.forEach(card => {
    card.addEventListener("click", () => {
      card.classList.toggle("active");
    });
  });

  // About section scroll animation
  const aboutElements = document.querySelectorAll(".about-animate");

  if (aboutElements.length) {
    const aboutObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("opacity-0", "translate-y-6");
            entry.target.classList.add("opacity-100", "translate-y-0");
            aboutObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    aboutElements.forEach(el => aboutObserver.observe(el));
  }

  // Testimonials slider
  const slider = document.getElementById("testimonialSlider");
  let scrollValue = 0;
  if (slider) {
    setInterval(() => {
      const cardWidth = slider.querySelector("div")?.offsetWidth + 16 || 300;
      scrollValue += cardWidth;
      if (scrollValue >= slider.scrollWidth - slider.clientWidth) {
        scrollValue = 0;
      }
      slider.scrollTo({ left: scrollValue, behavior: "smooth" });
    }, 3000);
  }

  // Activities slider
  const activitySlider = document.getElementById("activitySlider");
  let activityScroll = 0;
  if (activitySlider) {
    setInterval(() => {
      const imgWidth = activitySlider.querySelector("img")?.offsetWidth + 16 || 280;
      activityScroll += imgWidth;
      if (activityScroll >= activitySlider.scrollWidth - activitySlider.clientWidth) {
        activityScroll = 0;
      }
      activitySlider.scrollTo({ left: activityScroll, behavior: "smooth" });
    }, 2800);
  }

  // WhatsApp slider
  const whatsappSlider = document.getElementById("whatsappSlider");
  let whatsappScroll = 0;
  if (whatsappSlider) {
    setInterval(() => {
      const card = whatsappSlider.querySelector(".wa-card");
      const cardWidth = card ? card.offsetWidth + 16 : 280;
      whatsappScroll += cardWidth;
      if (whatsappScroll >= whatsappSlider.scrollWidth - whatsappSlider.clientWidth) {
        whatsappScroll = 0;
      }
      whatsappSlider.scrollTo({ left: whatsappScroll, behavior: "smooth" });
    }, 3200);
  }

  // Mobile menu
  const navToggle = document.getElementById("navToggle");
  const mobileMenu = document.getElementById("mobileMenu");
  if (navToggle && mobileMenu) {
    navToggle.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }

  // Footer year
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

}

document.addEventListener("DOMContentLoaded", async () => {
  await loadAllSections();
  initSite();
});

