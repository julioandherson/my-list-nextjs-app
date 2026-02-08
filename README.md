This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Decisões Técnicas

### Arquitetura e Organização

O projeto segue a arquitetura do **Next.js App Router**, favorecendo uma estrutura modular e escalável.

*   **`src/app`**: Contém as rotas da aplicação, layouts e páginas. A estrutura de pastas reflete diretamente a URL (File-system based routing).
*   **`src/components`**: Componentes de UI reutilizáveis, organizados por funcionalidade (ex: `Header`, `ItemCard`).
*   **`src/data`**: Camada de dados simula um banco de dados ou API externa. Centralizar o acesso aos dados aqui facilita a futura migração para um backend real.
*   **`src/types`**: Definições de tipos TypeScript compartilhadas (ex: `User`, `Item`), garantindo consistência em todo o projeto.

### Tecnologias Principais

*   **Next.js 15+ & React 19**: Escolhidos pela performance, SEO e recursos modernos como Server Components.
*   **TypeScript**: Adotado para garantir segurança de tipos, reduzir bugs e melhorar a experiência de desenvolvimento (DX) com autocompletar e refatoração segura.
*   **Jest & React Testing Library**: Para garantir a confiabilidade do código através de testes unitários robustos.

## Estratégias de Renderização

O projeto utiliza o poder híbrido do Next.js para entregar a melhor experiência possível:

### SSR (Server Side Rendering) & Server Components
Por padrão, a maioria dos componentes são **Server Components**. Eles são renderizados no servidor, enviando apenas HTML para o cliente.
*   **Benefícios:** Menor bundle JS, carregamento inicial rápido (FCP) e excelente SEO.

### CSR (Client Side Rendering)
Utilizado onde a interatividade é necessária (hooks `useState`, `useEffect`, eventos de clique).
*   **Exemplos:** Formulário de Login, ações de "Adicionar à Minha Lista", componentes de navegação interativos.

### ISR (Incremental Static Regeneration) - Página de Detalhes

A página de detalhes do filme (`/item/[id]`) utiliza **ISR (Incremental Static Regeneration)** combinado com **SSG (Static Site Generation)**.

*   **Implementação:**
    *   `generateStaticParams`: Gera estaticamente as páginas dos filmes conhecidos no tempo de build.
    *   `revalidate = 60`: Define que a página pode ser regenerada no background a cada 60 segundos se houver novas requisições.

*   **Justificativa (Por que ISR?):**
    *   **Performance:** A página é servida como um arquivo estático (HTML) diretamente da CDN/Edge, garantindo tempos de resposta instantâneos (TTFB baixíssimo).
    *   **SEO:** O conteúdo já vem pronto no HTML, perfeito para indexação por motores de busca.
    *   **Atualização de Dados:** Diferente do SSG puro, não precisamos rebuildar o site inteiro para corrigir um erro de digitação na sinopse de um filme. O conteúdo é atualizado "sob demanda" após o tempo de revalidação.
    *   **Escalabilidade:** Para um catálogo com milhares de filmes, o ISR permite buildar apenas os mais populares e gerar o restante sob demanda, sem tempos de build infinitos.

## Estilo

A abordagem de estilização escolhida foi **CSS Modules**.

### Por que CSS Modules?

1.  **Escopo Local (Safe by Default):** O problema mais comum do CSS tradicional é o conflito de nomes globais. Com CSS Modules, uma classe `.title` no componente `Header` é transformada em algo único como `Header_title__a1b2c`, garantindo que não afete o `.title` de outro componente.
2.  **Performance:** Zero runtime overhead. Ao contrário de bibliotecas *CSS-in-JS* (como Styled Components), o CSS Modules gera arquivos `.css` estáticos no build, que são cacheados pelo navegador e carregados em paralelo, sem bloquear a execução do JavaScript.
3.  **Manutenção:** Clara relação entre o componente TSX e seu CSS. Se você deletar o componente, sabe exatamente qual arquivo CSS deletar.
4.  **Curva de Aprendizado:** Para desenvolvedores que já conhecem CSS, a curva de aprendizado é mínima, sem necessidade de aprender sintaxes complexas de template literals.

### Scripts Disponíveis

Na pasta do projeto, você pode rodar:

#### `npm run dev`
Roda o aplicativo no modo de desenvolvimento.\
Abra [http://localhost:3000](http://localhost:3000) para visualizar no navegador.

#### `npm run build`
Cria a versão de produção do aplicativo na pasta `.next`.\
Otimiza a performance para o melhor desempenho possível.

#### `npm run start`
Inicia o servidor em modo de produção.\
Geralmente usado após rodar o `npm run build`.

#### `npm run test`
Roda a suíte de testes unitários utilizando Jest e React Testing Library.\
Ideal para verificar se as alterações não quebraram funcionalidades existentes.
