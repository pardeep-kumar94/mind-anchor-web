// MindAnchor Marketing Website - Main JavaScript

// ==========================================
// Navigation Functionality
// ==========================================
document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".nav-link");

  // Toggle mobile menu
  if (hamburger) {
    hamburger.addEventListener("click", function () {
      navMenu.classList.toggle("active");
      hamburger.classList.toggle("active");
    });
  }

  // Smooth scroll for navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href.startsWith("#")) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
          // Close mobile menu if open
          if (navMenu.classList.contains("active")) {
            navMenu.classList.remove("active");
            hamburger.classList.remove("active");
          }

          // Smooth scroll to section
          const navHeight = document.querySelector(".navbar").offsetHeight;
          const targetPosition = targetSection.offsetTop - navHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });

          // Update active state
          navLinks.forEach((l) => l.classList.remove("active"));
          this.classList.add("active");
        }
      }
    });
  });

  // Update active nav link on scroll
  window.addEventListener("scroll", function () {
    let current = "";
    const sections = document.querySelectorAll("section[id]");
    const navHeight = document.querySelector(".navbar").offsetHeight;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - navHeight - 100;
      const sectionHeight = section.offsetHeight;

      if (
        window.pageYOffset >= sectionTop &&
        window.pageYOffset < sectionTop + sectionHeight
      ) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });

    // Add shadow to navbar on scroll
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
      navbar.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.3)";
    } else {
      navbar.style.boxShadow = "none";
    }
  });
});

// ==========================================
// Intersection Observer for Animations
// ==========================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const fadeInObserver = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Apply fade-in animation to sections
document.addEventListener("DOMContentLoaded", function () {
  const animatedElements = document.querySelectorAll(
    ".problem-card, .feature-showcase, .persona-card, .pricing-card, .testimonial-card"
  );

  animatedElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    fadeInObserver.observe(el);
  });
});

// ==========================================
// Pricing Toggle (Annual/Monthly)
// ==========================================
document.addEventListener("DOMContentLoaded", function () {
  // Add this if you want to implement annual/monthly pricing toggle
  const pricingToggle = document.querySelector(".pricing-toggle");

  if (pricingToggle) {
    pricingToggle.addEventListener("click", function () {
      const isAnnual = this.classList.toggle("annual");
      updatePricing(isAnnual);
    });
  }
});

function updatePricing(isAnnual) {
  // This function would update pricing display if we had a toggle
  // Currently kept for future enhancement
  const prices = {
    pro: {
      monthly: 12,
      annual: 120,
    },
    teams: {
      monthly: 18,
      annual: 180,
    },
  };

  // Update price displays
  // Implementation would go here
}

// ==========================================
// Download Button Click Tracking
// ==========================================
document.addEventListener("DOMContentLoaded", function () {
  const downloadButtons = document.querySelectorAll(".download-btn");

  downloadButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      // Prevent default for demo purposes
      // In production, this would link to actual download
      e.preventDefault();

      const platform = this.textContent.includes("Windows")
        ? "Windows"
        : this.textContent.includes("macOS")
        ? "macOS"
        : "Linux";

      showDownloadModal(platform);
    });
  });
});

function showDownloadModal(platform) {
  // Create a simple modal
  const modal = document.createElement("div");
  modal.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #1A1A1A;
        padding: 2rem;
        border-radius: 12px;
        border: 2px solid #FF6B35;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        text-align: center;
        min-width: 400px;
    `;

  modal.innerHTML = `
        <h3 style="color: #FF6B35; margin-bottom: 1rem; font-family: Raleway, sans-serif;">Download MindAnchor for ${platform}</h3>
        <p style="color: #6A6A6A; margin-bottom: 1.5rem; font-family: Raleway, sans-serif;">
            Thank you for your interest! The download would start automatically in a production environment.
        </p>
        <button id="closeModal" style="
            padding: 0.75rem 2rem;
            background: #FF6B35;
            color: white;
            border: none;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            font-family: Raleway, sans-serif;
        ">Close</button>
    `;

  // Create backdrop
  const backdrop = document.createElement("div");
  backdrop.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        z-index: 9999;
    `;

  document.body.appendChild(backdrop);
  document.body.appendChild(modal);

  // Close modal
  const closeBtn = modal.querySelector("#closeModal");
  const closeModal = () => {
    document.body.removeChild(modal);
    document.body.removeChild(backdrop);
  };

  closeBtn.addEventListener("click", closeModal);
  backdrop.addEventListener("click", closeModal);
}

// ==========================================
// Counter Animation for Stats
// ==========================================
function animateCounter(element, target, duration = 2000) {
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = formatStatNumber(target);
      clearInterval(timer);
    } else {
      element.textContent = formatStatNumber(Math.floor(current));
    }
  }, 16);
}

function formatStatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M+";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(0) + "K+";
  }
  return num.toString();
}

