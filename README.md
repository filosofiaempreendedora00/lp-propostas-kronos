# Gerador de Propostas da KRONOS — Landing Page

Landing page estática (HTML/CSS/JS puro). Sem build, sem dependências.
Pronta para Vercel ou qualquer host estático.

## Arquivos

- `index.html` — estrutura e conteúdo das 9 seções
- `styles.css` — identidade visual (paleta, Cormorant + Instrument Sans, motivo de ponteiro)
- `script.js` — reveal on scroll, toggle mensal/anual, acordeão de FAQ, checkout

## Rodar localmente

Abra `index.html` no navegador, ou sirva a pasta:

```bash
python3 -m http.server 8000
# abre http://localhost:8000
```

## Deploy na Vercel

```bash
vercel --prod
```

(ou arraste a pasta no dashboard da Vercel — não há etapa de build).

---

## ⚠️ PLACEHOLDERS — definir antes de publicar

Procure por `PLACEHOLDER` em `index.html` e `script.js`. São três decisões pendentes:

### 1. Prazo da garantia (7 ou 30 dias)
Aparece em **duas** seções de `index.html`:
- Seção 7 (Garantia): `<h2 class="guarantee-title">7 dias ...`
- Seção 9 (CTA final): `<p class="final-sub">Com 7 dias de garantia ...`

Troque "7 dias" nos dois lugares.

### 2. Valores dos três planos
Em `index.html`, seção 6 (Planos). Cada plano tem:
```html
<span class="plan-amount" data-monthly="297" data-annual="238">297</span>
```
- `data-monthly` — preço mensal
- `data-annual`  — preço equivalente no plano anual (já com desconto)
- O texto entre as tags deve ser igual ao `data-monthly` (estado inicial)

O desconto exibido no toggle ("−20%") está em `index.html` (`.billing-save`).
Ajuste se mudar a política de desconto.

### 3. URL do checkout
Em `script.js`, objeto `CHECKOUT_URL`:
```js
var CHECKOUT_URL = {
  individual: "",
  time:       "",
  empresa:    ""
};
```
Preencha cada URL. Enquanto vazias, os botões apenas rolam até a seção de planos.

Os CTAs de topo/hero/final (`Começar`, `Gerar minha primeira proposta`,
`Começar agora`) apontam para `#planos`. Se quiser que levem direto ao
checkout, troque o `href="#planos"` desses botões pela URL.
