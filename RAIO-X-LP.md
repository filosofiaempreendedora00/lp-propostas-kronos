# RAIO-X — Landing Page do Gerador de Propostas da KRONOS

> **Para que serve este documento:** entregar a landing page inteira, em texto limpo, para análise por agentes de IA (copy, design, CRO, growth, etc.). Ele contém **todo o conteúdo, estrutura, links e decisões** da página — captados direto do código-fonte, na ordem real em que aparecem.
>
> **Leia este documento, não só a URL.** Vários elementos de conversão da página são **injetados por JavaScript** (os 4 links de checkout, os preços dos planos, os números que sobem de 0, os vídeos lazy). Um fetch do HTML cru **não executa JS** e pode parecer que "os links não estão lá" — mas estão. Este arquivo já traz tudo resolvido (o estado final/renderizado).

---

## 1. Visão geral

- **Produto:** Gerador de Propostas da KRONOS — SaaS que monta propostas comerciais hiperpersonalizadas com IA em ~60 segundos.
- **Público:** vendedores / closers / consultores / pequenas agências que enviam propostas e querem vender mais sem gastar horas montando documento.
- **Promessa central:** velocidade (60s) + personalização (fala a dor exata do cliente) na mesma proposta, sem perder conversão. Tese-mãe: "fazer cada vendedor render como um time inteiro" / "multiplicar o seu tempo".
- **Modelo de negócio:** assinatura, 2 planos (Individual e Time), cobrança mensal ou anual (−40% à vista). Checkout externo na **Kiwify**.
- **Objetivo da página:** levar o lead ao checkout (evento `InitiateCheckout`); a compra (`Purchase`) fecha na Kiwify.
- **Stack:** site estático (HTML + CSS + JS puro), hospedado na Vercel. Sem framework.
- **Idioma/tom:** português do Brasil, direto, "de vendedor pra vendedor", ousado, sem travessões longos, com gatilhos mentais.

---

## 2. Estrutura da página (seção a seção, na ordem)

### Header (fixo/sticky)
- Logo KRONOS (símbolo `)(` + wordmark). Sem menu de navegação (decisão proposital: só o logo, sem âncoras no topo).

### 1. HERO
- **Tag (pílula com emoji 💼):** GERADOR DE PROPOSTAS DA KRONOS
- **H1:** "Propostas que o cliente responde — *prontas em 60 segundos.*"
- **Subheadline:** "A IA escreve cada proposta com a dor exata do seu cliente. Você só revisa e envia."
- **Sem botão no hero** (decisão: hero contemplativo; o "scroll cue" convida a descer).
- **Fundo:** vórtice/ciclone animado (canvas) — o "tornado" da marca, dourado sobre ônix.

### 2. FAIXA DE NÚMEROS (prova social quantitativa) — ⚠️ números ILUSTRATIVOS/placeholder
- **1.300+** vendedores usando a Kronos
- **+67 mil** propostas enviadas
- **+35 milhões** em negócios fechados
- **100%** dos vendedores ganharam tempo
- (Os números sobem de 0 com animação de count-up.)

### 3. AGITAÇÃO DA DOR — "Onde você perde negócio hoje."
- **Lead:** "Não é por falta de esforço seu. É o mesmo gargalo, em toda venda."
- **Card 01 — Propostas genéricas:** "Para dar conta do volume, todo mundo manda a proposta padrão. O cliente percebe que recebeu a mesma de sempre — e esfria antes da reunião." (visual: pilha de docs iguais)
- **Card 02 — Lentidão trabalhosa:** "Personalizar de verdade custa horas. Enquanto você monta a proposta manualmente, o concorrente já respondeu e saiu na frente." (visual: corrida lento x rápido)
- **Card 03 — Refém do desconto:** "Quando a proposta não mostra valor, a conversa vira só preço. Você dá desconto pra fechar — e mesmo assim o cliente some." (visual: R$ 100 riscado → R$ 70)

### 4. VIRADA (pivô emocional)
- **Ruptura (itálico):** "Velocidade e personalização nunca foram inimigas."
- **H2:** "O Gerador de Propostas da Kronos faz você *vender como um time inteiro.*"
- **CTA (ghost, com seta ↓):** "Entenda como funciona" → rola para a seção "Como funciona" (`#como-funciona`).
- **Fundo:** feixe de luz + partículas douradas + símbolo da marca (emblema de ponteiros).

