<template>
  <div class="upload-container">
    <div class="content">
      <!-- Título e descrição -->
      <h1>Lista de CPFs</h1>
      <p>Veja os CPFs armazenados no sistema.</p>

      <div class="upload-box">
        <!-- Botões para ações -->
        <div class="button-container">
          <button @click="getLastUpload">Listar</button>
          <button @click="listDocuments">Listar tudo</button>
        </div>

        <!-- Tabela para exibição dos CPFs -->
        <table v-if="cpfs.length" class="cpf-table">
          <thead>
            <tr>
              <th>CPF</th>
              <th>Arquivo</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="cpf in cpfs" :key="cpf.cpf">
              <td>{{ cpf.cpf }}</td>
              <td>{{ cpf.fileName }}</td>
            </tr>
          </tbody>
        </table>

        <!-- Mensagem quando não há CPFs cadastrados -->
        <p v-if="cpfs.length === 0 && carregado">Nenhum CPF encontrado.</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      cpfs: [],
      carregado: false,
      fileName: "", // Adicionado para armazenar o nome do arquivo
    };
  },
  methods: {
    async listDocuments() {
      try {
        const response = await axios.get("http://localhost:3000/api/documents");
        this.cpfs = response.data ? Object.values(response.data) : [];
        this.carregado = true;
        this.$toast.success("Sucesso!");
      } catch (error) {
        console.error("Erro ao buscar CPFs:", error);
        this.$toast.error("Erro ao buscar CPFs. Tente novamente!");
      }
    },
    async getLastUpload() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/documents/last"
        );

        if (response.data && response.data.cpfs) {
          this.cpfs = response.data.cpfs.map((cpf) => ({
            cpf,
            fileName: response.data.fileName, // Adicionando o nome do arquivo a cada CPF
          }));
          this.fileName = response.data.fileName;
        }

        this.carregado = true;
        this.$toast.success("Último upload recuperado com sucesso!");
      } catch (error) {
        console.error("Erro ao buscar o último upload:", error);
        this.$toast.error("Erro ao buscar o último upload. Tente novamente!");
      }
    },
  },
};
</script>

<style scoped>
/* Container principal */
.upload-container {
  font-family: "Barlow", sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  background-color: #f4f4f4;
  color: #3a3a3a;
  padding: 0px;
  text-align: center;
}

/* Conteúdo centralizado */
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 90%;
  width: 400px;
}

/* Título e parágrafo */
h1 {
  margin-top: 0px;
  font-size: 1.8rem;
}

p {
  font-size: 1rem;
  margin-bottom: 20px;
}

/* Caixa principal */
.upload-box {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 100%;
  max-width: 320px;
}

/* Container de botões */
.button-container {
  display: flex;
  justify-content: center;
  gap: 10px;
}

/* Botões */
button {
  font: 600 15px "Open Sans", sans-serif;
  transition: all 0.2s ease;
  color: #fff;
  background: #2b9933;
  width: 100%;
  max-width: 150px;
  border-radius: 5px;
  border: none;
  padding: 10px;
  cursor: pointer;
}

button:hover {
  background-color: #69c970;
}

/* Tabela de CPFs */
.cpf-table {
  width: 100%;
  margin-top: 15px;
  border-collapse: collapse;
}

.cpf-table th,
.cpf-table td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: center;
}

.cpf-table th:nth-child(1),
.cpf-table td:nth-child(1) {
  width: 50%;
}

/* Estilização do cabeçalho da tabela */
.cpf-table th {
  background: #2b9933;
  color: white;
}

/* Alternância de cores nas linhas da tabela */
.cpf-table tr:nth-child(even) {
  background: #f4f4f4;
}

.cpf-table tr:hover {
  background: #e0e0e0;
}

/* Estilos responsivos */
@media (max-width: 480px) {
  h1 {
    font-size: 1.5rem;
  }

  p {
    font-size: 0.9rem;
  }

  .upload-box {
    max-width: 100%;
  }

  button {
    max-width: 100%;
  }
}
</style>
