import BeneficiarioModel from "../models/BeneficiarioModel.js";

class BeneficiarioController {
  // Listar todos os beneficiários
  static async listarTodos(req, res) {
    try {
      const { termo } = req.query;
      let beneficiarios;

      if (termo) {
        beneficiarios = await BeneficiarioModel.buscarPorTermo(termo);
      } else {
        beneficiarios = await BeneficiarioModel.listarTodos();
      }

      res.json(beneficiarios);
    } catch (error) {
      console.error("Erro ao listar beneficiários:", error);
      res.status(500).json({ message: "Erro ao listar beneficiários" });
    }
  }

  // Buscar beneficiários por termo (nome || cpf || rg)
  static async buscarPorTermo(req, res) {
    try {
      const { termo } = req.params;
      const beneficiarios = await BeneficiarioModel.buscarPorTermo(termo);
      if (beneficiarios.length === 0) {
        return res.status(404).json({ message: "Beneficiário não encontrado" });
      }
      res.json(beneficiarios);
    } catch (error) {
      console.error("Erro ao buscar beneficiário:", error);
      res.status(500).json({ message: "Erro ao buscar beneficiário" });
    }
  }

  // Cadastrar novo beneficiário
  static async cadastrar(req, res) {
    try {
      const {
        nome,
        cpf,
        rg,
        data_nascimento,
        telefone,
        email,
        endereco,
        bairro,
        cidade,
        cep,
        contato_emergencia,
        telefone_emergencia,
        necessidade_especifica,
      } = req.body;
      if (
        !nome ||
        !cpf ||
        !rg ||
        !data_nascimento ||
        !telefone ||
        !email ||
        !endereco ||
        !bairro ||
        !cidade ||
        !cep ||
        !contato_emergencia ||
        !telefone_emergencia
      ) {
        return res
          .status(400)
          .json({ message: "Todos os campos são obrigatórios" });
      }

      // validar CPF
      const cpfRegex = /^\d{11}$/;
      if (!cpfRegex.test(cpf)) {
        return res.status(400).json({ message: "CPF inválido" });
      }

      // validar RG
      const rgRegex = /^\d{7,9}$/;
      if (!rgRegex.test(rg)) {
        return res.status(400).json({ message: "RG inválido" });
      }

      // validar data de nascimento
      const anoAtual = new Date().getFullYear();
      if (new Date(data_nascimento).getFullYear() > anoAtual) {
        return res.status(400).json({ message: "Data de nascimento inválida" });
      }
      const novoBeneficiario = await BeneficiarioModel.cadastrar({
        nome,
        cpf,
        rg,
        data_nascimento,
        telefone,
        email,
        endereco,
        bairro,
        cidade,
        cep,
        contato_emergencia,
        telefone_emergencia,
        necessidade_especifica,
      });
      res.status(201).json(novoBeneficiario);
    } catch (error) {
      console.error("Erro ao cadastrar beneficiário:", error);

      if (error.code === "ER_DUP_ENTRY") {
        return res.status(400).json({ message: "CPF já cadastrado" });
      }
    }
  }

  // Atualizar beneficiário existente = > Precisa de melhorias na validação, funcionam no postman.
  static async atualizar(req, res) {
    try {
      const { cpf } = req.params;
      const {
        nome,
        rg,
        data_nascimento,
        telefone,
        email,
        endereco,
        bairro,
        cidade,
        cep,
        contato_emergencia,
        telefone_emergencia,
        necessidade_especifica,
      } = req.body;

      // Validar se o corpo da requisição existe
      if (!req.body) {
        return res.status(400).json({ message: "Corpo da requisição vazio" });
      }

      // Validar CPF (do parâmetro)
      const cpfRegex = /^\d{11}$/;
      if (!cpfRegex.test(cpf)) {
        return res.status(400).json({ message: "CPF inválido" });
      }

      // Validar RG apenas se foi fornecido no body
      if (rg) {
        const rgRegex = /^\d{7,9}$/;
        if (!rgRegex.test(rg)) {
          return res.status(400).json({ message: "RG inválido" });
        }
      }

      // Validar data de nascimento apenas se foi fornecida
      if (data_nascimento) {
        const anoAtual = new Date().getFullYear();
        const anoNascimento = new Date(data_nascimento).getFullYear();
        if (anoNascimento > anoAtual) {
          return res.status(400).json({ message: "Data de nascimento inválida" });
        }
      }

      const beneficiarioAtualizado = await BeneficiarioModel.atualizar(cpf, {
        nome,
        rg,
        data_nascimento,
        telefone,
        email,
        endereco,
        bairro,
        cidade,
        cep,
        contato_emergencia,
        telefone_emergencia,
        necessidade_especifica,
      });

      return res.json(beneficiarioAtualizado);
    } catch (error) {
      console.error("Erro ao atualizar beneficiário:", error);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }
  // Excluir beneficiário
  static async excluir(req, res) {
    try {
      const { cpf } = req.params;
      const resultado = await BeneficiarioModel.excluir(cpf);
      if (resultado.affectedRows === 0) {
        return res.status(404).json({ message: "Beneficiário não encontrado" });
      }
      res.json({ message: "Beneficiário excluído com sucesso" });
    } catch (error) {
      console.error("Erro ao excluir beneficiário:", error);
      res.status(500).json({ message: "Erro ao excluir beneficiário" });
    }
  }
}
export default BeneficiarioController;
