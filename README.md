# 🌱 Grão da Capi

Site interativo do **Projeto GRÃO** (extensão universitária — PUC Minas): conscientizar jovens sobre a **destinação do Imposto de Renda (IR) a projetos sociais** e capacitá-los a multiplicar esse conhecimento em casa.

A experiência é conduzida pela mascote **Capi, a Capivara Capital**, que explica os conceitos, reage às respostas do quiz e cresce (do grão à árvore) conforme o usuário avança na leitura.

> **Status:** protótipo migrado do site original (HTML/CSS/JS único) para **SvelteKit + Svelte 5**. O projeto já conta com responsividade revisada, hero mobile ajustada, balão da Capi refinado e card de compartilhamento com prévia + exportação em PNG.

---

## 🧰 Tecnologias usadas

| Camada | Tecnologia | Observação |
| --- | --- | --- |
| Framework | **SvelteKit 2** + **Svelte 5** | Runes (`$state`, `$derived`, `$props`, `$effect`) |
| Linguagem | **TypeScript** | Tipagem no motor fiscal, conteúdo e stores |
| Build | **Vite 5** | Dev server e bundle |
| Testes | **Vitest 2** | Testes unitários do motor fiscal |
| Checagem | **svelte-check** | `npm run check` (0 erros) |
| Adapter | **`@sveltejs/adapter-static`** | Site 100% estático (ideal p/ QR code e Render Static Site) |
| Estilo | **CSS puro** com custom properties | Tokens portados 1:1 do protótipo, tema claro/escuro |

**Pré-requisitos:** Node 20+ e npm (ou Yarn 4 via Corepack).

## 📦 Dependências

`devDependencies` (o projeto não tem dependências de runtime):

```
@sveltejs/adapter-static ^3.0.6
@sveltejs/kit           ^2.8.0
@sveltejs/vite-plugin-svelte ^4.0.0
svelte                  ^5.2.0
svelte-check            ^4.1.0
typescript              ^5.6.3
vite                    ^5.4.11
vitest                  ^2.1.5
```

Instalar e rodar:

```bash
npm install
npm run dev        # servidor de desenvolvimento
npm run build      # gera o site estático em ./build
npm run preview    # serve o build de produção
npm test           # roda os testes (Vitest)
npm run check      # checagem de tipos Svelte/TS
```

---

## 🗂️ Estrutura do projeto

```
grao-da-capi/
├─ src/
│  ├─ app.html                 # shell HTML
│  ├─ app.css                  # tokens de design + estilos globais (claro/escuro)
│  ├─ app.d.ts
│  ├─ lib/
│  │  ├─ assets/
│  │  │  └─ capi.webp          # imagem da mascote (61 KB, otimizada p/ LCP)
│  │  ├─ core/
│  │  │  ├─ tax.ts             # ⭐ motor de cálculo da destinação do IR
│  │  │  └─ tax.test.ts        # 12 testes (exemplos do Guia do Projeto GRÃO)
│  │  ├─ content/
│  │  │  ├─ capi.ts            # falas da Capi (2 vozes) + estágios da semente
│  │  │  └─ site.ts            # quiz, passo a passo, destinos, FAQ, checklist, glossário
│  │  ├─ stores/               # estado global (Svelte 5 runes em classes)
│  │  │  ├─ tema.svelte.ts     # tema claro/escuro (localStorage)
│  │  │  ├─ mode.svelte.ts     # "Modo família" (linguagem simplificada)
│  │  │  ├─ guia.svelte.ts     # balão da Capi + progresso de leitura + estágio
│  │  │  └─ simulacao.svelte.ts# estado do simulador + resultado (derived)
│  │  ├─ utils/
│  │  │  └─ brl.ts             # formatação/parse de valores em BRL (centavos)
│  │  └─ components/
│  │     ├─ Secao.svelte       # wrapper com IntersectionObserver (progresso/balão)
│  │     ├─ Duplo.svelte       # texto em 2 vozes (normal / família)
│  │     ├─ CapiMascot.svelte  # a mascote
│  │     ├─ CapiBubble.svelte  # balão flutuante da Capi (typewriter + estágio)
│  │     ├─ Header.svelte      # topo (nav, tema, toggle de modo família)
│  │     ├─ Rodape.svelte
│  │     ├─ Hero.svelte
│  │     ├─ Entenda.svelte
│  │     ├─ MitoVerdade.svelte # quiz
│  │     ├─ Simulador.svelte   # calculadora interativa
│  │     ├─ Passos.svelte
│  │     ├─ Destinos.svelte
│  │     ├─ Impacto.svelte
│  │     ├─ SobreCapi.svelte   # por que a Capi
│  │     └─ CardSemente.svelte # card de compartilhamento (prévia + exportação PNG)
│  └─ routes/
│     ├─ +layout.svelte        # Header + balão da Capi + Rodapé + <title> por rota
│     ├─ +layout.ts            # prerender = true
│     ├─ +page.svelte          # home (9 seções)
│     ├─ simulador/            # /simulador
│     ├─ mitos/                # /mitos
│     ├─ passos/               # /passos
│     ├─ destinos/             # /destinos
│     ├─ impacto/              # /impacto
│     ├─ capi/                 # /capi
│     ├─ compartilhe/          # /compartilhe
│     ├─ material/             # /material
│     └─ sobre/                # /sobre
├─ static/
│  └─ favicon.png
├─ svelte.config.js            # adapter-static + aliases ($components, $core, $content, $stores)
├─ vite.config.ts
├─ tsconfig.json
└─ package.json
```

