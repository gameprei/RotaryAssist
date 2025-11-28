import express from "express";
import BeneficiarioController from "./../controllers/BeneficiarioController.js";

const router = express.Router();

// Rota para listar todos os beneficiários => Funcionando
router.get("/beneficiarios", BeneficiarioController.listarTodos);
// Rota para buscar beneficiários por termo (nome ||cpf ou rg) => Funcionando
router.get("/beneficiarios/:termo", BeneficiarioController.buscarPorTermo);
// Rota para cadastrar um novo beneficiário => Funcionando
router.post("/beneficiarios", BeneficiarioController.cadastrar);
// Rota para atualizar um beneficiário existente' => Funcionando
router.put("/beneficiarios/:cpf", BeneficiarioController.atualizar);
// Rota para excluir um beneficiário => Funcionando
router.delete("/beneficiarios/:cpf", BeneficiarioController.excluir);

export default router;
