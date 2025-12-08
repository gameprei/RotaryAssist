import pool from "../config/database.js";

class EquipamentoModel {
    // Listar todos os equipamentos
    static async listarTodos() {
        const [rows] = await pool.query(
            "SELECT * FROM equipamentos ORDER BY nome"
        );
        return rows;
    }

    // buscar equipamento por nome ou patrimonio
    static async buscarPorTermo(termo) {
        const query = `
            SELECT * FROM equipamentos
            WHERE nome LIKE ? OR patrimonio LIKE ?
            ORDER BY nome
        `;
        const likeTermo = `%${termo}%`;
        const [rows] = await pool.query(query, [likeTermo, likeTermo]);
        return rows;
    }

    // cadastrar novo equipamento
    static async cadastrar(equipamento) {
        const {
            nome,
            descricao,
            tipo,
            patrimonio,
            estado_conservacao,
            data_aquisicao,
        } = equipamento;
        const [result] = await pool.query(
            `INSERT INTO equipamentos
            (nome, descricao, tipo, patrimonio, estado_conservacao, data_aquisicao)
            VALUES (?, ?, ?, ?, ?, ?)`,
            [
                nome,
                descricao,
                tipo,
                patrimonio,
                estado_conservacao,
                data_aquisicao,
            ]
        );
        return { id: result.insertId, ...equipamento };
    }
    
    // atualizar equipamento
    static async atualizar(id, equipamento) {
        const [result] = await pool.query(
            `UPDATE equipamentos SET ? WHERE id = ?`,
            [equipamento, id]
        );
        if (result.affectedRows === 0) {
            throw new Error("Equipamento não encontrado");
        }
        return { id, ...equipamento };
    }

    // exclui equipamento
    static async excluir(id) {
        const [result] = await pool.query(
            `DELETE FROM equipamentos WHERE id = ?`,
            [id]
        );
        if(result.affectedRows === 0){
            return 
        }
        return result.affectedRows
    }


}

export default EquipamentoModel;