**Aliases de importação** (`svelte.config.js`): `$components`, `$core`, `$content`, `$stores`.

### Rotas (todas pré-renderizadas)

| Rota | Conteúdo |
| --- | --- |
| `/` | Home com as 9 seções (hero → entenda → mitos → simulador → passos → destinos → impacto → capi → semente) |
| `/simulador` | Calculadora de destinação em página dedicada |
| `/mitos` | Quiz "mito ou verdade" |
| `/passos` | Passo a passo (declaração e durante o ano) |
| `/destinos` | Para onde o dinheiro vai (filtro por causa social) |
| `/impacto` | Por que isso importa + estatísticas |
| `/capi` | Por que escolhemos a capivara |
| `/compartilhe` | Gerador do card de compartilhamento |
| `/material` | Material de consulta (checklist, glossário, FAQ) |
| `/sobre` | Sobre o Projeto GRÃO (equipe/autoria) |

---

## ⚙️ Motor fiscal (`src/lib/core/tax.ts`)

Função central: `calcular(devido: number, sel: Selecao): Resultado`.

Todas as regras do Guia, tratadas **em centavos inteiros** para evitar erro de ponto flutuante:

- **Teto do "pool":** 6% do imposto devido — sobe para **7%** se houver **Esporte**.
- **FIA** e **Fundo do Idoso:** até **3% cada**, dentro do pool.
- **Cultura, Esporte e Reciclagem:** compartilham o que sobra do pool.
- **PRONON** e **PRONAS/PCD:** **+1% cada**, **fora** do teto.
- **Esporte × Reciclagem** não se combinam na mesma declaração (gera aviso).
- Sem imposto devido (> 0) não há destinação (gera aviso amigável).
- A soma das linhas **é sempre igual ao total** (sem duplicidade).

O motor foi reescrito a partir do protótipo para **corrigir um bug real**: a versão antiga somava o pool cheio em cada linha, mas adicionava o pool apenas uma vez ao total — gerando números inconsistentes. O `tax.test.ts` cobre os exemplos do Guia (R$ 600, R$ 300, R$ 700, R$ 200, R$ 900 = 9%, caso do jovem com R$ 240), a invariante `soma = total`, o conflito esporte × reciclagem e o arredondamento em centavos.

## 🎨 Design & acessibilidade

- **Tokens em `:root`** (`--bg`, `--br`, `--ac`, `--g`, etc.) com tema claro/escuro via `data-theme` e `prefers-color-scheme`.
- **Modo família:** cada fala/texto tem duas vozes (`normal` e `familia`), alternadas pelo toggle no topo.
- **Progresso de leitura** alimenta a barra do topo e o **crescimento da muda** (`--g`) / estágio (`🫘 → 🌱 → 🌿 → 🌳`).
- **Responsividade revisada** em hero, header, quiz, simulador, card de compartilhamento e balão da Capi.
- **Hero mobile** com Capi em linha própria acima do balão de apresentação.
- **Card de compartilhamento** com composição visual mais rica e exportação coerente em PNG 1080×1920.
- `aria-live`, `aria-pressed`, foco visível e respeito a `prefers-reduced-motion`.

---

## ✅ O que já está feito

- Scaffold SvelteKit (TS) com adapter estático, aliases e tokens portados.
- Motor fiscal testado (`tax.ts` + 12 testes passando).
- Camada de conteúdo das falas da Capi (2 vozes) e conteúdo editorial do site.
- Stores de tema, modo família, guia/progresso e simulação.
- 15 componentes e 10 rotas.
- Responsividade refinada para mobile, tablet e desktop.
- Hero mobile reorganizada com a Capi apresentando o balão sem sobreposição.
- Card de compartilhamento com prévia melhorada e geração de PNG.
- `npm test`, `npm run build` e `npm run check` passando.

## 🚧 O que falta fazer

- [ ] **Conferir a fidelidade visual** de cada seção contra o protótipo original (`Site-do-projeto-da-faculdade/index.html`).
- [ ] **Portar as animações da Capi** (piscar, acenar, reagir a acerto/erro do quiz).
- [ ] **Dashboard de estatísticas** da campanha (nº de simulações) — precisa de backend ou serviço.
- [ ] **PWA / offline** e ícones para instalação em celular.
- [ ] **SEO/OG**: imagem de Open Graph dedicada e `<meta>` por rota.
- [ ] **Publicar no Render** (Static Site) apontando para a pasta `build`.

## 💡 Pontos a melhorar

- **Conteúdo e dados** são provisórios em alguns trechos (ex.: `ESTATISTICAS` marcadas como *estimativa*) — validar fontes antes de publicar.
- **Persistir a simulação** (localStorage) para retomar o card depois.
- **CTAs de destaque**: botões de ação podem seguir o design system em vez de estilos pontuais.
- **Revisar textos** das duas vozes da Capi para consistência de tom (acadêmico-dinâmico × dia a dia).
- **Lapidar o card exportado**: o layout já foi melhorado, mas ainda vale refinar proporção, hierarquia e legibilidade da arte em telas pequenas e no PNG final.
- **Cobertura de testes**: hoje só o motor fiscal está testado — vale cobrir `brl.ts` e regras de exibição.
- **Desempenho**: avaliar `loading="lazy"`/`fetchpriority` na imagem da mascote e pré-carregar fontes, se houver.
- **Acessibilidade**: auditar o toggle de tema/modo família e o canvas do card com leitores de tela.

---

Projeto de extensão — **PUC Minas / Projeto GRÃO**.
