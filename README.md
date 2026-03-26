# 🕶️ Theo Óticas — Landing Page Oficial

<p align="center">
  <a href="https://theo-oticas-oficial.vercel.app/">
    🌐 Acesse o site
  </a>
 ->https://gamma.app/docs/Theo-Oticas-rbl40u2e8lsnzdp
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18-blue" />
  <img src="https://img.shields.io/badge/TypeScript-✔-blue" />
  <img src="https://img.shields.io/badge/Vite-fast-yellow" />
  <img src="https://img.shields.io/badge/TailwindCSS-styled-38B2AC" />
  <img src="https://img.shields.io/badge/Deploy-Vercel-black" />
</p>

---

## 📌 Sobre o Projeto

Este projeto é o site oficial da **Theo Óticas**, desenvolvido como uma **landing page moderna com catálogo interativo e carrinho**, focada em **conversão direta via WhatsApp**.

A aplicação une apresentação institucional com uma experiência simples de compra:

- 🛍️ Visualização de produtos  
- ➕ Adição ao carrinho  
- 📲 Envio automático do pedido via WhatsApp  

---

## 🎯 Objetivo

- Apresentar a marca de forma profissional  
- Gerar leads qualificados  
- Facilitar contato direto via WhatsApp  
- Exibir produtos de forma simples e rápida  
- Aumentar conversão local  

---

## 🧠 Estratégia de Conversão

O site segue um fluxo enxuto:

1. **Hero (impacto visual)**  
2. **Serviços (prova de valor)**  
3. **Produtos (engajamento)**  
4. **Carrinho (intenção)**  
5. **WhatsApp (conversão)**  

---

## 🧱 Arquitetura do Projeto

### 📂 Estrutura de pastas

```txt
src/
 ├── assets/          # Imagens e recursos
 ├── components/      # Componentes da aplicação
 │   └── ui/          # Biblioteca base (shadcn/ui)
 ├── context/         # Estados globais (Cart, Theme)
 ├── hooks/           # Hooks customizados
 ├── lib/             # Utilitários
 ├── pages/           # Páginas (Index, NotFound)
 ├── test/            # Testes (Vitest)
 ├── App.tsx          # Providers + rotas
 └── main.tsx         # Entry point

----

## 🔄 Fluxo da Aplicação


main.tsx
↓
App.tsx (Providers + Router)
↓
pages/Index.tsx
↓
Seções (Header → Hero → Services → Produtos → Contato → Footer)


---

## 🧩 Principais Componentes

### 🔝 Header
- Navegação com scroll suave
- Menu mobile
- Botão de WhatsApp
- Alternância de tema (dark/light)

---

### 🚀 Hero
- Headline de conversão
- CTA para WhatsApp
- CTA para Instagram
- Destaque de localização (Itapetininga - SP)

---

### ⭐ Services
- Armações modernas  
- Óculos de sol  
- Atendimento personalizado  

---

### 🛍️ Produtos

#### 🔄 ProductCarousel
- Carrossel com autoplay (Embla)
- Destaque visual de produtos

#### 📦 ProductCatalog
- Listagem completa
- Filtro por categoria
- Busca por nome
- Abertura de modal

#### 🔍 ProductModal
- Detalhes do produto
- Imagens
- Informações técnicas
- Botão de adicionar ao carrinho

---

### 🛒 Carrinho (CartDrawer)

- Controle de quantidade
- Remoção de itens
- Limpeza do carrinho
- Geração automática de mensagem para WhatsApp

---

### 📍 Contact
- Endereço com link para Maps
- WhatsApp
- Instagram

---

### 📣 CTA Final
- Reforço de conversão
- Ação imediata

---

### 🔻 Footer
- Informações institucionais
- Links rápidos
- Ano dinâmico

---

## 🧠 Estado Global

### 🛒 CartContext

Responsável por:

- Adicionar/remover produtos  
- Atualizar quantidade  
- Calcular total  
- Gerar link do WhatsApp com mensagem dinâmica  

📌 Exemplo de mensagem gerada:


Olá! Gostaria de pedir:

Óculos X (2x)
Óculos Y (1x)

---

### 🌙 ThemeContext

- Alternância dark/light  
- Persistência em `localStorage`  
- Aplicação via classe no HTML  

---

## ⚙️ Tecnologias Utilizadas

### Frontend

- React 18  
- TypeScript  
- Vite  

### UI & Estilo

- Tailwind CSS  
- shadcn/ui  
- Radix UI  
- Lucide Icons  

### Funcionalidades

- React Router DOM  
- React Hook Form  
- Zod  
- Embla Carousel  
- Sonner (toasts)  

### Estado e dados

- Context API  
- TanStack React Query *(infra preparada, pouco utilizada atualmente)*  

### Testes

- Vitest  
- Playwright  

---

## ⚡ Funcionalidades

- 📲 Integração direta com WhatsApp  
- 🛒 Carrinho com geração automática de pedido  
- 🔍 Catálogo com busca e filtros  
- 🎠 Carrossel de produtos  
- 🌙 Tema escuro/claro  
- 📱 Layout totalmente responsivo  
- 📜 Scroll suave  
- 🔔 Feedback visual (toasts)  

---

## 📱 Responsividade

Compatível com:

- 📱 Mobile (prioridade)  
- 📲 Tablet  
- 💻 Desktop  

---

## 📍 Informações da Empresa

**Nome:** Theo Óticas  
**Endereço:** Rua Coronel Pedro Dias Batista, BOX 04  
Mercadão Municipal — Centro / Itapetininga  

**WhatsApp:** (15) 99686-9669  
**Instagram:** https://www.instagram.com/theo.oticas  

---

## 🚀 Como rodar o projeto

```bash
# Clonar repositório
git clone https://github.com/marcielssilva/theo-oticas-landing-page

# Acessar pasta
cd theo-oticas-landing-page

# Instalar dependências
npm install

# Rodar projeto
npm run dev


🧪 Testes

# Rodar testes unitários
npm run test

# Rodar testes e2e (Playwright)
npm run test:e2e

⚠️ Pontos de Atenção
O catálogo está hardcoded no frontend
Não há backend ou banco de dados
Produtos estão duplicados entre componentes
React Query está presente mas pouco utilizado
🔧 Melhorias Futuras
🗄️ Integração com backend / API
🛒 Persistência do carrinho (localStorage ou backend)
📦 Centralização dos produtos (evitar duplicação)
📊 Integração com Google Analytics / Meta Pixel
🔍 SEO local otimizado
⭐ Avaliações de clientes
🧭 Integração com Google Maps embed
🧾 Página de pedido detalhado
🛍️ Checkout mais estruturado

💡 Resumo

O projeto evoluiu de uma landing page simples para uma mini experiência de e-commerce focada em WhatsApp, mantendo:

Simplicidade
Alta conversão
Performance
Facilidade de manutenção
