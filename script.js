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
