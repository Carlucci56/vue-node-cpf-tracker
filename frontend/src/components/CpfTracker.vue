<template>
  <div class="container">
    <button @click="buscarCPFs">Listar CPF</button>

    <ul v-if="cpfs.length">
      <li v-for="cpf in cpfs" :key="cpf.id">{{ cpf.cpf }}</li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      cpfs: [],
    };
  },
  methods: {
    async buscarCPFs() {
      try {
        const response = await axios.get("http://localhost:3000/api/documents");
        this.cpfs = response.data ? Object.values(response.data) : [];
      } catch (error) {
        console.error("Erro ao buscar CPFs:", error);
      }
    },
  },
};
</script>

<style scoped>
.container {
  font-family: "Barlow", sans-serif;
  color: #3a3a3a;
  text-align: center;
}

button {
  text-decoration: none;
  text-transform: uppercase;
  font: 600 15px "Open Sans", sans-serif;
  transition: all 0.2s ease;
  color: #fff;
  background: #2b9933;
  width: 150px;
  text-align: center;
  border-radius: 3px;
  border-bottom: 4px solid #006701;
  height: 45px;
  cursor: pointer;
}

button:hover {
  background-color: #69c970;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin-top: 5px;
  font-size: 18px;
}
</style>
