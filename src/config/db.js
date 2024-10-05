import dotenv from "dotenv";
import pg from "pg";

dotenv.config();

export const pool = new pg.Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});


const createUsersTable = `
  CREATE TABLE IF NOT EXISTS userss (
    id SERIAL PRIMARY KEY,       
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL, 
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
  );
`;


const createTable = async () => {
  try {
    await pool.query(createUsersTable);  
    //Documentalo por si te molesta jiji 
    console.log('Tabla "users" creada exitosamente');
  } catch (error) {
    console.error('Error al crear la tabla de usuarios:', error);
  } finally {
    pool.end();  
  }
};

createTable(); 
