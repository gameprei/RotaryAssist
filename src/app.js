import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import BeneficiarioRoutes from "./routes/BeneficiarioRoutes.js";

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", (await import("./routes/BeneficiarioRoutes.js")).default);

app.get("/", (req, res) => {
  res.json({ message: "API Rotary rodadando" });
});

app.use((req, res) => {
  res.status(404).json({ message: "Endpoint não encontrado" });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

export default app;
