# Refatoração — Theo Óticas

Revisão completa do código mantendo a identidade visual da marca: Playfair Display + Inter,
navy profundo com destaque gelo no tema escuro, azul royal no tema claro, cards arredondados
e o fluxo de conversão terminando no WhatsApp.

Validação executada nesta versão:

```
npx tsc --noEmit -p tsconfig.app.json   # sem erros
npm run build                           # ✓ built
npx eslint src                          # 0 erros nos arquivos novos
```

---

## 1. Bugs corrigidos

| Problema | Onde estava | Correção |
|---|---|---|
| `font-display` não existia no Tailwind | `tailwind.config.ts` sem `fontFamily`; a classe aparecia em ~30 pontos do JSX | `fontFamily.display` / `fontFamily.sans` apontando para as CSS vars |
| `@import` das fontes depois de `@tailwind` | `src/index.css` | Fontes movidas para o `index.html` com `preconnect` |
| `100vh` cortava o CTA no mobile | `Hero.tsx` | `min-h-[100svh]` |
| Âncoras paravam atrás do header fixo | `/#servicos`, `/#sobre`, `/#contato` | `scroll-margin-top: calc(var(--header-height) + 1rem)` |
| Classes de cor conflitantes | `Hero.tsx` (`text-white` + `text-foreground/70` no mesmo elemento) | Cores explícitas, coerentes com o overlay escuro dos dois temas |
| Dourado fixo fora da paleta | `CTASection.tsx` (`hsl(43,74%,55%)`) | `hsl(var(--brand))` |
| `App.css` órfão do template Vite | `src/App.css` (`#root { max-width:1280px; text-align:center }`) | Removido |
| Carrinho sumia no refresh | `CartContext.tsx` | Persistência em `localStorage` com leitura defensiva |
| Site quebrava sem `.env` | `integrations/supabase/client.ts` | `isSupabaseConfigured` + fallback; a landing funciona com os textos padrão |
| Salvar o CMS fazia ~40 requests | `useUpsertContent` | Um único `upsert` em lote |
| Busca ignorava acento | `ProductCatalog.tsx` | `normalize()` com `NFD`; "armacao" acha "Armação" |
| Toast ignorava o tema do site | `ui/sonner.tsx` (`theme="system"` fixo) | Lê o `ThemeContext` |
| Flash de tema claro no carregamento | — | Script inline no `index.html` aplica a classe antes da primeira pintura |

## 2. Acessibilidade

- Modal de produto e carrinho: `role="dialog"`, `aria-modal`, fechar no **ESC**, trava de scroll do
  fundo com compensação da scrollbar, foco preso dentro do painel e devolvido ao elemento de origem
  (hook `useDialog`).
- O drawer do carrinho era montado permanentemente fora da tela — os botões continuavam
  tabuláveis e visíveis para leitores de tela mesmo fechado. Agora desmonta.
- Cards de produto e de serviço eram `<div onClick>`: não abriam pelo teclado. Viraram `<button>` /
  `<a>` reais, sem interativo aninhado.
- Link "pular para o conteúdo", `aria-label` em todo botão de ícone, `aria-live` na contagem de
  resultados do catálogo, foco visível padronizado, `prefers-reduced-motion` respeitado
  (inclusive desligando o autoplay do carrossel).

## 3. Arquitetura

**Arquivos novos**

```
src/config/site.ts               Contatos, endereço, horário, whatsappLink()
src/data/products.ts             Catálogo único + filtro com normalização
src/components/ProductCard.tsx   Card compartilhado (carrossel + grade)
src/components/ErrorBoundary.tsx Evita tela branca em erro de render
src/components/icons/BrandIcons.tsx   SVGs de WhatsApp/Instagram/óculos
src/components/layout/Section.tsx     Section + SectionHeading
src/hooks/useDialog.ts           Comportamento de diálogo acessível
src/hooks/useDebouncedValue.ts   Debounce da busca
.env.example
```

**Duplicação eliminada**

