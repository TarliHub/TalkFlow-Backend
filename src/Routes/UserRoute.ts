import { Router } from "express";
import { UserController } from "../Controller/UserController";

const router = Router();
const userController = new UserController();

router.get("/users", (req, res) => userController.getAllUsers(req, res));
router.get("/users/:id", (req, res) => userController.getUserById(req, res));
router.delete("/users/:id", (req, res) => userController.deleteUser(req, res));

export default router;
