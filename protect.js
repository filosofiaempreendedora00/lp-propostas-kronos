/* ============================================================
   KRONOS — camada de dissuasão contra cópia de conteúdo
   ------------------------------------------------------------
   IMPORTANTE: nenhuma proteção que roda no navegador é à prova de
   balas. Isto barra o "espertinho" casual (botão direito, arrastar
   imagem, Ctrl+S/U, selecionar e copiar sem crédito, embutir a
   página em iframe). Quem é determinado ainda consegue via
   view-source, devtools ou baixando os arquivos direto. A proteção
   real é jurídica (direitos autorais) + cabeçalhos do servidor.
   Para AFROUXAR: troque PROTECT.* para false abaixo.
   ============================================================ */
(function () {
  "use strict";

  var PROTECT = {
    noContextMenu: true,   // bloqueia botão direito
    noDragImages: true,    // impede arrastar imagens
    noSelect: true,        // impede selecionar/copiar o texto da página
    blockDevtoolsKeys: true, // F12, Ctrl+Shift+I/J/C, Ctrl+U, Ctrl+S
    watermarkCopy: true,   // anexa crédito ao texto copiado (onde houver)
    frameBuster: true,     // impede a página ser embutida em iframe de terceiros
    consoleWarning: true   // aviso no console
  };

  var NOTE = "© KRONOS — conteúdo protegido. " + (location.origin || "kronos");

  /* 0) Frame-buster: roda já, antes de tudo. Se a página estiver dentro
        de um iframe de outro site, joga para fora (impede clonagem por
        embed e ataques de clickjacking). */
  if (PROTECT.frameBuster) {
    try {
      if (window.top !== window.self) {
        window.top.location.href = window.self.location.href;
      }
    } catch (e) {
      // cross-origin: o acesso já é bloqueado pelo navegador, ok.
      try { document.documentElement.style.display = "none"; } catch (_) {}
    }
  }

  /* toast discreto de feedback */
  var toastTimer, toastEl;
  function toast(msg) {
    if (!document.body) return;
    if (!toastEl) {
      toastEl = document.createElement("div");
      toastEl.className = "kp-toast";
      toastEl.setAttribute("aria-hidden", "true");
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove("show"); }, 1600);
  }

  /* 1) Menu de contexto (botão direito) */
  if (PROTECT.noContextMenu) {
    document.addEventListener("contextmenu", function (e) {
      e.preventDefault();
      toast("Conteúdo protegido © KRONOS");
    }, { capture: true });
  }

  /* 2) Arrastar imagens / ativos */
  if (PROTECT.noDragImages) {
    document.addEventListener("dragstart", function (e) {
      var t = e.target;
      if (t && (t.tagName === "IMG" || (t.closest && t.closest("img,picture,svg,.seal,.proof-avatar,.brand-logo")))) {
        e.preventDefault();
      }
    }, { capture: true });
  }

  /* 3) Atalhos de devtools / salvar / ver código-fonte */
  if (PROTECT.blockDevtoolsKeys) {
    document.addEventListener("keydown", function (e) {
      var k = (e.key || "").toLowerCase();
      var mod = e.ctrlKey || e.metaKey;
      var block =
        e.key === "F12" ||
        (mod && e.shiftKey && (k === "i" || k === "j" || k === "c")) ||
        (mod && (k === "u" || k === "s"));
      if (block) {
        e.preventDefault();
        e.stopPropagation();
        toast("Função desabilitada nesta página");
        return false;
      }
    }, { capture: true });
  }

  /* 4) Marca d'água ao copiar: quem copiar texto leva o crédito junto */
  if (PROTECT.watermarkCopy) {
    document.addEventListener("copy", function (e) {
      try {
        var sel = String(window.getSelection() || "");
        if (sel.replace(/\s/g, "").length > 10 && e.clipboardData) {
          e.clipboardData.setData("text/plain", sel + "\n\n— " + NOTE);
          e.preventDefault();
        }
      } catch (_) {}
    });
    document.addEventListener("cut", function (e) { e.preventDefault(); });
  }

  /* 5) Bloqueio de seleção (via classe no <html>, fácil de reverter) */
  if (PROTECT.noSelect && document.documentElement) {
    document.documentElement.classList.add("kp-protect");
  }

  /* 6) Aviso no console */
  function consoleWarning() {
    if (!PROTECT.consoleWarning) return;
    try {
      console.log("%cPare.", "color:#A89070;font:600 26px Georgia,serif");
      console.log(
        "%cEste site é da KRONOS e está protegido por direitos autorais.\n" +
        "Copiar página, textos, imagens, código ou identidade visual sem\n" +
        "autorização é violação de propriedade intelectual (Lei 9.610/98).",
        "color:#2E2017;font:14px system-ui;line-height:1.5"
      );
    } catch (_) {}
  }

  /* 7) Travas finais nas imagens já no DOM */
  function lockImages() {
    var imgs = document.querySelectorAll("img");
    for (var i = 0; i < imgs.length; i++) {
      imgs[i].setAttribute("draggable", "false");
      imgs[i].oncontextmenu = function () { return false; };
    }
  }

  function boot() {
    lockImages();
    consoleWarning();
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
