# E-commerce MERN

Este projeto é uma aplicação de e-commerce fullstack desenvolvida com **MongoDB**, **Express**, **React**, **Node.js** e **Tailwind CSS**. Ele oferece funcionalidades completas para usuários e administradores, incluindo autenticação, gerenciamento de produtos, carrinho de compras, checkout e painel administrativo.

---

## 🛠️ Tecnologias Utilizadas

- **Frontend**
  - [React](https://react.dev/)
  - [React Router DOM](https://reactrouter.com/)
  - [Axios](https://axios-http.com/)
  - [Tailwind CSS](https://tailwindcss.com/)
  - [Vite](https://vitejs.dev/)

- **Backend**
  - [Node.js](https://nodejs.org/)
  - [Express](https://expressjs.com/)
  - [Mongoose](https://mongoosejs.com/)
  - [MongoDB](https://www.mongodb.com/)
  - [JWT](https://jwt.io/) (autenticação)
  - [bcrypt](https://github.com/kelektiv/node.bcrypt.js) (hash de senha)
  - [dotenv](https://github.com/motdotla/dotenv) (variáveis de ambiente)
  - [Swagger](https://swagger.io/) (documentação da API)

---

## 🚀 Funcionalidades

### Usuário
- Cadastro e login com autenticação JWT
- Visualização de produtos e detalhes
- Adição, remoção e atualização de itens no carrinho
- Checkout com endereço de entrega
- Visualização de pedidos realizados (dashboard)
- Logout

### Administrador
- Painel administrativo protegido
- Gerenciamento de usuários (listar, remover)
- Gerenciamento de produtos (criar, listar, remover)
- Gerenciamento de categorias (criar, listar, remover)

---

## 📦 Estrutura de Pastas

```
📦 backend/
├── server.js
├── /config
├── /controllers
├── /middlewares
├── /models
├── /routes

📦 frontend/
├── index.html
├── vite.config.js
├── eslint.config.js
├── .env.production
├── /public
├── /src
│   ├── main.jsx
│   ├── App.jsx
│   ├── /components
│   ├── /contexts
│   ├── /pages
│   ├── /middlewares
│   ├── /routes
│   ├── /services
│   ├── /utils
│   └── /styles
```

---

## 🌐 Rotas da API

### Autenticação
- `POST   /auth/register` — Cadastro de usuário
- `POST   /auth/login` — Login de usuário
- `GET    /auth/me` — Dados do usuário autenticado

### Produtos
- `GET    /products` — Listar produtos
- `GET    /products/:id` — Detalhes de um produto

### Categorias
- `GET    /categories` — Listar categorias
- `GET    /categories/:id` — Detalhes de uma categoria

### Carrinho
- `GET    /cart` — Obter carrinho do usuário autenticado
- `POST   /cart/sync` — Sincronizar carrinho (login)
- `PUT    /cart/update` — Atualizar quantidade de item no carrinho

### Pedidos
- `POST   /orders` — Criar pedido (checkout)
- `GET    /orders` — Listar pedidos do usuário

### Admin (requer autenticação e permissão de admin)
- `GET    /admin/users` — Listar usuários
- `DELETE /admin/users/:id` — Remover usuário
- `POST   /admin/products` — Criar produto
- `DELETE /admin/products/:id` — Remover produto
- `POST   /admin/categories` — Criar categoria
- `DELETE /admin/categories/:id` — Remover categoria

---

## 📝 Como rodar o projeto

### Pré-requisitos
- Node.js 18+
- MongoDB

### Backend

```bash
cd backend
cp .env.example .env # configure as variáveis de ambiente
npm install
npm start
```

### Frontend

```bash
cd frontend
cp .env.example .env.production
npm install
npm run dev
```

Acesse o frontend em http://localhost:5173.

## 📄 Observações

- O projeto utiliza autenticação JWT para proteger rotas.
- O painel admin só é acessível para usuários com papel admin.
- O carrinho é sincronizado entre localStorage e banco de dados ao logar.
- O checkout exige endereço de entrega e limpa o carrinho após o pedido.

## 👤 Autor
[Kauã Régis](https://github.com/kauaregisdev)

## 📃 Licença
MIT

