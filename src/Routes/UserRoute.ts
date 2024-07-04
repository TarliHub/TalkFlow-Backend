import { Router } from "express";
import { UserController } from "../Controller/UserController";
import AuthMiddleware from "../Middleware/AuthMiddleware";

const userController = new UserController();
const router = Router();

router.get("/users", AuthMiddleware.authenticateToken, AuthMiddleware.authorizeAdmin, userController.getAllUsers.bind(userController));
router.get("/users/:id", AuthMiddleware.authenticateToken, userController.getUserById.bind(userController));
router.delete("/users/:id", AuthMiddleware.authenticateToken, AuthMiddleware.authorizeAdmin, userController.deleteUser.bind(userController));

export default router;
