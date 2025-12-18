// Set current year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile Menu Toggle
const navToggle = document.getElementById("navToggle");
const mobileMenu = document.getElementById("mobileMenu");

if (navToggle) {
  navToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });
}

// Auto-scroll Testimonials
const slider = document.getElementById("testimonialSlider");
let scrollValue = 0;

if (slider) {
  setInterval(() => {
    const cardWidth = slider.querySelector("div")?.offsetWidth + 16 || 300;

    scrollValue += cardWidth;

    if (scrollValue >= slider.scrollWidth - slider.clientWidth) {
      scrollValue = 0;
    }

    slider.scrollTo({
      left: scrollValue,
      behavior: "smooth"
    });
  }, 3000);
}


// Auto-scroll for School Activities Gallery
const activitySlider = document.getElementById("activitySlider");
let activityScroll = 0;

if (activitySlider) {
  setInterval(() => {
    const imgWidth = activitySlider.querySelector("img")?.offsetWidth + 16 || 280;

    activityScroll += imgWidth;

    if (activityScroll >= activitySlider.scrollWidth - activitySlider.clientWidth) {
      activityScroll = 0;
    }

    activitySlider.scrollTo({
      left: activityScroll,
      behavior: "smooth"
    });
  }, 2800);
}

// Auto-scroll for WhatsApp feedback slider
const whatsappSlider = document.getElementById("whatsappSlider");
let whatsappScroll = 0;

if (whatsappSlider) {
  setInterval(() => {
    const card = whatsappSlider.querySelector(".wa-card");
    const cardWidth = card ? card.offsetWidth + 16 : 280; // card width + gap

    whatsappScroll += cardWidth;

    if (whatsappScroll >= whatsappSlider.scrollWidth - whatsappSlider.clientWidth) {
      whatsappScroll = 0;
    }

    whatsappSlider.scrollTo({
      left: whatsappScroll,
      behavior: "smooth"
    });
  }, 3200);
}

// Scroll Reveal Animation for About Section
const aboutElements = document.querySelectorAll(".about-animate");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.remove("opacity-0", "translate-y-6");
      entry.target.classList.add("opacity-100", "translate-y-0");
    }
  });
}, {
  threshold: 0.2
});

aboutElements.forEach(el => observer.observe(el));

// Currency Toggle
const toggle = document.getElementById("currencyToggle");

toggle.addEventListener("change", () => {
  const inrPrices = document.querySelectorAll(".price-inr");
  const usdPrices = document.querySelectorAll(".price-usd");

  if (toggle.checked) {
    // Show USD
    inrPrices.forEach(el => el.classList.add("hidden"));
    usdPrices.forEach(el => el.classList.remove("hidden"));
  } else {
    // Show INR
    inrPrices.forEach(el => el.classList.remove("hidden"));
    usdPrices.forEach(el => el.classList.add("hidden"));
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".counter");

  const observer = new IntersectionObserver(entries => {
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
      observer.unobserve(numberEl);
    });
  });

  counters.forEach(counter => observer.observe(counter));
});
