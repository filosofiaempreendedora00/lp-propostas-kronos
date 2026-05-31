/* ============================================================
   GERADOR DE PROPOSTAS DA KRONOS — interações + movimento
   HTML/CSS/JS puro, sem dependências.
   Vórtice e feixe de luz em Canvas; parallax, scroll-reveal,
   count-up e micro-interações em vanilla JS.
   ============================================================ */
(function () {
  "use strict";

  var REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Paleta (espelha o CSS — Canvas precisa dos valores)
  var COLOR = {
    onix:  "#150C06",
    sepia: "#2E2017",
    areia: "#A89070",
    creme: "#F5EFE6"
  };

  /* ============================================================
     1. VÓRTICE — anéis concêntricos de areia girando,
        com "olho" central escuro de continuidade infinita.
        Render por camadas pré-rasterizadas + rotação (60fps).
     ============================================================ */
  function Vortex(canvas) {
    var ctx = canvas.getContext("2d", { alpha: true });
    var dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    var w = 0, h = 0, cx = 0, cy = 0, maxR = 0;
    var layers = [];
    var raf = null, running = false;

    // Pré-rasteriza uma camada de anéis pontilhados num canvas próprio
    function makeLayer(size, rInner, rOuter, gap, dot, alpha) {
      var c = document.createElement("canvas");
      c.width = c.height = size;
      var x = c.getContext("2d");
      var cc = size / 2;
      x.fillStyle = COLOR.areia;
      for (var r = rInner; r <= rOuter; r += gap) {
        var circ = 2 * Math.PI * r;
        var n = Math.max(10, Math.floor(circ / (dot * 3.4)));
        // leve fade dos anéis conforme se afastam do meio da banda
        var mid = (rInner + rOuter) / 2;
        var fade = 1 - Math.min(1, Math.abs(r - mid) / (rOuter - rInner));
        x.globalAlpha = alpha * (0.45 + 0.55 * fade);
        for (var i = 0; i < n; i++) {
          var a = (i / n) * Math.PI * 2;
          x.beginPath();
          x.arc(cc + Math.cos(a) * r, cc + Math.sin(a) * r, dot, 0, Math.PI * 2);
          x.fill();
        }
      }
      return c;
    }

    function build() {
      maxR = Math.hypot(w, h) * 0.62;
      var size = Math.ceil(maxR * 2);
      layers = [
        // { canvas, angle, speed (rad/frame) }  — interno gira mais rápido
        { canvas: makeLayer(size, maxR * 0.10, maxR * 0.34, 9,  1.1, 0.9),  angle: 0, speed: 0.00125 },
        { canvas: makeLayer(size, maxR * 0.34, maxR * 0.62, 13, 1.3, 0.7),  angle: 0, speed: 0.00080 },
        { canvas: makeLayer(size, maxR * 0.62, maxR * 0.98, 18, 1.5, 0.5),  angle: 0, speed: 0.00050 }
      ];
    }

    function resize() {
      w = canvas.clientWidth; h = canvas.clientHeight;
      if (!w || !h) return;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cx = w / 2; cy = h / 2;
      build();
      if (REDUCED) draw(); // quadro único, estático
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      for (var i = 0; i < layers.length; i++) {
        var L = layers[i];
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(L.angle);
        ctx.globalAlpha = 1;
        ctx.drawImage(L.canvas, -L.canvas.width / 2, -L.canvas.height / 2);
        ctx.restore();
      }
      ctx.globalCompositeOperation = "source-over";

      // Olho central escuro + vinheta de borda (funde no ônix)
      var g = ctx.createRadialGradient(cx, cy, maxR * 0.04, cx, cy, maxR);
      g.addColorStop(0.00, COLOR.onix);
      g.addColorStop(0.16, "rgba(21,12,6,0.92)");
      g.addColorStop(0.30, "rgba(21,12,6,0.30)");
      g.addColorStop(0.62, "rgba(21,12,6,0)");
      g.addColorStop(0.86, "rgba(21,12,6,0.6)");
      g.addColorStop(1.00, COLOR.onix);
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
    }

    function frame() {
      for (var i = 0; i < layers.length; i++) layers[i].angle += layers[i].speed;
      draw();
      raf = requestAnimationFrame(frame);
    }

    function start() { if (running || REDUCED) return; running = true; frame(); }
    function stop() { running = false; if (raf) cancelAnimationFrame(raf); raf = null; }

    resize();
    window.addEventListener("resize", debounce(resize, 200));

    // Só anima quando visível (economia de bateria/CPU)
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (es) {
        es.forEach(function (e) { e.isIntersecting ? start() : stop(); });
      }, { threshold: 0.01 }).observe(canvas);
    } else { start(); }
  }

  /* ============================================================
     2. FEIXE DE LUZ com poeira dourada suspensa.
        Raio diagonal quente + partículas em deriva lenta.
     ============================================================ */
  function LightBeam(canvas) {
    // Raio diagonal quente + poeira dourada em deriva lenta.
    var ctx = canvas.getContext("2d", { alpha: true });
    var dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    var w = 0, h = 0;
    var particles = [];
    var raf = null, running = false;
    var ANGLE = -0.42; // inclinação do feixe (rad)

    function resize() {
      w = canvas.clientWidth; h = canvas.clientHeight;
      if (!w || !h) return;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
      if (REDUCED) draw();
    }

    function seed() {
      var count = Math.round(Math.min(120, (w * h) / 12000));
      particles = [];
      for (var i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 1.6 + 0.4,
          a: Math.random() * 0.5 + 0.1,
          vx: (Math.random() * 0.18 + 0.05),   // deriva lenta na direção do feixe
          vy: -(Math.random() * 0.10 + 0.02),
          tw: Math.random() * Math.PI * 2       // fase do cintilar
        });
      }
    }

    // Distância de um ponto à linha central do feixe (passando pelo centro)
    function beamDist(x, y) {
      var nx = Math.sin(ANGLE), ny = -Math.cos(ANGLE);
      return Math.abs((x - w * 0.5) * nx + (y - h * 0.5) * ny);
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);

      // Faixa de luz diagonal
      ctx.save();
      ctx.translate(w * 0.5, h * 0.5);
      ctx.rotate(ANGLE);
      var beamW = Math.max(w, h) * 0.5;
      var lg = ctx.createLinearGradient(0, -beamW, 0, beamW);
      lg.addColorStop(0.0, "rgba(168,144,112,0)");
      lg.addColorStop(0.5, "rgba(168,144,112,0.10)");
      lg.addColorStop(1.0, "rgba(168,144,112,0)");
      ctx.fillStyle = lg;
      ctx.fillRect(-Math.max(w, h), -beamW, Math.max(w, h) * 2, beamW * 2);
      ctx.restore();

      // Poeira dourada — mais brilhante perto do eixo do feixe
      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        var prox = 1 - Math.min(1, beamDist(p.x, p.y) / (Math.max(w, h) * 0.26));
        var alpha = p.a * (0.25 + 0.75 * prox) * (0.6 + 0.4 * Math.sin(p.tw));
        if (alpha <= 0.01) continue;
        ctx.globalAlpha = alpha;
        ctx.fillStyle = COLOR.areia;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }

    function frame() {
      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        p.x += p.vx; p.y += p.vy; p.tw += 0.02;
        if (p.x > w + 4) p.x = -4;
        if (p.y < -4) p.y = h + 4;
      }
      draw();
      raf = requestAnimationFrame(frame);
    }

    function start() { if (running || REDUCED) return; running = true; frame(); }
    function stop() { running = false; if (raf) cancelAnimationFrame(raf); raf = null; }

    resize();
    window.addEventListener("resize", debounce(resize, 200));
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (es) {
        es.forEach(function (e) { e.isIntersecting ? start() : stop(); });
      }, { threshold: 0.01 }).observe(canvas);
    } else { start(); }
  }

  /* ============================================================
     3. SCROLL-REVEAL — fade + translateY ao entrar na viewport,
        com stagger opcional via data-reveal-delay.
     ============================================================ */
  function initReveal() {
    var els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window) || REDUCED) {
      els.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var delay = parseInt(el.getAttribute("data-reveal-delay") || "0", 10);
        if (delay) el.style.transitionDelay = delay + "ms";
        el.classList.add("is-visible");
        io.unobserve(el);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ============================================================
     4. PARALLAX — camadas em velocidades diferentes.
        translateY relativo à posição do elemento na viewport.
     ============================================================ */
  function initParallax() {
    if (REDUCED) return;
    var layers = Array.prototype.slice.call(document.querySelectorAll("[data-parallax]"));
    if (!layers.length) return;
    var active = [];
    // Só processa os que estão (perto de) visíveis
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        var el = e.target;
        var idx = active.indexOf(el);
        if (e.isIntersecting && idx === -1) active.push(el);
        else if (!e.isIntersecting && idx !== -1) active.splice(idx, 1);
      });
    }, { rootMargin: "20% 0px 20% 0px" });
    layers.forEach(function (el) { io.observe(el); });

    var ticking = false;
    function update() {
      var vh = window.innerHeight;
      for (var i = 0; i < active.length; i++) {
        var el = active[i];
        var rect = el.getBoundingClientRect();
        var f = parseFloat(el.getAttribute("data-parallax")) || 0;
        var off = (rect.top + rect.height / 2) - vh / 2;
        // preserva o transform base (centralização de glyphs)
        var base = el.getAttribute("data-base");
        base = base ? base + " " : "";
        el.style.transform = base + "translate3d(0," + (-off * f).toFixed(2) + "px,0)";
      }
      ticking = false;
    }
    function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
  }

  /* ============================================================
     5. COUNT-UP — números sobem de 0 ao alvo ao entrar na tela.
     ============================================================ */
  function initCountUp() {
    var els = document.querySelectorAll("[data-count]");
    if (!els.length) return;
    if (REDUCED || !("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.textContent = el.getAttribute("data-count"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        io.unobserve(el);
        var target = parseFloat(el.getAttribute("data-count"));
        var dur = 1400, t0 = null;
        function tick(ts) {
          if (t0 === null) t0 = ts;
          var p = Math.min(1, (ts - t0) / dur);
          // easeOutExpo
          var e = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
          el.textContent = Math.round(target * e).toString();
          if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.6 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ============================================================
     6. INTERAÇÕES — header, billing, FAQ, checkout, ano.
     ============================================================ */
  function initHeader() {
    var header = document.querySelector(".site-header");
    if (!header) return;
    function onScroll() { header.classList.toggle("is-stuck", window.scrollY > 8); }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  function initBilling() {
    var toggle = document.querySelector(".billing-toggle");
    var btns = document.querySelectorAll(".billing-opt");
    var amounts = document.querySelectorAll(".plan-amount");
    var notes = document.querySelectorAll("[data-annual-note]");
    if (!toggle) return;

    function set(mode) {
      var annual = mode === "annual";
      toggle.classList.toggle("is-annual", annual);
      btns.forEach(function (b) {
        b.classList.toggle("is-active", b.getAttribute("data-billing") === mode);
      });
      amounts.forEach(function (a) {
        var val = a.getAttribute(annual ? "data-annual" : "data-monthly");
        if (val) a.textContent = val;
      });
      notes.forEach(function (n) { n.hidden = !annual; });
    }
    btns.forEach(function (btn) {
      btn.addEventListener("click", function () { set(btn.getAttribute("data-billing")); });
    });
  }

  function initFAQ() {
    var items = document.querySelectorAll(".faq-item");
    items.forEach(function (item) {
      item.addEventListener("toggle", function () {
        if (!item.open) return;
        items.forEach(function (other) { if (other !== item) other.open = false; });
      });
    });
  }

  function initCheckout() {
    // PLACEHOLDER: defina a URL do checkout integrado (uma por plano ou única).
    var CHECKOUT_URL = {
      individual: "", // PLACEHOLDER
      time:       "", // PLACEHOLDER
      empresa:    ""  // PLACEHOLDER
    };
    document.querySelectorAll("[data-checkout]").forEach(function (link) {
      var plan = link.getAttribute("data-checkout");
      var url = CHECKOUT_URL[plan];
      if (url) { link.setAttribute("href", url); return; }
      link.addEventListener("click", function (e) {
        e.preventDefault();
        var planos = document.getElementById("planos");
        if (planos) planos.scrollIntoView({ behavior: "smooth" });
      });
    });
  }

  function initYear() {
    var y = document.getElementById("year");
    if (y) y.textContent = String(new Date().getFullYear());
  }

  /* ---------- util ---------- */
  function debounce(fn, ms) {
    var t;
    return function () {
      clearTimeout(t);
      var args = arguments, self = this;
      t = setTimeout(function () { fn.apply(self, args); }, ms);
    };
  }

  /* ============================================================
     BOOT
     ============================================================ */
  function boot() {
    initHeader();
    initReveal();
    initParallax();
    initCountUp();
    initBilling();
    initFAQ();
    initCheckout();
    initYear();

    document.querySelectorAll(".vortex").forEach(function (c) { Vortex(c); });
    var beam = document.getElementById("beam");
    if (beam) LightBeam(beam);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else { boot(); }
})();
