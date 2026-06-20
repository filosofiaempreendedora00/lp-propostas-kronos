# KRONOS — Site (LP + páginas)

Site de marketing do **Gerador de Propostas da KRONOS** (SaaS de propostas com IA para vendedores).
A `index.html` é a **home**. Novas páginas do site (sobre, preços, blog, etc.) vão **neste mesmo repositório**, compartilhando CSS/JS/assets/identidade. (O app/SaaS em si, se um dia for construído, deve ser um repo próprio — não aqui.)

- **Stack:** HTML/CSS/JS puro. **Sem build, sem dependências, sem framework.**
- **Repo:** `github.com/filosofiaempreendedora00/lp-propostas-kronos` (público).
- **Deploy:** Vercel, automático a cada `push` na branch `main`.
- **Dev local:** `python3 -m http.server 8123` na raiz e abrir `http://localhost:8123`.

---

## ⚠️ Regras de trabalho (importantes)

1. **Trabalhe no localhost primeiro.** **NÃO dê `push` pra Vercel sem o "ok" explícito do dono.** Publicar é produção.
2. **Verifique antes de subir:** rode no preview e confirme o resultado (desktop + mobile) antes de pedir aprovação.
3. **Mensagens de commit terminam com:**
   `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`
4. Cache no dev local engole `styles.css`/`script.js` — force `fetch(url,{cache:'reload'})` + reload, ou Cmd+Shift+R.

---

## Identidade (paleta 100% quente — nada de verde/azul/vermelho)

Variáveis em `styles.css` (`:root`):

| Token | Hex | Uso |
|---|---|---|
| `--onix` | `#150C06` | fundo principal |
| `--sepia` | `#2E2017` | superfícies, cards |
| `--areia` | `#A89070` | texto secundário, detalhes, divisores |
| `--creme` | `#F5EFE6` | fundos claros, texto sobre escuro |
| branco | `#FFFFFF` | — |

- **Única exceção de cor saturada:** o verde do widget de WhatsApp (`.wa-float`).
- **Fontes:** `--serif` = Cormorant Garamond (display/títulos) · `--sans` = Instrument Sans (UI/corpo). Carregadas via Google Fonts no `<head>`.
- **Texturas de areia:** `assets/tex-areia-onix.webp` e `tex-areia-sepia.webp` via classes `.tex-sand-onix` / `.tex-sand-sepia`. No mobile a webp é trocada por grão **vetorial** (`--grain`, feTurbulence) que é nítido em qualquer DPR. Para reforçar textura numa seção alta, use `--grain` (ver `.section-how::after`).
- **Match de estilo:** ao criar páginas novas, reuse `styles.css`/`script.js` e os componentes existentes (`.section`, `.btn`, `.container`, `.reveal`, etc.). Mantenha o tom da copy igual ao da home.

---

## Mapa de arquivos

| Arquivo | O que é |
|---|---|
| `index.html` | Home (a antiga LP) |
| `styles.css` | **Todo** o estilo do site (compartilhado) |
| `script.js` | **Todo** o JS (header, reveal, billing toggle, FAQ, galeria/PDF, vídeos, WhatsApp) |
| `protect.js` | Camada de dissuasão contra cópia (não é segurança real) |
| `assets/` | Imagens, logos, texturas, capas das propostas, fotos |
| `propostas/` | PDFs servidos (nomes limpos) |
| `vercel.json` + `_headers` | Headers de segurança (X-Frame-Options, CSP frame-ancestors, etc.) |
| `RAIO-X-LP.md` | Conteúdo da LP em texto pros "agentes" de copy/CRO/design lerem (URL raw do GitHub) |
| `README.md` | Visão geral |

---

## Adicionar uma página nova

1. Crie `nome.html` na raiz (Vercel serve em `/nome`).
2. Comece copiando o `<head>` da `index.html` (fontes, pixel, clarity, headers) e os mesmos `styles.css`/`script.js`.
3. **Atenção:** header e footer são HTML duplicado em cada página (site estático). Por ora, duplicar e manter na mão é aceitável. Se a duplicação incomodar, decidir entre: include via JS, ou migrar pra um gerador estático simples.
4. Atualize a navegação em todas as páginas quando adicionar uma rota.

---

## Tracking / Analytics

- **Meta Pixel** `994356140237282`: dispara **só `PageView`** no site. **A Kiwify é a fonte única** dos eventos de checkout/compra (`InitiateCheckout`/`Purchase`) — não duplicar esses eventos no site, pra não inflar métricas no Gerenciador.
- **Microsoft Clarity** `x1zfwe3wbn`: heatmaps/gravações. ⚠️ O replay do Clarity distorce carrossel `overflow-x` (mostra empilhado) e não captura conteúdo de `<canvas>` (o visualizador de PDF aparece em branco). Isso é artefato do replay, **não** o que o visitante vê.
- **Checkout (Kiwify):** Plano Time `pay.kiwify.com.br/Fa0RNiT` · Individual `pay.kiwify.com.br/HZzahV5`. Toggle mensal/anual troca a URL via JS (`data-checkout`).
- **WhatsApp:** `wa.me/5527998001953`.

---

## ⚠️ Placeholders a substituir antes de escalar tráfego

- **Depoimentos em texto** (seção `#prova`, "A nova era dos vendedores 10x"): **fictícios**. Trocar por reais e autorizados antes de publicar como prova social (os 2 vídeos da seção `#depoimentos` já são reais).
- **Números/estatísticas** (seção `#numeros`): placeholder — confirmar com dados reais.
- **Prazo da garantia:** usado como **7 dias** em vários pontos — confirmar.

---

## Detalhes técnicos úteis

- **Galeria de propostas** (`#propostas`): carrossel CSS scroll-snap (`overflow-x:auto`, `flex nowrap`), setas no desktop, swipe no mobile. Capas em `assets/cover-*.webp` (1200×1699, geradas dos PDFs com `qlmanage` + Pillow).
- **Visualizador de PDF:** PDF.js v4.2.67 (CDN jsDelivr) renderizando páginas em `<canvas>`. Modal fecha pelo botão "Fechar" (pill dourado sólido no mobile) **e** pelo gesto "voltar" do celular (integração com `history`).
- **Seções da home** (ordem): hero → `#numeros` → `#dor` → (transição) → `#como-funciona` → `#propostas` → `#ganhos` → `#personalizacao` → `#depoimentos` → `#prova` → `#planos` → garantia → `#faq` → final.
