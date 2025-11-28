import pool from "../config/database.js";

class BeneficiarioModel {
  // Listar todos os beneficiários
  static async listarTodos() {
    const [rows] = await pool.query(
      "SELECT * FROM beneficiarios order BY nome"
    );
    return rows;
  }

  //buscar beneficiarios por cpf || nome || rg
  static async buscarPorTermo(termo) {
    const query = `
        SELECT * FROM beneficiarios
        WHERE nome LIKE ? OR cpf LIKE ? OR rg LIKE ?
        ORDER BY nome
    `;
    const likeTermo = `%${termo}%`;
    const [rows] = await pool.query(query, [likeTermo, likeTermo, likeTermo]);
    return rows;
}

  // cadastrar novo beneficiário
  static async cadastrar(beneficiario) {
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
    } = beneficiario;
    const [result] = await pool.query(
      `INSERT INTO beneficiarios 
            (nome, cpf, rg, data_nascimento, telefone, email, endereco, bairro, cidade, cep, contato_emergencia, telefone_emergencia, necessidade_especifica) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
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
      ]
    );

    return {
      id: result.insertId,
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
    };
  }

  //atualizar beneficiário
  static async atualizar(cpf, beneficiario) {
    const [result] = await pool.query(
      `UPDATE beneficiarios SET ? WHERE cpf = ?`,
      [beneficiario, cpf]
    );
    if (result.affectedRows === 0) {
      return null;
    }
    return {
      nome: beneficiario.nome,
      cpf: cpf,
      rg: beneficiario.rg,
      data_nascimento: beneficiario.data_nascimento,
      telefone: beneficiario.telefone,
      email: beneficiario.email,
      endereco: beneficiario.endereco,
      bairro: beneficiario.bairro,
      cidade: beneficiario.cidade,
      cep: beneficiario.cep,
      contato_emergencia: beneficiario.contato_emergencia,
      telefone_emergencia: beneficiario.telefone_emergencia,
      necessidade_especifica: beneficiario.necessidade_especifica
    };
}

  // deletar beneficiário
  static async excluir(cpf) {
    const [result] = await pool.query(
      `DELETE FROM beneficiarios WHERE cpf = ?`,
      [cpf]
    );
    return result.affectedRows > 0;
  }

  //Filtrar beneficiários por termo nome || cpf ||  rg || telefone => usado na busca do frontend
  static async filtrarPorTermo(termo) {
    const termoBusca = `%${termo}%`;
    const [rows] = await pool.query(
      `SELECT * FROM beneficiarios WHERE nome LIKE ? OR cpf LIKE ? OR rg LIKE? OR telefone LIKE ? ORDER BY nome DESC`,
      [termoBusca, termoBusca, termoBusca, termoBusca]
    );
    return rows;
  }
}
export default BeneficiarioModel;
