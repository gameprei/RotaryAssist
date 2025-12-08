import express from "express";
import EquipamentoController from "../controllers/EquipamentoController.js";

const router = express.Router();

// Rota para listar todos os equipamentos
router.get("/equipamentos", EquipamentoController.listarTodos);
// Rota para buscar equipamento por termo (nome || patrimonio)
router.get("/equipamentos/:termo", EquipamentoController.buscarPorTermo);
// Rota para cadastrar um novo equipamento
router.post("/equipamentos", EquipamentoController.cadastrar);
// Rota para atualizar um equipamento existente
router.put("/equipamentos/:id", EquipamentoController.atualizar);
// Rota para deletar um equipamento
router.delete("/equipamentos/:id", EquipamentoController.excluir);

export default router;