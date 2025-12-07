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
      cep,
      cargo,
      profissao,
      empresa,
    } = membro;
    const [result] = await pool.query(
      `INSERT INTO membros
            (nome, cpf, rg, email, telefone, data_nascimento, data_ingresso, endereco, bairro, cidade, cep, cargo, profissao, empresa)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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
        cep,
        cargo,
        profissao,
        empresa,
      ]
    );
    return { id: result.insertId, ...membro };
  }

  // Atualizar membro existente
  static async atualizar(cpf, membro) {
    const [result] = await pool.query(`UPDATE membros SET ? WHERE cpf = ?`, [
      membro,
      cpf,
    ]);
    if (result.affectedRows === 0) {
      throw new Error("Membro não encontrado");
    }
    return {
      nome: membro.nome,
      cpf: cpf,
      rg: membro.rg,
      email: membro.email,
      telefone: membro.telefone,
      data_nascimento: membro.data_nascimento,
      data_ingresso: membro.data_ingresso,
      endereco: membro.endereco,
      bairro: membro.bairro,
      cidade: membro.cidade,
      cep: membro.cep,
      cargo: membro.cargo,
      profissao: membro.profissao,
      empresa: membro.empresa,
    };
  }

  // Deletar membro
  static async excluir(cpf) {
    const [result] = await pool.query(`DELETE FROM membros WHERE cpf = ?`, [
      cpf,
    ]);
    return result.affectedRows > 0;
  }

  //filtrar membros por termo nome||cpf||rg|| cargo
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
