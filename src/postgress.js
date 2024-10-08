import { pool } from "./config/db.js"

// con el comando npm run db en la terminal se pueden ver estas consultas

const getClient = async()=>{
    try {
        const result = await pool.query("SELECT * FROM products")
        console.table(result.rows)
        console.log("Lista")
    } catch (error) {
        console.log(error)
        
    }
}
getClient()