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
        uf, 
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
        !uf || 
        !cep ||
        !contato_emergencia ||
        !telefone_emergencia
      ) {
        return res
          .status(400)
          .json({ message: "Todos os campos são obrigatórios" });
      }

      // Validar CPF
      const cpfRegex = /^\d{11}$/;
      if (!cpfRegex.test(cpf)) {
        return res.status(400).json({ message: "CPF inválido" });
      }

      // Validar RG
      const rgRegex = /^\d{7,9}$/;
      if (!rgRegex.test(rg)) {
        return res.status(400).json({ message: "RG inválido" });
      }

      // Validar UF
      const ufRegex = /^[A-Z]{2}$/;
      if (!ufRegex.test(uf)) {
        return res.status(400).json({ message: "UF inválida" });
      }

      // Validar data de nascimento
      const anoAtual = new Date().getFullYear();
      if (new Date(data_nascimento).getFullYear() > anoAtual) {
        return res.status(400).json({ message: "Data de nascimento inválida" });
      }

      // Verificar se CPF já existe
      const beneficiariosExistentes = await BeneficiarioModel.buscarPorTermo(cpf);
      if (beneficiariosExistentes.length > 0) {
        return res.status(400).json({ message: "CPF já cadastrado" });
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
        uf, 
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
      
      res.status(500).json({ message: "Erro ao cadastrar beneficiário" });
    }
  }

  // Atualizar beneficiário existente
  static async atualizar(req, res) {
    try {
      const { cpfAntigo } = req.params; 
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
        uf, 
        cep,
        contato_emergencia,
        telefone_emergencia,
        necessidade_especifica,
      } = req.body;

      // Validar se o corpo da requisição existe
      if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: "Corpo da requisição vazio" });
      }

      // Validar CPF antigo (da URL)
      const cpfRegex = /^\d{11}$/;
      if (!cpfRegex.test(cpfAntigo)) {
        return res.status(400).json({ message: "CPF da URL inválido" });
      }

      // Se tentar alterar o CPF, validar o novo CPF
      if (cpf) {
        if (!cpfRegex.test(cpf)) {
          return res.status(400).json({ message: "Novo CPF inválido" });
        }
        
        // Verificar se o novo CPF já existe 
        const beneficiariosExistentes = await BeneficiarioModel.buscarPorTermo(cpf);
        const beneficiarioComMesmoCPF = beneficiariosExistentes.find(
          (b) => b.cpf === cpf && b.cpf !== cpfAntigo
        );
        
        if (beneficiarioComMesmoCPF) {
          return res.status(400).json({ 
            message: "Novo CPF já cadastrado para outro beneficiário" 
          });
        }
      }

      // Validar RG apenas se foi fornecido
      if (rg) {
        const rgRegex = /^\d{7,9}$/;
        if (!rgRegex.test(rg)) {
          return res.status(400).json({ message: "RG inválido" });
        }
      }

      // Validar UF apenas se foi fornecida
      if (uf) {
        const ufRegex = /^[A-Z]{2}$/;
        if (!ufRegex.test(uf)) {
          return res.status(400).json({ message: "UF inválida" });
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

      // Preparar dados para atualização
      const dadosAtualizacao = {};
      if (nome) dadosAtualizacao.nome = nome;
      if (cpf) dadosAtualizacao.cpf = cpf; // Permite alterar CPF
      if (rg) dadosAtualizacao.rg = rg;
      if (data_nascimento) dadosAtualizacao.data_nascimento = data_nascimento;
      if (telefone) dadosAtualizacao.telefone = telefone;
      if (email) dadosAtualizacao.email = email;
      if (endereco) dadosAtualizacao.endereco = endereco;
      if (bairro) dadosAtualizacao.bairro = bairro;
      if (cidade) dadosAtualizacao.cidade = cidade;
      if (uf) dadosAtualizacao.uf = uf;
      if (cep) dadosAtualizacao.cep = cep;
      if (contato_emergencia) dadosAtualizacao.contato_emergencia = contato_emergencia;
      if (telefone_emergencia) dadosAtualizacao.telefone_emergencia = telefone_emergencia;
      if (necessidade_especifica !== undefined) dadosAtualizacao.necessidade_especifica = necessidade_especifica;

      // Atualizar beneficiário
      const beneficiarioAtualizado = await BeneficiarioModel.atualizar(
        cpfAntigo, 
        dadosAtualizacao
      );
      
      if (!beneficiarioAtualizado) {
        return res.status(404).json({ message: "Beneficiário não encontrado" });
      }
      
      return res.json(beneficiarioAtualizado);
    } catch (error) {
      console.error("Erro ao atualizar beneficiário:", error);
      
      if (error.code === "ER_DUP_ENTRY") {
        return res.status(400).json({ 
          message: "CPF já cadastrado para outro beneficiário" 
        });
      }
      
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }

  // Excluir beneficiário
  static async excluir(req, res) {
    try {
      const { cpf } = req.params;
      const resultado = await BeneficiarioModel.excluir(cpf);
      if (!resultado) {
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