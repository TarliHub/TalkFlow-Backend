import { AuthService } from "../Service/AuthService";
import { Request, Response } from "express";

export class AuthController {
    private authService = new AuthService();

    async login(req: Request, res: Response) {
        try {
            const data = await this.authService.login(req.body.email, req.body.password);
            if (data) {
                res.status(200).json(data);
            } else {
                res.status(401).json({ message: "Invalid email or password" });
            }
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async register(req: Request, res: Response) {
        try {
            const { username, email, password } = req.body;
            const data = await this.authService.register(username, email, password);
            res.status(201).json(data);
        } catch (error) {
            res.status(400).json({ message: "Error registering user", error });
        }
    }
}
