import { pool } from "../config/db.js";

const newuser = async (name, email, password) => {
  try {
    const result = await pool.query(
      `INSERT INTO userss (name, email, password) VALUES ($1, $2, $3) RETURNING *`,
      [name, email, password]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error al crear nuevo usuario:", error);
    throw new Error("Error al crear nuevo usuario"); 
  }
};

const findByEmail = async (email) => {
  try {
    const result = await pool.query(`SELECT * FROM userss WHERE email = $1`, [
      email,
    ]);
    return result.rows[0];
  } catch (error) {
    console.error("Error al buscar usuario por email:", error);
    throw new Error("Error al buscar usuario por email"); 
  }
};

const createProduct = async (title, description, price, category, imageUrl) => {
  try {
    const query = `
      INSERT INTO products (title, description, price, category, image_url)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, title, description, price, category, image_url;
    `;
    const values = [title, description, price, category, imageUrl];
    
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error al crear el producto:", error);
    throw new Error("Error al crear el producto");
  }
};

export const UserModel = {
  newuser,
  findByEmail,
  createProduct,
};