// Animate stats when they come into view
document.addEventListener("DOMContentLoaded", function () {
  const statObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (
          entry.isIntersecting &&
          !entry.target.classList.contains("animated")
        ) {
          entry.target.classList.add("animated");
          const target = entry.target.getAttribute("data-target");
          if (target) {
            animateCounter(entry.target, parseInt(target));
          }
        }
      });
    },
    { threshold: 0.5 }
  );

  const statNumbers = document.querySelectorAll(".stat-number");
  statNumbers.forEach((stat) => {
    const text = stat.textContent;
    let targetValue = 0;

    if (text.includes("K+")) {
      targetValue = parseInt(text) * 1000;
    } else if (text.includes("M+")) {
      targetValue = parseInt(text) * 1000000;
    } else if (text.includes("★")) {
      // Skip rating stats
      return;
    }

    if (targetValue > 0) {
      stat.setAttribute("data-target", targetValue);
      stat.textContent = "0";
      statObserver.observe(stat);
    }
  });
});

// ==========================================
// CTA Button Hover Effects
// ==========================================
document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".btn");

  buttons.forEach((button) => {
    button.addEventListener("mouseenter", function () {
      this.style.transition = "all 0.3s ease";
    });

    button.addEventListener("mouseleave", function () {
      this.style.transition = "all 0.3s ease";
    });
  });
});

// ==========================================
// Scroll Progress Indicator
// ==========================================
document.addEventListener("DOMContentLoaded", function () {
  // Create progress bar
  const progressBar = document.createElement("div");
  progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #FF6B35 0%, #FF8A5C 100%);
        width: 0%;
        z-index: 10000;
        transition: width 0.1s ease;
    `;
  document.body.appendChild(progressBar);

  window.addEventListener("scroll", function () {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;

    progressBar.style.width = scrollPercent + "%";
  });
});

// ==========================================
// Easter Egg: Konami Code
// ==========================================
(function () {
  const konamiCode = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a",
  ];
  let konamiIndex = 0;

  document.addEventListener("keydown", function (e) {
    if (e.key === konamiCode[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === konamiCode.length) {
        activateEasterEgg();
        konamiIndex = 0;
      }
    } else {
      konamiIndex = 0;
    }
  });

  function activateEasterEgg() {
    // Add confetti or special animation
    const message = document.createElement("div");
    message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #FF6B35 0%, #FF8A5C 100%);
            padding: 2rem 3rem;
            border-radius: 20px;
            font-size: 2rem;
            font-weight: 900;
            color: white;
            z-index: 10000;
            font-family: Raleway, sans-serif;
            box-shadow: 0 8px 32px rgba(255, 107, 53, 0.5);
            animation: bounceIn 0.5s ease;
        `;
    message.textContent = "🎉 You found the secret! 🚀";

    document.body.appendChild(message);

    setTimeout(() => {
      message.style.animation = "bounceOut 0.5s ease";
      setTimeout(() => {
        document.body.removeChild(message);
      }, 500);
    }, 2000);
  }
})();

// ==========================================
// Form Validation (for future contact forms)
// ==========================================
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validateForm(formData) {
  const errors = [];

  if (!formData.name || formData.name.trim().length < 2) {
    errors.push("Name must be at least 2 characters");
  }

  if (!validateEmail(formData.email)) {
    errors.push("Please enter a valid email address");
  }

  if (!formData.message || formData.message.trim().length < 10) {
    errors.push("Message must be at least 10 characters");
  }

  return {
    isValid: errors.length === 0,
    errors: errors,
  };
}

// ==========================================
// Performance Optimization: Lazy Loading
// ==========================================
document.addEventListener("DOMContentLoaded", function () {
  // Lazy load images if any are added
  const lazyImages = document.querySelectorAll("img[data-src]");

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute("data-src");
        imageObserver.unobserve(img);
      }
    });
  });

  lazyImages.forEach((img) => imageObserver.observe(img));
});

// ==========================================
// Console Easter Egg for Developers
// ==========================================
console.log(
  "%c👋 Hey Developer!",
  "font-size: 24px; font-weight: bold; color: #FF6B35;"
);
console.log(
  "%cLooking for a productivity tool? We're hiring! Check out our careers page.",
  "font-size: 14px; color: #6A6A6A;"
);
console.log(
  "%cBuilt with 🧡 using vanilla JS, CSS Grid, and lots of coffee.",
  "font-size: 12px; color: #FF6B35;"
);