### 5. COMO FUNCIONA — "Três passos simples. A IA faz todo o trabalho pesado."
- **Lead:** "Nunca mais monte uma proposta do zero. Você clica, a IA personaliza, e a proposta matadora sai pronta — tudo simples, rápido e fácil."
- **Passo 1 — Cadastre a sua empresa:** "Suas soluções e planos entram uma vez só. A Kronos guarda tudo — você nunca mais começa do zero." (vídeo: tela de cadastro)
- **Passo 2 — Escolha o que convence:** "Uma biblioteca de seções validadas e que vendem — 'O que entendemos', 'O custo de continuar igual' e outras. A IA escreve cada uma falando o que aquele cliente quer ouvir." (vídeo: escolha de seções)
- **Passo 3 — Gere com a cara do cliente:** "Em 60 segundos a proposta personalizada sai pronta — na identidade visual do seu cliente." (vídeo: geração com a marca do cliente)
- **Mídia:** cada passo tem um **vídeo .webm** real do produto (1200×800), autoplay/loop/mudo, com moldura dourada. (Carregam de forma lazy — só ao entrar na viewport.)

### 5b. GALERIA DE PROPOSTAS (prova/portfólio) — vem logo após "Como funciona"
- **H2:** "Propostas reais. *Geradas em 60 segundos.*"
- **Subtítulo:** "Exemplos de mercados diferentes — veja o nível do que a Kronos entrega."
- **Carrossel** (swipe no mobile, setas no desktop) com 3 propostas reais, uma por mercado:
  - **Engenharia** (Voltec — Engenharia Elétrica Industrial)
  - **Imobiliário** (Vértice — Apresentação de Imóvel)
  - **Marketing** (Tração — Crescimento Digital)
- Cada card: capa (1ª página do PDF) + rótulo do mercado + botão "Ver proposta completa".
- Ao clicar, o **PDF abre dentro da página** (modal/overlay em tela cheia, rolável, com botão de fechar). Renderização via PDF.js carregado sob demanda; capas leves (WebP) e PDFs só baixam quando abertos (não pesam o load inicial).
- **CTA ao final:** "Crie a sua em 60 segundos" → âncora `#planos`.

### 6. O QUE VOCÊ GANHA — Comparativo "Sua vida *mil vezes* mais fácil com a Kronos."
- **Lead:** "De um lado, a correria de sempre. Do outro, a Kronos."
- **Tabela (No processo manual ✗ | Com a Kronos ✓):**
  - **Tempo:** Gasta uma tarde por proposta → Pronta em 60 segundos
  - **Resposta:** O concorrente responde antes → Você envia logo após a call
  - **Persuasão:** Cara de proposta-modelo → Fala a dor exata do cliente
  - **Desconto:** Só fecha cedendo no preço → Fecha pelo valor que entrega
  - **Comissão:** Fim de mês passando aperto → Mais agilidade, mais comissão

### 7. METODOLOGIA KRONOS — "Cada detalhe *importa.*"
- **Lead 1:** "Nada na sua proposta é por acaso. Cada bloco aplica gatilhos mentais da escola de vendas americana — forjada no mercado mais agressivo e competitivo do mundo."
- **Lead 2:** "A ordem, o tom e cada detalhe foram desenhados para criar harmonia, despertar desejo e fazer seu cliente fechar."
- **8 blocos (nome — gatilho — texto):**
  1. **Capa** — *Primeira impressão*: "Antes da primeira palavra, o cliente já sente que está diante de algo de outro nível."
  2. **O que entendemos** — *Rapport*: "Espelha a dor do cliente com as palavras dele. Ele baixa a guarda quando se sente ouvido de verdade."
  3. **O custo de continuar igual** — *Aversão à perda*: "O medo de perder pesa mais que a vontade de ganhar. A inação vira urgência."
  4. **Estratégia em pilares** — *Autoridade*: "Uma estratégia clara, em pilares, mostra domínio e dá segurança para decidir."
  5. **Soluções da proposta** — *Encaixe*: "Cada solução entra ligada à dor que ele te trouxe. Ele enxerga a saída do problema — não uma lista de serviços soltos."
  6. **Investimento** — *Ancoragem*: "O preço só aparece depois que todo o valor foi meticulosamente construído."
  7. **Recomendação** — *O porquê*: "O cérebro humano aceita muito mais fácil quando existe um porquê. A recomendação amarra os motivos numa lógica clara, e o 'sim' se torna óbvio."
  8. **Próximos passos** — *Compromisso*: "Um único próximo passo, claro e fácil, elimina a dúvida que trava o fechamento."
