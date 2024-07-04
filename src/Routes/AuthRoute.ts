import { Router } from "express";
import { AuthController } from "../Controller/AuthController";

const authController = new AuthController();
const router = Router();

router.post("/login", authController.login.bind(authController));
router.post("/register", authController.register.bind(authController));
router.post("/register-admin", authController.registerAdmin.bind(authController));

export default router;
