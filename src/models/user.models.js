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

export const UserModel = {
  newuser,
  findByEmail,
};
