<template>
  <div class="upload-container">
    <div class="content">
      <h1>Bem-vindo ao CPF Tracker!</h1>
      <p>Gerencie e consulte CPFs de forma fácil.</p>

      <div class="upload-box">
        <h2>Enviar PDF</h2>

        <!-- Input para seleção do arquivo PDF -->
        <input
          type="file"
          @change="handleFileUpload"
          accept="application/pdf"
        />

        <div class="button-container">
          <button @click="uploadFile">Enviar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      selectedFile: null, // Armazena o arquivo selecionado pelo usuário
    };
  },
  methods: {
    // Captura o arquivo selecionado pelo usuário
    handleFileUpload(event) {
      this.selectedFile = event.target.files[0];
    },

    // Realiza o upload do arquivo para o backend
    async uploadFile() {
      if (!this.selectedFile) {
        alert("Selecione um arquivo PDF!");
        return;
      }

      const formData = new FormData();
      formData.append("file", this.selectedFile);

      try {
        const response = await axios.post(
          "http://localhost:3000/upload",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        console.log("====================================");
        console.log(response.data.uploadResponse.filePath);
        console.log("====================================");

        alert("Upload bem-sucedido!");
      } catch (error) {
        console.error("Erro ao enviar o PDF:", error);
      }
    },
  },
};
</script>

<style scoped>
/* Estilização geral do container de upload */
.upload-container {
  font-family: "Barlow", sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  background-color: #f4f4f4;
  color: #3a3a3a;
  text-align: center;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 90%;
  width: 400px;
}

h1 {
  margin-top: 0px;
  font-size: 1.8rem;
}

p {
  font-size: 1rem;
  margin-bottom: 20px;
}

.upload-box {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 320px;
}

/* Estilização do input de arquivo */
input {
  width: 300px;
  padding: 10px;
  margin-top: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.button-container {
  display: flex;
  justify-content: center;
  margin-top: 15px;
}

/* Estilização do botão de envio */
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

/* Responsividade para telas menores */
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
