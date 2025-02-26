# 📌 Frontend - Vue Node CPF Tracker

Este é o frontend da aplicação, desenvolvido com **Vue 2** e **SCSS**. Ele permite o **upload de PDFs**, exibe os **CPFs extraídos** e lista todos os CPFs armazenados no **Firebase Realtime Database**.

## 🚀 Tecnologias Utilizadas
- Vue 2 (Options API)
- Vue Router
- SCSS
- Axios (requisições HTTP para o backend)

## 📂 Estrutura do Projeto

frontend/
│── src/
│ ├── assets/       # Estilos e imagens
│ ├── components/   # Componentes reutilizáveis
│ ├── views/        # Páginas principais
│ ├── router/       # Configuração do Vue Router
│ ├── store/        # Gerenciamento de estado
│ ├── App.vue       # Componente raiz
│ ├── main.js       # Entrada da aplicação
│── public/         # Arquivos públicos (index.html)
│── package.json    # Dependências do projeto
│── README.md       # Documentação do frontend

## ⚙️ Instalação e Execução
```bash
# Acesse a pasta do frontend
cd frontend

# Instale as dependências
npm install

# Execute o servidor de desenvolvimento
npm run serve

🔨 Comandos Adicionais

# Gerar a versão de produção
npm run build

# Executar testes unitários
npm run test:unit

# Verificar e corrigir formatação do código
npm run lint

📌 Funcionalidades
📂 Upload de PDFs
🔍 Extração e exibição de CPFs
💾 Integração com Firebase Realtime Database
📋 Lista todos os CPFs extraídos e armazenados