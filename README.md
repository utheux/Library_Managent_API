# 📚 API de Gerenciamento de Biblioteca

Esta é uma API RESTful para gerenciamento de uma biblioteca, desenvolvida com Node.js, TypeScript e Express. Ela permite o controle de usuários, livros e reservas, com autenticação baseada em JWT.

---

## 🔧 Tecnologias Utilizadas

- **Node.js**
- **TypeScript**
- **Express**
- **SQLite**
- **JWT (JSON Web Token)**
- **TypeORM**

---

## 🚀 Funcionalidades

### 👤 Usuário
- Criar conta
- Realizar login
- Atualizar perfil
- Deletar perfil
- Listar livros
- Realizar reserva

### 🛡️ Administrador (Admin)
- Todas as funções do usuário
- Cadastrar livro
- Atualizar livro
- Deletar livro
- Listar usuários
- Listar reservas
- Deletar reserva

> 🔐 Todas as funcionalidades (exceto criação de conta) exigem autenticação via login.

---

## 📌 Requisitos

- Node.js instalado (v14+)
- Yarn ou NPM

---

## ⚙️ Instalação e Execução

```bash
# Clone o repositório
git clone https://github.com/utheux/Library_Managent_API
cd Library_Managent_API

# Instale as dependências
npm install
# ou
yarn install

# Inicie o servidor
npm run dev
# ou
yarn dev
