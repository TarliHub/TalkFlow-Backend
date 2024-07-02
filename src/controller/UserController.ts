import { Request, Response } from "express";
import { UserService } from "../Service/UserService";

export class UserController {
    private userService = new UserService();

    async getAllUsers(req: Request, res: Response) {
        try {
            const users = await this.userService.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: "Error retrieving users", error });
        }
    }

    async getUserById(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const user = await this.userService.getUserById(id);
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: "User not found" });
            }
        } catch (error) {
            res.status(500).json({ message: "Error retrieving user", error });
        }
    }

    async createUser(req: Request, res: Response) {
        try {
            const user = await this.userService.createUser(req.body);
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ message: "Error creating user", error });
        }
    }

    async deleteUser(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            await this.userService.deleteUser(id);
            res.status(204).send();
        } catch (error) {
            if (error instanceof Error && error.message === "User not found") {
                res.status(404).json({ message: "User not found" });
            } else {
                res.status(500).json({ message: "Error deleting user", error });
            }
        }
    }
}
