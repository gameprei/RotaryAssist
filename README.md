# Rotary Backend API

API RESTful para gerenciamento de Rotary Club.

## 🚀 Tecnologias
- Node.js + Express
- MySQL
- JavaScript

## 📋 Funcionalidades
- **Beneficiários**: CRUD completo com busca por nome/CPF/RG
- **Membros**: Gestão de membros com dados profissionais
- **Equipamentos**: Controle de cadeiras de rodas, banho, etc.

## 🔧 Instalação Rápida

```bash
# Clone o repositório
git clone https://github.com/gameprei/RotaryAssist.git
cd RotaryAssist/backend

# Instale dependências
npm install

# Configure ambiente
cp .env.example .env
# Edite .env com suas credenciais MySQL

# Execute o script SQL (database.sql) no MySQL
# Inicie o servidor
npm start
```

## 📊 Endpoints Principais
```
GET    /api/beneficiarios      # Listar beneficiários
POST   /api/beneficiarios      # Criar beneficiário
GET    /api/membros            # Listar membros
POST   /api/membros            # Criar membro
GET    /api/equipamentos       # Listar equipamentos
POST   /api/equipamentos       # Criar equipamento
```

## 🏗️ Estrutura
```
controllers/   # Lógica das rotas
models/        # Interação com banco
routes/        # Definição de rotas
database.sql   # Estrutura do banco
```

## ⚡ Iniciar
```bash
npm start          # Produção
npm run dev        # Desenvolvimento
```

A API estará em `http://localhost:3000`

---
**Rotary Club Management System** 🎗️