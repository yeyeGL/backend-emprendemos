import { Router } from "express";
import { login, register,products } from "../controllers/user.controllers.js";


const router = Router();

router.post("/register",register)
router.post("/login",login)
router.post("/products",products)

export default router;