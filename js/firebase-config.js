// Firebase Analytics Configuration
// Replace the firebaseConfig object with your own Firebase project credentials

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAnalytics,
  logEvent,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";

// ==========================================
// Firebase Configuration
// ==========================================
// TODO: Replace this with your actual Firebase config
// Get this from: Firebase Console > Project Settings > Your Apps > SDK setup and configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQaCbD51X7_2p_xWsu74bcjo-qbXsuts0",
  authDomain: "mindachor.firebaseapp.com",
  projectId: "mindachor",
  storageBucket: "mindachor.firebasestorage.app",
  messagingSenderId: "177608891999",
  appId: "1:177608891999:web:68bfd7aba6cf31859805ea",
  measurementId: "G-8D57WWEFJB",
};

// Initialize Firebase
let analytics = null;
let app = null;

try {
  app = initializeApp(firebaseConfig);
  analytics = getAnalytics(app);
  console.log("✅ Firebase Analytics initialized successfully");

  // Log page view
  logEvent(analytics, "page_view", {
    page_title: document.title,
    page_location: window.location.href,
    page_path: window.location.pathname,
  });
} catch (error) {
  console.warn(
    "⚠️ Firebase Analytics not configured. Please add your Firebase credentials."
  );
  console.warn("Error details:", error.message);
}

// ==========================================
// Custom Event Tracking Functions
// ==========================================

// Track button clicks
export function trackButtonClick(buttonName, buttonLocation) {
  if (analytics) {
    logEvent(analytics, "button_click", {
      button_name: buttonName,
      button_location: buttonLocation,
      timestamp: new Date().toISOString(),
    });
  }
}

// Track survey interactions
export function trackSurveyOpen(source) {
  if (analytics) {
    logEvent(analytics, "survey_open", {
      source: source,
      timestamp: new Date().toISOString(),
    });
  }
}

// Track navigation clicks
export function trackNavigation(destination) {
  if (analytics) {
    logEvent(analytics, "navigation", {
      destination: destination,
      timestamp: new Date().toISOString(),
    });
  }
}

// Track scroll depth
export function trackScrollDepth(percentage) {
  if (analytics) {
    logEvent(analytics, "scroll_depth", {
      scroll_percentage: percentage,
      timestamp: new Date().toISOString(),
    });
  }
}

// Track feature interest
export function trackFeatureInterest(featureName) {
  if (analytics) {
    logEvent(analytics, "feature_interest", {
      feature_name: featureName,
      timestamp: new Date().toISOString(),
    });
  }
}

// Track outbound links
export function trackOutboundLink(url, linkText) {
  if (analytics) {
    logEvent(analytics, "outbound_link", {
      url: url,
      link_text: linkText,
      timestamp: new Date().toISOString(),
    });
  }
}

// Track time on page
export function trackTimeOnPage(seconds) {
  if (analytics) {
    logEvent(analytics, "time_on_page", {
      seconds: seconds,
      minutes: Math.floor(seconds / 60),
      timestamp: new Date().toISOString(),
    });
  }
}

// ==========================================
// Automatic Event Tracking
// ==========================================

// Track scroll depth automatically
let maxScrollDepth = 0;
const scrollMilestones = [25, 50, 75, 100];
const trackedMilestones = new Set();

window.addEventListener("scroll", () => {
  const scrollHeight =
    document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = window.scrollY;
  const scrollPercentage = Math.round((scrolled / scrollHeight) * 100);

  if (scrollPercentage > maxScrollDepth) {
    maxScrollDepth = scrollPercentage;
  }

  // Track milestone achievements
  scrollMilestones.forEach((milestone) => {
    if (scrollPercentage >= milestone && !trackedMilestones.has(milestone)) {
      trackedMilestones.add(milestone);
      trackScrollDepth(milestone);
    }
  });
});

// Track time on page
let startTime = Date.now();
window.addEventListener("beforeunload", () => {
  const timeSpent = Math.floor((Date.now() - startTime) / 1000);
  trackTimeOnPage(timeSpent);
});

// Track page visibility changes
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    trackTimeOnPage(timeSpent);
  } else {
    startTime = Date.now();
  }
});

// ==========================================
// Make tracking functions globally available
// ==========================================
window.FirebaseAnalytics = {
  trackButtonClick,
  trackSurveyOpen,
  trackNavigation,
  trackScrollDepth,
  trackFeatureInterest,
  trackOutboundLink,
  trackTimeOnPage,
  analytics,
};

// Export analytics instance
export { analytics };