// ==========================================
// Typeform Survey Integration
// ==========================================
document.addEventListener("DOMContentLoaded", function () {
  // Configuration - Replace with your Typeform URL
  const TYPEFORM_URL = "https://form.typeform.com/to/CYLwCzTw";

  const floatingSurvey = document.getElementById("floatingSurvey");

  function openTypeform(e) {
    e.preventDefault();

    // Open Typeform in a new popup window
    const width = 800;
    const height = 600;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;

    window.open(
      TYPEFORM_URL,
      "MindAnchor Survey",
      `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`
    );

    // Track survey click
    console.log("Survey opened at:", new Date().toISOString());
  }

  // Add click event listeners to all survey buttons
  const surveyButtons = [
    floatingSurvey,
    document.getElementById("mainSurveyBtn"),
  ];

  surveyButtons.forEach((button) => {
    if (button) {
      button.addEventListener("click", openTypeform);
    }
  });

  // Floating button scroll behavior
  if (floatingSurvey) {
    floatingSurvey.addEventListener("click", openTypeform);

    // Hide floating button on scroll down, show on scroll up
    let lastScroll = 0;
    window.addEventListener("scroll", function () {
      const currentScroll = window.pageYOffset;

      if (currentScroll <= 0) {
        floatingSurvey.style.transform = "translateY(0)";
        floatingSurvey.style.opacity = "1";
      } else if (currentScroll > lastScroll && currentScroll > 500) {
        // Scrolling down & past 500px
        floatingSurvey.style.transform = "translateY(150px)";
        floatingSurvey.style.opacity = "0";
      } else {
        // Scrolling up
        floatingSurvey.style.transform = "translateY(0)";
        floatingSurvey.style.opacity = "1";
      }

      lastScroll = currentScroll;
    });
  }
});

function showSurveyConfigModal() {
  const modal = document.createElement("div");
  modal.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #1A1A1A 0%, #2A2A2A 100%);
        padding: 2.5rem;
        border-radius: 20px;
        border: 2px solid #FF6B35;
        box-shadow: 0 16px 48px rgba(0, 0, 0, 0.4);
        z-index: 10000;
        text-align: center;
        max-width: 500px;
        width: 90%;
    `;

  modal.innerHTML = `
        <div style="font-size: 3rem; margin-bottom: 1rem;">📋</div>
        <h3 style="color: #FF6B35; margin-bottom: 1rem; font-family: 'Sora', sans-serif; font-size: 1.5rem;">
            Survey Configuration Needed
        </h3>
        <p style="color: #8A8A8A; margin-bottom: 1.5rem; font-family: 'Inter', sans-serif; line-height: 1.6;">
            To enable the survey feature, please add your Typeform URL in the JavaScript file:
        </p>
        <div style="
            background: #0A0A0A;
            padding: 1rem;
            border-radius: 8px;
            font-family: 'Space Grotesk', monospace;
            font-size: 0.875rem;
            color: #FF6B35;
            margin-bottom: 1.5rem;
            text-align: left;
            overflow-x: auto;
        ">
            const TYPEFORM_URL = 'https://form.typeform.com/to/CYLwCzTw';
        </div>
        <button id="closeConfigModal" style="
            padding: 0.75rem 2rem;
            background: linear-gradient(135deg, #FF6B35 0%, #FF8A5C 100%);
            color: white;
            border: none;
            border-radius: 50px;
            font-weight: 600;
            cursor: pointer;
            font-family: 'Sora', sans-serif;
            font-size: 1rem;
            transition: all 0.3s ease;
        " onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
            Got It
        </button>
    `;

  const backdrop = document.createElement("div");
  backdrop.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.85);
        backdrop-filter: blur(10px);
        z-index: 9999;
    `;

  document.body.appendChild(backdrop);
  document.body.appendChild(modal);

  const closeBtn = modal.querySelector("#closeConfigModal");
  const closeModal = () => {
    document.body.removeChild(modal);
    document.body.removeChild(backdrop);
  };

  closeBtn.addEventListener("click", closeModal);
  backdrop.addEventListener("click", closeModal);
}

// Alternative: Embed Typeform inline (uncomment to use)
// This will embed the Typeform directly on the page when clicked
/*
function embedTypeform(e) {
    e.preventDefault();

    const TYPEFORM_EMBED_ID = 'YOUR_FORM_ID'; // e.g., 'abc12345'

    const embedContainer = document.createElement('div');
    embedContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.9);
        backdrop-filter: blur(10px);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2rem;
    `;

    const iframe = document.createElement('iframe');
    iframe.src = `https://form.typeform.com/to/${TYPEFORM_EMBED_ID}`;
    iframe.style.cssText = `
        width: 100%;
        max-width: 800px;
        height: 600px;
        border: none;
        border-radius: 20px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
    `;

    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '✕';
    closeBtn.style.cssText = `
        position: absolute;
        top: 1rem;
        right: 1rem;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: #FF6B35;
        color: white;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        transition: all 0.3s ease;
    `;

    closeBtn.addEventListener('click', () => {
        document.body.removeChild(embedContainer);
    });

    embedContainer.appendChild(iframe);
    embedContainer.appendChild(closeBtn);
    document.body.appendChild(embedContainer);
}
*/

// ==========================================
// Export functions for potential use in modules
// ==========================================
window.MindAnchor = {
  validateEmail,
  validateForm,
  showDownloadModal,
  openTypeform: openTypeform || null,
};
