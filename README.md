# 📂 vue-node-cpf-tracker  

🚀 **Single-Page Application (SPA) para extração e armazenamento de CPFs a partir de PDFs**, utilizando **Vue 2, Node.js e Firebase Realtime Database**.  

## 🔹 Tecnologias Utilizadas  
- **Frontend:** Vue 2 (Options API) + SCSS  
- **Backend:** Node.js  
- **Banco de Dados:** Firebase Realtime Database  

## 🔹 Funcionalidades  
✅ Upload de arquivos **PDF** no frontend  
✅ Extração de **CPFs** no backend  
✅ Validação do **formato** (`XXX.XXX.XXX-XX`)  
✅ Armazenamento dos CPFs no **Firebase Realtime Database**  
✅ Listagem dos CPFs encontrados e armazenados  

## 📌 Sobre o Projeto  
Este projeto foi desenvolvido como parte de um desafio técnico, seguindo as boas práticas de **clean code, SOLID e arquitetura escalável**. A aplicação é simples, mas permite fácil expansão e aprimoramento.  

💡 **Deploy opcional:** Caso tenha feito o deploy, adicione um link aqui.  

## ⚡ Como Executar  
```bash
# Clone o repositório
git clone https://github.com/seu-usuario/vue-node-cpf-tracker.git
cd vue-node-cpf-tracker

# Instale as dependências do frontend e backend
cd frontend
npm install
cd ../backend
npm install

# Execute o backend
npm run dev

# Execute o frontend
cd ../frontend
npm run serve
