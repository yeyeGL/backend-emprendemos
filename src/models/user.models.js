import { pool } from "../config/db.js";


const newuser = async (name,email,password) => {
    const result = await pool.query(
        `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *`,
        [name, email, password]
    )
    return result.rows[0];
}


export const UserModel={
    newuser
 };
