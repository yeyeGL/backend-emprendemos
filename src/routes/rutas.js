import { Router } from "express";
import { register } from "../controllers/user.controllers.js";

const router = Router();

router.post("/register",register)
router.post("/login")

export default router;