- Lista de produtos existia copiada em `ProductCarousel` e `ProductCatalog`.
- URL do WhatsApp estava hardcoded em 5 arquivos.
- SVG do WhatsApp colado inline 4 vezes (~40 linhas cada).
- Cabeçalho de seção repetido em 5 componentes com espaçamentos divergentes.

**Outros**

- `useSiteContent(section, defaults)` agora é genérico e devolve o objeto já mesclado e **tipado** —
  antes cada componente fazia `{...DEFAULTS, ...data}` e o resultado virava `any`. Valor vazio no
  CMS não apaga mais o texto padrão.
- `CartContext` com `useReducer` + `useMemo`/`useCallback`; `whatsappUrl` deixou de ser recalculado
  a cada render.
- Rotas com `lazy()`: o painel `/admin` puxava o `supabase-js` para todo visitante da landing.
- `ScrollManager`: troca de rota volta ao topo e links com hash funcionam vindo de outra página.
- `manualChunks` no Vite separando react / supabase / react-query / embla. O bundle principal caiu
  de **611 kB (182 kB gzip)** para **158 kB (49 kB gzip)**, e o aviso de chunk grande sumiu.

## 4. SEO e performance

- `lang="pt-BR"`, title e description reais, canonical.
- `og:title` ainda dizia **"Lovable App"** e o `og:image` apontava para um PNG hospedado na Vexels
  (site de terceiros, fora do seu controle). Trocados por metadados próprios.
- JSON-LD `Optician` com endereço, telefone, geolocalização e horário — relevante para busca local,
  que é de onde vem o cliente de uma ótica de bairro.
- Imagem do hero com `fetchPriority="high"` e `loading="eager"` (é o LCP); demais imagens com
  `loading="lazy"`, `decoding="async"` e dimensões declaradas.
- `<meta name="theme-color">` acompanha o tema escolhido.

## 5. Layout

Nada da identidade mudou; o que mudou foi a execução.

- **Escala tipográfica fluida** com `clamp()` em vez de três breakpoints por título.
- **Ritmo vertical unificado**: as seções alternavam `py-20`/`py-24` e `mb-10`/`mb-16` sem critério.
- **Hierarquia nos cards**: em Serviços e Contato, só o card que tem ação (atendimento / WhatsApp)
  fica destacado — antes eram três molduras idênticas e a chamada passava despercebida.
- **Sobre**: números viraram faixa única com divisores, e o cartão de endereço agora mostra também
  o horário de funcionamento.
- **Hero**: faixa de destaques ancorada na base, badge com ícone de localização e uma única
  animação de entrada escalonada no carregamento.
- **Carrossel**: setas e dots reais ligados à API do Embla — os "dots" antigos eram dois tracinhos
  fixos que não indicavam nada — e link para o catálogo completo.
- **Carrinho no header**, disponível em todas as páginas (antes só existia dentro do catálogo).
- **Catálogo**: busca com botão de limpar, contagem de resultados e estado vazio com ação de saída.
- **404** em português, dentro da identidade, com atalho para o WhatsApp.
- **Rodapé** reestruturado em colunas: páginas, horário e contatos.

---

## Pendências para você

1. **Tire o `.env` do versionamento.** O arquivo está commitado e não estava no `.gitignore`.
   A chave é a *publishable* e o RLS das migrations está correto, então não é vazamento grave — mas
   o lugar dela é em Settings > Environment Variables na Vercel.
   ```bash
   git rm --cached .env && git commit -m "chore: remove .env do versionamento"
   ```
2. **Suba uma `public/og-image.jpg` 1200×630** com foto real da loja (o `index.html` já aponta para ela).
3. **Confira o horário de funcionamento** em `src/config/site.ts` — preenchi com um palpite razoável,
   ele alimenta o site e o JSON-LD.
4. **Coordenadas do JSON-LD** são aproximadas do centro de Itapetininga; pegue as exatas no Google Maps.
5. **Fotos dos produtos**: hoje 10 produtos compartilham 4 imagens genéricas. É o maior ganho de
   conversão disponível e não depende de código.
6. Próximo passo natural: mover o catálogo para o Supabase. `src/data/products.ts` já isola isso —
   basta trocar o array por um fetch, nenhum componente muda.
