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

// Tabla de userss
const createUsersTable = `
  CREATE TABLE IF NOT EXISTS userss (
    id SERIAL PRIMARY KEY,       
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL, 
    password VARCHAR(255) NOT NULL
  );
`;

// Tabla de products
const createProductsTable = `
  CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    category VARCHAR(50) NOT NULL,
    image_url VARCHAR(255) 
  );
`;

const createTables = async () => {
  try {
    await pool.query(createUsersTable);
    console.log('Tabla "userss" creada exitosamente');

    await pool.query(createProductsTable);
    console.log('Tabla "products" creada exitosamente');
  } catch (error) {
    console.error('Error al crear las tablas:', error);
  }
};

// Llamada a la función para crear las tablas
createTables();
