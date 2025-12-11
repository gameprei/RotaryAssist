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
        uf,
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
        !uf || 
        !cep ||
        !cargo ||
        !profissao ||
        !empresa
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
      const membrosExistentes = await MembroModel.buscarPorTermo(cpf);
      if (membrosExistentes.length > 0) {
        return res.status(400).json({ message: "CPF já cadastrado" });
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
        uf, // NOVO CAMPO
        cep,
        cargo,
        profissao,
        empresa,
      });
      res.status(201).json(novoMembro);
    } catch (error) {
      console.error("Erro ao cadastrar membro:", error);
      
      if (error.code === "ER_DUP_ENTRY") {
        return res.status(400).json({ message: "CPF já cadastrado" });
      }
      
      res.status(500).json({ message: "Erro ao cadastrar membro" });
    }
  }

  // Atualizar membro existente
  static async atualizar(req, res) {
    try {
      const { cpfAntigo } = req.params; // cpfAntigo (o CPF que está sendo editado)
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
        uf,
        cep,
        cargo,
        profissao,
        empresa,
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
        const membrosExistentes = await MembroModel.buscarPorTermo(cpf);
        const membroComMesmoCPF = membrosExistentes.find(
          (m) => m.cpf === cpf && m.cpf !== cpfAntigo
        );
        
        if (membroComMesmoCPF) {
          return res.status(400).json({ message: "Novo CPF já cadastrado para outro membro" });
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
          return res
            .status(400)
            .json({ message: "Data de nascimento inválida" });
        }
      }

      // Preparar dados para atualização
      const dadosAtualizacao = {};
      if (nome) dadosAtualizacao.nome = nome;
      if (cpf) dadosAtualizacao.cpf = cpf;
      if (rg) dadosAtualizacao.rg = rg;
      if (email) dadosAtualizacao.email = email;
      if (telefone) dadosAtualizacao.telefone = telefone;
      if (data_nascimento) dadosAtualizacao.data_nascimento = data_nascimento;
      if (data_ingresso) dadosAtualizacao.data_ingresso = data_ingresso;
      if (endereco) dadosAtualizacao.endereco = endereco;
      if (bairro) dadosAtualizacao.bairro = bairro;
      if (cidade) dadosAtualizacao.cidade = cidade;
      if (uf) dadosAtualizacao.uf = uf;
      if (cep) dadosAtualizacao.cep = cep;
      if (cargo) dadosAtualizacao.cargo = cargo;
      if (profissao) dadosAtualizacao.profissao = profissao;
      if (empresa) dadosAtualizacao.empresa = empresa;

      // Atualizar membro
      const membroAtualizado = await MembroModel.atualizar(cpfAntigo, dadosAtualizacao);
      return res.json(membroAtualizado);
    } catch (error) {
      console.error("Erro ao atualizar membro:", error);
      
      if (error.message === "Membro não encontrado") {
        return res.status(404).json({ message: error.message });
      }
      
      if (error.code === "ER_DUP_ENTRY") {
        return res.status(400).json({ message: "CPF já cadastrado para outro membro" });
      }
      
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  }

  // Excluir membro
  static async excluir(req, res) {
    try {
      const { cpf } = req.params;
      const resultado = await MembroModel.excluir(cpf);
      if (!resultado) {
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