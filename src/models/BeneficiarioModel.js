import pool from "../config/database.js";

class BeneficiarioModel {
  // Listar todos os beneficiários
  static async listarTodos() {
    const [rows] = await pool.query(
      "SELECT * FROM beneficiarios ORDER BY nome"
    );
    return rows;
  }

  // Buscar beneficiários por cpf || nome || rg
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

  // Cadastrar novo beneficiário
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
      uf, 
      cep,
      contato_emergencia,
      telefone_emergencia,
      necessidade_especifica,
    } = beneficiario;
    
    const [result] = await pool.query(
      `INSERT INTO beneficiarios 
        (nome, cpf, rg, data_nascimento, telefone, email, endereco, bairro, cidade, uf, cep, 
         contato_emergencia, telefone_emergencia, necessidade_especifica) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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
        uf,
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
      uf,
      cep,
      contato_emergencia,
      telefone_emergencia,
      necessidade_especifica,
    };
  }

  // Atualizar beneficiário
  static async atualizar(cpfAntigo, beneficiario) {
    if (!beneficiario || Object.keys(beneficiario).length === 0) {
    throw new Error("Nenhum dado fornecido para atualização");
  }
    const cpfParaBusca = beneficiario.cpf && beneficiario.cpf !== cpfAntigo 
      ? cpfAntigo 
      : beneficiario.cpf || cpfAntigo;
    
      const [result] = await pool.query(
    `UPDATE beneficiarios SET ? WHERE cpf = ?`,
    [beneficiario, cpfAntigo]
  );
  
  if (result.affectedRows === 0) {
    return null;
  }
  
  return { ...beneficiario };
}

  // Deletar beneficiário
  static async excluir(cpf) {
    const [result] = await pool.query(
      `DELETE FROM beneficiarios WHERE cpf = ?`,
      [cpf]
    );
    return result.affectedRows > 0;
  }

  // Filtrar beneficiários por termo nome || cpf || rg || telefone
  static async filtrarPorTermo(termo) {
    const termoBusca = `%${termo}%`;
    const [rows] = await pool.query(
      `SELECT * FROM beneficiarios 
       WHERE nome LIKE ? OR cpf LIKE ? OR rg LIKE ? OR telefone LIKE ? 
       ORDER BY nome DESC`,
      [termoBusca, termoBusca, termoBusca, termoBusca]
    );
    return rows;
  }
}

export default BeneficiarioModel;