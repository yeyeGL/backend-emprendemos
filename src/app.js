import express from "express"
import rutas from "./routes/rutas.js"
import cors from "cors"
import morgan from "morgan"

const app = express()

app.use(morgan("dev"));
app.use(express.json())
app.use(cors())
app.use("/api",rutas)

export default app
