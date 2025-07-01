# Aplicação de E-commerce Full-Stack

Este projeto é uma aplicação de e-commerce full-stack com backend em Node.js e frontend em React.

## Estrutura do Projeto

O projeto é dividido em duas partes principais:

- `backend/`: Contém a aplicação Node.js/Express que serve a API.
- `frontend/`: Contém a aplicação React que fornece a interface do usuário.

## Backend

O backend é uma aplicação Node.js construída com o framework Express. Ele utiliza MongoDB como banco de dados e Mongoose como ODM.

### Funcionalidades

- **Autenticação:** Registro e login de usuários com autenticação baseada em JWT.
- **Categorias:** Operações CRUD para categorias de produtos.
- **Produtos:** Operações CRUD para produtos.
- **Admin:** Rotas exclusivas para administradores para gerenciar usuários, produtos e categorias.
- **Documentação da API:** Swagger é usado para documentação da API, disponível em `/api-docs`.

### Tecnologias

- Node.js
- Express
- MongoDB
- Mongoose
- JWT (JSON Web Tokens)
- Swagger

### Configuração e Execução

1. Navegue até o diretório `backend/`.
2. Crie um arquivo `.env` baseado no `.env.example` (se disponível) e configure as variáveis de ambiente necessárias (ex: string de conexão do banco de dados, segredo JWT).
3. Instale as dependências: `npm install`
4. Execute o servidor: `npm start` (ou `npm run dev` se um script de desenvolvimento estiver disponível)

O servidor backend normalmente será executado em `http://localhost:3000`.

## Frontend

O frontend é uma aplicação React construída com Vite e estilizada com Tailwind CSS.

### Funcionalidades

- **Interface do Usuário:** Fornece uma interface amigável para navegar pelos produtos, visualizar detalhes dos produtos e gerenciar contas de usuário.
- **Roteamento:** Utiliza React Router para roteamento no lado do cliente.
- **Integração com API:** Comunica-se com a API do backend usando Axios.
- **Autenticação:** Gerencia login, registro de usuários e gerenciamento de tokens.
- **Painel de Administração:** Fornece uma interface de administração para gerenciar usuários, produtos e categorias.

### Tecnologias

- React
- Vite
- Tailwind CSS
- React Router
- Axios

### Configuração e Execução

1. Navegue até o diretório `frontend/`.
2. Instale as dependências: `npm install`
3. Execute o servidor de desenvolvimento: `npm run dev`

O servidor de desenvolvimento frontend normalmente será executado em `http://localhost:5173`.

## Scripts Disponíveis

### Backend (`backend/package.json`)

- `npm test`: Executa testes (se configurado).
- `npm start`: Inicia o servidor de produção.
- (Outros scripts conforme definido em `package.json`)

### Frontend (`frontend/package.json`)

- `npm run dev`: Inicia o servidor de desenvolvimento Vite.
- `npm run build`: Compila a aplicação para produção.
- `npm run lint`: Executa o linter no código.
- `npm run preview`: Visualiza a build de produção localmente.

## Endpoints da API

O backend fornece os seguintes endpoints de API:

### Autenticação

- `POST /auth/register`: Registra um novo usuário.
- `POST /auth/login`: Autentica um usuário e retorna um token JWT.
- `GET /auth/me`: Obtém as informações do usuário atualmente logado (requer token).

### Categorias

- `GET /categories`: Obtém todas as categorias.
- `GET /categories/:id`: Obtém uma única categoria pelo ID.
- `POST /admin/categories`: Cria uma nova categoria (somente admin).
- `DELETE /admin/categories/:id`: Deleta uma categoria pelo ID (somente admin).

### Produtos

- `GET /products`: Obtém todos os produtos.
- `GET /products/:id`: Obtém um único produto pelo ID.
- `POST /admin/products`: Cria um novo produto (somente admin).
- `DELETE /admin/products/:id`: Deleta um produto pelo ID (somente admin).

### Admin

- `GET /admin/users`: Obtém todos os usuários (somente admin).
- `DELETE /admin/users/:id`: Deleta um usuário pelo ID (somente admin).

Consulte a documentação do Swagger em `/api-docs` no servidor backend para mais detalhes sobre os formatos de requisição/resposta.