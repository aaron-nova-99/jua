/* ============================================================
   JUA LANDING PAGE — CENTRAL CONFIGURATION
   ------------------------------------------------------------
   This is the SINGLE source of truth for:
     1. The Android APK download URL  (DOWNLOAD_URL)
     2. All Jua product image/screenshot paths (ASSETS)

   HOW TO USE:
   • When you have the final APK URL, set DOWNLOAD_URL once.
     Every "Download Jua" button on the site updates automatically.
   • Drop real Jua screenshots into the IMAGES/ folder and update
     only the matching path here. The layout never needs rewriting.

   IMPORTANT: Do NOT invent a download URL. Leave it "" until provided.
   ============================================================ */
window.JUA_CONFIG = {
  /* The Android APK download location (provided later). */
 DOWNLOAD_URL: "https://github.com/aaron-nova-99/jua/releases/download/v1.0.0-beta/Jua.apk",

  /* Brand color (Dodger Blue) — also referenced in CSS via --jua-blue. */
  BRAND: "#1E90FF",

  /*
     Product imagery. Keys are referenced in the HTML via
     data-asset="key". Missing files gracefully show a labeled
     placeholder (see js/main.js) and swap instantly when replaced.
  */
  ASSETS: {
    heroPhone:     "IMAGES/hero/hero-phone.png",          // Jua Home screenshot (hero phone)
    schoolProfile: "IMAGES/school_profile/school-profile.png", // School Profile screenshot
    explore:       "IMAGES/explore/explore-search.png",   // Explore / Search interface
    homeFeed:      "IMAGES/home/home-feed.png",           // Feed / post view
    highlights:    "IMAGES/highlights/highlights.png",    // Announcements / Highlights
    contact:       "IMAGES/contact/contact.png",          // School contact / location

    /* New photographic moments (school events & activities) */
    schoolActivity: "IMAGES/school_profile/school-activity.png", // For-Schools editorial moment
    community:      "IMAGES/general/community.png",              // School community photo
    clubSports:     "IMAGES/general/club-sports.png",            // Clubs photography
    clubScience:    "IMAGES/general/club-science.png",
    clubMusic:      "IMAGES/general/club-music.png",
    clubDebate:     "IMAGES/general/club-debate.png",
    byOakfield:     "IMAGES/general/oakfield.png",              // Beyond-your-school covers
    byRiverside:    "IMAGES/general/riverside.png",
    byNorthstar:    "IMAGES/general/northstar.png",
    schoolLife:     "IMAGES/general/school-life.png"            // Community / lifestyle strip
  },

  /* Social links used across the site (placeholders to update later). */
  SOCIAL: {
    instagram: "",
    twitter:   "",
    tiktok:    ""
  }
};