- **Fecho (destaque):** "No fim, o seu cliente abre uma proposta *irresistível e impossível de ignorar* — montada pela IA em 60 segundos."

### 8. PROVA SOCIAL — "A nova era dos vendedores *10x*." — ⚠️ depoimentos FICTÍCIOS/placeholder
- **Lead:** "Profissionais que, sozinhos, vendem mais que times inteiros."
- **6 depoimentos (com foto/avatar):**
  1. **Rafael Menezes** (Vendas · Tecnologia): "Eu mandava proposta e ficava no vácuo. Agora o cliente responde e ainda elogia. Já teve gente falando que foi a melhor proposta que já viu."
  2. **Diego Arruda** (Sócio · Agência): "Fechei um contrato de R$ 70 mil que estava parado há meses. O cara falou na lata que fomos a única empresa que entendeu o problema dele de verdade."
  3. **Juliana Prado** (Consultora de RH): "Sábado era dia de montar proposta. Hoje eu monto em um minuto, e ainda vendo mais. Meu fim de semana voltou."
  4. **Marina Tavares** (Consultora comercial): "Trabalho sozinha, mas mando proposta como se tivesse uma equipe inteira por trás. Pra você ter noção, tripliquei meus resultados já no primeiro mês com a Kronos."
  5. **Bruno Carvalho** (Account Executive · SaaS): "Parei de depender de desconto pra fechar. Fechei R$ 12 mil sem tirar um real do preço: a proposta mostra tanto valor que o cliente nem tenta pechinchar."
  6. **Carla Nogueira** (Vendas · Serviços): "Minha taxa de conversão subiu de um jeito que eu nem sei explicar. O cliente chega na reunião já decidido, dá pra sentir na conversa."

### 9. PLANOS — "Dois planos. Escolha o melhor pra você."
- **Lead:** "Comece sozinho e cresça quando quiser. Sem fidelidade."
- **Toggle:** Mensal | Anual (**−40%**, à vista). Padrão exibido = Mensal.
- **Plano TIME** (à esquerda, secundário): "Para multiplicar o comercial inteiro."
  - **Preço:** R$ 197/mês (mensal) · R$ 146,45/mês (anual, "Cobrado anualmente. Economize 40% à vista.")
  - Features: Tudo do Individual · Até 10 usuários · Módulos compartilhados pelo time · Padrão único de marca · Variações por vendedor · Suporte prioritário por WhatsApp · Cancele quando quiser
  - CTA: **Assinar Time** (botão contorno/ghost)
  - "✓ 7 dias de garantia incondicional"
- **Plano INDIVIDUAL** (à direita, em destaque — selo "MAIS ESCOLHIDO"): "Para o vendedor que quer render como um time."
  - **Preço:** R$ 67/mês (mensal) · R$ 49,64/mês (anual)
  - Features: 1 usuário · Módulos ilimitados · Propostas ilimitadas · Geração em 60 segundos · Suporte por e-mail e chat da plataforma · Cancele quando quiser
  - CTA: **Assinar Individual** (botão sólido escuro = CTA principal)
  - "✓ 7 dias de garantia incondicional"

### 10. GARANTIA (com selo/lacre de cera)
- **Eyebrow:** GARANTIA INCONDICIONAL
- **H2:** "Impressione seus clientes em *7 dias.*"
- **Sub:** "Ou 100% do seu dinheiro de volta."
- **Texto:** "Use a Kronos por **7 dias inteiros**. Monte propostas, mande para clientes de verdade e veja o que acontece. Se não ficar impressionado, é só escrever para contato@kronos-ias.com.br e a gente **devolve cada centavo**."
- **Bullets:** Reembolso total, sem precisar justificar *nada*. · Sem letra miúda, sem pegadinha, *sem fidelidade*. · O risco é todo *nosso*. O seu é zero.
- **Frase de confiança:** "A gente só assume esse risco porque sabe o que a sua primeira proposta vai fazer."
- **CTA:** "Começar sem risco" → rola para os planos (`#planos`).
- **Visual:** lacre de cera 3D com o símbolo da marca + "SELO KRONOS DE QUALIDADE · GARANTIA INCONDICIONAL · 7 DIAS".

