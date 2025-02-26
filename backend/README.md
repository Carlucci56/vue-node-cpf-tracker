# 🖥️ Backend - Vue Node CPF Tracker

Este é o backend da aplicação, responsável por **processar PDFs**, **extrair CPFs** e **armazená-los no Firebase Realtime Database**.

## 🚀 Tecnologias Utilizadas
- Node.js
- Express
- Multer (upload de arquivos)
- PDF-Parse (extração de texto de PDFs)
- Firebase Admin SDK
- Dotenv (variáveis de ambiente)

## 📂 Estrutura do Projeto

backend/
│── src/
│ ├── application/  # Casos de uso (Use Cases)
│ ├── domain/       # Entidades e regras de negócio
│ ├── infra/        # Firebase e outros serviços externos
│ ├── presentation/ # Controllers e rotas
│ ├── helpers/      # Helpers, middlewares e configs
│ ├── index.js      # Ponto de entrada do servidor
│── .env            # Variáveis de ambiente
│── package.json    # Dependências do projeto
│── nodemon.json    # Configuração do Nodemon
│── .gitignore      # Arquivos ignorados no Git
│── README.md       # Documentação do backend


## ⚙️ Instalação e Execução
```bash
# Acesse a pasta do backend
cd backend

# Instale as dependências
npm install

# Crie e configure o arquivo .env com suas credenciais do Firebase

# Execute o servidor em ambiente de desenvolvimento
npm run dev

📌 Funcionalidades
📂 Recebe PDFs e extrai CPFs
✅ Valida formato dos CPFs (XXX.XXX.XXX-XX)
🔥 Armazena CPFs no Firebase Realtime Database
📋 Lista todos os CPFs armazenados