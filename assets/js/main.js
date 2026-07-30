/* =====================================================================
   SHIFT Interiors — Concept Demo interactions
   Loader · sticky/hide nav · mobile drawer · scroll reveals ·
   gallery filter · awards drag-scroll · accent switcher · form demo
   Every pattern here maps to the redesign scope (native + custom code).
   ===================================================================== */
(function () {
  "use strict";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Loader (animated SHIFT logo) ---------- */
  window.addEventListener("load", function () {
    var loader = document.getElementById("loader");
    if (!loader) return;
    var wait = reduce ? 0 : 1150;
    setTimeout(function () {
      loader.classList.add("done");
      setTimeout(function () { loader.style.display = "none"; }, 850);
    }, wait);
  });

  document.addEventListener("DOMContentLoaded", function () {

    /* ---------- Header: shrink + hide-on-scroll-down ---------- */
    var head = document.querySelector(".site-head");
    var lastY = 0;
    window.addEventListener("scroll", function () {
      var y = window.pageYOffset;
      if (head) {
        head.classList.toggle("scrolled", y > 20);
        if (y > 500 && y > lastY) head.classList.add("hide");
        else head.classList.remove("hide");
      }
      lastY = y;
    }, { passive: true });

    /* ---------- Mobile drawer ---------- */
    var burger = document.querySelector(".burger");
    if (burger) {
      burger.addEventListener("click", function () {
        document.body.classList.toggle("menu-open");
      });
      document.querySelectorAll(".drawer a").forEach(function (a) {
        a.addEventListener("click", function () { document.body.classList.remove("menu-open"); });
      });
    }

    /* ---------- Scroll reveals ---------- */
    var revealEls = document.querySelectorAll(".reveal, .reveal-x");
    if ("IntersectionObserver" in window && !reduce) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
      revealEls.forEach(function (el) { io.observe(el); });
    } else {
      revealEls.forEach(function (el) { el.classList.add("in"); });
    }

    /* ---------- Animated counters ---------- */
    var counters = document.querySelectorAll("[data-count]");
    if (counters.length && "IntersectionObserver" in window && !reduce) {
      var cio = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          var el = e.target, target = parseFloat(el.getAttribute("data-count")), t0 = null;
          function tick(ts) {
            if (!t0) t0 = ts;
            var p = Math.min((ts - t0) / 1400, 1);
            var val = Math.floor((1 - Math.pow(1 - p, 3)) * target);
            el.firstChild.nodeValue = val.toLocaleString();
            if (p < 1) requestAnimationFrame(tick);
            else el.firstChild.nodeValue = target.toLocaleString();
          }
          requestAnimationFrame(tick);
          cio.unobserve(el);
        });
      }, { threshold: 0.6 });
      counters.forEach(function (el) { cio.observe(el); });
    }

    /* ---------- Gallery filter (multi-tag) ---------- */
    var fbar = document.querySelector(".filter-bar");
    if (fbar) {
      var items = Array.prototype.slice.call(document.querySelectorAll(".gallery .g-item"));
      fbar.addEventListener("click", function (ev) {
        var btn = ev.target.closest("button");
        if (!btn) return;
        fbar.querySelectorAll("button").forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
        var tag = btn.getAttribute("data-filter");
        items.forEach(function (it) {
          var tags = (it.getAttribute("data-tags") || "");
          var show = tag === "all" || tags.split(" ").indexOf(tag) > -1;
          it.classList.toggle("hide", !show);
        });
      });
    }

    /* ---------- Awards: drag / wheel horizontal scroll ---------- */
    var rail = document.querySelector(".awards-rail");
    if (rail) {
      var down = false, startX, scrollLeft;
      rail.addEventListener("mousedown", function (e) { down = true; rail.classList.add("drag"); startX = e.pageX - rail.offsetLeft; scrollLeft = rail.scrollLeft; });
      window.addEventListener("mouseup", function () { down = false; rail.classList.remove("drag"); });
      rail.addEventListener("mouseleave", function () { down = false; rail.classList.remove("drag"); });
      rail.addEventListener("mousemove", function (e) { if (!down) return; e.preventDefault(); var x = e.pageX - rail.offsetLeft; rail.scrollLeft = scrollLeft - (x - startX) * 1.4; });
      rail.addEventListener("wheel", function (e) { if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) { rail.scrollLeft += e.deltaY; e.preventDefault(); } }, { passive: false });
    }

    /* ---------- Contact form (demo only, no submit) ---------- */
    var form = document.getElementById("contact-form");
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        form.style.display = "none";
        var ok = document.querySelector(".form-success");
        if (ok) ok.classList.add("show");
      });
    }

    /* ---------- Demo dock: accent + theme switcher ---------- */
    var accents = {
      signal:  { a: "#ff3b1d", ink: "#ffffff" },
      cobalt:  { a: "#2340ff", ink: "#ffffff" },
      forest:  { a: "#1f7a4d", ink: "#ffffff" },
      amber:   { a: "#e8a317", ink: "#101010" },
      grey:    { a: "#8a8a8a", ink: "#ffffff" }
    };
    var dock = document.querySelector(".demo-dock");
    if (dock) {
      var toggle = dock.querySelector(".demo-toggle");
      toggle.addEventListener("click", function () { dock.classList.toggle("open"); });

      var saved = localStorage.getItem("shift-accent");
      if (saved && accents[saved]) applyAccent(saved);

      dock.querySelectorAll(".swatch").forEach(function (sw) {
        sw.addEventListener("click", function () {
          applyAccent(sw.getAttribute("data-accent"));
        });
      });
      function applyAccent(key) {
        var c = accents[key]; if (!c) return;
        document.documentElement.style.setProperty("--accent", c.a);
        document.documentElement.style.setProperty("--accent-ink", c.ink);
        dock.querySelectorAll(".swatch").forEach(function (s) {
          s.classList.toggle("active", s.getAttribute("data-accent") === key);
        });
        try { localStorage.setItem("shift-accent", key); } catch (e) {}
      }
    }
  });
})();
