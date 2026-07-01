/* Dumb or Genius - site interactions (vanilla JS, no dependencies) */
(function () {
    "use strict";

    /* Current year in footer */
    var yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    /* Sticky nav shadow on scroll */
    var nav = document.getElementById("nav");
    function onScroll() {
        if (!nav) return;
        nav.classList.toggle("scrolled", window.scrollY > 12);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    /* Mobile nav toggle */
    var toggle = document.getElementById("navToggle");
    var links = document.getElementById("navLinks");
    if (toggle && links) {
        toggle.addEventListener("click", function () {
            var open = links.classList.toggle("open");
            toggle.setAttribute("aria-expanded", open ? "true" : "false");
        });
        links.addEventListener("click", function (e) {
            if (e.target.tagName === "A") {
                links.classList.remove("open");
                toggle.setAttribute("aria-expanded", "false");
            }
        });
    }

    /* Reveal on scroll */
    var reveals = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
        var io = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("in");
                        io.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12 }
        );
        reveals.forEach(function (el) { io.observe(el); });
    } else {
        reveals.forEach(function (el) { el.classList.add("in"); });
    }

    /* Confetti burst */
    var COLORS = ["#4f9bff", "#9b5cf6", "#f85fb4", "#ffc93c", "#ffffff"];
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function confettiBurst(originX, originY, count) {
        if (reduceMotion) return;
        count = count || 26;
        for (var i = 0; i < count; i++) {
            var piece = document.createElement("span");
            piece.className = "confetti-piece";
            piece.style.left = originX + "px";
            piece.style.top = originY + "px";
            piece.style.background = COLORS[i % COLORS.length];
            document.body.appendChild(piece);

            var angle = Math.random() * Math.PI * 2;
            var velocity = 90 + Math.random() * 160;
            var dx = Math.cos(angle) * velocity;
            var dy = Math.sin(angle) * velocity - 120;
            var rot = (Math.random() * 720 - 360) + "deg";

            piece.animate(
                [
                    { transform: "translate(0,0) rotate(0)", opacity: 1 },
                    { transform: "translate(" + dx + "px," + (dy + 320) + "px) rotate(" + rot + ")", opacity: 0 }
                ],
                { duration: 900 + Math.random() * 500, easing: "cubic-bezier(.2,.6,.3,1)" }
            ).onfinish = function () { this.effect.target.remove(); };
        }
    }

    /* Vote demo */
    var voteBtn = document.getElementById("voteBtn");
    var voteCount = document.getElementById("voteCount");
    var voteLabel = document.getElementById("voteLabel");
    var voted = false;
    if (voteBtn && voteCount && voteLabel) {
        voteBtn.addEventListener("click", function () {
            var n = parseInt(voteCount.textContent, 10) || 0;
            if (voted) {
                voteCount.textContent = n - 1;
                voteLabel.textContent = "Vote";
                voteBtn.classList.remove("is-voted");
                voted = false;
            } else {
                voteCount.textContent = n + 1;
                voteLabel.textContent = "Voted!";
                voteBtn.classList.add("is-voted");
                confettiBurst(r.left + r.width / 2, r.top + r.height / 2, 30);
            }
        });
    }

    /* Gentle nudge when tapping a "coming soon" store button */
    var storeBtns = document.querySelectorAll('.store-btn[aria-disabled="true"]');
    storeBtns.forEach(function (btn) {
        btn.addEventListener("click", function (e) {
            e.preventDefault();
            var r = btn.getBoundingClientRect();
            confettiBurst(r.left + r.width / 2, r.top + r.height / 2, 18);
        });
    });
})();