### 11. FAQ — "Ainda restam dúvidas?" (acordeão, 10 perguntas)
1. **A proposta não vai ter cara de modelo genérico?** — "Não. A IA escreve cada proposta a partir do que aquele cliente precisa ouvir: o contexto dele, a sua oferta e a linguagem do seu mercado. O cliente recebe algo que parece feito à mão só pra ele. Porque foi."
2. **Funciona pro meu setor?** — "Sim. O Gerador não é preso a nenhum nicho. Você configura os módulos com a oferta e a linguagem do seu mercado uma vez só. A partir daí, cada proposta é montada para conversar diretamente com o cliente que vai recebê-la: entra no contexto dele, no que ele precisa resolver e no que faz ele decidir. Não basta ter a sua cara, ela fala a língua de quem você quer fechar."
3. **Sai mesmo pronta pra enviar em 60 segundos?** — "Sai. Depois da configuração inicial, que é feita uma vez só, cada proposta vem já formatada e pronta. Você não monta nada do zero nem perde tempo com layout: é só dar uma revisada, exportar e enviar."
4. **Preciso entender de IA ou de tecnologia?** — "Não. Tudo acontece no navegador, em poucos cliques. Se você sabe escrever um e-mail, sabe gerar uma proposta aqui."
5. **Serve pra mim que vendo sozinho, ou só pra time?** — "Para os dois. Funciona pra quem vende sozinho e pra times com várias pessoas, muda só o plano. A ideia é a mesma: fazer cada vendedor render como um time inteiro."
6. **A IA não vai deixar o vendedor de lado?** — "Pelo contrário. Ela assume a parte chata e demorada, que é montar a proposta, pra você gastar energia no que fecha negócio: a relação com o cliente. Quem vende continua sendo você, só que com uma proposta muito mais forte na mão."
7. **Meus dados e os dos meus clientes ficam seguros?** — "Ficam, e levamos isso a sério. Suas informações trafegam de forma criptografada, ficam restritas à sua conta e são tratadas em total conformidade com a LGPD. São usadas apenas para gerar as suas propostas. Seus dados são seus."
8. **E se eu não gostar?** — "Você tem 7 dias de garantia incondicional. Use na prática, mande propostas pros seus clientes e, se não ficar impressionado, é só escrever pra contato@kronos-ias.com.br que a gente devolve cada centavo. Sem precisar justificar nada."
9. **Como é o suporte?** — "Suporte humano de verdade. No plano Individual, por e-mail e chat da plataforma. No Time, suporte prioritário por WhatsApp."
10. **Posso cancelar quando quiser?** — "Pode. Sem fidelidade e sem multa. É só mandar um e-mail pra contato@kronos-ias.com.br que a gente resolve pra você."

### 12. CTA FINAL (com relógio animado)
- **H2 (grande):** "Tempo é *dinheiro.*"
- **Sub 1:** "Não adianta só 'trabalhar duro'. Você precisa trabalhar de forma *inteligente*."
- **Sub 2:** "Passe a fazer em *60 segundos* o que um humano comum levaria horas."
- **CTA:** "EXPANDIR TEMPO AGORA" → rola para os planos (`#planos`).
- **Garantia (rodapé do bloco):** "7 dias de garantia incondicional. Se a Kronos não mover o ponteiro do seu negócio, te devolvemos cada centavo."
- **Visual:** relógio de luxo (mostrador com trilho de 60 minutos) com os **ponteiros característicos da marca** girando acelerados (sensação de urgência/tempo correndo).

### Footer
- Logo · "Gerador de Propostas da Kronos" · "KRONOS · EXPANDINDO O TEMPO" · "© [ano] KRONOS. Mover o ponteiro."

### Widget flutuante de WhatsApp
- Botão fixo no canto inferior direito → abre conversa em `https://wa.me/5527998001953` (mensagem pré-preenchida: "Olá! Vim pela página do Gerador de Propostas da Kronos e quero saber mais.").

---

## 3. Elementos de conversão (consolidado)

