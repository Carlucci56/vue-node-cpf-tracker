<template>
  <div>
    <!-- Cabeçalho com logo e título -->
    <header class="upload-header">
      <button class="logo-button">
        <img src="/simpleshub_logo.png" alt="Logo SimplesHub" />
      </button>
      <h1 class="upload-title">SimplesHub - CPF Tracker</h1>
    </header>

    <!-- Menu de navegação para alternar entre abas -->
    <nav class="tab-menu">
      <button
        :class="{ active: activeTab === 'upload' }"
        @click="activeTab = 'upload'"
      >
        Enviar PDF
      </button>
      <button
        :class="{ active: activeTab === 'tracker' }"
        @click="activeTab = 'tracker'"
      >
        Consultar CPFs
      </button>
    </nav>

    <!-- Conteúdo principal renderizado com base na aba ativa -->
    <main>
      <PdfUploader v-if="activeTab === 'upload'" />
      <CpfTracker v-if="activeTab === 'tracker'" />
    </main>

    <!-- Rodapé -->
    <footer class="footer"></footer>
  </div>
</template>

<script>
import PdfUploader from "./components/PdfUploader.vue";
import CpfTracker from "./components/CpfTracker.vue";

export default {
  components: {
    CpfTracker,
    PdfUploader,
  },
  data() {
    return {
      activeTab: "upload", // Define a aba inicial como "upload"
    };
  },
};
</script>

<style scoped>
/* Estilos do cabeçalho */
.upload-header {
  height: 135px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
}

/* Botão do logo */
.logo-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.logo-button img {
  width: 65px;
  height: 65px;
}

/* Título do cabeçalho */
.upload-title {
  font-size: 35px;
  line-height: 35px;
  color: #3a3a3a;
  transition: all 0.5s ease;
  letter-spacing: -0.03em;
  display: inline-block;
  margin-left: -3px;
  padding: 5px 0 0 0;
  font-family: "Barlow", sans-serif;
  font-weight: 600;
}

/* Menu de navegação */
.tab-menu {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

.tab-menu button {
  background: none;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s;
  border-bottom: 3px solid transparent;
}

/* Aba ativa */
.tab-menu button.active {
  border-bottom: 3px solid #2b9933;
  color: #2b9933;
}

/* Efeito hover */
.tab-menu button:hover {
  color: #69c970;
}
</style>
