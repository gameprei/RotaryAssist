import mysql2 from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();
const pool = mysql2.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// testar conexão
pool
  .getConnection()
  .then((connection) => {
    console.log("Conexão com o banco de dados MySQL estabelecida com sucesso.");
    connection.release();
  })
  .catch((error) => {
    console.error("Erro ao conectar ao banco de dados MySQL:", error);
  });

export default pool;