**CTAs e destinos:**
| Onde | Texto | Destino |
|---|---|---|
| Virada | Entenda como funciona | âncora `#como-funciona` |
| Galeria de propostas | Crie a sua em 60 segundos | âncora `#planos` |
| Planos · Individual | Assinar Individual | Checkout Kiwify (ver tabela abaixo) |
| Planos · Time | Assinar Time | Checkout Kiwify (ver tabela abaixo) |
| Garantia | Começar sem risco | âncora `#planos` |
| CTA final | Expandir tempo agora | âncora `#planos` |
| Flutuante | WhatsApp | `wa.me/5527998001953` |
| Garantia/FAQ | E-mail de suporte | `contato@kronos-ias.com.br` |

**Links de checkout (Kiwify) — por plano e periodicidade:**
| Plano | Mensal | Anual |
|---|---|---|
| Individual | https://pay.kiwify.com.br/HZzahV5 | https://pay.kiwify.com.br/vaYLMVx |
| Time | https://pay.kiwify.com.br/Fa0RNiT | https://pay.kiwify.com.br/3gsFJ9E |

> O botão acompanha o toggle Mensal/Anual: se o lead está vendo o preço anual, o clique já vai pro checkout anual.

**Reversão de risco:** garantia incondicional de 7 dias, 100% do dinheiro de volta, sem justificar, sem fidelidade. Reforçada na seção Garantia, nos cards de plano, no FAQ e no CTA final.

**Funil de eventos (Meta):** PageView (toda a página) → InitiateCheckout (clique em "Assinar") → Purchase (na Kiwify).

---

## 4. Sistema de design / identidade

- **Paleta (5 cores quentes, sem verde/azul/vermelho saturados):**
  - Ônix `#150C06` (fundo principal)
  - Sépia `#2E2017` (superfícies/cards)
  - Areia `#A89070` (dourado: textos secundários, detalhes, números)
  - Creme `#F5EFE6` (fundos claros, texto sobre escuro)
  - Branco `#FFFFFF`
- **Tipografia:** Cormorant Garamond (serifada, display/títulos) + Instrument Sans (sem serifa, UI/corpo).
- **Identidade:** marca KRONOS = tempo/precisão. Símbolo `)(` (ciclone/ampulheta estilizada), ponteiro de relógio como ícone recorrente, tagline "Expandindo o tempo" / "Mover o ponteiro".
- **Motion (inventário):** vórtice/ciclone no hero e CTA final; partículas douradas em deriva; scroll-reveal; count-up nos números; lacre com efeito de "carimbo"; relógio com ponteiros girando; ponteiro do FAQ que gira ao abrir; micro-hovers.
- **Ritmo visual:** alterna fundos claros (creme) e escuros (ônix/sépia, com textura de areia) entre seções.
- **Tom de voz:** ousado, direto, "de vendedor pra vendedor", foco em ganância+preguiça resolvidas (vender mais, em menos tempo). Sem travessões longos, sem jargão corporativo.

---

## 5. Tracking & analytics

- **Meta Pixel:** ID `994356140237282`. Dispara `PageView` no load e `InitiateCheckout` no clique dos botões "Assinar" (com plano, periodicidade, valor e moeda BRL).
- **Purchase:** fecha na **Kiwify** (mesmo pixel instalado lá).
- **Microsoft Clarity:** ID `x1zfwe3wbn` (heatmaps + gravação de sessão).

---

## 6. ⚠️ Placeholders e pontos a validar (transparência para análise de CRO/compliance)

- **Depoimentos** da seção "A nova era dos vendedores 10x": **fictícios** (modelo). Devem ser substituídos por reais/autorizados antes de escalar mídia (risco de propaganda enganosa / CONAR).
- **Faixa de números** (1.300+, +67 mil, +35 milhões, 100%): **ilustrativos**. Trocar por dados reais.
- **Prazo de garantia:** está em "7 dias" em toda a página (validar se é 7 ou outro).
- **Afirmações de segurança** (criptografia, conformidade total com a LGPD): confirmar se batem com a operação real antes de manter no ar.
- **Valores de contrato** nos depoimentos (R$ 70 mil, R$ 12 mil): fictícios, junto com os depoimentos.

---

*Documento gerado a partir do código-fonte atual da LP (KRONOS — Gerador de Propostas). Reflete o estado renderizado da página, incluindo elementos injetados por JavaScript.*
