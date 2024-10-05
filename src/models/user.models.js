import { pool } from "../config/db.js";

//Esto despues lo usamos en usecontrollers para poder crear un usario en regsiter

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
