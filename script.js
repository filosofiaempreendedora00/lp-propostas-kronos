/* ============================================================
   GERADOR DE PROPOSTAS DA KRONOS — interações da LP
   HTML/CSS/JS puro. Sem dependências.
   ============================================================ */
(function () {
  "use strict";

  /* ----- Ano no rodapé ----- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ----- Header com sombra ao rolar ----- */
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-stuck", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ----- Reveal on scroll ----- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ----- Alternância de cobrança: mensal / anual ----- */
  var billingBtns = document.querySelectorAll(".billing-opt");
  var amounts = document.querySelectorAll(".plan-amount");
  var annualNotes = document.querySelectorAll("[data-annual-note]");

  function setBilling(mode) {
    billingBtns.forEach(function (b) {
      b.classList.toggle("is-active", b.getAttribute("data-billing") === mode);
    });
    amounts.forEach(function (a) {
      var val = a.getAttribute(mode === "annual" ? "data-annual" : "data-monthly");
      if (val) a.textContent = val;
    });
    annualNotes.forEach(function (n) {
      n.hidden = mode !== "annual";
    });
  }

  billingBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      setBilling(btn.getAttribute("data-billing"));
    });
  });

  /* ----- FAQ: abre um, fecha os outros (acordeão) ----- */
  var faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(function (item) {
    item.addEventListener("toggle", function () {
      if (!item.open) return;
      faqItems.forEach(function (other) {
        if (other !== item) other.open = false;
      });
    });
  });

  /* ----- Checkout (PLACEHOLDER) -----
     Defina a URL do checkout integrado. Pode ser uma URL única
     ou uma por plano. Enquanto vazio, o clique apenas rola para
     os planos sem quebrar a página.
  */
  var CHECKOUT_URL = {
    individual: "", // PLACEHOLDER: URL do checkout — plano Individual
    time:       "", // PLACEHOLDER: URL do checkout — plano Time
    empresa:    ""  // PLACEHOLDER: URL do checkout — plano Empresa
  };

  document.querySelectorAll("[data-checkout]").forEach(function (link) {
    var plan = link.getAttribute("data-checkout");
    var url = CHECKOUT_URL[plan];
    if (url) {
      link.setAttribute("href", url);
    } else {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        var planos = document.getElementById("planos");
        if (planos) planos.scrollIntoView({ behavior: "smooth" });
      });
    }
  });
})();
