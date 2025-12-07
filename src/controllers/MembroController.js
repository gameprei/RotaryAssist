import MembroModel from "../models/MembroModel.js";

class MembroController {
  // Listar todos os membros
  static async listarTodos(req, res) {
    try {
      const { termo } = req.query;
      let membros;

      if (termo) {
        membros = await MembroModel.buscarPorTermo(termo);
      } else {
        membros = await MembroModel.listarTodos();
      }
      res.json(membros);
    } catch (error) {
      console.error("Erro ao listar membros:", error);
      res.status(500).json({ message: "Erro ao listar membros" });
    }
  }

  // Buscar membros por termo (nome || cpf || cargo)
  static async buscarPorTermo(req, res) {
    try {
      const { termo } = req.params;
      const membros = await MembroModel.filtrarPorTermo(termo);
      if (membros.length === 0) {
        return res.status(404).json({ message: "Membro não encontrado" });
      }
      res.json(membros);
    } catch (error) {
      console.error("Erro ao buscar membro:", error);
      res.status(500).json({ message: "Erro ao buscar membro" });
    }
  }

  // Cadastrar novo membro
  static async cadastrar(req, res) {
    try {
      const {
        nome,
        cpf,
        rg,
        email,
        telefone,
        data_nascimento,
        data_ingresso,
        endereco,
        bairro,
        cidade,
        cep,
        cargo,
        profissao,
        empresa,
      } = req.body;
      if (
        !nome ||
        !cpf ||
        !rg ||
        !email ||
        !telefone ||
        !data_nascimento ||
        !data_ingresso ||
        !endereco ||
        !bairro ||
        !cidade ||
        !cep ||
        !cargo ||
        !profissao ||
        !empresa
      ) {
        return res
          .status(400)
          .json({ message: "Todos os campos são obrigatórios" });
      }

      //validar CPF
      const cpfRegex = /^\d{11}$/;
      if (!cpfRegex.test(cpf)) {
        return res.status(400).json({ message: "CPF inválido" });
      }

      //validar data de nascimento
      const anoAtual = new Date().getFullYear();
      if (new Date(data_nascimento).getFullYear() > anoAtual) {
        return res.status(400).json({ message: "Data de nascimento inválida" });
      }
      const novoMembro = await MembroModel.cadastrar({
        nome,
        cpf,
        rg,
        email,
        telefone,
        data_nascimento,
        data_ingresso,
        endereco,
        bairro,
        cidade,
        cep,
        cargo,
        profissao,
        empresa,
      });
      res.status(201).json(novoMembro);
    } catch (error) {
      console.error("Erro ao cadastrar membro:", error);
      res.status(500).json({ message: "Erro ao cadastrar membro" });

      if (error.code === "ER_DUP_ENTRY") {
        return res.status(400).json({ message: "CPF já cadastrado" });
      }
    }
  }

  // Atualizar membro existente
  static async atualizar(req, res) {
    try {
      const { cpf } = req.params;
      const {
        nome,
        rg,
        email,
        telefone,
        data_nascimento,
        data_ingresso,
        endereco,
        bairro,
        cidade,
        cep,
        cargo,
        profissao,
        empresa,
      } = req.body;

      // validar se o corpo da requisição existe
      if (!req.body) {
        return res.status(400).json({ message: "Corpo da requisição vazio" });
      }

      // validar CPF
      const cpfRegex = /^\d{11}$/;
      if (!cpfRegex.test(cpf)) {
        return res.status(400).json({ message: "CPF inválido" });
      }

      // Validar data de nascimento apenas se foi fornecida
      if (data_nascimento) {
        const anoAtual = new Date().getFullYear();
        const anoNascimento = new Date(data_nascimento).getFullYear();
        if (anoNascimento > anoAtual) {
          return res
            .status(400)
            .json({ message: "Data de nascimento inválida" });
        }
      }

      const membroAtualizado = await MembroModel.atualizar(cpf, {
        nome,
        rg,
        email,
        telefone,
        data_nascimento,
        data_ingresso,
        endereco,
        bairro,
        cidade,
        cep,
        cargo,
        profissao,
        empresa,
      });
      return res.json(membroAtualizado);
    } catch (error) {
      console.error("Erro ao atualizar membro:", error);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  }

  // Excluir membro
  static async excluir(req, res) {
    try {
      const { cpf } = req.params;
      const resultado = await MembroModel.excluir(cpf);
      if (resultado.affectedRows === 0) {
        return res.status(404).json({ message: "Membro não encontrado" });
      }
      res.json({ message: "Membro excluído com sucesso" });
    } catch (error) {
      console.error("Erro ao excluir membro:", error);
      res.status(500).json({ message: "Erro ao excluir membro" });
    }
  }
}

export default MembroController;
