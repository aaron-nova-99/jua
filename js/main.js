/* ============================================================
   JUA LANDING PAGE — MAIN SCRIPT (vanilla JS, no dependencies)
   ============================================================ */
(function () {
  "use strict";

  var CFG = window.JUA_CONFIG || { DOWNLOAD_URL: "", ASSETS: {} };
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Inline SVG placeholder (never broken images) ---------- */
  function placeholderSVG(label, w, h) {
    var color = CFG.BRAND || "#1E90FF";
    var svg =
      '<svg xmlns="http://www.w3.org/2000/svg" width="' + w + '" height="' + h +
      '" viewBox="0 0 ' + w + ' ' + h + '" role="img" aria-label="' + label + '">' +
      '<rect width="100%" height="100%" fill="#EAF4FF"/>' +
      '<rect x="12" y="12" width="' + (w - 24) + '" height="' + (h - 24) +
      '" rx="12" fill="#FFFFFF" opacity="0.85"/>' +
      '<text x="50%" y="47%" fill="' + color + '" font-family="Arial" font-size="' + Math.round(w / 14) +
      '" font-weight="700" text-anchor="middle">' + label + '</text>' +
      '<text x="50%" y="58%" fill="#8A93A6" font-family="Arial" font-size="' + Math.round(w / 22) +
      '" text-anchor="middle">Jua screenshot coming soon</text>' +
      '</svg>';
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  }

  /* ---------- Asset loader ---------- */
  function loadAssets() {
    document.querySelectorAll("[data-asset]").forEach(function (el) {
      var key = el.getAttribute("data-asset");
      var path = CFG.ASSETS[key];
      var label = el.getAttribute("data-label") || key;
      var container = el.closest("[data-slot]") || el.parentElement;
      var ph = null;

      if (!path) {
        el.src = placeholderSVG(label, 900, 1600);
        return;
      }

      el.alt = el.getAttribute("alt") || "Jua screenshot: " + label;

      // Labeled placeholder visible while the real shot loads.
      if (container) {
        ph = document.createElement("span");
        ph.className = "image-slot";
        ph.textContent = label + "\n(Jua screenshot)";
        container.appendChild(ph);
      }

      el.addEventListener("load", function () {
        el.classList.add("loaded");
        if (ph) ph.classList.add("loaded");
      });
      el.addEventListener("error", function () {
        el.src = placeholderSVG(label, 900, 1600);
        el.classList.add("loaded");
        if (ph) ph.classList.add("loaded");
      });

      el.src = path;
      el.loading = "lazy";
      el.decoding = "async";
    });
  }

  /* ---------- Download URL wiring ---------- */
  function wireDownload() {
    var url = CFG.DOWNLOAD_URL || "";
    document.querySelectorAll("[data-download]").forEach(function (el) {
      if (url) {
        el.setAttribute("href", url);
        
      } else {
        el.setAttribute("aria-disabled", "true");
        el.addEventListener("click", function (e) { e.preventDefault(); });
      }
    });
  }

  /* ---------- Scroll reveal with staggering ---------- */
  function setupReveals() {
    var items = Array.prototype.slice.call(document.querySelectorAll("[data-reveal]"));

    document.querySelectorAll("[data-stagger]").forEach(function (group) {
      var base = parseFloat(group.getAttribute("data-stagger")) || 0.1;
      var step = parseFloat(group.getAttribute("data-step")) || 0.08;
      var children = group.querySelectorAll("[data-reveal]");
      children.forEach(function (child, i) {
        child.style.setProperty("--d", (base + i * step).toFixed(2) + "s");
      });
    });

    if (reduceMotion || !("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });

    items.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Sticky header ---------- */
  function setupHeader() {
    var header = document.querySelector(".site-header");
    if (!header) return;
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 12);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Mobile menu ---------- */
  function setupMobileMenu() {
    var burger = document.querySelector(".nav-burger");
    var menu = document.querySelector(".mobile-menu");
    if (!burger || !menu) return;

    var close = function () {
      menu.classList.remove("is-open");
      burger.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    };
    var open = function () {
      menu.classList.add("is-open");
      burger.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
    };

    burger.addEventListener("click", function () {
      var expanded = burger.getAttribute("aria-expanded") === "true";
      expanded ? close() : open();
    });
    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", close);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
    });
  }

  /* ---------- Lightweight hero parallax ---------- */
  function setupParallax() {
    if (reduceMotion) return;
    var phone = document.querySelector(".phone-float");
    if (!phone) return;
    var ticking = false;
    window.addEventListener("scroll", function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () {
        var y = Math.min(window.scrollY, window.innerHeight);
        phone.style.translate = "0 " + (y * 0.06).toFixed(2) + "px";
        phone.style.rotate = (y * 0.0006).toFixed(4) + "deg";
        ticking = false;
      });
    }, { passive: true });
  }

  /* ---------- Init ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    loadAssets();
    wireDownload();
    setupReveals();
    setupHeader();
    setupMobileMenu();
    setupParallax();
  });
})();

