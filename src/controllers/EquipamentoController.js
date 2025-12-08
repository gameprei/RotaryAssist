import EquipamentoModel from "../models/EquipamentoModel.js";

class EquipamentoController {
  // Listar todos os equipamentos
  static async listarTodos(req, res) {
    try {
      const { termo } = req.query;
      let equipamentos;
      if (termo) {
        equipamentos = await EquipamentoModel.buscarPorTermo(termo);
      } else {
        equipamentos = await EquipamentoModel.listarTodos();
      }
      res.json(equipamentos);
    } catch (error) {
      console.error("Erro ao listar equipamentos:", error);
      res.status(500).json({ message: "Erro ao listar equipamentos" });
    }
  }

  // Buscar equipamento por termo (nome || patrimonio)
  static async buscarPorTermo(req, res) {
    try {
      const { termo } = req.params;
      const equipamentos = await EquipamentoModel.buscarPorTermo(termo);
      if (equipamentos.length === 0) {
        return res.status(404).json({ message: "Equipamento não encontrado" });
      }
      res.json(equipamentos);
    } catch (error) {
      console.error("Erro ao buscar equipamento:", error);
      res.status(500).json({ message: "Erro ao buscar equipamento" });
    }
  }

  // Cadastrar novo equipamento
  static async cadastrar(req, res) {
    try {
      const {
        nome,
        descricao,
        tipo,
        patrimonio,
        estado_conservacao,
        data_aquisicao,
      } = req.body;
      if (
        !nome ||
        !descricao ||
        !tipo ||
        !patrimonio ||
        !estado_conservacao ||
        !data_aquisicao
      ) {
        return res
          .status(400)
          .json({ message: "Todos os campos são obrigatórios" });
      }
      const novoEquipamento = await EquipamentoModel.cadastrar({
        nome,
        descricao,
        tipo,
        patrimonio,
        estado_conservacao,
        data_aquisicao,
      });
      res.status(201).json(novoEquipamento);
    } catch (error) {
      console.error("Erro ao cadastrar equipamento:", error);
      res.status(500).json({ message: "Erro ao cadastrar equipamento" });
    }
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(400).json({ message: "Patrimônio já cadastrado" });
    }
  }

  // Atualizar equipamento
  static async atualizar(req, res) {
    try {
      const { id } = req.params;
      const {
        nome,
        descricao,
        tipo,
        patrimonio,
        estado_conservacao,
        data_aquisicao,
      } = req.body;
      if (!req.body) {
        return res.status(400).json({ message: "Corpo da requisição vazio" });
      }
      const equipamentoAtualizado = await EquipamentoModel.atualizar(id, {
        nome,
        descricao,
        tipo,
        patrimonio,
        estado_conservacao,
        data_aquisicao,
      });
      res.json(equipamentoAtualizado);
    } catch (error) {
      console.error("Erro ao atualizar equipamento:", error);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }

  // Excluir equipamento
  static async excluir(req, res) {
    try {
      const { id } = req.params;
      const resultado = await EquipamentoModel.excluir(id);
      if (resultado.affectedRows === 0) {
        return res.status(404).json({ message: "Equipamento não encontrado" });
      }
      res.json({ message: "Equipamento excluído com sucesso" });
    } catch (error) {
      console.error("Erro ao excluir equipamento:", error);
      res.status(500).json({ message: "Erro ao excluir equipamento" });
    }
  }
}
export default EquipamentoController;
