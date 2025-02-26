<template>
  <div>
    <header class="upload-header">
      <button class="logo-button">
        <img src="/simpleshub_logo.png" alt="Logo SimplesHub" />
      </button>
      <h1 class="upload-title">SimplesHub - CPF Tracker</h1>
    </header>

    <main>
      <PdfUploader />
      <CpfTracker />
    </main>

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
};
</script>

<style scoped>
.upload-header {
  height: 135px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
}

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
</style>
