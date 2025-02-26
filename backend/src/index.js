const express = require("express");
const cors = require("cors");
const documentRoutes = require("./presentation/routes/documentRoutes");
const uploadRoutes = require("./presentation/routes/fileUploadRoutes");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use("/api", documentRoutes);

app.use(uploadRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🔥 Servidor rodando na porta ${PORT}`));
