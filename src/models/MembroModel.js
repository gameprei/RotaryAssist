import pool from "../config/database.js";

class MembroModel {
  // Listar todos os membros
  static async listarTodos() {
    const [rows] = await pool.query("SELECT * FROM membros ORDER BY nome");
    return rows;
  }

  // Buscar membros por cpf || nome || rg
  static async buscarPorTermo(termo) {
    const query = `
      SELECT * FROM membros
      WHERE nome LIKE ? OR cpf LIKE ? OR rg LIKE ?
      ORDER BY nome
    `;
    const likeTermo = `%${termo}%`;
    const [rows] = await pool.query(query, [likeTermo, likeTermo, likeTermo]);
    return rows;
  }

  // Cadastrar novo membro
  static async cadastrar(membro) {
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
    } = membro;
    
    const [result] = await pool.query(
      `INSERT INTO membros
        (nome, cpf, rg, email, telefone, data_nascimento, data_ingresso, endereco, bairro, cidade, uf, cep, cargo, profissao, empresa)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
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
      ]
    );
    return { id: result.insertId, ...membro };
  }

  // Atualizar membro existente
  static async atualizar(cpfAntigo, membro) {
    const cpfParaBusca = membro.cpf && membro.cpf !== cpfAntigo ? cpfAntigo : membro.cpf || cpfAntigo;
    
    const [result] = await pool.query(`UPDATE membros SET ? WHERE cpf = ?`, [
      membro,
      cpfParaBusca,
    ]);
    
    if (result.affectedRows === 0) {
      throw new Error("Membro não encontrado");
    }
    
    return { ...membro };
  }

  // Deletar membro
  static async excluir(cpf) {
    const [result] = await pool.query(`DELETE FROM membros WHERE cpf = ?`, [cpf]);
    return result.affectedRows > 0;
  }

  // Filtrar membros por termo nome||cpf||rg|| cargo
  static async filtrarPorTermo(termo) {
    const query = `
      SELECT * FROM membros
      WHERE nome LIKE ? OR cpf LIKE ? OR rg LIKE ? OR cargo LIKE ?
      ORDER BY nome
    `;
    const likeTermo = `%${termo}%`;
    const [rows] = await pool.query(query, [
      likeTermo,
      likeTermo,
      likeTermo,
      likeTermo,
    ]);
    return rows;
  }
}

export default MembroModel;