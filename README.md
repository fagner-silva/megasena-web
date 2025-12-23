# 🎰 Mega-Sena App

Aplicação fullstack para **cadastro, gerenciamento e conferência de jogos da Mega-Sena**, permitindo registrar jogos com 6 a 20 dezenas, cadastrar o sorteio oficial e conferir automaticamente quais jogos foram contemplados com **Quadra (4)**, **Quina (5)** ou **Sena (6)**.

O projeto foi desenvolvido com foco em **boas práticas**, **arquitetura simples**, **documentação clara** e **deploy em cloud**.

---

## 🌐 Aplicação Online

- **Frontend (React):**  
  👉 https://megasena-web.onrender.com/

- **Backend (API):**  
  👉 https://megasena-api-9sjc.onrender.com

- **Swagger (Documentação da API):**  
  👉 https://megasena-api-9sjc.onrender.com/docs

---

## 🧠 Funcionalidades

### 🎟️ Jogos
- Cadastrar jogos com **6 até 20 dezenas**
- Adicionar ou remover dezenas dinamicamente
- Listar todos os jogos cadastrados
- Excluir jogos

### 🎯 Sorteio
- Cadastrar o jogo sorteado (6 dezenas)
- Manter histórico de sorteios
- Recuperar automaticamente o último sorteio

### 🧮 Conferência
- Comparar todos os jogos cadastrados com o último sorteio
- Identificar jogos com:
  - ✅ 4 acertos (Quadra)
  - ⭐ 5 acertos (Quina)
  - 🎯 6 acertos (Sena)
- Exibir resultado em **modal/popup**
  - “🎉 Você teve jogos contemplados”
  - “😅 Ops, não foi dessa vez”

---

## 🖥️ Frontend

### Tecnologias
- React + Vite
- React Router DOM
- Axios
- CSS puro (tema inspirado na Mega-Sena)
- Deploy como **Static Site no Render**

### Rotas do Frontend

| Rota | Descrição |
|-----|----------|
| `/` | Cadastrar jogo (6–20 dezenas) |
| `/jogos` | Listar e excluir jogos |
| `/sorteio` | Cadastrar jogo sorteado |
| `/conferir` | Conferir jogos com popup de resultado |

---

## 🔧 Backend (API)

### Tecnologias
- Node.js
- Express
- MongoDB Atlas
- Mongoose
- Zod (validações)
- Swagger (OpenAPI 3.0)
- Deploy no Render

---

## 📄 Documentação da API (Swagger)

A API está totalmente documentada com Swagger:

👉 **https://megasena-api-9sjc.onrender.com/docs**

No Swagger é possível:
- Visualizar todas as rotas
- Ver schemas de request/response
- Executar chamadas com **Try it out**

---

## 🔌 Rotas da API

### 🎟️ Jogos

| Método | Rota | Descrição |
|------|-----|----------|
| POST | `/games` | Cadastrar jogo (6–20 dezenas) |
| GET | `/games` | Listar todos os jogos |
| PUT | `/games/:id` | Atualizar um jogo |
| DELETE | `/games/:id` | Remover um jogo |

**Exemplo – POST `/games`**
```json
{
  "description": "Jogo da virada",
  "numbers": [1, 2, 3, 4, 5, 6]
}
