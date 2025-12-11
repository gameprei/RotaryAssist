import express from "express";
import MembroController from "./../controllers/MembroController.js";

const router = express.Router();

// Rota para listar todos os membros
router.get("/membros", MembroController.listarTodos);
// Rota para buscar membros por termo (nome || cpf || rg)
router.get("/membros/:termo", MembroController.buscarPorTermo);
// Rota para cadastrar um novo membro
router.post("/membros", MembroController.cadastrar);
// Rota para atualizar um membro existente
router.put("/membros/:cpfAntigo", MembroController.atualizar);
// Rota para excluir um membro
router.delete("/membros/:cpf", MembroController.excluir);

export default router;
