
## Sobre o Projeto

Este é um projeto Next.js que simula uma aplicação de lista de filmes.
A aplicação permite que os usuários simulem login, adicionem filmes à sua lista, vejam detalhes dos filmes e naveguem por diferentes categorias.

### Scripts

Na pasta do projeto, você pode rodar:

#### `npm run dev`
Roda o aplicativo no modo de desenvolvimento.\
Abra [http://localhost:3000](http://localhost:3000) para visualizar no navegador.

#### `npm run build`
Cria a versão de produção do aplicativo na pasta `.next`.\
Otimiza a performance para o melhor desempenho possível.

#### `npm run test`
Roda a suíte de testes unitários utilizando Jest e React Testing Library.\
Ideal para verificar se as alterações não quebraram funcionalidades existentes.

## Decisões Técnicas

### Arquitetura e Organização

O projeto segue a arquitetura do **Next.js App Router**, favorecendo uma estrutura modular e escalável.

*   **`src/app`**: Contém as rotas da aplicação, layouts e páginas.
*   **`src/components`**: Componentes de UI reutilizáveis, organizados por funcionalidade (ex: `Header`, `ItemCard`).
*   **`src/data`**: Camada de dados simula um banco de dados ou API externa. Centralizar o acesso aos dados aqui facilita a futura migração para um backend real.
*   **`src/types`**: Definições de tipos TypeScript compartilhadas (ex: `User`, `Item`).

## Estratégias de Renderização

O projeto utiliza o poder híbrido do Next.js para entregar a melhor experiência possível:

### SSR (Server Side Rendering) & Server Components
Por padrão, a maioria dos componentes são **Server Components**. Eles são renderizados no servidor, enviando apenas HTML para o cliente.
*   **Exemplos:**
    *   `src/app/page.tsx`: A página inicial (Home) é renderizada no servidor para garantir SEO e performance.
    *   `src/components/ItemGrid/ItemGrid.tsx`: Renderiza a grade de itens já com os dados populados.
*   **Benefícios:** Menor bundle JS, carregamento inicial rápido (FCP) e excelente SEO.

### CSR (Client Side Rendering)
Utilizado onde a interatividade é necessária (hooks `useState`, `useEffect`, eventos de clique).
*   **Exemplos:**
    *   `src/app/login/page.tsx`: Validação do formulário de login em tempo real.
    *   `src/context/AuthContext.tsx`: Gerenciamento do estado global de autenticação.
    *   `src/components/ItemActions/ItemActions.tsx`: Botão de "Adicionar à Minha Lista" que requer interação do usuário.

### ISR (Incremental Static Regeneration) - Página de Detalhes

A página de detalhes do filme (`src/app/item/[id]/page.tsx`) utiliza **ISR (Incremental Static Regeneration)** combinado com **SSG (Static Site Generation)**.

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

1.  **Escopo Local (Safe by Default):** O problema mais comum do CSS tradicional é o conflito de nomes globais. Com CSS Modules (ex: `src/components/Header/Header.module.css`), uma classe `.title` usada em `src/components/Header/Header.tsx` é transformada em algo único como `Header_title__a1b2c`, garantindo que não afete o `.title` de outro componente.
2.  **Performance:** Zero runtime overhead. Ao contrário de bibliotecas *CSS-in-JS* (como Styled Components), o CSS Modules gera arquivos `.css` estáticos no build, que são cacheados pelo navegador e carregados em paralelo, sem bloquear a execução do JavaScript.
3.  **Manutenção:** Clara relação entre o componente TSX e seu CSS. Se você deletar o componente, sabe exatamente qual arquivo CSS deletar.
4.  **Curva de Aprendizado:** Para desenvolvedores que já conhecem CSS, a curva de aprendizado é mínima, sem necessidade de aprender sintaxes complexas de template literals.
